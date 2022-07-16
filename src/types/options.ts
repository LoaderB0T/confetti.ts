import { MinMax } from './minmax.js';
import { XY } from './xy.js';
import { XYZ } from './xyz.js';

export type ParticleOptions = {
  x: number;
  y: number;
  rotation?: ParticleRotationOptions;
  lifeTime?: number;
  movementXY?: ParticleXYOptions;
  movementAngle?: ParticleAngleOptions;
};

export type ParticleRotationOptions = {
  value?: Partial<XYZ>;
  velocity?: Partial<XYZ> & Partial<MinMax>;
  acceleration?: Partial<XYZ>;
  switchDirection?: boolean;
};

export type ParticleXYOptions = {
  velocityX?: number;
  velocityY?: number;
  gravity?: number | XY;
};

export type ParticleAngleOptions = {
  angle: number;
  velocity: number;
  acceleration?: number;
  minVelocity?: number;
  maxVelocity?: number;
};
