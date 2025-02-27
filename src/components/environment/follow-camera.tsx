import { useFrame, useThree } from "@react-three/fiber";
import { Group, Vector3 } from "three";

interface FollowCameraProps {
  fishRef: React.RefObject<Group | null>;
}

const FollowCamera = ({ fishRef }: FollowCameraProps) => {
  const { camera } = useThree();

  // Camera parameters
  const cameraHeight = 5;
  const cameraDistance = 15;
  const smoothFactor = 0.075; // Smoother camera (lower value)

  useFrame(() => {
    if (!fishRef.current) return;

    const fishPosition = fishRef.current.position;
    const fishRotation = fishRef.current.rotation;

    // Calculate vector that represents the fish's forward direction
    // With our fish model, the fish faces along the positive X axis
    // And rotation.y affects its turning direction
    const forwardX = Math.cos(fishRotation.y);
    const forwardZ = -Math.sin(fishRotation.y);

    // Position camera behind the fish (opposite of forward direction)
    // and slightly above
    const targetPosition = new Vector3(
      fishPosition.x - forwardX * cameraDistance,
      fishPosition.y + cameraHeight,
      fishPosition.z - forwardZ * cameraDistance,
    );

    // Smooth camera movement
    camera.position.lerp(targetPosition, smoothFactor);

    // Look at the fish's position
    camera.lookAt(fishPosition);
  });

  return null;
};

export default FollowCamera;
