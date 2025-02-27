import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";

interface OtherFishProps {
  position: [number, number, number];
}

const OtherFish = ({ position }: OtherFishProps) => {
  const fishRef = useRef<Group>(null);
  const direction = useRef(
    new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize(),
  );
  const speed = 0.02 + Math.random() * 0.02;

  useFrame(() => {
    if (!fishRef.current) return;

    // Simple movement pattern
    fishRef.current.position.x += direction.current.x * speed;
    fishRef.current.position.y += direction.current.y * speed;
    fishRef.current.position.z += direction.current.z * speed;

    // Change direction occasionally or at boundaries
    if (
      Math.random() < 0.005 ||
      Math.abs(fishRef.current.position.x) > 15 ||
      Math.abs(fishRef.current.position.y) > 5 ||
      Math.abs(fishRef.current.position.z) > 15
    ) {
      direction.current
        .set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
        .normalize();

      // Face swim direction
      fishRef.current.lookAt(
        fishRef.current.position.x + direction.current.x,
        fishRef.current.position.y + direction.current.y,
        fishRef.current.position.z + direction.current.z,
      );
    }

    // Animate tail
    fishRef.current.children[1].rotation.y = Math.sin(Date.now() * 0.01) * 0.3;
  });

  // Generate a random color for the fish
  const fishColor = `hsl(${Math.random() * 360}, 70%, 50%)`;

  return (
    <group ref={fishRef} position={position}>
      {/* Basic fish body */}
      <mesh castShadow>
        <sphereGeometry args={[0.5, 0.3, 1]} />
        <meshStandardMaterial color={fishColor} />
      </mesh>

      {/* Fish tail */}
      <mesh position={[-0.8, 0, 0]} castShadow>
        <coneGeometry args={[0.3, 1, 2]} />
        <meshStandardMaterial color={fishColor} />
      </mesh>
    </group>
  );
};

export default OtherFish;
