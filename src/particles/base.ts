export abstract class Particle {
  protected _x: number;
  protected _y: number;
  protected _velocityX: number;
  protected _velocityY: number;
  protected _accelerationX: number;
  protected _accelerationY: number;

  constructor(x: number, y: number, velocityX: number, velocityY: number, accelerationX: number, accelerationY: number) {
    this._x = x;
    this._y = y;
    this._velocityX = velocityX;
    this._velocityY = velocityY;
    this._accelerationX = accelerationX;
    this._accelerationY = accelerationY;
  }

  protected abstract drawInternal(): void;

  // @internal
  public draw(): void {
    this.drawInternal();
  }
}
