import { useEffect } from "react";
import produce from "immer";

export const useClearPath = ({
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
  dependencies = [],
}) => {
  useEffect(() => {
    if (clearPath && rows > 0 && cols > 0 && box.length > 0) {
      const { newGrid, animation } = generateClearPath(box, rows, cols);
      let i = 0;
      const batchSize = 10;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          setClearPath(false);
          if (pendingAlgo) {
            if (pendingAlgo === "bfs") setBfs(true);
            if (pendingAlgo === "dfs") setDfs(true);
            if (pendingAlgo === "dijkstra") setDijkstra(true);
            if (pendingAlgo === "astar") setAstar(true);
            if (pendingAlgo === "greedybfs") setGreedyBfs(true);
            if (pendingAlgo === "swarm") setSwarm(true);
            if (pendingAlgo === "convergentSwarm") setConvergentSwarm(true);
            if (pendingAlgo === "bidirectionalSwarm")
              setBidirectionalSwarm(true);
            setPendingAlgo(null);
          }
          return;
        }
        let updates = [];
        for (let j = 0; j < batchSize && i < animation.length; j++, i++) {
          const cellUpdate = animation[i];
          if (Array.isArray(cellUpdate) && cellUpdate.length === 3) {
            updates.push(cellUpdate);
          }
        }
        if (updates.length > 0) {
          setBox((prev) =>
            produce(prev, (draft) => {
              updates.forEach(([r, c, val]) => {
                draft[r][c] = val;
              });
            })
          );
        }
        requestAnimationFrame(animateStep);
      }
      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
      } else if (newGrid) {
        setBox(newGrid);
        setClearPath(false);
        if (pendingAlgo) {
          if (pendingAlgo === "bfs") setBfs(true);
          if (pendingAlgo === "dfs") setDfs(true);
          if (pendingAlgo === "dijkstra") setDijkstra(true);
          if (pendingAlgo === "astar") setAstar(true);
          if (pendingAlgo === "greedybfs") setGreedyBfs(true);
          if (pendingAlgo === "swarm") setSwarm(true);
          if (pendingAlgo === "convergentSwarm") setConvergentSwarm(true);
          if (pendingAlgo === "bidirectionalSwarm") setBidirectionalSwarm(true);
          setPendingAlgo(null);
        }
      }
    }
  }, [clearPath, rows, cols, box.length, pendingAlgo, ...dependencies]);
};
