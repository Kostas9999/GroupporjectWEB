import { useLoader } from "@react-three/fiber";
import React from "react";

import { TextureLoader } from "three/src/loaders/TextureLoader";
import texture from "./bg.jpg";

export default function Box() {
  colorMap = useLoader(TextureLoader, texture);
  return (
    <mesh rotation={[90, 0, 20]}>
      <boxBufferGeometry attach="geometry" args={[3, 3, 3]} />
      <meshNormalMaterial attach="material" color={"blue"} />
    </mesh>
  );
}
