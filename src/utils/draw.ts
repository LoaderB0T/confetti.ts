import { Particle } from '../particles/base.js';
import { Canvas } from './canvas.js';

export class Draw {
  private static _initialized: boolean = false;
  private static readonly _activeParticles: Particle[] = [];

  public static init() {
    if (!this._initialized) {
      this._initialized = true;
      window.requestAnimationFrame(() => this.draw());
    }
  }

  public static addParticle(particle: Particle) {
    this.init();
    this._activeParticles.push(particle);
  }

  private static draw() {
    Canvas.init();
    if (!Canvas.ctx) {
      throw new Error('Canvas is not initialized');
    }

    this._activeParticles.forEach(particle => particle.draw());

    window.requestAnimationFrame(() => this.draw());
  }
}
