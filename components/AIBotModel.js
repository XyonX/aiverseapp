import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  // Rotate the model slowly for visual effect
  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });

  return <primitive object={scene} ref={ref} />;
}

export default function AIBotModel() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{ height: "100%", width: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Model url="/models/ai-bot.glb" />
      <OrbitControls />
    </Canvas>
  );
}
