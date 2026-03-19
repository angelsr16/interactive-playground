import { useCallback, useEffect, useRef } from "react";

export function useResizableCanvas(
  onResize: (canvas: HTMLCanvasElement) => void,
  horizontal?: boolean,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setupCanvas = useCallback(
    (width: number, height: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;

      if (horizontal) {
        canvas.width = height * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${height}px`;
        canvas.style.height = `${height}px`;
      } else {
        canvas.width = width * dpr;
        canvas.height = width * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${width}px`;
      }
    },
    [horizontal],
  );

  useEffect(() => {
    const parent = canvasRef.current?.parentElement;
    if (!parent) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setupCanvas(width, height);

      const canvas = canvasRef.current;
      if (canvas) {
        onResize(canvas);
      }
    });

    observer.observe(parent);
    return () => observer.disconnect();
  }, [onResize, setupCanvas]);

  return canvasRef;
}
