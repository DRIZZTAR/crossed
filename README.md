<div align="center">

![GitHub stars](https://img.shields.io/github/stars/jgcarrillo/react-fp-movement)
![GitHub issues](https://img.shields.io/github/issues/jgcarrillo/react-fp-movement)
![GitHub forks](https://img.shields.io/github/forks/jgcarrillo/react-fp-movement)
![GitHub PRs](https://img.shields.io/github/issues-pr/jgcarrillo/react-fp-movement)

</div>

## Table of contents 👇

- [✨ Motivation](#-motivation)
- [🚩 Technologies](#-technologies)
- [🕸️ Project Structure](#-project-structure)
- [🚀 Basic Explanation](#-basic-explanation)
- [🌎 Contact](#-contact)

## 🚩 Technologies

The tecnologies that I have been using to create this projects are:

| Library            | Documentation                                               | Purpose                        |
| ------------------ | ----------------------------------------------------------- | ------------------------------ |
| React Three Fiber  | [See the docs](https://github.com/pmndrs/react-three-fiber) | The core library with Three.js |
| React Three Drei   | [See the docs](https://github.com/pmndrs/drei)              | Some useful helpers            |
| React Three Cannon | [See the docs](https://github.com/pmndrs/use-cannon)        | Physics library                |

## 🕸️ Project Structure

I have been using this structure for all my R3F projects since so long but feel free to modify it.

```
src
│
└───components
│       Floor.js
│       Lights.js
│       ThreeModel.js
│
└───ui
│       BaseBox.js
│       BaseCharacter.js
│       BaseScene.js
│
└───utils
│       helpers.js
│
```

- **Components folder**: This is where I put all my standalone components such as Lights, Floor (because in my examples I only have one) and models (gLTF).
- **UI folder**: In this folder I put all the UI components such as buttons, headers or in this case the base character configuration or even a generic scene.
- **Utils folder**: This folder contains a JavaScript file with some functions that I may need to use in different parts of the application.

## 🚀 Basic Explanation

There are a lot of concepts here, but to create a **First Person Movement** you only need to set up some of them. For more information I encourage you to consult the documentation of the library.

First of all you need to declare the `<PointerLockControls />` inside your **Canvas**. As you can see in the [official Three.js documentation](https://threejs.org/docs/#examples/en/controls/PointerLockControls), this component allow you to create a First Person 3D game movement with your mouse.

```js
// BaseScene.js
import { Canvas } from '@react-three/fiber';
import { Loader, PointerLockControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import Lights from '../components/Lights.js';
import Floor from '../components/Floor.js';

const BasicScene = ({ children }) => {
  return (
    <div>
      <Canvas shadows camera={{ fov: 50 }}>
        <Lights />
        <Physics gravity={[0, -9.8, 0]}>
          {children}

          <Floor rotation={[Math.PI / -2, 0, 0]} color="white" />
        </Physics>

        <PointerLockControls />
      </Canvas>
      <Loader />
    </div>
  );
};

export default BasicScene;
```

Okay, we are close enough. The next step is to go to `<BaseCharacter />`. I'm not going to explain every line in this file, the important thing to know is that you need to add the `useThree()` hook to access to the render, scene or even camera (for more info, [check the official documentation](https://docs.pmnd.rs/react-three-fiber/api/hooks#usethree)).

Once here, the next step is to set the **direction** and include the method `.applyEuler(camera.rotation);` to update the camera and set the character position at the same direction at the global camera.

```js
// BaseCharacter.js

import { useFrame, useThree } from '@react-three/fiber';

const { camera } = useThree();

// ...

ref.current.getWorldPosition(camera.position);
direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);
```
