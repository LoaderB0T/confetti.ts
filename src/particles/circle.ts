import { Canvas } from '../utils/canvas.js';
import { Draw } from '../utils/draw.js';
import { Particle } from './base.js';
import { CircleOptions } from './options/circle-options.js';

export class CircleParticle extends Particle {
  private readonly _radius: number;
  private readonly _color: string;
  private readonly _borderColor?: string;
  private readonly _borderWidth: number;

  constructor(options: CircleOptions) {
    super(options);
    this._radius = options.radius;
    this._color = options.color;
    this._borderColor = options.borderColor;
    this._borderWidth = options.borderWidth ?? 2;
  }

  public static draw(options: CircleOptions) {
    const particle = new CircleParticle(options);
    Draw.addParticle(particle);
  }

  protected drawInternal(normalizer: number): void {
    Canvas.ctx.beginPath();
    Canvas.ctx.ellipse(this._x, this._y, this._radius, this._radius, 0, 0, 2 * Math.PI);
    Canvas.ctx.fillStyle = this._color;
    Canvas.ctx.fill();
    if (this._borderColor) {
      Canvas.ctx.lineWidth = this._borderWidth;
      Canvas.ctx.strokeStyle = this._borderColor;
      Canvas.ctx.stroke();
    }
  }
}
