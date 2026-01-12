import { CropController } from "./cropController";
import { ImageRenderer } from "./imageRender";
import { MaskRenderer } from "./maskRender";

export class Cropper {
  image: ImageRenderer;
  mask: MaskRenderer;
  controller!: CropController;
  container: HTMLElement;

  constructor(
    imageCanvas: HTMLCanvasElement,
    maskCanvas: HTMLCanvasElement,
    container: HTMLElement
  ) {
    this.image = new ImageRenderer(imageCanvas);
    this.mask = new MaskRenderer(maskCanvas);
    this.container = container;
  }

  async init(src: string) {
    await this.image.load(src);
    this.image.computeLayout(this.container);
    this.image.setupCanvas();
    this.image.draw();

    this.mask.setupFrom(this.image);

    this.controller = new CropController(this.mask.canvas, this.image, () =>
      this.mask.draw(this.controller.crop)
    );

    this.mask.draw(this.controller.crop);
  }

  getResult() {
    return this.controller.getImageCrop();
  }
}
