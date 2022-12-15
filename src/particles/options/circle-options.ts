import { DimensionWithLimits } from '../../types/dimension-with-limits.js';
import { ParticleOptions } from '../../types/options';
import { X } from '../../types/x.js';

export type CircleOptions = ParticleOptions & {
  radius: number | DimensionWithLimits<X>;
  color: string;
  borderColor?: string;
  borderWidth?: number;
  growthVelocity?: DimensionWithLimits<X>;
  growthAcceleration?: number;
};
