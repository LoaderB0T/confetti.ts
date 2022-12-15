import { DimensionWithLimits } from './dimension-with-limits.js';
import { X } from './x.js';
import { XY } from './xy.js';
import { XYZ } from './xyz.js';

export type AppliedParticleOptions = {
  position: AppliedParticlePositionOptions;
  rotation: AppliedParticleRotationOptions;
  lifeTime: number;
  movementXY: AppliedParticleXYOptions;
  movementAngle: AppliedParticleAngleOptions;
};

export type AppliedParticlePositionOptions = DimensionWithLimits<XY>;

export type AppliedParticleRotationOptions = {
  value: XYZ;
  velocity: DimensionWithLimits<XYZ>;
  acceleration: XYZ;
  switchDirection: boolean;
};

export type AppliedParticleXYOptions = {
  velocity: DimensionWithLimits<XY>;
  acceleration: Partial<XY>;
};

export type AppliedParticleAngleOptions = {
  angle: number;
  velocity: DimensionWithLimits<X>;
  acceleration: number;
};
