import { useEffect, useState } from "react";

export const useControls = () => {
  const [keys, setKeys] = useState({
    moveForward: false,
    moveBackward: false,
    turnLeft: false,
    turnRight: false,
    moveUp: false,
    moveDown: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowUp" || e.code === "KeyW")
        setKeys((keys) => ({ ...keys, moveForward: true }));
      if (e.code === "ArrowDown" || e.code === "KeyS")
        setKeys((keys) => ({ ...keys, moveBackward: true }));
      if (e.code === "ArrowLeft" || e.code === "KeyA")
        setKeys((keys) => ({ ...keys, turnLeft: true }));
      if (e.code === "ArrowRight" || e.code === "KeyD")
        setKeys((keys) => ({ ...keys, turnRight: true }));
      if (e.code === "Space") setKeys((keys) => ({ ...keys, moveUp: true }));
      if (e.code === "ShiftLeft") setKeys((keys) => ({ ...keys, moveDown: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowUp" || e.code === "KeyW")
        setKeys((keys) => ({ ...keys, moveForward: false }));
      if (e.code === "ArrowDown" || e.code === "KeyS")
        setKeys((keys) => ({ ...keys, moveBackward: false }));
      if (e.code === "ArrowLeft" || e.code === "KeyA")
        setKeys((keys) => ({ ...keys, turnLeft: false }));
      if (e.code === "ArrowRight" || e.code === "KeyD")
        setKeys((keys) => ({ ...keys, turnRight: false }));
      if (e.code === "Space") setKeys((keys) => ({ ...keys, moveUp: false }));
      if (e.code === "ShiftLeft") setKeys((keys) => ({ ...keys, moveDown: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keys;
};
