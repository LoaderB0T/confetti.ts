import { Dimensions } from './dimensions.js';
import { MinMax } from './minmax.js';

export type Velocity<D extends Dimensions> = D & Partial<MinMax<D>>;
