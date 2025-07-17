import { useContext, useRef } from "react";
import { WrapperContext } from "../wrapper";
import { useVisualizeAlgorithm } from "../hooks/useVisualizeAlgorithm";
import { useVisualizeMaze } from "../hooks/useVisualizeMaze";
import { useVisualizeClear } from "../hooks/useVisualizeClear";
import { useClearPath } from "../hooks/useClearPath";
import { useMouseHandlers } from "../hooks/useMouseHandlers";
import { useGridResize } from "../hooks/useGridResize";
import { useBombNode } from "../hooks/useBombNode";
import Grid from "./Grid";

import generateMaze from "../function/maze/generateMaze";
import generateMazeVertical from "../function/maze/generateMazeVertical";
import generateMazeHorizontal from "../function/maze/generateMazeHorizontal";
import generateMazeRandom from "../function/maze/generateMazeRandomWalls";
import generateMazeRandomWithWeights from "../function/maze/generateMazeRandomWeights";
import generateClearBoard from "../function/clear/clearBoard";
import generateClearBombs from "../function/clear/clearBombs";
import generateClearWallsAndWeights from "../function/clear/clearWallsAndWeights";
import generateBfs from "../function/algortihms/bfs";
import generateDfs from "../function/algortihms/dfs";
import generateClearPath from "../function/clear";
import generateDijkstra from "../function/algortihms/dijkstra";
import generateGreedyBfs from "../function/algortihms/greedybfs";
import generateAstar from "../function/algortihms/astar";
import generateSwarm from "../function/algortihms/swarm";
import generateConvergentSwarm from "../function/algortihms/convergentSwarm";
import generateBidirectionalSwarm from "../function/algortihms/bidirectionalSwarm";

// Globals (if needed, consider moving to context or state)
export let animated = [];
export let bombSquad = [];

const algoMap = {
  bfs: generateBfs,
  dfs: generateDfs,
  dijkstra: generateDijkstra,
  astar: generateAstar,
  greedyBfs: generateGreedyBfs,
  swarm: generateSwarm,
  convergentSwarm: generateConvergentSwarm,
  bidirectionalSwarm: generateBidirectionalSwarm,
};

export default function Board() {
  const {
    bombNode,
    recursiveDivision,
    startRecursiveDivision,
    recursiveDivisionVertical,
    startRecursiveDivisionVertical,
    recursiveDivisionHorizontal,
    startRecursiveDivisionHorizontal,
    randomMaze,
    startRandomMaze,
    randomMazeWithWeights,
    startRandomMazeWithWeights,
    speed,
    clearBoard,
    startClearBoard,
    clearBombs,
    startClearBombs,
    clearWallsAndWeights,
    startClearWallsAndWeights,
    bfs,
    setBfs,
    dfs,
    setDfs,
    dijkstra,
    setDijkstra,
    astar,
    setAstar,
    greedyBfs,
    setGreedyBfs,
    swarm,
    setSwarm,
    convergentSwarm,
    setConvergentSwarm,
    bidirectionalSwarm,
    setBidirectionalSwarm,
    clearPath,
    setClearPath,
    setIsVisualizing,
    pendingAlgo,
    setPendingAlgo,
    lastAlgo,
    setLastAlgo,
  } = useContext(WrapperContext);

  const gridRef = useRef(null);

  const { box, setBox, rows, cols, cellSize } = useGridResize();

  const {
    dragging,
    draggedNode,
    setDraggedNode,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    startNodeDrag,
  } = useMouseHandlers({
    box,
    setBox,
    rows,
    cols,
    cellSize,
    gridRef,
    algoMap,
    lastAlgo,
  });

  useClearPath({
    clearPath,
    setClearPath,
    generateClearPath,
    box,
    rows,
    cols,
    setBox,
    pendingAlgo,
    setPendingAlgo,
    setBfs,
    setDfs,
    setDijkstra,
    setAstar,
    setGreedyBfs,
    setSwarm,
    setConvergentSwarm,
    setBidirectionalSwarm,
    dependencies: [
      setBfs,
      setDfs,
      setDijkstra,
      setAstar,
      setGreedyBfs,
      setSwarm,
      setConvergentSwarm,
      setBidirectionalSwarm,
    ],
  });

  useVisualizeAlgorithm({
    trigger: bfs,
    setTrigger: setBfs,
    generateFunc: generateBfs,
    box,
    rows,
    cols,
    setBox,
    setIsVisualizing,
    setLastAlgo,
    algoName: "bfs",
  });

  useVisualizeAlgorithm({
    trigger: dfs,
    setTrigger: setDfs,
    generateFunc: generateDfs,
    box,
    rows,
    cols,
    setBox,
    setIsVisualizing,
    setLastAlgo,
    algoName: "dfs",
  });

  useVisualizeAlgorithm({
    trigger: dijkstra,
    setTrigger: setDijkstra,
    generateFunc: generateDijkstra,
    box,
    rows,
    cols,
    setBox,
    setIsVisualizing,
    setLastAlgo,
    algoName: "dijkstra",
  });

  useVisualizeAlgorithm({
    trigger: greedyBfs,
    setTrigger: setGreedyBfs,
    generateFunc: generateGreedyBfs,
    box,
    rows,
    cols,
    setBox,
    setIsVisualizing,
    setLastAlgo,
    algoName: "greedyBfs",
  });

  useVisualizeAlgorithm({
    trigger: astar,
    setTrigger: setAstar,
    generateFunc: generateAstar,
    box,
    rows,
    cols,
    setBox,
    setIsVisualizing,
    setLastAlgo,
    algoName: "astar",
  });

  useVisualizeAlgorithm({
    trigger: swarm,
    setTrigger: setSwarm,
    generateFunc: generateSwarm,
    box,
    rows,
    cols,
    setBox,
    setIsVisualizing,
    setLastAlgo,
    algoName: "swarm",
  });

  useVisualizeAlgorithm({
    trigger: convergentSwarm,
    setTrigger: setConvergentSwarm,
    generateFunc: generateConvergentSwarm,
    box,
    rows,
    cols,
    setBox,
    setIsVisualizing,
    setLastAlgo,
    algoName: "convergentSwarm",
  });

  useVisualizeAlgorithm({
    trigger: bidirectionalSwarm,
    setTrigger: setBidirectionalSwarm,
    generateFunc: generateBidirectionalSwarm,
    box,
    rows,
    cols,
    setBox,
    setIsVisualizing,
    setLastAlgo,
    algoName: "bidirectionalSwarm",
  });

  useVisualizeMaze({
    trigger: recursiveDivision,
    startFunc: startRecursiveDivision,
    generateFunc: generateMaze,
    box,
    rows,
    cols,
    setBox,
    speed,
    wallValue: 1,
  });

  useVisualizeMaze({
    trigger: recursiveDivisionVertical,
    startFunc: startRecursiveDivisionVertical,
    generateFunc: generateMazeVertical,
    box,
    rows,
    cols,
    setBox,
    speed,
    wallValue: 1,
  });

  useVisualizeMaze({
    trigger: recursiveDivisionHorizontal,
    startFunc: startRecursiveDivisionHorizontal,
    generateFunc: generateMazeHorizontal,
    box,
    rows,
    cols,
    setBox,
    speed,
    wallValue: 1,
  });

  useVisualizeMaze({
    trigger: randomMaze,
    startFunc: startRandomMaze,
    generateFunc: generateMazeRandom,
    box,
    rows,
    cols,
    setBox,
    speed,
    wallValue: 1,
  });

  useVisualizeMaze({
    trigger: randomMazeWithWeights,
    startFunc: startRandomMazeWithWeights,
    generateFunc: generateMazeRandomWithWeights,
    box,
    rows,
    cols,
    setBox,
    speed,
    wallValue: 5,
  });

  useVisualizeClear({
    trigger: clearBoard,
    startFunc: startClearBoard,
    generateFunc: generateClearBoard,
    box,
    rows,
    cols,
    setBox,
    speed: 0.1,
    clearCondition: (val) => val !== 2 && val !== 3,
  });

  useVisualizeClear({
    trigger: clearBombs,
    startFunc: startClearBombs,
    generateFunc: generateClearBombs,
    box,
    rows,
    cols,
    setBox,
    speed: 0,
    clearCondition: (val) => val !== 2 && val !== 3 && val !== 1,
  });

  useVisualizeClear({
    trigger: clearWallsAndWeights,
    startFunc: startClearWallsAndWeights,
    generateFunc: generateClearWallsAndWeights,
    box,
    rows,
    cols,
    setBox,
    speed: 0,
    clearCondition: (val) => val !== 2 && val !== 3 && val !== 4,
  });

  useBombNode({
    bombNode,
    rows,
    cols,
    box,
    setBox,
    lastAlgo,
    setClearPath,
    setPendingAlgo,
  });

  return (
    <Grid
      box={box}
      rows={rows}
      cols={cols}
      cellSize={cellSize}
      gridRef={gridRef}
      handleMouseDown={handleMouseDown}
      handleMouseUp={handleMouseUp}
      handleMouseMove={handleMouseMove}
      draggedNode={draggedNode}
      startNodeDrag={startNodeDrag}
    />
  );
}
