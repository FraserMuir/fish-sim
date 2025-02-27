import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";

import { useControls } from "../hooks/use-controls";

interface FishProps {
  position: [number, number, number];
  fishRef: React.RefObject<Group | null>;
}

const Fish = ({ position, fishRef }: FishProps) => {
  const { moveForward, moveBackward, turnLeft, turnRight, moveUp, moveDown } = useControls();
  const velocity = useRef(new Vector3(0, 0, 0));
  const speed = 0.05;
  const turnSpeed = 0.03;

  useFrame(() => {
    if (!fishRef.current) return;

    // Apply movement - now using x-axis for forward/backward since our fish faces along x-axis
    if (moveForward) velocity.current.x = speed;
    else if (moveBackward) velocity.current.x = -speed;
    else velocity.current.x *= 0.9; // Deceleration

    if (turnLeft) fishRef.current.rotation.y += turnSpeed;
    if (turnRight) fishRef.current.rotation.y -= turnSpeed;

    if (moveUp) velocity.current.y = speed;
    else if (moveDown) velocity.current.y = -speed;
    else velocity.current.y *= 0.9; // Deceleration

    // Apply velocity based on fish's rotation
    // Calculate forward direction based on fish's rotation
    const forwardX = Math.cos(fishRef.current.rotation.y);
    const forwardZ = -Math.sin(fishRef.current.rotation.y);

    // Move in the direction the fish is facing
    fishRef.current.position.x += forwardX * velocity.current.x;
    fishRef.current.position.z += forwardZ * velocity.current.x;
    fishRef.current.position.y += velocity.current.y;

    // Animate tail movement
    fishRef.current.children[1].rotation.y = Math.sin(Date.now() * 0.008) * 0.2;
  });

  return (
    <group position={position} ref={fishRef} rotation={[0, 0, 0]}>
      {/* Basic fish body - more elongated for better side profile */}
      <mesh castShadow>
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Fish tail - positioned at back of fish with better orientation */}
      <mesh position={[-2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <coneGeometry args={[0.7, 1.2, 2]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Fish dorsal fin - taller and more prominent */}
      <mesh position={[-0.2, 1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <coneGeometry args={[0.5, 1, 2]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Fish side fins - positioned better for side view */}
      <mesh position={[0, -0.3, 0.6]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.3]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[0, -0.3, -0.6]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.3]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Fish face/head detail */}
      <mesh position={[1, 0, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Fish eye - left side */}
      <mesh position={[1.2, 0.2, 0.2]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[1.3, 0.2, 0.2]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Fish eye - right side */}
      <mesh position={[1.2, 0.2, -0.2]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[1.3, 0.2, -0.2]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
};

export default Fish;
