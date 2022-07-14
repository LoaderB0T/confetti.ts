import { ParticleAngleOptionsFull, ParticleOptions, ParticleXYOptionsFull } from '../types/options.js';

export abstract class Particle {
  protected _x: number;
  protected _y: number;
  protected _lastDrawTime: number;
  protected _spawnTime: number;
  protected _optionsXY?: ParticleXYOptionsFull;
  protected _optionsAngle?: ParticleAngleOptionsFull;

  constructor(options: ParticleOptions) {
    this._x = options.x;
    this._y = options.y;
    this._spawnTime = Date.now();
    this._lastDrawTime = Date.now();
    if (options.movement === 'xy') {
      this._optionsXY = {
        velocityX: options.velocityX ?? 0,
        velocityY: options.velocityY ?? 0,
        gravity: options.gravity ?? 0.05
      };
    } else if (options.movement === 'angle') {
      this._optionsAngle = {
        acceleration: options.acceleration ?? 0,
        angle: options.angle ?? 0,
        minVelocity: options.minVelocity,
        maxVelocity: options.maxVelocity,
        velocity: options.velocity ?? 0
      };
    }
  }

  protected abstract drawInternal(normalizer: number): void;

  private getNormalizer(timeDelta: number): number {
    return timeDelta / 10;
  }

  // @internal
  public draw(): void {
    const timeDelta = Date.now() - this._lastDrawTime;
    const normalizer = this.getNormalizer(timeDelta);
    this.move(normalizer);

    this.drawInternal(normalizer);
    this._lastDrawTime = Date.now();
  }

  private move(normalizer: number): void {
    if (this._optionsXY) {
      if (typeof this._optionsXY.gravity === 'number') {
        this._optionsXY.velocityY += normalizer * this._optionsXY.gravity;
      } else {
        this._optionsXY.velocityX += normalizer * this._optionsXY.gravity.x;
        this._optionsXY.velocityY += normalizer * this._optionsXY.gravity.y;
      }
      this._x += this._optionsXY.velocityX;
      this._y += this._optionsXY.velocityY;
    } else if (this._optionsAngle) {
      this._optionsAngle.velocity += normalizer * this._optionsAngle.acceleration;
      if (this._optionsAngle.minVelocity && this._optionsAngle.velocity < this._optionsAngle.minVelocity) {
        this._optionsAngle.velocity = this._optionsAngle.minVelocity;
      }
      if (this._optionsAngle.maxVelocity && this._optionsAngle.velocity > this._optionsAngle.maxVelocity) {
        this._optionsAngle.velocity = this._optionsAngle.maxVelocity;
      }

      const angle = (this._optionsAngle.angle / 180) * Math.PI;

      const deltaX = Math.cos(angle) * this._optionsAngle.velocity;
      const deltaY = Math.sin(angle) * this._optionsAngle.velocity;
      this._x += deltaX;
      this._y += deltaY;
    }
  }

  public get tooOld(): boolean {
    return Date.now() - this._spawnTime > 5000;
  }
}
