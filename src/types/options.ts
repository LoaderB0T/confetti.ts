import { XY } from './xy.js';

export type ParticleOptions = {
  x: number;
  y: number;
  velocityX?: number;
  velocityY?: number;
  gravity?: number | XY;
  rotationX?: number;
  rotationY?: number;
};
