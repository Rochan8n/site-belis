/* belis-blob — WebGL liquid-obsidian blob web component. No dependencies.
   API:
     <belis-blob variant="obsidian|wire"></belis-blob>
     el.setBulge(sx, sy, amt)   — screen-space direction bulge (label hover)
     el.enter(onMid, onDone)    — explode + tunnel-in transition
     el.reset()                 — recompose after back navigation
   Events: none required; callbacks used.
   Falls back to 2D canvas silhouette when WebGL unavailable.
*/
(function () {
  if (customElements.get('belis-blob')) return;

  var NOISE_GLSL = [
    'vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}',
    'vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}',
    'vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}',
    'vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}',
    'float snoise(vec3 v){',
    '  const vec2 C = vec2(1.0/6.0, 1.0/3.0);',
    '  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);',
    '  vec3 i = floor(v + dot(v, C.yyy));',
    '  vec3 x0 = v - i + dot(i, C.xxx);',
    '  vec3 g = step(x0.yzx, x0.xyz);',
    '  vec3 l = 1.0 - g;',
    '  vec3 i1 = min(g.xyz, l.zxy);',
    '  vec3 i2 = max(g.xyz, l.zxy);',
    '  vec3 x1 = x0 - i1 + C.xxx;',
    '  vec3 x2 = x0 - i2 + C.yyy;',
    '  vec3 x3 = x0 - D.yyy;',
    '  i = mod289(i);',
    '  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));',
    '  float n_ = 0.142857142857;',
    '  vec3 ns = n_ * D.wyz - D.xzx;',
    '  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);',
    '  vec4 x_ = floor(j * ns.z);',
    '  vec4 y_ = floor(j - 7.0 * x_);',
    '  vec4 x = x_ * ns.x + ns.yyyy;',
    '  vec4 y = y_ * ns.x + ns.yyyy;',
    '  vec4 h = 1.0 - abs(x) - abs(y);',
    '  vec4 b0 = vec4(x.xy, y.xy);',
    '  vec4 b1 = vec4(x.zw, y.zw);',
    '  vec4 s0 = floor(b0)*2.0 + 1.0;',
    '  vec4 s1 = floor(b1)*2.0 + 1.0;',
    '  vec4 sh = -step(h, vec4(0.0));',
    '  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;',
    '  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;',
    '  vec3 p0 = vec3(a0.xy, h.x);',
    '  vec3 p1 = vec3(a0.zw, h.y);',
    '  vec3 p2 = vec3(a1.xy, h.z);',
    '  vec3 p3 = vec3(a1.zw, h.w);',
    '  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));',
    '  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;',
    '  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);',
    '  m = m * m;',
    '  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));',
    '}'
  ].join('\n');

  var VERT = [
    'attribute vec3 aPos;',
    'uniform mat3 uRot;',
    'uniform mat4 uProj;',
    'uniform float uCamZ;',
    'uniform float uTime;',
    'uniform float uAmp;',
    'uniform float uFreq;',
    'uniform float uExplode;',
    'uniform float uScale;',
    'uniform vec3 uMouseDir;',
    'uniform float uMouseAmt;',
    'uniform vec3 uBulgeDir;',
    'uniform float uBulgeAmt;',
    'varying vec3 vNormal;',
    'varying vec3 vView;',
    'varying float vNoise;',
    NOISE_GLSL,
    'float disp(vec3 p){',
    '  vec3 n = normalize(p);',
    '  float d1 = snoise(n * uFreq + vec3(uTime*0.14, uTime*0.11, 0.0));',
    '  float d2 = snoise(n * uFreq * 2.4 - vec3(0.0, uTime*0.09, uTime*0.12)) * 0.32;',
    '  float mb = pow(max(dot(n, uMouseDir), 0.0), 5.0) * uMouseAmt;',
    '  float sb = pow(max(dot(n, uBulgeDir), 0.0), 3.0) * uBulgeAmt;',
    '  float base = (d1 + d2) * uAmp + mb + sb;',
    '  float ex = uExplode * (1.4 + 0.9 * snoise(n * 3.1 + uTime * 0.5));',
    '  return base * (1.0 + uExplode * 4.0) + ex;',
    '}',
    'vec3 displaced(vec3 p){ vec3 n = normalize(p); return n * (1.0 + disp(p)) * uScale; }',
    'void main(){',
    '  vec3 n0 = normalize(aPos);',
    '  vec3 t = normalize(cross(n0, abs(n0.y) > 0.98 ? vec3(1.0,0.0,0.0) : vec3(0.0,1.0,0.0)));',
    '  vec3 b = normalize(cross(n0, t));',
    '  float e = 0.06;',
    '  vec3 P  = displaced(aPos);',
    '  vec3 P1 = displaced(aPos + t * e);',
    '  vec3 P2 = displaced(aPos + b * e);',
    '  vec3 N = normalize(cross(P1 - P, P2 - P));',
    '  if (dot(N, n0) < 0.0) N = -N;',
    '  vec3 world = uRot * P;',
    '  vNormal = uRot * N;',
    '  vView = vec3(0.0, 0.0, uCamZ) - world;',
    '  vNoise = disp(aPos);',
    '  gl_Position = uProj * vec4(world.x, world.y, world.z - uCamZ, 1.0);',
    '}'
  ].join('\n');

  var FRAG_SOLID = [
    'precision highp float;',
    'varying vec3 vNormal;',
    'varying vec3 vView;',
    'varying float vNoise;',
    'uniform vec3 uColA;',
    'uniform vec3 uColB;',
    'uniform float uFade;',
    'uniform float uAlpha;',
    'void main(){',
    '  vec3 N = normalize(vNormal);',
    '  vec3 V = normalize(vView);',
    '  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.6);',
    '  vec3 base = vec3(0.026, 0.028, 0.042);',
    '  vec3 L1 = normalize(vec3(0.65, 0.7, 0.5));',
    '  vec3 L2 = normalize(vec3(-0.75, -0.25, 0.55));',
    '  vec3 R = reflect(-V, N);',
    '  float s1 = pow(max(dot(R, L1), 0.0), 42.0);',
    '  float s2 = pow(max(dot(R, L2), 0.0), 26.0);',
    '  float dif = max(dot(N, L1), 0.0) * 0.16 + max(dot(N, L2), 0.0) * 0.09;',
    '  vec3 col = base + dif * vec3(0.45, 0.52, 0.72);',
    '  col += s1 * uColA * 1.35 + s2 * uColB * 1.15;',
    '  col += fres * mix(uColB, uColA, clamp(N.x * 0.5 + 0.5, 0.0, 1.0)) * 0.5;',
    '  col += max(vNoise, 0.0) * uColA * 0.06;',
    '  col = mix(col, vec3(0.0196, 0.0196, 0.031), uFade);',
    '  gl_FragColor = vec4(col, uAlpha);',
    '}'
  ].join('\n');

  var FRAG_WIRE = [
    'precision highp float;',
    'varying vec3 vNormal;',
    'varying vec3 vView;',
    'varying float vNoise;',
    'uniform vec3 uColA;',
    'uniform vec3 uColB;',
    'uniform float uFade;',
    'uniform float uAlpha;',
    'void main(){',
    '  vec3 N = normalize(vNormal);',
    '  vec3 V = normalize(vView);',
    '  float facing = max(dot(N, V), 0.0);',
    '  vec3 col = mix(uColB, uColA, clamp(0.35 + vNoise * 1.6, 0.0, 1.0));',
    '  float a = (0.16 + 0.5 * facing) * uAlpha;',
    '  col = mix(col, vec3(0.0196, 0.0196, 0.031), uFade);',
    '  gl_FragColor = vec4(col, a);',
    '}'
  ].join('\n');

  /* ── icosphere ── */
  function icosphere(subdiv) {
    var t = (1 + Math.sqrt(5)) / 2;
    var verts = [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
    ].map(function (v) {
      var l = Math.hypot(v[0], v[1], v[2]);
      return [v[0] / l, v[1] / l, v[2] / l];
    });
    var faces = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
    ];
    var cache = {};
    function mid(a, b) {
      var key = a < b ? a + '_' + b : b + '_' + a;
      if (cache[key] !== undefined) return cache[key];
      var va = verts[a], vb = verts[b];
      var m = [(va[0] + vb[0]) / 2, (va[1] + vb[1]) / 2, (va[2] + vb[2]) / 2];
      var l = Math.hypot(m[0], m[1], m[2]);
      verts.push([m[0] / l, m[1] / l, m[2] / l]);
      cache[key] = verts.length - 1;
      return cache[key];
    }
    for (var s = 0; s < subdiv; s++) {
      var nf = [];
      for (var i = 0; i < faces.length; i++) {
        var f = faces[i];
        var a = mid(f[0], f[1]), b = mid(f[1], f[2]), c = mid(f[2], f[0]);
        nf.push([f[0], a, c], [f[1], b, a], [f[2], c, b], [a, b, c]);
      }
      faces = nf;
    }
    var pos = new Float32Array(verts.length * 3);
    for (var v = 0; v < verts.length; v++) {
      pos[v * 3] = verts[v][0]; pos[v * 3 + 1] = verts[v][1]; pos[v * 3 + 2] = verts[v][2];
    }
    var idx = new Uint16Array(faces.length * 3);
    for (var fi = 0; fi < faces.length; fi++) {
      idx[fi * 3] = faces[fi][0]; idx[fi * 3 + 1] = faces[fi][1]; idx[fi * 3 + 2] = faces[fi][2];
    }
    var edgeSet = {};
    var edges = [];
    for (var ei = 0; ei < faces.length; ei++) {
      var fe = faces[ei];
      for (var k = 0; k < 3; k++) {
        var p = fe[k], q = fe[(k + 1) % 3];
        var ek = p < q ? p + '_' + q : q + '_' + p;
        if (!edgeSet[ek]) { edgeSet[ek] = 1; edges.push(p, q); }
      }
    }
    return { pos: pos, idx: idx, edges: new Uint16Array(edges) };
  }

  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function easeIn(t) { return t * t * t; }

  var BelisBlob = function () { return Reflect.construct(HTMLElement, [], BelisBlob); };
  BelisBlob.prototype = Object.create(HTMLElement.prototype);
  Object.setPrototypeOf(BelisBlob, HTMLElement);

  BelisBlob.prototype.connectedCallback = function () {
    if (this._init) return;
    this._init = true;
    var self = this;
    this.style.display = 'block';
    this.style.width = this.style.width || '100%';
    this.style.height = this.style.height || '100%';
    this.style.touchAction = 'none';

    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:100%;height:100%;display:block;';
    this.appendChild(canvas);
    this._canvas = canvas;

    this._reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this._mobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    // state
    this._time = 0;
    this._last = performance.now();
    this._rotY = 0; this._rotX = 0;
    this._dragVel = 0;
    this._mouseScreen = [0, 0]; this._mouseAmt = 0; this._mouseTargetAmt = 0;
    this._bulgeScreen = [1, 0]; this._bulgeAmt = 0; this._bulgeTarget = 0;
    this._explode = 0; this._camZ = 3.3; this._fade = 0; this._alpha = 1; this._scale = 0;
    this._scaleTarget = 1;
    this._entering = false;
    this._dead = false;

    var gl = null;
    try {
      gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
    } catch (e) { gl = null; }

    if (!gl) { this._setup2D(); return; }
    this._gl = gl;

    var wire = this.getAttribute('variant') === 'wire';
    this._wire = wire;

    function compile(type, src) {
      var sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('belis-blob shader:', gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    }
    var vs = compile(gl.VERTEX_SHADER, VERT);
    var fs = compile(gl.FRAGMENT_SHADER, wire ? FRAG_WIRE : FRAG_SOLID);
    if (!vs || !fs) { this._gl = null; this._setup2D(); return; }
    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { this._gl = null; this._setup2D(); return; }
    gl.useProgram(prog);
    this._prog = prog;

    var geo = icosphere(this._mobile ? 3 : 4);
    this._nIdx = wire ? geo.edges.length : geo.idx.length;

    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, geo.pos, gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);

    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, wire ? geo.edges : geo.idx, gl.STATIC_DRAW);

    var U = {};
    ['uRot', 'uProj', 'uCamZ', 'uTime', 'uAmp', 'uFreq', 'uExplode', 'uScale',
      'uMouseDir', 'uMouseAmt', 'uBulgeDir', 'uBulgeAmt', 'uColA', 'uColB', 'uFade', 'uAlpha'
    ].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });
    this._U = U;

    gl.uniform3f(U.uColA, 0.455, 0.765, 0.396); // mantis #74C365
    gl.uniform3f(U.uColB, 0.118, 0.282, 0.561); // blue #1E488F
    gl.uniform1f(U.uFreq, wire ? 1.5 : 1.25);
    gl.uniform1f(U.uAmp, wire ? 0.22 : 0.17);

    if (wire) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.disable(gl.DEPTH_TEST);
    } else {
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    this._bindPointer();
    this._resize();
    this._onWinResize = function () { self._resize(); };
    window.addEventListener('resize', this._onWinResize);

    var frameSkip = this._mobile ? 1 : 0; // ~30fps mobile
    var frame = 0;
    function loop(now) {
      if (self._dead) return;
      self._raf = requestAnimationFrame(loop);
      frame++;
      if (frameSkip && frame % (frameSkip + 1) !== 0) return;
      var dt = Math.min((now - self._last) / 1000, 0.05);
      self._last = now;
      self._tick(dt);
      self._draw();
    }
    this._raf = requestAnimationFrame(loop);
  };

  BelisBlob.prototype.disconnectedCallback = function () {
    this._dead = true;
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._onWinResize) window.removeEventListener('resize', this._onWinResize);
  };

  BelisBlob.prototype._resize = function () {
    var dpr = Math.min(window.devicePixelRatio || 1, this._mobile ? 1.25 : 1.75);
    var w = this.clientWidth || 300, h = this.clientHeight || 300;
    this._canvas.width = Math.round(w * dpr);
    this._canvas.height = Math.round(h * dpr);
    if (this._gl) this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
    this._aspect = w / h;
  };

  BelisBlob.prototype._bindPointer = function () {
    var self = this;
    var dragging = false, lastX = 0;
    this.addEventListener('pointermove', function (e) {
      var r = self.getBoundingClientRect();
      var nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      var ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      self._mouseScreen = [nx, ny];
      self._mouseTargetAmt = 0.22;
      if (dragging) {
        var dx = e.clientX - lastX;
        lastX = e.clientX;
        self._dragVel = dx * 0.006;
      }
    });
    this.addEventListener('pointerleave', function () { self._mouseTargetAmt = 0; });
    this.addEventListener('pointerdown', function (e) {
      dragging = true; lastX = e.clientX;
      try { self.setPointerCapture(e.pointerId); } catch (err) {}
    });
    this.addEventListener('pointerup', function () { dragging = false; });
    this.addEventListener('pointercancel', function () { dragging = false; });
  };

  // screen-space dir -> model-space dir (inverse rotation)
  BelisBlob.prototype._toModel = function (sx, sy) {
    var z = 0.55;
    var l = Math.hypot(sx, sy, z) || 1;
    var x = sx / l, y = sy / l; z = z / l;
    var cy = Math.cos(-this._rotY), sy2 = Math.sin(-this._rotY);
    var cx = Math.cos(-this._rotX), sx2 = Math.sin(-this._rotX);
    // inverse rotX then inverse rotY (model = rotY*rotX)
    var y1 = y * cx - z * sx2;
    var z1 = y * sx2 + z * cx;
    var x2 = x * cy + z1 * sy2;
    var z2 = -x * sy2 + z1 * cy;
    return [x2, y1, z2];
  };

  BelisBlob.prototype._tick = function (dt) {
    if (!this._reduced) this._time += dt;
    if (!this._entering) {
      this._rotY += dt * 0.12 + this._dragVel;
      this._dragVel *= 0.92;
      this._rotX = Math.sin(this._time * 0.2) * 0.12;
    }
    this._mouseAmt += (this._mouseTargetAmt - this._mouseAmt) * Math.min(dt * 6, 1);
    this._bulgeAmt += (this._bulgeTarget - this._bulgeAmt) * Math.min(dt * 5, 1);
    this._scale += (this._scaleTarget - this._scale) * Math.min(dt * 3.5, 1);
  };

  BelisBlob.prototype._draw = function () {
    var gl = this._gl;
    if (!gl) return;
    var U = this._U;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var f = 1 / Math.tan((38 * Math.PI / 180) / 2);
    var a = this._aspect || 1, near = 0.05, far = 30;
    var proj = new Float32Array([
      f / a, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) / (near - far), -1,
      0, 0, (2 * far * near) / (near - far), 0
    ]);
    gl.uniformMatrix4fv(U.uProj, false, proj);

    var cy = Math.cos(this._rotY), sy = Math.sin(this._rotY);
    var cx = Math.cos(this._rotX), sx = Math.sin(this._rotX);
    // rot = rotY * rotX, column-major mat3
    var rot = new Float32Array([
      cy, 0, -sy,
      sy * sx, cx, cy * sx,
      sy * cx, -sx, cy * cx
    ]);
    gl.uniformMatrix3fv(U.uRot, false, rot);

    var md = this._toModel(this._mouseScreen[0], this._mouseScreen[1]);
    gl.uniform3f(U.uMouseDir, md[0], md[1], md[2]);
    gl.uniform1f(U.uMouseAmt, this._mouseAmt);
    var bd = this._toModel(this._bulgeScreen[0], this._bulgeScreen[1]);
    gl.uniform3f(U.uBulgeDir, bd[0], bd[1], bd[2]);
    gl.uniform1f(U.uBulgeAmt, this._bulgeAmt);

    gl.uniform1f(U.uCamZ, this._camZ);
    gl.uniform1f(U.uTime, this._time);
    gl.uniform1f(U.uExplode, this._explode);
    gl.uniform1f(U.uScale, this._scale);
    gl.uniform1f(U.uFade, this._fade);
    gl.uniform1f(U.uAlpha, this._alpha);

    gl.drawElements(this._wire ? gl.LINES : gl.TRIANGLES, this._nIdx, gl.UNSIGNED_SHORT, 0);
  };

  BelisBlob.prototype.setBulge = function (sx, sy, amt) {
    if (sx !== null && sx !== undefined) this._bulgeScreen = [sx, sy];
    this._bulgeTarget = amt || 0;
  };

  BelisBlob.prototype.enter = function (onMid, onDone) {
    if (this._entering) return;
    var self = this;
    this._entering = true;
    this._bulgeTarget = 0;
    this._mouseTargetAmt = 0;

    if (this._reduced || !this._gl) {
      // gentle crossfade
      var t0 = performance.now();
      (function fadeLoop(now) {
        var p = Math.min((now - t0) / 500, 1);
        self._alpha = 1 - p;
        if (self._c2d) self._fade2d = p;
        if (p >= 0.6 && !self._midFired) { self._midFired = true; if (onMid) onMid(); }
        if (p < 1) requestAnimationFrame(fadeLoop);
        else { if (onDone) onDone(); }
      })(t0);
      return;
    }

    var D = 1600;
    var t0 = performance.now();
    var startRotY = this._rotY;
    var midFired = false;
    (function anim(now) {
      if (self._dead) return;
      var p = Math.min((now - t0) / D, 1);
      // phase A (0–0.3): charge — shrink slightly, spin up
      // phase B (0.3–1): explode + camera dives through center
      if (p < 0.3) {
        var pa = p / 0.3;
        self._scale = 1 - 0.1 * ease(pa);
        self._scaleTarget = self._scale;
        self._rotY = startRotY + easeIn(pa) * 0.9;
      } else {
        var pb = (p - 0.3) / 0.7;
        var eb = ease(pb);
        self._explode = eb;
        self._scale = 0.9 + eb * 0.6;
        self._scaleTarget = self._scale;
        self._camZ = 3.3 - eb * 4.4;          // camera flies through the core
        self._fade = Math.max(0, (pb - 0.45) / 0.55); // melt to bg
        if (pb > 0.85) self._alpha = 1 - (pb - 0.85) / 0.15;
      }
      if (p >= 0.68 && !midFired) { midFired = true; if (onMid) onMid(); }
      if (p < 1) requestAnimationFrame(anim);
      else { if (onDone) onDone(); }
    })(t0);
  };

  BelisBlob.prototype.reset = function () {
    var self = this;
    this._entering = false;
    this._midFired = false;
    this._explode = 0; this._fade = 0; this._fade2d = 0;
    this._camZ = 3.3;
    this._scale = 0; this._scaleTarget = 1;
    this._alpha = 0;
    var t0 = performance.now();
    (function fadeIn(now) {
      if (self._dead) return;
      var p = Math.min((now - t0) / 700, 1);
      self._alpha = ease(p);
      if (p < 1) requestAnimationFrame(fadeIn);
    })(t0);
  };

  /* ── 2D fallback: animated silhouette with identical API ── */
  BelisBlob.prototype._setup2D = function () {
    var self = this;
    var ctx = this._canvas.getContext('2d');
    this._c2d = ctx;
    this._fade2d = 0;
    this._alpha = 1;
    this._scale = 1;
    this._resize();
    this._onWinResize = function () { self._resize(); };
    window.addEventListener('resize', this._onWinResize);
    var t = 0;
    function loop() {
      if (self._dead) return;
      requestAnimationFrame(loop);
      if (!self._reduced) t += 0.008;
      var c = self._canvas, w = c.width, h = c.height;
      ctx.clearRect(0, 0, w, h);
      var cxp = w / 2, cyp = h / 2, R = Math.min(w, h) * 0.3 * self._scale;
      ctx.globalAlpha = self._alpha * (1 - self._fade2d);
      ctx.beginPath();
      var STEPS = 90;
      for (var i = 0; i <= STEPS; i++) {
        var a = (i / STEPS) * Math.PI * 2;
        var r = R * (1 + 0.11 * Math.sin(a * 3 + t * 2) + 0.07 * Math.sin(a * 5 - t * 3) + (self._bulgeAmt || 0) * Math.max(Math.cos(a - Math.atan2(-(self._bulgeScreen ? self._bulgeScreen[1] : 0), self._bulgeScreen ? self._bulgeScreen[0] : 1)), 0));
        var x = cxp + Math.cos(a) * r, y = cyp + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      var g = ctx.createRadialGradient(cxp - R * 0.35, cyp - R * 0.4, R * 0.1, cxp, cyp, R * 1.25);
      g.addColorStop(0, '#1c2333');
      g.addColorStop(0.55, '#0a0c14');
      g.addColorStop(1, '#050508');
      ctx.fillStyle = g;
      ctx.fill();
      ctx.lineWidth = Math.max(1.5, R * 0.012);
      ctx.strokeStyle = 'rgba(116,195,101,0.55)';
      ctx.stroke();
      self._bulgeAmt += ((self._bulgeTarget || 0) - (self._bulgeAmt || 0)) * 0.08;
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(loop);
  };

  customElements.define('belis-blob', BelisBlob);
})();
