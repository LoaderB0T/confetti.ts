[![npm](https://img.shields.io/npm/v/confetti.ts?color=%2300d26a&style=for-the-badge)](https://www.npmjs.com/package/confetti.ts)
[![CI](https://img.shields.io/github/workflow/status/LoaderB0T/confetti.ts/CI/main?style=for-the-badge)](https://github.com/LoaderB0T/confetti.ts/actions/workflows/build.yml)
[![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/LoaderB0T_confetti.ts?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge)](https://sonarcloud.io/summary/new_code?id=LoaderB0T_confetti.ts)

# confetti.ts

Canvas Confetti in TypeScript!

## Motivation 💥

This small package provides some simple particle animations in TypeScript.

<!-- ## Example 🧮

<p align="center">
  <img src="readme/example.gif" height="350">
</p> -->

## Features 🔥

✅ Spawn particles on your website

✅ Control the size, color, rotation, velocity and acceleration of the particles

✅ Extendable particle shapes

✅ Framework independent

✅ ESM & CJS exports

✅ Zero dependencies

## Built With 🔧

- [TypeScript](https://www.typescriptlang.org/)

## Getting Started 🚀

```typescript
import { CircleParticle } from './particles/circle.js';

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
```

## Contributing 🧑🏻‍💻

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 🔑

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact 📧

Janik Schumacher - [@LoaderB0T](https://twitter.com/LoaderB0T) - [linkedin](https://www.linkedin.com/in/janikschumacher/)

Project Link: [https://github.com/LoaderB0T/confetti.ts](https://github.com/LoaderB0T/confetti.ts)
