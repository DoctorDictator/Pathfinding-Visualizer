import { useState, useEffect, useRef, useContext } from "react";
import produce from "immer";
import Cell from "./Cell";
import Image from "./Image";
import start from "../icons/start.svg";
import circle from "../icons/circle.svg";
import weight from "../icons/weight.svg";
import bomb from "../icons/bomb.svg";
import { WrapperContext } from "../wrapper";
import generateMaze from "../function/maze/generateMaze";
import generateMazeVertical from "../function/maze/generateMazeVertical";
import generateMazeHorizontal from "../function/maze/generateMazeHorizontal";
import generateMazeRandom from "../function/maze/generateMazeRandomWalls";
import generateMazeRandomWithWeights from "../function/maze/generateMazeRandomWeights";
import clearBoard from "../function/clear/clearBoard";
import generateClearBoard from "../function/clear/clearBoard";
import generateClearBombs from "../function/clear/clearBombs";
import generateClearWallsAndWeights from "../function/clear/clearWallsAndWeights";
import generateBfs from "../function/algortihms/bfs";
import { getOriginalType, getVisShade, isPath } from "../utils";
import generateDfs from "../function/algortihms/dfs";
import generateClearPath from "../function/clear";
import generateDijkstra from "../function/algortihms/dijkstra";
import generateGreedyBfs from "../function/algortihms/greedybfs";
import generateAstar from "../function/algortihms/astar";
import generateSwarm from "../function/algortihms/swarm";
import generateConvergentSwarm from "../function/algortihms/convergentSwarm";
import generateBidirectionalSwarm from "../function/algortihms/bidirectionalSwarm";

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};


const getCellsBetween = (x0, y0, x1, y1, cellSize, rows, cols) => {
  const cells = [];
  const col0 = Math.floor(x0 / cellSize);
  const row0 = Math.floor(y0 / cellSize);
  const col1 = Math.floor(x1 / cellSize);
  const row1 = Math.floor(y1 / cellSize);


  if (
    row0 < 0 ||
    row0 >= rows ||
    col0 < 0 ||
    col0 >= cols ||
    row1 < 0 ||
    row1 >= rows ||
    col1 < 0 ||
    col1 >= cols
  ) {
    return cells;
  }


  const dx = col1 - col0;
  const dy = row1 - row0;
  const steps = Math.max(Math.abs(dx), Math.abs(dy)) + 1;

  for (let i = 0; i <= steps; i++) {
    const t = steps === 0 ? 0 : i / steps;
    const row = Math.round(row0 + dy * t);
    const col = Math.round(col0 + dx * t);
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      cells.push([row, col]);
    }
  }

  return cells;
};

let animated = [];
let bombSquad = [];
export default function Board() {

  const [dragging, setDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState(null);
  const [box, setBox] = useState([]);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [cellSize, setCellSize] = useState(20);
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
    startClearWallsAdnWeights,
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
  } = useContext(WrapperContext);
  const gridRef = useRef(null);
  const isInitialRender = useRef(true);
  const prevbombNode = useRef(null);
  const lastMousePos = useRef(null);
  const isClick = useRef(false);

  ////////////////////////////////////////////////
  useEffect(() => {
    if (clearPath && rows > 0 && cols > 0 && box.length > 0) {
      const { newGrid, animation } = generateClearPath(box, rows, cols);
      let i = 0;
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
        const cellUpdate = animation[i];
        if (Array.isArray(cellUpdate) && cellUpdate.length === 3) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c, val] = cellUpdate;
              draft[r][c] = val;
            })
          );
        }
        i++;
        setTimeout(animateStep, 0.01); 
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
  }, [
    clearPath,
    rows,
    cols,
    box.length,
    pendingAlgo,
    setPendingAlgo,
    setBfs,
    setDfs,
    setDijkstra,
    setAstar,
    setGreedyBfs,
    setSwarm,
    setConvergentSwarm,
    setBidirectionalSwarm ,
  ]);

  useEffect(() => {
    if (bfs && rows > 0 && cols > 0 && box.length > 0) {
      setIsVisualizing(true);
      const { newGrid, animation } = generateBfs(box, rows, cols);
      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          setBfs(false);
          setIsVisualizing(false);
          return;
        }
        const cellUpdate = animation[i];
        if (Array.isArray(cellUpdate) && cellUpdate.length === 3) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c, val] = cellUpdate;
              draft[r][c] = val;
            })
          );
        }
        i++;
        setTimeout(animateStep, 0.01);
      }
      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
      } else if (newGrid) {
        setBox(newGrid);
        setBfs(false);
        setIsVisualizing(false);
      }
    }
  }, [bfs, rows, cols, box.length]);
  useEffect(() => {
    if (dfs && rows > 0 && cols > 0 && box.length > 0) {
      setIsVisualizing(true);
      const { newGrid, animation } = generateDfs(box, rows, cols);
      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          setDfs(false);
          setIsVisualizing(false);
          return;
        }
        const cellUpdate = animation[i];
        if (Array.isArray(cellUpdate) && cellUpdate.length === 3) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c, val] = cellUpdate;
              draft[r][c] = val;
            })
          );
        }
        i++;
        setTimeout(animateStep, 0.01);
      }
      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
      } else if (newGrid) {
        setBox(newGrid);
        setDfs(false);
        setIsVisualizing(false);
      }
    }
  }, [dfs, rows, cols, box.length]);
  useEffect(() => {
    if (dijkstra && rows > 0 && cols > 0 && box.length > 0) {
      setIsVisualizing(true);
      const { newGrid, animation } = generateDijkstra(box, rows, cols);
      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          setDijkstra(false);
          setIsVisualizing(false);
          return;
        }
        const cellUpdate = animation[i];
        if (Array.isArray(cellUpdate) && cellUpdate.length === 3) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c, val] = cellUpdate;
              draft[r][c] = val;
            })
          );
        }
        i++;
        setTimeout(animateStep, 0.01);
      }
      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
      } else if (newGrid) {
        setBox(newGrid);
        setDijkstra(false);
        setIsVisualizing(false);
      }
    }
  }, [dijkstra, rows, cols, box.length]);
  useEffect(() => {
    if (greedyBfs && rows > 0 && cols > 0 && box.length > 0) {
      setIsVisualizing(true);
      const { newGrid, animation } = generateGreedyBfs(box, rows, cols);
      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          setGreedyBfs(false);
          setIsVisualizing(false);
          return;
        }
        const cellUpdate = animation[i];
        if (Array.isArray(cellUpdate) && cellUpdate.length === 3) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c, val] = cellUpdate;
              draft[r][c] = val;
            })
          );
        }
        i++;
        setTimeout(animateStep, 0.01);
      }
      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
      } else if (newGrid) {
        setBox(newGrid);
        setGreedyBfs(false);
        setIsVisualizing(false);
      }
    }
  }, [greedyBfs, rows, cols, box.length]);
  useEffect(() => {
    if (astar && rows > 0 && cols > 0 && box.length > 0) {
      setIsVisualizing(true);
      const { newGrid, animation } = generateAstar(box, rows, cols);
      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          setAstar(false);
          setIsVisualizing(false);
          return;
        }
        const cellUpdate = animation[i];
        if (Array.isArray(cellUpdate) && cellUpdate.length === 3) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c, val] = cellUpdate;
              draft[r][c] = val;
            })
          );
        }
        i++;
        setTimeout(animateStep, 0.01);
      }
      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
      } else if (newGrid) {
        setBox(newGrid);
        setAstar(false);
        setIsVisualizing(false);
      }
    }
  }, [astar, rows, cols, box.length]);
  useEffect(() => {
    if (swarm && rows > 0 && cols > 0 && box.length > 0) {
      setIsVisualizing(true);
      const { newGrid, animation } = generateSwarm(box, rows, cols);
      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          setSwarm(false);
          setIsVisualizing(false);
          return;
        }
        const cellUpdate = animation[i];
        if (Array.isArray(cellUpdate) && cellUpdate.length === 3) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c, val] = cellUpdate;
              draft[r][c] = val;
            })
          );
        }
        i++;
        setTimeout(animateStep, 0.01);
      }
      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
      } else if (newGrid) {
        setBox(newGrid);
        setSwarm(false);
        setIsVisualizing(false);
      }
    }
  }, [swarm, rows, cols, box.length]);

  useEffect(() => {
    if (convergentSwarm && rows > 0 && cols > 0 && box.length > 0) {
      setIsVisualizing(true);
      const { newGrid, animation } = generateConvergentSwarm(box, rows, cols);
      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          setConvergentSwarm(false);
          setIsVisualizing(false);
          return;
        }
        const cellUpdate = animation[i];
        if (Array.isArray(cellUpdate) && cellUpdate.length === 3) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c, val] = cellUpdate;
              draft[r][c] = val;
            })
          );
        }
        i++;
        setTimeout(animateStep, 0.01);
      }
      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
      } else if (newGrid) {
        setBox(newGrid);
        setConvergentSwarm(false);
        setIsVisualizing(false);
      }
    }
  }, [convergentSwarm, rows, cols, box.length]);
  useEffect(() => {
    if (bidirectionalSwarm && rows > 0 && cols > 0 && box.length > 0) {
      setIsVisualizing(true);
      const { newGrid, animation } = generateBidirectionalSwarm(
        box,
        rows,
        cols
      );
      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          setBidirectionalSwarm(false);
          setIsVisualizing(false);
          return;
        }
        const cellUpdate = animation[i];
        if (Array.isArray(cellUpdate) && cellUpdate.length === 3) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c, val] = cellUpdate;
              draft[r][c] = val;
            })
          );
        }
        i++;
        setTimeout(animateStep, 0.01);
      }
      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
      } else if (newGrid) {
        setBox(newGrid);
        setBidirectionalSwarm(false);
        setIsVisualizing(false);
      }
    }
  }, [bidirectionalSwarm, rows, cols, box.length]);
  useEffect(() => {
    if (recursiveDivision && rows > 0 && cols > 0 && box.length > 0) {
      const { newGrid, animation } = generateMaze(box, rows, cols);
      animated = animation;

      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          return;
        }
        const cell = animation[i];
        if (Array.isArray(cell) && cell.length === 2) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c] = cell;

              if (draft[r][c] !== 2 && draft[r][c] !== 3 && draft[r][c] !== 4) {
                draft[r][c] = 1;
              }
            })
          );
        }
        i++;
        setTimeout(animateStep, speed);
      }

      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
        startRecursiveDivision();
      } else if (newGrid) {
        setBox(newGrid);
        startRecursiveDivision();
      }
    }
  }, [recursiveDivision, rows, cols, box.length]);

  /////////////////////////////////////////////////////

  useEffect(() => {
    if (recursiveDivisionVertical && rows > 0 && cols > 0 && box.length > 0) {
      const { newGrid, animation } = generateMazeVertical(box, rows, cols);
      animated = animation;

      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          return;
        }
        const cell = animation[i];
        if (Array.isArray(cell) && cell.length === 2) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c] = cell;

              if (draft[r][c] !== 2 && draft[r][c] !== 3 && draft[r][c] !== 4) {
                draft[r][c] = 1;
              }
            })
          );
        }
        i++;
        setTimeout(animateStep, speed);
      }

      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
        startRecursiveDivisionVertical();
      } else if (newGrid) {
        setBox(newGrid);
        startRecursiveDivisionVertical();
      }
    }
  }, [recursiveDivisionVertical, rows, cols, box.length]);

  ////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (recursiveDivisionHorizontal && rows > 0 && cols > 0 && box.length > 0) {
      const { newGrid, animation } = generateMazeHorizontal(box, rows, cols);
      animated = animation;
      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          return;
        }
        const cell = animation[i];
        if (Array.isArray(cell) && cell.length === 2) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c] = cell;

              if (draft[r][c] !== 2 && draft[r][c] !== 3 && draft[r][c] !== 4) {
                draft[r][c] = 1;
              }
            })
          );
        }
        i++;
        setTimeout(animateStep, speed);
      }

      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
        startRecursiveDivisionHorizontal();
      } else if (newGrid) {
        setBox(newGrid);
        startRecursiveDivisionHorizontal();
      }
    }
  }, [recursiveDivisionHorizontal, rows, cols, box.length]);

  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (randomMaze && rows > 0 && cols > 0 && box.length > 0) {
      const { newGrid, animation } = generateMazeRandom(box, rows, cols);
      animated = animation;
      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          return;
        }
        const cell = animation[i];
        if (Array.isArray(cell) && cell.length === 2) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c] = cell;

              if (draft[r][c] !== 2 && draft[r][c] !== 3 && draft[r][c] !== 4) {
                draft[r][c] = 1;
              }
            })
          );
        }
        i++;
        setTimeout(animateStep, speed);
      }

      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
        startRandomMaze();
      } else if (newGrid) {
        setBox(newGrid);
        startRandomMaze();
      }
    }
  }, [randomMaze, rows, cols, box.length]);

  /////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (randomMazeWithWeights && rows > 0 && cols > 0 && box.length > 0) {
      const { newGrid, animation } = generateMazeRandomWithWeights(
        box,
        rows,
        cols
      );
      animated = animation;

      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          return;
        }
        const cell = animation[i];
        if (Array.isArray(cell) && cell.length === 2) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c] = cell;

              if (draft[r][c] !== 2 && draft[r][c] !== 3 && draft[r][c] !== 4) {
                draft[r][c] = 5;
              }
            })
          );
        }
        i++;
        setTimeout(animateStep, speed);
      }

      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
        startRandomMazeWithWeights();
      } else if (newGrid) {
        setBox(newGrid);
        startRandomMazeWithWeights();
      }
    }
  }, [randomMazeWithWeights, rows, cols, box.length]);

  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (clearBoard && rows > 0 && cols > 0 && box.length > 0) {
      const { newGrid, animation } = generateClearBoard(box, rows, cols);
      animated.reverse();
      let i = 0;
      function animateStep() {
        if (!Array.isArray(animated) || i >= animated.length) {
          setBox(newGrid);
          return;
        }
        const cell = animated[i];
        if (Array.isArray(cell) && cell.length === 2) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c] = cell;

              if (draft[r][c] !== 2 && draft[r][c] !== 3) {
                draft[r][c] = 0;
              }
            })
          );
        }
        i++;
        setTimeout(animateStep, 0.1);
      }

      if (Array.isArray(animated) && animated.length > 0) {
        animateStep();
        startClearBoard();
      } else if (newGrid) {
        setBox(newGrid);
        startClearBoard();
      }
    }
  }, [clearBoard, rows, cols, box.length]);

  ////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (clearBombs && rows > 0 && cols > 0 && box.length > 0) {
      const { newGrid, animation } = generateClearBombs(box, rows, cols);

      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          return;
        }
        const cell = animation[i];
        if (Array.isArray(cell) && cell.length === 2) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c] = cell;

              if (draft[r][c] !== 2 && draft[r][c] !== 3 && draft[r][c] !== 1) {
                draft[r][c] = 0;
              }
            })
          );
        }
        i++;
        setTimeout(animateStep, 0);
      }

      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
        startClearBombs();
      } else if (newGrid) {
        setBox(newGrid);
        startClearBombs();
      }
    }
  }, [clearBombs, rows, cols, box.length]);

  //////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (clearWallsAndWeights && rows > 0 && cols > 0 && box.length > 0) {
      const { newGrid, animation } = generateClearWallsAndWeights(
        box,
        rows,
        cols
      );

      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          return;
        }
        const cell = animation[i];
        if (Array.isArray(cell) && cell.length === 2) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c] = cell;

              if (draft[r][c] !== 2 && draft[r][c] !== 3 && draft[r][c] !== 4) {
                draft[r][c] = 0;
              }
            })
          );
        }
        i++;
        setTimeout(animateStep, 0);
      }

      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
        startClearWallsAdnWeights();
      } else if (newGrid) {
        setBox(newGrid);
        startClearWallsAdnWeights();
      }
    }
  }, [clearWallsAndWeights, rows, cols, box.length]);
  const addWalls = (cells) => {
    if (draggedNode) return;
    setBox(
      produce((draft) => {
        cells.forEach(([row, col]) => {
          const originalType = getOriginalType(draft[row][col]);
          if (originalType !== 2 && originalType !== 3 && originalType !== 4) {
            draft[row][col] = originalType === 1 ? 0 : 1;
          }
        });
      })
    );
  };

  const startNodeDrag = (row, col, type, x, y) => {
    setDraggedNode({ row, col, type, x, y });
    setDragging(true);
    isClick.current = false;
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const gridElement = gridRef.current;
    if (!gridElement) return;
    const rect = gridElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      const originalType = getOriginalType(box[row][col]);
      if (originalType === 2 || originalType === 3 || originalType === 4) {
        startNodeDrag(row, col, originalType, e.clientX, e.clientY);
      } else {
        setDragging(true);
        isClick.current = true;
        addWalls([[row, col]]);
        lastMousePos.current = { x, y };
      }
    }
  };

  const handleMouseUp = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setDragging(false);
    lastMousePos.current = null;
    if (isClick.current && !draggedNode) {
      isClick.current = false;
      return;
    }
    if (!draggedNode) {
      isClick.current = false;
      return;
    }
    const gridElement = gridRef.current;
    if (!gridElement) {
      setDraggedNode(null);
      isClick.current = false;
      return;
    }
    const rect = gridElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const targetCol = Math.floor(x / cellSize);
    const targetRow = Math.floor(y / cellSize);
    if (
      targetRow < 0 ||
      targetRow >= rows ||
      targetCol < 0 ||
      targetCol >= cols
    ) {
      setDraggedNode(null);
      isClick.current = false;
      return;
    }
    if (targetRow === draggedNode.row && targetCol === draggedNode.col) {
      setDraggedNode(null);
      isClick.current = false;
      return;
    }
    if (
      getOriginalType(box[targetRow][targetCol]) === 2 ||
      getOriginalType(box[targetRow][targetCol]) === 3 ||
      getOriginalType(box[targetRow][targetCol]) === 4
    ) {
      setDraggedNode(null);
      isClick.current = false;
      return;
    }
    setBox(
      produce((draft) => {
        const currentCell = box[draggedNode.row][draggedNode.col];
        let oldVal = 0;
        const shade = getVisShade(currentCell);
        if (shade > -1) {
          oldVal = 6 + shade; // For visited empty
        } else if (isPath(currentCell)) {
          oldVal = 12; // For path empty
        }
        draft[draggedNode.row][draggedNode.col] = oldVal;
        draft[targetRow][targetCol] = draggedNode.type;
      })
    );
    setDraggedNode(null);
    isClick.current = false;
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const gridElement = gridRef.current;
    if (!gridElement) return;
    const rect = gridElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (draggedNode) {
      setDraggedNode((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    } else if (row >= 0 && row < rows && col >= 0 && col < cols) {
      isClick.current = false;
      const cells = lastMousePos.current
        ? getCellsBetween(
            lastMousePos.current.x,
            lastMousePos.current.y,
            x,
            y,
            cellSize,
            rows,
            cols
          )
        : [[row, col]];
      addWalls(cells);
      lastMousePos.current = { x, y };
    }
  };

  const updateGridSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isWide = width > height;
    const breakpoints = {
      smallMobile: 320,
      mobile: 375,
      largeMobile: 414,
      tablet: 768,
      largeTablet: 1024,
      laptop: 1280,
      desktop: 1440,
      fullHD: 1920,
    };
    const cellSizes = [
      { maxWidth: breakpoints.smallMobile, size: 16 },
      { maxWidth: breakpoints.mobile, size: 18 },
      { maxWidth: breakpoints.largeMobile, size: 20 },
      { maxWidth: breakpoints.tablet, size: 22 },
      { maxWidth: breakpoints.largeTablet, size: 24 },
      { maxWidth: breakpoints.laptop, size: 26 },
      { maxWidth: breakpoints.desktop, size: 28 },
      { maxWidth: breakpoints.fullHD, size: 30 },
      { maxWidth: Infinity, size: 32 },
    ];
    const margin = 5;
    const availableWidth = width - margin * 2;
    const availableHeight = height - margin * 2;
    const baseCellSize = cellSizes.find((bp) => width <= bp.maxWidth).size;
    let maxCols = Math.floor(availableWidth / baseCellSize);
    let maxRows = Math.floor(availableHeight / baseCellSize);
    if (width >= breakpoints.tablet && isWide) {
      maxCols = Math.floor(maxCols * 1.2);
      maxRows = Math.floor(maxRows * 0.8);
    } else if (width >= breakpoints.tablet && !isWide) {
      maxCols = Math.floor(maxCols * 0.8);
      maxRows = Math.floor(maxRows * 1.2);
    }
    maxCols = Math.max(1, maxCols);
    maxRows = Math.max(1, maxRows);
    const gridWidth = maxCols * baseCellSize;
    const gridHeight = maxRows * baseCellSize;
    if (gridWidth > availableWidth) {
      maxCols = Math.floor(availableWidth / baseCellSize);
    }
    if (gridHeight > availableHeight) {
      maxRows = Math.floor(availableHeight / baseCellSize);
    }
    const newBox = Array(maxRows)
      .fill()
      .map(() => Array(maxCols).fill(0));
    const startRow = Math.min(10, maxRows - 1);
    const startCol = Math.min(10, maxCols - 1);
    const endRow = Math.min(10, maxRows - 1);
    const endCol = Math.min(40, maxCols - 1);
    newBox[startRow][startCol] = 2;
    newBox[endRow][endCol] = 3;
    setBox(newBox);
    setRows(maxRows);
    setCols(maxCols);
    setCellSize(baseCellSize);
  };

  function getRandomRow(rows) {
    return getRandomNumber(0, rows - 1);
  }

  function getRandomCol(cols) {
    return getRandomNumber(0, cols - 1);
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    updateGridSize();
    const debouncedUpdate = debounce(updateGridSize, 100);
    window.addEventListener("resize", debouncedUpdate);
    return () => window.removeEventListener("resize", debouncedUpdate);
  }, []);

  useEffect(() => {
    if (isInitialRender.current || !rows || !cols) {
      isInitialRender.current = false;
      prevbombNode.current = bombNode;
      return;
    }
    if (prevbombNode.current === bombNode) {
      return;
    }
    if (bombNode === 0) {
      return;
    }
    let rowRandom = getRandomRow(rows);
    let colRandom = getRandomCol(cols);
    setBox(
      produce((draft) => {
        while (
          draft[rowRandom][colRandom] === 1 ||
          draft[rowRandom][colRandom] === 2 ||
          draft[rowRandom][colRandom] === 3 ||
          draft[rowRandom][colRandom] === 4
        ) {
          rowRandom = getRandomRow(rows);
          colRandom = getRandomCol(cols);
        }
        draft[rowRandom][colRandom] = 4;
        bombSquad.push([rowRandom, colRandom]);
        console.log(bombSquad);
      })
    );
    prevbombNode.current = bombNode;
  }, [rows, cols, bombNode, getRandomCol, getRandomRow]);

  return (
    <div className="w-full h-full p-1 sm:p-2 md:p-3 flex justify-center relative">
      <div
        ref={gridRef}
        className="grid bg-white rounded-lg shadow-xl border border-gray-200"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 4px 0 6px rgba(0, 0, 0, 0.1), -4px 0 6px rgba(0, 0, 0, 0.1)",
          userSelect: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        {box.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cellSize={cellSize}
              row={rowIndex}
              col={colIndex}
              cell={box[rowIndex][colIndex]}
              startNodeDrag={startNodeDrag}
            />
          ))
        )}
      </div>
      {draggedNode && (
        <div
          className="border border-gray-200 opacity-70 pointer-events-none"
          style={{
            position: "absolute",
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            left: draggedNode.x - 25,
            top: draggedNode.y - 110,
            zIndex: 10,
            cursor: "grabbing",
          }}
        >
          {draggedNode.type === 2 && (
            <Image src={start} width="100%" height="100%" />
          )}
          {draggedNode.type === 3 && (
            <Image src={circle} width="100%" height="100%" />
          )}
          {draggedNode.type === 4 && (
            <Image src={bomb} width="100%" height="100%" />
          )}
        </div>
      )}
    </div>
  );
}
