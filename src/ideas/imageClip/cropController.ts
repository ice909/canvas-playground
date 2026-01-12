import type { ImageRenderer } from "./imageRender";
import type { CropRect } from "./maskRender";

export class CropController {
  crop: CropRect;
  dragging = false;
  startX = 0;
  startY = 0;

  mask: HTMLCanvasElement;
  image: ImageRenderer;
  onChange: () => void;

  constructor(
    mask: HTMLCanvasElement,
    image: ImageRenderer,
    onChange: () => void
  ) {
    this.mask = mask;
    this.image = image;
    this.onChange = onChange;

    this.crop = {
      x: image.drawWidth * 0.25,
      y: image.drawHeight * 0.25,
      width: image.drawWidth * 0.5,
      height: image.drawHeight * 0.5,
    };

    this.bind();
  }

  private hit(x: number, y: number) {
    const c = this.crop;
    return x >= c.x && x <= c.x + c.width && y >= c.y && y <= c.y + c.height;
  }

  private bind() {
    this.mask.onmousedown = (e) => {
      if (!this.hit(e.offsetX, e.offsetY)) return;
      this.dragging = true;
      this.startX = e.offsetX;
      this.startY = e.offsetY;
    };

    this.mask.onmousemove = (e) => {
      if (!this.dragging) return;

      const dx = e.offsetX - this.startX;
      const dy = e.offsetY - this.startY;

      this.crop.x = Math.max(
        0,
        Math.min(this.crop.x + dx, this.image.drawWidth - this.crop.width)
      );
      this.crop.y = Math.max(
        0,
        Math.min(this.crop.y + dy, this.image.drawHeight - this.crop.height)
      );

      this.startX = e.offsetX;
      this.startY = e.offsetY;

      this.onChange();
    };

    window.addEventListener("mouseup", () => {
      this.dragging = false;
    });
  }

  getImageCrop() {
    const s = this.image.scale;
    return {
      x: Math.round(this.crop.x / s),
      y: Math.round(this.crop.y / s),
      width: Math.round(this.crop.width / s),
      height: Math.round(this.crop.height / s),
    };
  }
}
