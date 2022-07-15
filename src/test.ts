import { CircleParticle } from './particles/circle.js';
import { RectParticle } from './particles/rect.js';

CircleParticle.draw({ x: 300, y: 300, radius: 10, color: 'red', movement: 'angle', angle: 90, velocity: -5, acceleration: 0.1 });

for (let i = 0; i < 5; i++) {
  CircleParticle.draw({
    x: 200,
    y: 300,
    radius: 10,
    color: 'blue',
    movement: 'xy',
    velocityX: Math.random() - 0.5,
    velocityY: -(Math.random() * 2 + 5),
    rotationY: 4,
    gravity: 0.1
  });
}

RectParticle.draw({
  x: 400,
  y: 200,
  width: 20,
  height: 10,
  color: 'green',
  movement: 'xy',
  velocityX: Math.random() - 0.5,
  velocityY: -(Math.random() * 2 + 5),
  rotationZ: 3,
  rotationX: 3,
  gravity: 0.1
});
