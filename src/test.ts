import { CircleParticle } from './particles/circle.js';
import { RectParticle } from './particles/rect.js';

CircleParticle.draw({
  x: 300,
  y: 300,
  radius: 10,
  color: 'red',
  movementAngle: {
    angle: 90,
    velocity: -5,
    acceleration: 0.1
  }
});

// for (let i = 0; i < 5; i++) {
//   CircleParticle.draw({
//     x: 200,
//     y: 300,
//     radius: 10,
//     color: 'blue',
//     movenentXY: {
//       velocityX: Math.random() - 0.5,
//       velocityY: -(Math.random() * 2 + 5),
//       gravity: 0.1
//     },
//     rotation: {
//       velocity: {
//         y: 4
//       }
//     }
//   });
// }

// RectParticle.draw({
//   x: 400,
//   y: 300,
//   width: 20,
//   height: 10,
//   color: 'green',
//   movenentXY: {
//     gravity: 0.1,
//     velocityX: Math.random() - 0.5,
//     velocityY: -(Math.random() * 2 + 5)
//   },
//   rotation: {
//     velocity: {
//       x: 3,
//       z: 3
//     }
//   }
// });

for (let i = 0; i < 15; i++) {
  RectParticle.draw({
    x: 400,
    y: 400,
    width: 15,
    height: 8,
    color: 'blue',
    movementAngle: {
      angle: Math.random() * 360,
      velocity: 2,
      acceleration: -0.01,
      minVelocity: 0
    },
    rotation: {
      switchDirection: Math.random() > 0.5,
      value: {
        x: Math.random() * 360,
        z: Math.random() * 360
      },
      velocity: {
        x: 4,
        z: 3,
        min: 0
      },
      acceleration: {
        x: -0.01 - Math.random() * 0.03,
        z: -0.01 - Math.random() * 0.03
      }
    }
  });
}
