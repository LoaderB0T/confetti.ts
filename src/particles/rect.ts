import { Canvas } from '../utils/canvas.js';
import { Draw } from '../utils/draw.js';
import { degreeToPercentageAbs } from '../utils/rotation-utils.js';
import { Particle } from './base.js';
import { RectOptions } from './options/rect-options.js';

export class RectParticle extends Particle {
  private readonly _width: number;
  private readonly _height: number;
  private readonly _color: string;
  private readonly _borderColor?: string;
  private readonly _borderWidth: number;

  constructor(options: RectOptions) {
    super(options);
    this._width = options.width;
    this._height = options.height;
    this._color = options.color;
    this._borderColor = options.borderColor;
    this._borderWidth = options.borderWidth ?? 2;
  }

  public static draw(options: RectOptions) {
    const particle = new RectParticle(options);
    Draw.addParticle(particle);
  }

  protected drawInternal(): void {
    Canvas.ctx.beginPath();
    Canvas.ctx.save();
    Canvas.ctx.translate(this._x, this._y);
    Canvas.ctx.rotate((Math.PI / 180) * this._rZ);

    Canvas.ctx.beginPath();
    Canvas.ctx.rect(
      (-this._width * degreeToPercentageAbs(this._rY)) / 2,
      (-this._height * degreeToPercentageAbs(this._rX)) / 2,
      this._width * degreeToPercentageAbs(this._rY),
      this._height * degreeToPercentageAbs(this._rX)
    );
    Canvas.ctx.fillStyle = this._color;
    Canvas.ctx.fill();
    if (this._borderColor) {
      Canvas.ctx.lineWidth = this._borderWidth;
      Canvas.ctx.strokeStyle = this._borderColor;
      Canvas.ctx.stroke();
    }
    Canvas.ctx.restore();
  }
}
