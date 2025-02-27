import { Suspense, useRef } from "react";

import { Environment } from "@react-three/drei";
import { Group } from "three";

import FollowCamera from "./environment/follow-camera";
import WaterEnvironment from "./environment/water";
import Fish from "./fish";
import Coral from "./obstacles/coral";
import OtherFish from "./obstacles/other-fish";
import Rock from "./obstacles/rock";

const Scene = () => {
  // Create the shared ref for the fish using Group instead of Mesh
  const fishRef = useRef<Group>(null);

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Fish position={[0, 0, 0]} fishRef={fishRef} />
      <FollowCamera fishRef={fishRef} />
      <WaterEnvironment />
      {/* Obstacles */}
      <Coral position={[5, 0, 0]} />
      <Rock position={[-5, -2, 5]} />
      <OtherFish position={[7, 1, 3]} />
      <OtherFish position={[-3, 0, -5]} />
      <Environment preset="sunset" />
    </Suspense>
  );
};

export default Scene;
