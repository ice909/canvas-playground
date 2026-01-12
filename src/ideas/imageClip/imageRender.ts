export class ImageRenderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dpr: number;

  img!: HTMLImageElement;
  scale = 1;
  drawWidth = 0;
  drawHeight = 0;
  offsetX = 0;
  offsetY = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.dpr = window.devicePixelRatio || 1;
  }

  async load(src: string) {
    const img = new Image();
    img.src = src;
    await img.decode();
    this.img = img;
  }

  computeLayout(container: HTMLElement) {
    const cw = container.clientWidth;
    const ch = window.innerHeight;

    if (this.img.width >= this.img.height) {
      this.scale = cw / this.img.width;
      this.drawWidth = cw;
      this.drawHeight = this.img.height * this.scale;
      this.offsetY = (ch - this.drawHeight) / 2;
      this.offsetX = 0;
    } else {
      this.scale = ch / this.img.height;
      this.drawHeight = ch;
      this.drawWidth = this.img.width * this.scale;
      this.offsetX = (cw - this.drawWidth) / 2;
      this.offsetY = 0;
    }

    // 兜底
    if (this.drawWidth > cw) {
      this.scale = cw / this.img.width;
      this.drawWidth = cw;
      this.drawHeight = this.img.height * this.scale;
      this.offsetX = 0;
      this.offsetY = (ch - this.drawHeight) / 2;
    }
  }

  setupCanvas() {
    this.canvas.width = this.drawWidth * this.dpr;
    this.canvas.height = this.drawHeight * this.dpr;
    this.canvas.style.width = `${this.drawWidth}px`;
    this.canvas.style.height = `${this.drawHeight}px`;
    this.canvas.style.position = "absolute";
    this.canvas.style.left = `${this.offsetX}px`;
    this.canvas.style.top = `${this.offsetY}px`;

    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.drawWidth, this.drawHeight);
    this.ctx.drawImage(this.img, 0, 0, this.drawWidth, this.drawHeight);
  }
}
