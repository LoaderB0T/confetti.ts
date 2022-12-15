import {
  AppliedParticleAngleOptions,
  AppliedParticleOptions,
  AppliedParticleRotationOptions,
  AppliedParticleXYOptions
} from '../types/applied-options.js';
import { Dimensions } from '../types/dimensions.js';
import { ParticleOptions } from '../types/options.js';
import { DimensionWithLimits } from '../types/dimension-with-limits.js';
import { XYZ } from '../types/xyz.js';
import { bounds } from '../utils/bounds.js';
import { degreeToRadix } from '../utils/rotation-utils.js';

export abstract class Particle {
  protected _state: AppliedParticleOptions;
  protected _lastDrawTime: number;

  private readonly _spawnTime: number;

  constructor(options: ParticleOptions) {
    this._state = {
      x: options.x,
      y: options.y,
      lifeTime: options.lifeTime ?? 5000,
      movementAngle: this.getMovementAngleOptions(options),
      movementXY: this.getMovementXyOptions(options),
      rotation: this.getRotationOptions(options)
    };

    this._spawnTime = Date.now();
    this._lastDrawTime = Date.now();
  }

  private getRotationOptions(options: ParticleOptions): AppliedParticleRotationOptions {
    return {
      switchDirection: options.rotation?.switchDirection ?? false,
      value: {
        x: options.rotation?.value?.x ?? 0,
        y: options.rotation?.value?.y ?? 0,
        z: options.rotation?.value?.z ?? 0
      },
      velocity: {
        x: options.rotation?.velocity?.x ?? 0,
        y: options.rotation?.velocity?.y ?? 0,
        z: options.rotation?.velocity?.z ?? 0,
        min: options.rotation?.velocity?.min,
        max: options.rotation?.velocity?.max
      },
      acceleration: {
        x: options.rotation?.acceleration?.x ?? 0,
        y: options.rotation?.acceleration?.y ?? 0,
        z: options.rotation?.acceleration?.z ?? 0
      }
    };
  }

  private getMovementXyOptions(options: ParticleOptions): AppliedParticleXYOptions {
    return {
      acceleration: {
        x: options.movementXY?.acceleration?.x ?? 0,
        y: options.movementXY?.acceleration?.y ?? 0
      },
      velocity: {
        x: options.movementXY?.velocity?.x ?? 0,
        y: options.movementXY?.velocity?.y ?? 0,
        min: options.movementXY?.velocity?.min,
        max: options.movementXY?.velocity?.max
      }
    };
  }

  private getMovementAngleOptions(options: ParticleOptions): AppliedParticleAngleOptions {
    return {
      acceleration: options.movementAngle?.acceleration ?? 0,
      angle: options.movementAngle?.angle ?? 0,
      velocity: {
        x: options.movementAngle?.velocity?.x ?? 0,
        min: options.movementAngle?.velocity?.min,
        max: options.movementAngle?.velocity?.max
      }
    };
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
    // XY
    if (typeof this._state.movementXY.acceleration.x === 'number') {
      this._state.movementXY.velocity.x += normalizer * this._state.movementXY.acceleration.x;
    }
    if (typeof this._state.movementXY.acceleration.y === 'number') {
      this._state.movementXY.velocity.y += normalizer * this._state.movementXY.acceleration.y;
    }

    this.findAndApplyVelocityLimits(this._state.movementXY.velocity);

    this._state.x += normalizer * this._state.movementXY.velocity.x;
    this._state.y += normalizer * this._state.movementXY.velocity.y;

    // Angle
    this._state.movementAngle.velocity.x += normalizer * this._state.movementAngle.acceleration;
    this.findAndApplyVelocityLimits(this._state.movementAngle.velocity);

    const angle = degreeToRadix(this._state.movementAngle.angle);

    const deltaX = Math.cos(angle) * this._state.movementAngle.velocity.x * normalizer;
    const deltaY = Math.sin(angle) * this._state.movementAngle.velocity.x * normalizer;
    this._state.x += deltaX;
    this._state.y += deltaY;
  }

  private findSingularLimit<D extends Dimensions>(
    limit: Partial<D> | number | undefined,
    coord: 'x' | 'y' | 'z'
  ): number | undefined {
    if (limit === undefined) {
      return undefined;
    }
    if (typeof limit === 'number') {
      return limit;
    }
    const xyzLimit = limit as unknown as XYZ;
    return typeof xyzLimit[coord] === 'number' ? xyzLimit[coord] : undefined;
  }

  private findAndApplySingularLimit<D extends Dimensions>(
    velocityObj: DimensionWithLimits<D>,
    minOrMax: 'min' | 'max',
    coord: 'x' | 'y' | 'z'
  ): void {
    const limit = velocityObj[minOrMax];
    const appliedLimit = this.findSingularLimit(limit, coord);
    const comparsion = minOrMax === 'min' ? (a: number, b: number) => a < b : (a: number, b: number) => a > b;
    if (appliedLimit !== undefined) {
      const velocityVal = velocityObj as XYZ;
      if (velocityVal[coord] !== undefined && comparsion(velocityVal[coord], appliedLimit)) {
        velocityVal[coord] = appliedLimit;
      }
    }
  }

  private findAndApplyVelocityLimits<D extends Dimensions>(velocityObj: DimensionWithLimits<D>) {
    this.findAndApplySingularLimit(velocityObj, 'min', 'x');
    this.findAndApplySingularLimit(velocityObj, 'min', 'y');
    this.findAndApplySingularLimit(velocityObj, 'min', 'z');
    this.findAndApplySingularLimit(velocityObj, 'max', 'x');
    this.findAndApplySingularLimit(velocityObj, 'max', 'y');
    this.findAndApplySingularLimit(velocityObj, 'max', 'z');
  }

  private rotate(normalizer: number): void {
    this._state.rotation.velocity.x += normalizer * this._state.rotation.acceleration.x;
    this._state.rotation.velocity.y += normalizer * this._state.rotation.acceleration.y;
    this._state.rotation.velocity.z += normalizer * this._state.rotation.acceleration.z;

    this.findAndApplyVelocityLimits(this._state.rotation.velocity);

    this._state.rotation.value.x +=
      normalizer * this._state.rotation.velocity.x * (this._state.rotation.switchDirection ? -1 : 1);
    this._state.rotation.value.y +=
      normalizer * this._state.rotation.velocity.y * (this._state.rotation.switchDirection ? -1 : 1);
    this._state.rotation.value.z +=
      normalizer * this._state.rotation.velocity.z * (this._state.rotation.switchDirection ? -1 : 1);
    this._state.rotation.value.x = bounds(this._state.rotation.value.x, 0, 360);
    this._state.rotation.value.y = bounds(this._state.rotation.value.y, 0, 360);
    this._state.rotation.value.z = bounds(this._state.rotation.value.z, 0, 360);
  }

  public get tooOld(): boolean {
    return Date.now() - this._spawnTime > this._state.lifeTime;
  }
}
