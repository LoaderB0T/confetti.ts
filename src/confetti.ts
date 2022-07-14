import { ConfettiOptions } from './types/options';

export class Confetti {
  private readonly _options: ConfettiOptions;

  constructor(options: ConfettiOptions) {
    this._options = options;
  }
}
