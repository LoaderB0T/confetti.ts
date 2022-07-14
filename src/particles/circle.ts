import { Canvas } from '../utils/canvas.js';
import { Draw } from '../utils/draw.js';
import { Particle } from './base.js';

export class CircleParticle extends Particle {
  private readonly _radius: number;
  private readonly _color: string;

  constructor(x: number, y: number, radius: number, color: string) {
    super(x, y, 0, 0, 0, 0);
    this._radius = radius;
    this._color = color;
  }

  public static draw(x: number, y: number, radius: number, color: string) {
    const particle = new CircleParticle(x, y, radius, color);
    Draw.addParticle(particle);
  }

  protected drawInternal(): void {
    Canvas.ctx.beginPath();
    Canvas.ctx.ellipse(this._x, this._y, this._radius, this._radius, 0, 0, 2 * Math.PI);
    Canvas.ctx.fillStyle = this._color;
    Canvas.ctx.fill();
    Canvas.ctx.lineWidth = 2;
    Canvas.ctx.strokeStyle = this._color;
    Canvas.ctx.stroke();
  }
}
