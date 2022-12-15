import { CircleParticle } from './particles/circle.js';
import { RectParticle } from './particles/rect.js';

CircleParticle.draw({
  position: {
    x: 50,
    y: 300
  },
  radius: 20,
  color: 'red'
});

// Moving example
CircleParticle.draw({
  position: {
    x: 100,
    y: 300
  },
  radius: 20,
  color: 'red',
  movementXY: {
    velocity: {
      y: 0.5 // Slowly moved down
    }
  }
});

// Accelerating example
CircleParticle.draw({
  position: {
    x: 150,
    y: 300
  },
  radius: 20,
  color: 'red',
  movementXY: {
    velocity: {
      y: -7, // Moved upwards initially
      x: 1 // Slightly moves right all the time
    },
    acceleration: {
      y: 0.1 // But then "gravity" pulls it down
    }
  }
});

// Example with angled movement
CircleParticle.draw({
  position: {
    x: 200,
    y: 300
  },
  radius: 20,
  color: 'red',
  movementAngle: {
    angle: 35,
    velocity: {
      x: 1
    },
    acceleration: 0.05
  }
});

// Example with rotation
RectParticle.draw({
  position: {
    x: 250,
    y: 300
  },
  width: 20,
  height: 10,
  color: 'magenta',
  rotation: {
    velocity: {
      x: 3,
      z: 4
    }
  }
});

CircleParticle.draw({
  position: {
    x: 200,
    y: 300,
    max: 300
  },
  radius: {
    x: 15,
    min: 1
  },
  color: 'red',
  movementAngle: {
    angle: 90,
    velocity: {
      x: -5
    },
    acceleration: 0.1
  },
  growthVelocity: {
    x: -0.01,
    min: -0.2
  },
  growthAcceleration: -0.01
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
//   movementXY: {
//     velocity: {
//       x: 2,
//       y: -4,
//       max: {
//         y: 1
//       }
//     },
//     acceleration: {
//       y: 0.1
//     }
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
    position: {
      x: 400,
      y: 400
    },
    width: 15,
    height: 8,
    color: 'blue',
    movementAngle: {
      angle: Math.random() * 360,
      velocity: {
        x: 2,
        min: 0
      },
      acceleration: -0.01
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
