import { ParticleOptions } from '../../types/options.js';

export type RectOptions = ParticleOptions & {
  width: number;
  height: number;
  color: string;
  borderColor?: string;
  borderWidth?: number;
};
