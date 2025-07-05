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
  const [randomMazeWithWeights, setRandomMazeWithWeights] = useState(false);
  const [speed, setSpeed] = useState(25);
  const [clearBoard, setClearBoard] = useState(false);
  const [clearBombs, setClearBombs] = useState(false);
  const [clearWallsAndWeights, setClearWallsAndWeights] = useState(false);

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
  const startClearBoard = () => {
    setClearBoard((prev) => !prev);
  };
  const startClearBombs = () => {
    setClearBombs((prev) => !prev);
  };
  const startClearWallsAdnWeights = () => {
    setClearWallsAndWeights((prev) => !prev);
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
        randomMazeWithWeights,
        startRandomMazeWithWeights,
        speed,
        speedChange,
        clearBoard,
        startClearBoard,
        clearBombs,
        startClearBombs,
        clearWallsAndWeights,
        startClearWallsAdnWeights,
      }}
    >
      {children}
    </WrapperContext.Provider>
  );
};
