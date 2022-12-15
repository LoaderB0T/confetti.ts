import { Dimensions } from './dimensions.js';
import { MinMax } from './minmax.js';

export type DimensionWithLimits<D extends Dimensions> = D & Partial<MinMax<D>>;
