import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";

import { useControls } from "../hooks/use-controls";

interface FishProps {
  position: [number, number, number];
}

const Fish = ({ position }: FishProps) => {
  const meshRef = useRef<Mesh>(null);
  const { moveForward, moveBackward, turnLeft, turnRight, moveUp, moveDown } = useControls();
  const velocity = useRef(new Vector3(0, 0, 0));
  const speed = 0.05;
  const turnSpeed = 0.03;

  useFrame(() => {
    if (!meshRef.current) return;

    // Apply movement
    if (moveForward) velocity.current.z = -speed;
    else if (moveBackward) velocity.current.z = speed;
    else velocity.current.z *= 0.9; // Deceleration

    if (turnLeft) meshRef.current.rotation.y += turnSpeed;
    if (turnRight) meshRef.current.rotation.y -= turnSpeed;

    if (moveUp) velocity.current.y = speed;
    else if (moveDown) velocity.current.y = -speed;
    else velocity.current.y *= 0.9; // Deceleration

    // Apply velocity
    meshRef.current.position.x += Math.sin(meshRef.current.rotation.y) * -velocity.current.z;
    meshRef.current.position.z += Math.cos(meshRef.current.rotation.y) * velocity.current.z;
    meshRef.current.position.y += velocity.current.y;

    // Animate tail movement
    meshRef.current.children[1].rotation.y = Math.sin(Date.now() * 0.008) * 0.2;
  });

  return (
    <group position={position} ref={meshRef}>
      {/* Basic fish body */}
      <mesh castShadow>
        <sphereGeometry args={[1, 0.5, 2]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Fish tail */}
      <mesh position={[-1.5, 0, 0]} castShadow>
        <coneGeometry args={[0.5, 2, 2]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Fish fins */}
      <mesh position={[0, 0.5, 0.8]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.2, 0.8, 0.1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[0, 0.5, -0.8]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.2, 0.8, 0.1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </group>
  );
};

export default Fish;
