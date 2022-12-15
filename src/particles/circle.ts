import { DimensionWithLimits } from '../types/dimension-with-limits.js';
import { X } from '../types/x.js';
import { Canvas } from '../utils/canvas.js';
import { Draw } from '../utils/draw.js';
import { degreeToPercentageAbs } from '../utils/rotation-utils.js';
import { Particle } from './base.js';
import { CircleOptions } from './options/circle-options.js';

export class CircleParticle extends Particle {
  private readonly _radius: DimensionWithLimits<X>;
  private readonly _color: string;
  private readonly _borderColor?: string;
  private readonly _borderWidth: number;
  private readonly _growth: DimensionWithLimits<X>;
  private readonly _growthAcceleration: number;

  constructor(options: CircleOptions) {
    super(options);
    this._radius = {
      x: typeof options.radius === 'number' ? options.radius : options.radius.x,
      min: typeof options.radius === 'number' ? undefined : options.radius.min,
      max: typeof options.radius === 'number' ? undefined : options.radius.max
    };
    this._color = options.color;
    this._borderColor = options.borderColor;
    this._borderWidth = options.borderWidth ?? 2;
    this._growth = options.growthVelocity ?? { x: 0 };
    this._growthAcceleration = options.growthAcceleration ?? 0;
  }

  public static draw(options: CircleOptions) {
    const particle = new CircleParticle(options);
    Draw.addParticle(particle);
  }

  protected drawInternal(normalizer: number): void {
    this.adjustRadius(normalizer);

    Canvas.ctx.beginPath();
    Canvas.ctx.ellipse(
      this._state.position.x,
      this._state.position.y,
      this._radius.x * degreeToPercentageAbs(this._state.rotation.value.y),
      this._radius.x * degreeToPercentageAbs(this._state.rotation.value.x),
      0,
      0,
      2 * Math.PI
    );
    Canvas.ctx.fillStyle = this._color;
    Canvas.ctx.fill();
    if (this._borderColor) {
      Canvas.ctx.lineWidth = this._borderWidth;
      Canvas.ctx.strokeStyle = this._borderColor;
      Canvas.ctx.stroke();
    }
  }

  private adjustRadius(normalizer: number) {
    this._growth.x += this._growthAcceleration * normalizer;
    this.findAndApplyDimensionalLimits(this._growth);
    this._radius.x += this._growth.x * normalizer;
    this.findAndApplyDimensionalLimits(this._radius);
  }
}
