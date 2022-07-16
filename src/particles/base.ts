import { AppliedParticleOptions } from '../types/applied-options.js';
import { ParticleOptions } from '../types/options.js';
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
      movementAngle: {
        acceleration: options.movementAngle?.acceleration ?? 0,
        angle: options.movementAngle?.angle ?? 0,
        minVelocity: options.movementAngle?.minVelocity,
        maxVelocity: options.movementAngle?.maxVelocity,
        velocity: options.movementAngle?.velocity ?? 0
      },
      movementXY: {
        gravity: options.movementXY?.gravity ?? 0,
        velocityX: options.movementXY?.velocityX ?? 0,
        velocityY: options.movementXY?.velocityY ?? 0
      },
      rotation: {
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
      }
    };

    this._spawnTime = Date.now();
    this._lastDrawTime = Date.now();
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
    if (typeof this._state.movementXY.gravity === 'number') {
      this._state.movementXY.velocityY += normalizer * this._state.movementXY.gravity;
    } else {
      this._state.movementXY.velocityX += normalizer * this._state.movementXY.gravity.x;
      this._state.movementXY.velocityY += normalizer * this._state.movementXY.gravity.y;
    }
    this._state.x += normalizer * this._state.movementXY.velocityX;
    this._state.y += normalizer * this._state.movementXY.velocityY;

    // Angle
    this._state.movementAngle.velocity += normalizer * this._state.movementAngle.acceleration;
    if (
      this._state.movementAngle.minVelocity !== undefined &&
      this._state.movementAngle.velocity < this._state.movementAngle.minVelocity
    ) {
      this._state.movementAngle.velocity = this._state.movementAngle.minVelocity;
    }
    if (
      this._state.movementAngle.maxVelocity !== undefined &&
      this._state.movementAngle.velocity > this._state.movementAngle.maxVelocity
    ) {
      this._state.movementAngle.velocity = this._state.movementAngle.maxVelocity;
    }

    const angle = degreeToRadix(this._state.movementAngle.angle);

    const deltaX = Math.cos(angle) * this._state.movementAngle.velocity * normalizer;
    const deltaY = Math.sin(angle) * this._state.movementAngle.velocity * normalizer;
    this._state.x += deltaX;
    this._state.y += deltaY;
  }

  private rotate(normalizer: number): void {
    this._state.rotation.velocity.x += normalizer * this._state.rotation.acceleration.x;
    this._state.rotation.velocity.y += normalizer * this._state.rotation.acceleration.y;
    this._state.rotation.velocity.z += normalizer * this._state.rotation.acceleration.z;

    this.findAndApplyRotationLimits();

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

  private findAndApplyRotationLimits() {
    const minX =
      typeof this._state.rotation.velocity.min === 'number'
        ? this._state.rotation.velocity.min
        : this._state.rotation.velocity.min?.x;
    const minY =
      typeof this._state.rotation.velocity.min === 'number'
        ? this._state.rotation.velocity.min
        : this._state.rotation.velocity.min?.y;
    const minZ =
      typeof this._state.rotation.velocity.min === 'number'
        ? this._state.rotation.velocity.min
        : this._state.rotation.velocity.min?.z;
    const maxX =
      typeof this._state.rotation.velocity.max === 'number'
        ? this._state.rotation.velocity.max
        : this._state.rotation.velocity.max?.x;
    const maxY =
      typeof this._state.rotation.velocity.max === 'number'
        ? this._state.rotation.velocity.max
        : this._state.rotation.velocity.max?.y;
    const maxZ =
      typeof this._state.rotation.velocity.max === 'number'
        ? this._state.rotation.velocity.max
        : this._state.rotation.velocity.max?.z;

    this.applyRotationLimits(minX, minY, minZ, maxX, maxY, maxZ);
  }

  private applyRotationLimits(minX?: number, minY?: number, minZ?: number, maxX?: number, maxY?: number, maxZ?: number) {
    if (minX !== undefined && this._state.rotation.velocity.x < minX) {
      this._state.rotation.velocity.x = minX;
    }
    if (minY !== undefined && this._state.rotation.velocity.y < minY) {
      this._state.rotation.velocity.y = minY;
    }
    if (minZ !== undefined && this._state.rotation.velocity.z < minZ) {
      this._state.rotation.velocity.z = minZ;
    }
    if (maxX !== undefined && this._state.rotation.velocity.x > maxX) {
      this._state.rotation.velocity.x = maxX;
    }
    if (maxY !== undefined && this._state.rotation.velocity.y > maxY) {
      this._state.rotation.velocity.y = maxY;
    }
    if (maxZ !== undefined && this._state.rotation.velocity.z > maxZ) {
      this._state.rotation.velocity.z = maxZ;
    }
  }

  public get tooOld(): boolean {
    return Date.now() - this._spawnTime > this._state.lifeTime;
  }
}
