import { useEffect, useRef } from "react";

type DrawFn = (ctx: CanvasRenderingContext2D, frameCount: number) => void;

interface UseCanvasOptions {
  animate?: boolean;
  deps?: React.DependencyList;
}

export function useCanvas(
  draw: DrawFn,
  { animate = true, deps = [] }: UseCanvasOptions = {},
): React.RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameCount = 0;
    let rafId: number;

    const render = () => {
      if (
        canvas.width !== canvas.clientWidth ||
        canvas.height !== canvas.clientHeight
      ) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }

      draw(ctx, frameCount++);

      if (animate) rafId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(rafId);
  }, deps);

  return canvasRef;
}
