import { Dimensions } from './dimensions.js';

export type MinMax<Dim extends Dimensions> = {
  min: number | Partial<Dim>;
  max: number | Partial<Dim>;
};
