import { ref, onMounted, onUnmounted, type Ref } from "vue";

export function useResponsiveCanvas(
  canvasRef: Ref<HTMLCanvasElement | null>,
  onResize?: (
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D
  ) => void
) {
  const width = ref(0);
  const height = ref(0);
  let resizeObserver: ResizeObserver | null = null;

  function updateSize() {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    width.value = canvas.width;
    height.value = canvas.height;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      if (onResize) {
        onResize(rect.width, rect.height, ctx);
      }
    }
  }

  onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    updateSize();

    resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
  });

  onUnmounted(() => {
    resizeObserver?.disconnect();
  });

  return { width, height };
}
