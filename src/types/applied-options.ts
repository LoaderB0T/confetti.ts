import { Velocity } from './velocity.js';
import { X } from './x.js';
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
  velocity: Velocity<XYZ>;
  acceleration: XYZ;
  switchDirection: boolean;
};

export type AppliedParticleXYOptions = {
  velocity: Velocity<XY>;
  acceleration: Partial<XY>;
};

export type AppliedParticleAngleOptions = {
  angle: number;
  velocity: Velocity<X>;
  acceleration: number;
};
