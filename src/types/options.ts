import { DimensionWithLimits } from './dimension-with-limits.js';
import { X } from './x.js';
import { XY } from './xy.js';
import { XYZ } from './xyz.js';

export type ParticleOptions = {
  /**
   * Particle position options.
   */
  position: ParticlePositionOptions;
  /**
   * Particle rotation options.
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

export type ParticlePositionOptions = DimensionWithLimits<XY>;

export type ParticleRotationOptions = {
  /**
   * Initial rotation in degrees
   */
  value?: Partial<XYZ>;
  /**
   * Rotation velocity & limits. Accepts negative values.
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
   * Initial velocity & limits. Accepts negative values.
   */
  velocity: Partial<DimensionWithLimits<XY>>;
  /**
   * Gravity. Accepts negative values.
   */
  acceleration?: Partial<XY>;
};

export type ParticleAngleOptions = {
  /**
   * Initial angle of movement in degrees
   */
  angle: number;
  /**
   * Initial velocity & limits. Accepts negative values.
   */
  velocity: Partial<DimensionWithLimits<X>>;
  /**
   * Particle acceleration. Accepts negative values.
   */
  acceleration?: number;
};
