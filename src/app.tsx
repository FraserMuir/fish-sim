import { Canvas } from "@react-three/fiber";

import Scene from "./components/scene";

function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 2, 10], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
