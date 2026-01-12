import type { ImageRenderer } from "./imageRender";

export type CropRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export class MaskRenderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dpr: number;
  cornerLen = 16;
  lineWidth = 1;
  BORDER_OFFSET = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.dpr = window.devicePixelRatio || 1;
  }

  setupFrom(image: ImageRenderer) {
    this.canvas.width = image.canvas.width;
    this.canvas.height = image.canvas.height;
    this.canvas.style.width = image.canvas.style.width;
    this.canvas.style.height = image.canvas.style.height;
    this.canvas.style.left = image.canvas.style.left;
    this.canvas.style.top = image.canvas.style.top;
    this.canvas.style.position = "absolute";

    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  draw(crop: CropRect) {
    const { ctx } = this;
    const w = this.canvas.width / this.dpr;
    const h = this.canvas.height / this.dpr;

    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, w, h);

    ctx.clearRect(crop.x, crop.y, crop.width, crop.height);

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();

    // 外侧 1px
    this.drawCorners(crop.x, crop.y, crop.width, crop.height, -0.5);

    // 内侧 1px
    this.drawCorners(crop.x, crop.y, crop.width, crop.height, +0.5);

    this.drawInnerBorder(crop.x, crop.y, crop.width, crop.height);
  }

  private drawCorners(
    x: number,
    y: number,
    w: number,
    h: number,
    inset: number
  ) {
    const { ctx } = this;
    const len = 20;

    const left = x + inset;
    const top = y + inset;
    const right = x + w - inset;
    const bottom = y + h - inset;

    ctx.beginPath();

    // 左上
    ctx.moveTo(left, top + len);
    ctx.lineTo(left, top);
    ctx.lineTo(left + len, top);

    // 右上
    ctx.moveTo(right - len, top);
    ctx.lineTo(right, top);
    ctx.lineTo(right, top + len);

    // 右下
    ctx.moveTo(right, bottom - len);
    ctx.lineTo(right, bottom);
    ctx.lineTo(right - len, bottom);

    // 左下
    ctx.moveTo(left + len, bottom);
    ctx.lineTo(left, bottom);
    ctx.lineTo(left, bottom - len);

    ctx.stroke();
  }

  private drawInnerBorder(x: number, y: number, w: number, h: number) {
    const { ctx } = this;

    ctx.save();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 0.5;

    // 0.5px 线必须落在整数像素上
    ctx.strokeRect(
      Math.round(x) + 1,
      Math.round(y) + 1,
      Math.round(w) - 2,
      Math.round(h) - 2
    );

    ctx.restore();
  }
}
