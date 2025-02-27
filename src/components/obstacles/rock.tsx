interface RockProps {
  position: [number, number, number];
}

const Rock = ({ position }: RockProps) => {
  return (
    <mesh position={position} castShadow receiveShadow>
      <dodecahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial color="#777777" />
    </mesh>
  );
};

export default Rock;
