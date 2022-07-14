import { XY } from './xy.js';

export type ParticleOptions = {
  x: number;
  y: number;
  rotationX?: number;
  rotationY?: number;
} & (ParticleXYOptions | ParticleAngleOptions | ParticleStaticOptions);

export type ParticleXYOptions = {
  movement: 'xy';
} & ParticleXYOptionsRequired &
  Partial<ParticleXYOptionsOptional>;
export type ParticleXYOptionsRequired = {};
export type ParticleXYOptionsOptional = {
  velocityX: number;
  velocityY: number;
  gravity: number | XY;
};
export type ParticleXYOptionsFull = ParticleXYOptionsRequired & ParticleXYOptionsOptional;

export type ParticleAngleOptions = {
  movement: 'angle';
} & ParticleAngleOptionsRequired &
  Partial<ParticleAngleOptionsOptional>;
export type ParticleAngleOptionsRequired = {
  angle: number;
  velocity: number;
};
export type ParticleAngleOptionsOptional = {
  acceleration: number;
  minVelocity?: number;
  maxVelocity?: number;
};
export type ParticleAngleOptionsFull = ParticleAngleOptionsRequired & ParticleAngleOptionsOptional;

export type ParticleStaticOptions = {
  movement: never;
};
