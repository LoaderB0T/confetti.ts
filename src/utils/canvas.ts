export class Canvas {
  private static _canvas?: HTMLCanvasElement;
  private static _ctx?: CanvasRenderingContext2D;
  public static init() {
    if (!this._canvas) {
      this._canvas = document.createElement('canvas');
      this._canvas.style.position = 'fixed';
      this._canvas.style.top = '0';
      this._canvas.style.left = '0';
      this._canvas.style.pointerEvents = 'none';
      this._canvas.style.zIndex = '100';
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;
      document.body.appendChild(this._canvas);

      this._ctx = this._canvas.getContext('2d') ?? undefined;
    } else {
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;
    }
  }

  public static get ctx(): CanvasRenderingContext2D {
    return this._ctx!;
  }

  public static get width(): number {
    return this._canvas!.width;
  }

  public static get height(): number {
    return this._canvas!.height;
  }
}
