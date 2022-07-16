import { MinMax } from './minmax.js';
import { XY } from './xy.js';
import { XYZ } from './xyz.js';

export type AppliedParticleOptions = {
  x: number;
  y: number;
  rotation: AppliedParticleRotationOptions;
  lifeTime: number;
  movementXY: AppliedParticleXYOptions;
  movementAngle: AppliedParticleAngleOptions;
};

export type AppliedParticleRotationOptions = {
  value: XYZ;
  velocity: XYZ & Partial<MinMax>;
  acceleration: XYZ;
  switchDirection: boolean;
};

export type AppliedParticleXYOptions = {
  velocityX: number;
  velocityY: number;
  gravity: number | XY;
};

export type AppliedParticleAngleOptions = {
  angle: number;
  velocity: number;
  acceleration: number;
  minVelocity?: number;
  maxVelocity?: number;
};
