import { ParticleOptions } from '../../types/options';

export type CircleOptions = ParticleOptions & {
  radius: number;
  color: string;
  borderColor?: string;
  borderWidth?: number;
};
