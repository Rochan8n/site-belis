"use client";

/**
 * NoiseOverlay — Static CSS Noise (Performance Optimized)
 *
 * Usa uma imagem PNG tiny de noise via base64 com repeat,
 * ao invés do SVG feTurbulence que recalcula a cada frame.
 * Custo de GPU: praticamente zero.
 */
export function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04]"
      style={{
        backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEUAAACAAAAAgACAAIAAgACAAIAAgACAAIAAAACAgACAgIAAgACAAICAgACAgICAgACAAICAgICAgICAgACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC/2gz8AAAAGnRSTlMAEBAgIDAwQEBQUGBgcHCAgI+Pn5+vr7+/z8/gVKv3AAAAwklEQVR42u3VyQ7DIAwF0AdrJslQ5v//0FZRl0hBvFVXfkvL4Mq2oKenJ0laVFX1q8qqrmVSNY0MahvZaVvZqR9k0I+y0zHK4DisZHAalcFpUspO50mV1/MsO13m5XJd5Mu1FIe7stPlrlT5cH8oO/00yuD5fMlOr5dOGbzfH7LT561TBp+fH9np90cZ/P6c2Onnp5OdOvlfxpcvZfD9/SU7/f72yuD3d5Cdfr6/ZKff71cZ3O+d7HT/PmCnA/8xP/oLAAAAAElFTkSuQmCC")`,
        backgroundRepeat: "repeat",
        backgroundSize: "50px 50px",
      }}
    />
  );
}
