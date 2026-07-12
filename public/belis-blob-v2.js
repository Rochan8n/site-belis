/* belis-blob-v2 — multi-material WebGL blob web component. No dependencies.
   Materials cross-fade between: solid (liquid metal), wireframe lines, dot cloud.
   API:
     <belis-blob-v2></belis-blob-v2>
     el.setLook(look)           — { amp, freq, spin, solid, wire, points, colA, colB, base, fadeCol }
                                  colors: '#hex' or [r,g,b] floats 0..1. Smoothly lerped.
     el.setBulge(sx, sy, amt)   — screen-space direction bulge (label hover)
     el.enter(onMid, onDone)    — explode + tunnel-in page transition
     el.reset()                 — recompose after back navigation
     el.getRotationDeg()        — current Y rotation in degrees (HUD readout)
   Displacement radius is clamped (uMaxR) so the silhouette never leaves its square.
   Falls back to 2D canvas silhouette when WebGL unavailable.
*/
(function () {
  if (customElements.get('belis-blob-v2')) return;

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
    'uniform float uMaxR;',
    'uniform float uPointSize;',
    'uniform vec3 uMouseDir;',
    'uniform float uMouseAmt;',
    'uniform vec3 uBulgeDir;',
    'uniform float uBulgeAmt;',
    'varying vec3 vNormal;',
    'varying vec3 vView;',
    'varying float vNoise;',
    'varying vec3 vDir;',
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
    'vec3 displaced(vec3 p){ vec3 n = normalize(p); float r = (1.0 + disp(p)) * uScale; r = min(r, uMaxR + uExplode * 20.0); return n * r; }',
    'void main(){',
    '  vec3 n0 = normalize(aPos);',
    '  vDir = n0;',
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
    '  float dist = max(uCamZ - world.z, 0.35);',
    '  gl_PointSize = min(uPointSize * 3.3 / dist, uPointSize * 5.0);',
    '  gl_Position = uProj * vec4(world.x, world.y, world.z - uCamZ, 1.0);',
    '}'
  ].join('\n');

  var FRAG = [
    'precision highp float;',
    'varying vec3 vNormal;',
    'varying vec3 vView;',
    'varying float vNoise;',
    'varying vec3 vDir;',
    'uniform sampler2D uTex;',
    'uniform float uTexMix;',
    'uniform vec3 uColA;',
    'uniform vec3 uColB;',
    'uniform vec3 uBase;',
    'uniform float uFade;',
    'uniform vec3 uFadeCol;',
    'uniform float uAlpha;',
    'uniform float uPassAlpha;',
    'uniform float uPass;', // 0 solid, 1 lines, 2 points
    'void main(){',
    '  if (uPass > 1.5) {',
    '    vec2 pc = gl_PointCoord - 0.5;',
    '    if (dot(pc, pc) > 0.25) discard;',
    '  }',
    '  vec3 N = normalize(vNormal);',
    '  vec3 V = normalize(vView);',
    '  vec3 col;',
    '  float a;',
    '  if (uPass < 0.5) {',
    // ── polished chrome / liquid metal ──
    '    vec3 R = reflect(-V, N);',
    // studio environment: soft bright top (softbox), darker sides + floor
    '    float up = clamp(R.y * 0.5 + 0.5, 0.0, 1.0);',
    '    float env = smoothstep(0.34, 0.98, up);',
    '    float floorK = smoothstep(0.5, 0.0, up);',
    '    vec3 metal = mix(uBase, uColA, env * 0.72);',
    '    metal = mix(metal, uBase * 0.4, floorK * 0.7);',
    // horizon band: bright equator reflection streak
    '    float horizon = 1.0 - abs(R.y);',
    '    metal += pow(horizon, 5.0) * uColA * 0.5;',
    // soft key + fill reflections
    '    float key  = pow(max(dot(R, normalize(vec3(0.32, 0.82, 0.42))), 0.0), 5.0);',
    '    float fill = pow(max(dot(R, normalize(vec3(-0.62, 0.12, 0.58))), 0.0), 3.5);',
    '    metal += key * uColA * 1.75;',
    '    metal += fill * mix(uColA, uColB, 0.35) * 0.85;',
    // tight chrome hotspot
    '    float hot = pow(max(dot(R, normalize(vec3(0.24, 0.62, 0.72))), 0.0), 96.0);',
    '    metal += hot * vec3(1.0, 1.0, 0.98) * 1.5;',
    // fresnel rim with accent tint
    '    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);',
    '    metal += fres * uColB * 0.5;',
    // faint iridescence riding the displacement
    '    metal += max(vNoise, 0.0) * uColB * 0.10;',
    '    col = metal;',
    // ── 360° equirectangular image globe (LED-sphere look) ──
    '    if (uTexMix > 0.001) {',
    '      float u = atan(vDir.x, vDir.z) * 0.15915494 + 0.5;',
    '      float vv = 0.5 - asin(clamp(vDir.y, -1.0, 1.0)) * 0.31830989;',
    '      vec3 texC = texture2D(uTex, vec2(u, vv)).rgb;',
    '      float ndv = max(dot(N, V), 0.0);',
    // emissive LED panel: image reads bright and even, only a gentle rim falloff for volume
    '      vec3 lit = texC * (0.78 + 0.34 * ndv);',
    // green LED rim glow around the silhouette, matching the reference sphere
    '      lit += fres * uColB * 0.4;',
    // faint specular sheen so it still feels like a lit display, not a flat decal
    '      lit += hot * vec3(1.0, 1.0, 0.98) * 0.18;',
    '      col = mix(col, lit, uTexMix);',
    '    }',
    '    a = uPassAlpha * uAlpha;',
    '  } else {',
    '    float facing = max(dot(N, V), 0.0);',
    '    float rim = pow(1.0 - facing, 1.6);',
    '    col = mix(uColA, uColB, clamp(0.42 + vNoise * 1.5, 0.0, 1.0));',
    '    float k = (uPass > 1.5) ? (0.34 + 0.66 * facing) : (0.20 + 0.52 * facing + 0.55 * rim);',
    '    a = k * uPassAlpha * uAlpha;',
    '  }',
    '  col = mix(col, uFadeCol, uFade);',
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
    return { pos: pos, idx: idx, edges: new Uint16Array(edges), nVerts: verts.length };
  }

  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function easeIn(t) { return t * t * t; }

  function toRGB(c) {
    if (Array.isArray(c)) return c;
    if (typeof c === 'string' && c[0] === '#') {
      return [
        parseInt(c.slice(1, 3), 16) / 255,
        parseInt(c.slice(3, 5), 16) / 255,
        parseInt(c.slice(5, 7), 16) / 255
      ];
    }
    return null;
  }

  var HERO_LOOK = {
    amp: 0.07, freq: 1.25, spin: 0.14, solid: 1, wire: 0, points: 0, tex: 0,
    colA: [0.85, 0.86, 0.89], colB: [0.455, 0.765, 0.396],
    base: [0.043, 0.047, 0.063], fadeCol: [0.039, 0.039, 0.047]
  };

  var NUM_KEYS = ['amp', 'freq', 'spin', 'solid', 'wire', 'points', 'tex'];
  var COL_KEYS = ['colA', 'colB', 'base', 'fadeCol'];

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
    this.style.touchAction = 'pan-y';

    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'width:100%;height:100%;display:block;touch-action:pan-y;';
    this.appendChild(canvas);
    this._canvas = canvas;

    this._reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this._mobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    // look state (lerped)
    this._cur = JSON.parse(JSON.stringify(HERO_LOOK));
    this._tgt = JSON.parse(JSON.stringify(HERO_LOOK));

    // motion state
    this._time = 0;
    this._last = performance.now();
    this._rotY = 0; this._rotX = 0;
    this._dragVel = 0;
    this._mouseScreen = [0, 0]; this._mouseAmt = 0; this._mouseTargetAmt = 0;
    this._bulgeScreen = [1, 0]; this._bulgeAmt = 0; this._bulgeTarget = 0;
    this._explode = 0; this._camZ = 4.2; this._fade = 0; this._alpha = 1;
    this._scale = 0; this._scaleTarget = 1;
    this._entering = false;
    this._dead = false;

    var gl = null;
    try {
      gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
    } catch (e) { gl = null; }

    if (!gl) { this._setup2D(); return; }
    this._gl = gl;

    function compile(type, src) {
      var sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('belis-blob-v2 shader:', gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    }
    var vs = compile(gl.VERTEX_SHADER, VERT);
    var fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) { this._gl = null; this._setup2D(); return; }
    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { this._gl = null; this._setup2D(); return; }
    gl.useProgram(prog);
    this._prog = prog;

    var geo = icosphere(this._mobile ? 3 : 4);
    this._nTri = geo.idx.length;
    this._nEdge = geo.edges.length;
    this._nVerts = geo.nVerts;

    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, geo.pos, gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);

    this._iboTri = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._iboTri);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geo.idx, gl.STATIC_DRAW);
    this._iboEdge = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._iboEdge);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geo.edges, gl.STATIC_DRAW);

    var U = {};
    ['uRot', 'uProj', 'uCamZ', 'uTime', 'uAmp', 'uFreq', 'uExplode', 'uScale', 'uMaxR', 'uPointSize',
      'uMouseDir', 'uMouseAmt', 'uBulgeDir', 'uBulgeAmt',
      'uColA', 'uColB', 'uBase', 'uFade', 'uFadeCol', 'uAlpha', 'uPassAlpha', 'uPass',
      'uTex', 'uTexMix'
    ].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });
    this._U = U;

    gl.uniform1f(U.uMaxR, 1.75);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this._initGlobeTexture();

    this._bindPointer();
    this._resize();
    this._onWinResize = function () { self._resize(); };
    window.addEventListener('resize', this._onWinResize);

    var frameSkip = this._mobile ? 1 : 0;
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

  /* ── 360° image globe: composite images into an equirectangular texture ── */
  var GLOBE_IMAGES = [
    '/images/portfolio/krrom.png',
    '/images/portfolio/latco.jpg',
    '/images/portfolio/salles-nogueira.png',
    '/images/portfolio/kofar.png'
  ];

  BelisBlob.prototype._initGlobeTexture = function () {
    var gl = this._gl;
    if (!gl) return;
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // placeholder until images decode: deep base tone
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([18, 20, 26, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(this._U.uTex, 0);
    this._tex = tex;

    var attr = this.getAttribute('globe-images');
    var srcs = attr ? attr.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : GLOBE_IMAGES;
    if (!srcs.length) return;

    var W = 2048, H = 1024;
    var cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    var ctx = cvs.getContext('2d');
    var self = this;
    var loaded = new Array(srcs.length).fill(null);

    function coverDraw(img, dx, dw) {
      var ir = img.width / img.height, tr = dw / H;
      var sw, sh, sx, sy;
      if (ir > tr) { sh = img.height; sw = sh * tr; sx = (img.width - sw) / 2; sy = 0; }
      else { sw = img.width; sh = sw / tr; sx = 0; sy = (img.height - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, dx, 0, dw, H);
    }

    function composite() {
      // dark backdrop so equirectangular pole-pinch reads as the sphere shell
      ctx.fillStyle = '#0b0c10';
      ctx.fillRect(0, 0, W, H);
      var slot = W / loaded.length;
      for (var i = 0; i < loaded.length; i++) {
        if (loaded[i]) coverDraw(loaded[i], i * slot, slot);
      }
      // faint LED-panel grid to echo the reference sphere
      ctx.save();
      ctx.globalCompositeOperation = 'overlay';
      ctx.strokeStyle = 'rgba(116, 195, 101, 0.28)';
      ctx.lineWidth = 2;
      for (var lon = 0; lon <= 24; lon++) {
        var x = (lon / 24) * W;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (var lat = 0; lat <= 12; lat++) {
        var y = (lat / 12) * H;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.restore();
      // vignette toward the poles
      var grd = ctx.createLinearGradient(0, 0, 0, H);
      grd.addColorStop(0, 'rgba(11,12,16,0.85)');
      grd.addColorStop(0.18, 'rgba(11,12,16,0)');
      grd.addColorStop(0.82, 'rgba(11,12,16,0)');
      grd.addColorStop(1, 'rgba(11,12,16,0.85)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      if (self._dead || !self._gl) return;
      var g = self._gl;
      g.bindTexture(g.TEXTURE_2D, self._tex);
      g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, false);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, cvs);
    }

    srcs.forEach(function (src, i) {
      var img = new Image();
      img.decoding = 'async';
      img.onload = function () { loaded[i] = img; composite(); };
      img.onerror = function () { loaded[i] = null; };
      img.src = src;
    });
  };

  BelisBlob.prototype._resize = function () {
    var dpr = Math.min(window.devicePixelRatio || 1, this._mobile ? 1.25 : 1.75);
    var w = this.clientWidth || 300, h = this.clientHeight || 300;
    this._canvas.width = Math.round(w * dpr);
    this._canvas.height = Math.round(h * dpr);
    this._pointSize = 2.1 * dpr;
    if (this._gl) this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
    this._aspect = w / h;
  };

  BelisBlob.prototype._bindPointer = function () {
    var self = this;
    this.addEventListener('pointermove', function (e) {
      var r = self.getBoundingClientRect();
      var nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      var ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      self._mouseScreen = [nx, ny];
      self._mouseTargetAmt = 0.22;
    });
    this.addEventListener('pointerleave', function () { self._mouseTargetAmt = 0; });
  };

  BelisBlob.prototype._toModel = function (sx, sy) {
    var z = 0.55;
    var l = Math.hypot(sx, sy, z) || 1;
    var x = sx / l, y = sy / l; z = z / l;
    var cy = Math.cos(-this._rotY), sy2 = Math.sin(-this._rotY);
    var cx = Math.cos(-this._rotX), sx2 = Math.sin(-this._rotX);
    var y1 = y * cx - z * sx2;
    var z1 = y * sx2 + z * cx;
    var x2 = x * cy + z1 * sy2;
    var z2 = -x * sy2 + z1 * cy;
    return [x2, y1, z2];
  };

  BelisBlob.prototype._tick = function (dt) {
    if (!this._reduced) this._time += dt;
    // look lerp
    var k = 1 - Math.exp(-dt * 5.5);
    var cur = this._cur, tgt = this._tgt;
    for (var i = 0; i < NUM_KEYS.length; i++) {
      var nk = NUM_KEYS[i];
      cur[nk] += (tgt[nk] - cur[nk]) * k;
    }
    for (var j = 0; j < COL_KEYS.length; j++) {
      var ck = COL_KEYS[j];
      for (var c = 0; c < 3; c++) cur[ck][c] += (tgt[ck][c] - cur[ck][c]) * k;
    }
    if (!this._entering) {
      this._rotY += dt * cur.spin + this._dragVel;
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
    var U = this._U, cur = this._cur;
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
    gl.uniform1f(U.uAmp, cur.amp);
    gl.uniform1f(U.uFreq, cur.freq);
    gl.uniform1f(U.uExplode, this._explode);
    gl.uniform1f(U.uScale, this._scale);
    gl.uniform1f(U.uFade, this._fade);
    gl.uniform1f(U.uAlpha, this._alpha);
    gl.uniform1f(U.uPointSize, this._pointSize || 2.5);
    gl.uniform3f(U.uColA, cur.colA[0], cur.colA[1], cur.colA[2]);
    gl.uniform3f(U.uColB, cur.colB[0], cur.colB[1], cur.colB[2]);
    gl.uniform3f(U.uBase, cur.base[0], cur.base[1], cur.base[2]);
    gl.uniform3f(U.uFadeCol, cur.fadeCol[0], cur.fadeCol[1], cur.fadeCol[2]);
    gl.uniform1f(U.uTexMix, cur.tex || 0);
    if (this._tex) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this._tex);
    }

    // pass 0: solid
    if (cur.solid * this._alpha > 0.01) {
      gl.enable(gl.DEPTH_TEST);
      gl.uniform1f(U.uPass, 0);
      gl.uniform1f(U.uPassAlpha, cur.solid);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._iboTri);
      gl.drawElements(gl.TRIANGLES, this._nTri, gl.UNSIGNED_SHORT, 0);
    }
    // pass 1: wire
    if (cur.wire * this._alpha > 0.01) {
      gl.disable(gl.DEPTH_TEST);
      gl.uniform1f(U.uPass, 1);
      gl.uniform1f(U.uPassAlpha, cur.wire);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._iboEdge);
      gl.drawElements(gl.LINES, this._nEdge, gl.UNSIGNED_SHORT, 0);
    }
    // pass 2: points
    if (cur.points * this._alpha > 0.01) {
      gl.disable(gl.DEPTH_TEST);
      gl.uniform1f(U.uPass, 2);
      gl.uniform1f(U.uPassAlpha, cur.points);
      gl.drawArrays(gl.POINTS, 0, this._nVerts);
    }
  };

  BelisBlob.prototype.setLook = function (look) {
    if (!look || this._entering || !this._tgt) return;
    var tgt = this._tgt;
    for (var i = 0; i < NUM_KEYS.length; i++) {
      var nk = NUM_KEYS[i];
      if (look[nk] !== undefined && look[nk] !== null) tgt[nk] = look[nk];
    }
    for (var j = 0; j < COL_KEYS.length; j++) {
      var ck = COL_KEYS[j];
      if (look[ck] !== undefined && look[ck] !== null) {
        var rgb = toRGB(look[ck]);
        if (rgb) tgt[ck] = [rgb[0], rgb[1], rgb[2]];
      }
    }
  };

  BelisBlob.prototype.setBulge = function (sx, sy, amt) {
    if (sx !== null && sx !== undefined) this._bulgeScreen = [sx, sy];
    this._bulgeTarget = amt || 0;
  };

  BelisBlob.prototype.getRotationDeg = function () {
    var d = (this._rotY || 0) * 180 / Math.PI;
    d = d % 360; if (d < 0) d += 360;
    return d;
  };

  BelisBlob.prototype.enter = function (onMid, onDone) {
    if (this._entering) return;
    var self = this;
    this._entering = true;
    this._bulgeTarget = 0;
    this._mouseTargetAmt = 0;

    if (this._reduced || !this._gl) {
      var t0f = performance.now();
      (function fadeLoop(now) {
        var p = Math.min((now - t0f) / 500, 1);
        self._alpha = 1 - p;
        if (self._c2d) self._fade2d = p;
        if (p >= 0.6 && !self._midFired) { self._midFired = true; if (onMid) onMid(); }
        if (p < 1) requestAnimationFrame(fadeLoop);
        else { if (onDone) onDone(); }
      })(t0f);
      return;
    }

    var D = 1600;
    var t0 = performance.now();
    var startRotY = this._rotY;
    var midFired = false;
    (function anim(now) {
      if (self._dead) return;
      var p = Math.min((now - t0) / D, 1);
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
        self._camZ = 4.2 - eb * 5.3;
        self._fade = Math.max(0, (pb - 0.45) / 0.55);
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
    this._camZ = 4.2;
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
    function rgb(arr) {
      return 'rgb(' + Math.round(arr[0] * 255) + ',' + Math.round(arr[1] * 255) + ',' + Math.round(arr[2] * 255) + ')';
    }
    function loop() {
      if (self._dead) return;
      requestAnimationFrame(loop);
      if (!self._reduced) t += 0.008;
      // lerp look
      var k = 0.06;
      var cur = self._cur, tgt = self._tgt;
      for (var i = 0; i < NUM_KEYS.length; i++) { var nk = NUM_KEYS[i]; cur[nk] += (tgt[nk] - cur[nk]) * k; }
      for (var j = 0; j < COL_KEYS.length; j++) {
        var ck = COL_KEYS[j];
        for (var c = 0; c < 3; c++) cur[ck][c] += (tgt[ck][c] - cur[ck][c]) * k;
      }
      var cv = self._canvas, w = cv.width, h = cv.height;
      ctx.clearRect(0, 0, w, h);
      var cxp = w / 2, cyp = h / 2, R = Math.min(w, h) * 0.3 * self._scale;
      ctx.globalAlpha = self._alpha * (1 - self._fade2d);
      ctx.beginPath();
      var STEPS = 90;
      var wob = 0.35 + cur.amp;
      for (var s = 0; s <= STEPS; s++) {
        var a = (s / STEPS) * Math.PI * 2;
        var r = R * (1 + wob * 0.3 * Math.sin(a * 3 + t * 2) + wob * 0.2 * Math.sin(a * 5 - t * 3) + (self._bulgeAmt || 0) * Math.max(Math.cos(a), 0));
        var x = cxp + Math.cos(a) * r, y = cyp + Math.sin(a) * r;
        if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      if (cur.solid > 0.5) {
        ctx.fillStyle = rgb(cur.base);
        ctx.fill();
        ctx.setLineDash([]);
      } else {
        ctx.setLineDash([2, 5]);
      }
      ctx.lineWidth = Math.max(1.5, R * 0.012);
      ctx.strokeStyle = rgb(cur.colA);
      ctx.stroke();
      ctx.setLineDash([]);
      self._bulgeAmt += ((self._bulgeTarget || 0) - (self._bulgeAmt || 0)) * 0.08;
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(loop);
  };

  customElements.define('belis-blob-v2', BelisBlob);
})();
