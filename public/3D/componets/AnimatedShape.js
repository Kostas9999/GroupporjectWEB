import React from "react";

import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import texture from "three/src/textures/Source";

export default function AnimatedShape() {
  //colorMap = useLoader(TextureLoader, texture);
  return (
    <Sphere visible args={[1, 100, 200]} scale={1}>
      <MeshDistortMaterial
        color={"#8352fd"}
        attach="material"
        distort={0.7}
        speed={1}
        roughness={1}
      />
    </Sphere>
  );
}
