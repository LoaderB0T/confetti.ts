import { DimensionWithLimits } from './dimension-with-limits.js';
import { X } from './x.js';
import { XY } from './xy.js';
import { XYZ } from './xyz.js';

export type ParticleOptions = {
  /**
   * Initial x position of particle
   */
  x: number;
  /**
   * Initial y position of particle
   */
  y: number;
  /**
   * Particle rotation options
   */
  rotation?: ParticleRotationOptions;
  /**
   * Particle life time in milliseconds
   */
  lifeTime?: number;
  /**
   * Particle movement options based on X and Y axis. Can be combined with movementAngle.
   */
  movementXY?: ParticleXYOptions;
  /**
   * Particle movement options based on angle. Can be combined with movementXY.
   */
  movementAngle?: ParticleAngleOptions;
};

export type ParticleRotationOptions = {
  /**
   * Initial rotation in degrees
   */
  value?: Partial<XYZ>;
  /**
   * Rotation velocity. Accepts negative values.
   */
  velocity?: Partial<DimensionWithLimits<XYZ>>;
  /**
   * Rotation acceleration. Accepts negative values.
   */
  acceleration?: Partial<XYZ>;
  /**
   * Switch rotation direction when true
   */
  switchDirection?: boolean;
};

export type ParticleXYOptions = {
  /**
   * Initial velocity
   */
  velocity?: Partial<DimensionWithLimits<XY>>;
  /**
   * Gravity. Accepts values for X and Y axis & negative values.
   */
  acceleration?: Partial<XY>;
};

export type ParticleAngleOptions = {
  /**
   * Initial angle of movement in degrees
   */
  angle: number;
  /**
   * Initial velocity. Accepts negative values.
   */
  velocity: Partial<DimensionWithLimits<X>>;
  /**
   * Velocity acceleration. Accepts negative values.
   */
  acceleration?: number;
};
