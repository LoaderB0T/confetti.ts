import { ParticleOptions } from '../types/options.js';
import { XY } from '../types/xy.js';

export abstract class Particle {
  protected _x: number;
  protected _y: number;
  protected _lastDrawTime: number;
  protected _spawnTime: number;
  protected _velocityX: number;
  protected _velocityY: number;
  protected _gravity: number | XY;

  constructor(options: ParticleOptions) {
    this._x = options.x;
    this._y = options.y;
    this._spawnTime = Date.now();
    this._lastDrawTime = Date.now();
    this._velocityX = options.velocityX ?? 0;
    this._velocityY = options.velocityY ?? 0;
    this._gravity = options.gravity ?? 0.05;
  }

  protected abstract drawInternal(normalizer: number): void;

  private getNormalizer(timeDelta: number): number {
    return timeDelta / 10;
  }

  // @internal
  public draw(): void {
    const timeDelta = Date.now() - this._lastDrawTime;
    const normalizer = this.getNormalizer(timeDelta);
    if (typeof this._gravity === 'number') {
      this._velocityY += normalizer * this._gravity;
    } else {
      this._velocityX += normalizer * this._gravity.x;
      this._velocityY += normalizer * this._gravity.y;
    }
    this._x += this._velocityX;
    this._y += this._velocityY;
    this.drawInternal(normalizer);
    this._lastDrawTime = Date.now();
  }

  public get tooOld(): boolean {
    return Date.now() - this._spawnTime > 5000;
  }
}
