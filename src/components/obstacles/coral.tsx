interface CoralProps {
  position: [number, number, number];
}

const Coral = ({ position }: CoralProps) => {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.2, 3, 8]} />
        <meshStandardMaterial color="#ff6b81" />
      </mesh>
      <mesh position={[0.5, 1, 0]} castShadow>
        <sphereGeometry args={[0.7, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#ff6b81" />
      </mesh>
      <mesh position={[-0.5, 1.2, 0.3]} castShadow>
        <sphereGeometry args={[0.5, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#ff6b81" />
      </mesh>
    </group>
  );
};

export default Coral;
