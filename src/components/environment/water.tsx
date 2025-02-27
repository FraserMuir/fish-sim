import { useRef, useState } from "react";

import { useFrame } from "@react-three/fiber";
import { Clock, Mesh, ShaderMaterial } from "three";

const WaterEnvironment = () => {
  const [clock] = useState(new Clock());
  const waterRef = useRef<Mesh>(null);

  useFrame(() => {
    if (waterRef.current) {
      (waterRef.current.material as ShaderMaterial).uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <>
      {/* Simple ocean floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#3a7e9e" />
      </mesh>

      {/* Water effect - simplified version */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 3, 0]} ref={waterRef}>
        <planeGeometry args={[100, 100, 10, 10]} />
        <shaderMaterial
          transparent
          opacity={0.8}
          uniforms={{ time: { value: 0 } }}
          vertexShader={`
            uniform float time;
            varying vec2 vUv;
            void main() {
              vUv = uv;
              vec3 pos = position;
              pos.z += sin(pos.x * 0.3 + time) * 0.5;
              pos.z += sin(pos.y * 0.3 + time) * 0.5;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            void main() {
              gl_FragColor = vec4(0.1, 0.3, 0.7, 0.5);
            }
          `}
        />
      </mesh>
    </>
  );
};

export default WaterEnvironment;
