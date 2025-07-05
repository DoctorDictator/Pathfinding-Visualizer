// WrapperContext.js
import { createContext, useState } from "react";

// Create the context
export const WrapperContext = createContext();

// Create a provider component
export const Wrapper = ({ children }) => {
  const [bombNode, setbombNode] = useState(0);
  const [recursiveDivision, setRecursiveDivison] = useState(false);
  const [recursiveDivisionHorizontal, setRecursiveDivisonHorizontal] =
    useState(false);
  const [recursiveDivisionVertical, setRecursiveDivisonVertical] =
    useState(false);
  const [randomMaze, setRandomMaze] = useState(false);
  const [randomMazeWithWights, setRandomMazeWithWeights] = useState(false);
  const [speed, setSpeed] = useState(25);

  const addBombNode = () => {
    setbombNode((cur) => cur + 1); // Correctly return the incremented value
  };

  const startRecursiveDivision = () => {
    setRecursiveDivison((prev) => !prev);
  };

  const startRecursiveDivisionHorizontal = () => {
    setRecursiveDivisonHorizontal((prev) => !prev);
  };
  const startRecursiveDivisionVertical = () => {
    setRecursiveDivisonVertical((prev) => !prev);
  };

  const startRandomMaze = () => {
    setRandomMaze((prev) => !prev);
  };
  const startRandomMazeWithWeights = () => {
    setRandomMazeWithWeights((prev) => !prev);
  };
  const speedChange = (n) => {
    setSpeed(n);
  };

  return (
    <WrapperContext.Provider
      value={{
        bombNode,
        addBombNode,
        recursiveDivision,
        startRecursiveDivision,
        recursiveDivisionHorizontal,
        startRecursiveDivisionHorizontal,
        recursiveDivisionVertical,
        startRecursiveDivisionVertical,
        randomMaze,
        startRandomMaze,
        randomMazeWithWights,
        startRandomMazeWithWeights,
        speed,
        speedChange,
      }}
    >
      {children}
    </WrapperContext.Provider>
  );
};
