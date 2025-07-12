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
  const [bfs, setBfs] = useState(false);
  const [dfs, setDfs] = useState(false);
  const [dijkstra, setDijkstra] = useState(false);
  const [clearPath, setClearPath] = useState(false);
  const [astar, setAstar] = useState(false);
  const [greedyBfs, setGreedyBfs] = useState(false);
  const [swarm, setSwarm] = useState(false);
  const [convergentSwarm, setConvergentSwarm] = useState(false);
  const [bidirectionalSwarm, setBidirectionalSwarm] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [pendingAlgo, setPendingAlgo] = useState(null);

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
  const startBfs = () => {
    if (isVisualizing) return;
    setClearPath(true);
    setPendingAlgo("bfs");
  };
  const startDfs = () => {
    if (isVisualizing) return;
    setClearPath(true);
    setPendingAlgo("dfs");
  };
  const startDijkstra = () => {
    if (isVisualizing) return;
    setClearPath(true);
    setPendingAlgo("dijkstra");
  };
  const startAstar = () => {
    if (isVisualizing) return;
    setClearPath(true);
    setPendingAlgo("astar");
  };
  const startGreedyBfs = () => {
    if (isVisualizing) return;
    setClearPath(true);
    setPendingAlgo("greedybfs");
  };
  const startSwarm = () => {
    if (isVisualizing) return;
    setClearPath(true);
    setPendingAlgo("swarm");
  };
  const startConvergentSwarm = () => {
    if (isVisualizing) return;
    setClearPath(true);
    setPendingAlgo("convergentSwarm");
  };
  const startBidirectionalSwarm = () => {
    if (isVisualizing) return;
    setClearPath(true);
    setPendingAlgo("bidirectionalSwarm");
  };
  const startClearPath = () => {
    setClearPath((prev) => !prev);
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
        bfs,
        setBfs,
        startBfs,
        dfs,
        setDfs,
        startDfs,
        dijkstra,
        setDijkstra,
        startDijkstra,
        astar,
        setAstar,
        startAstar,
        greedyBfs,
        setGreedyBfs,
        startGreedyBfs,
        swarm,
        setSwarm,
        startSwarm,
        convergentSwarm,
        setConvergentSwarm,
        startConvergentSwarm,
        bidirectionalSwarm,
        setBidirectionalSwarm,
        startBidirectionalSwarm,
        isVisualizing,
        setIsVisualizing,
        pendingAlgo,
        setPendingAlgo,
        clearPath,
        setClearPath,
      }}
    >
      {children}
    </WrapperContext.Provider>
  );
};
