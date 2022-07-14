import { ParticleAngleOptionsFull, ParticleOptions, ParticleXYOptionsFull } from '../types/options.js';
import { bounds } from '../utils/bounds.js';
import { degreeToRadix } from '../utils/rotation-utils.js';

export abstract class Particle {
  protected _x: number;
  protected _y: number;
  protected _rX: number = 0;
  protected _rY: number = 0;
  protected _rZ: number = 0;
  protected _lastDrawTime: number;

  private readonly _spawnTime: number;
  private readonly _rotationX: number = 0;
  private readonly _rotationY: number = 0;
  private readonly _rotationZ: number = 0;
  protected readonly _optionsXY?: ParticleXYOptionsFull;
  protected readonly _optionsAngle?: ParticleAngleOptionsFull;

  constructor(options: ParticleOptions) {
    this._x = options.x;
    this._y = options.y;
    this._rotationX = options.rotationX ?? 0;
    this._rotationY = options.rotationY ?? 0;
    this._rotationZ = options.rotationZ ?? 0;
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
    this.rotate(normalizer);

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

      const angle = degreeToRadix(this._optionsAngle.angle);

      const deltaX = Math.cos(angle) * this._optionsAngle.velocity;
      const deltaY = Math.sin(angle) * this._optionsAngle.velocity;
      this._x += deltaX;
      this._y += deltaY;
    }
  }

  private rotate(normalizer: number): void {
    this._rX += normalizer * this._rotationX;
    this._rY += normalizer * this._rotationY;
    this._rZ += normalizer * this._rotationZ;
    this._rX = bounds(this._rX, 0, 360);
    this._rY = bounds(this._rY, 0, 360);
    this._rZ = bounds(this._rZ, 0, 360);
  }

  public get tooOld(): boolean {
    return Date.now() - this._spawnTime > 5000;
  }
}
