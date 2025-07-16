import { useContext, useEffect, useState } from "react";
import { WrapperContext } from "../wrapper";

export default function Navbar() {
  const {
    addBombNode,
    startRecursiveDivision,
    startRecursiveDivisionHorizontal,
    startRecursiveDivisionVertical,
    startRandomMaze,
    startRandomMazeWithWeights,
    speedChange,
    startClearBoard,
    startClearBombs,
    startClearWallsAndWeights,
    startBfs,
    startDfs,
    startDijkstra,
    startAstar,
    startGreedyBfs,
    startSwarm,
    startConvergentSwarm,
    startBidirectionalSwarm,
    isVisualizing,
  } = useContext(WrapperContext);

  const [algorithmToggle, setAlgorithmToggle] = useState(true);
  const [mazeAndPatternsToggle, setMazeAndPatternsToggle] = useState(true);
  const [speedToggle, setSpeedToggle] = useState(true);
  const [clearToggle, setClearToggle] = useState(true);
  const [menuToggle, setMenuToggle] = useState(true);
  const [algorithm, setAlgorithm] = useState("");
  const [currentAlgo, setCurrentAlgo] = useState("");
  const [startAlgo, setStartAlgo] = useState(false);

  function toggleMenu(e) {
    e.stopPropagation();
    setMenuToggle((prev) => !prev);
    setAlgorithmToggle(true);
    setMazeAndPatternsToggle(true);
    setSpeedToggle(true);
    setClearToggle(true);
  }

  function toggleAlgorithm(e) {
    e.stopPropagation();
    setAlgorithmToggle((prev) => !prev);
    setMazeAndPatternsToggle(true);
    setSpeedToggle(true);
    setClearToggle(true);
  }

  function toggleMazeAndPatterns(e) {
    e.stopPropagation();
    setAlgorithmToggle(true);
    setMazeAndPatternsToggle((prev) => !prev);
    setSpeedToggle(true);
    setClearToggle(true);
  }

  function toggleSpeed(e) {
    e.stopPropagation();
    setAlgorithmToggle(true);
    setMazeAndPatternsToggle(true);
    setSpeedToggle((prev) => !prev);
    setClearToggle(true);
  }

  function toggleClear(e) {
    e.stopPropagation();
    setAlgorithmToggle(true);
    setMazeAndPatternsToggle(true);
    setSpeedToggle(true);
    setClearToggle((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside() {
      setAlgorithmToggle(true);
      setMazeAndPatternsToggle(true);
      setSpeedToggle(true);
      setClearToggle(true);
      setMenuToggle(true);
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (algorithm === "bfs") {
      setCurrentAlgo("Breadth First Search");
      if (startAlgo && !isVisualizing) {
        startBfs();
        setStartAlgo(false);
      }
    } else if (algorithm === "dfs") {
      setCurrentAlgo("Depth First Search");
      if (startAlgo && !isVisualizing) {
        startDfs();
        setStartAlgo(false);
      }
    } else if (algorithm === "dijkstra") {
      setCurrentAlgo("Dijkstra");
      if (startAlgo && !isVisualizing) {
        startDijkstra();
        setStartAlgo(false);
      }
    } else if (algorithm === "astar") {
      setCurrentAlgo("A*");
      if (startAlgo && !isVisualizing) {
        startAstar();
        setStartAlgo(false);
      }
    } else if (algorithm === "greedyBfs") {
      setCurrentAlgo("Greedy Best-First Search");
      if (startAlgo && !isVisualizing) {
        startGreedyBfs();
        setStartAlgo(false);
      }
    } else if (algorithm === "swarm") {
      setCurrentAlgo("Swarm");
      if (startAlgo && !isVisualizing) {
        startSwarm();
        setStartAlgo(false);
      }
    } else if (algorithm === "convergentSwarm") {
      setCurrentAlgo("Convergent Swarm");
      if (startAlgo && !isVisualizing) {
        startConvergentSwarm();
        setStartAlgo(false);
      }
    } else if (algorithm === "bidirectionalSwarm") {
      setCurrentAlgo("Bidirectional Swarm");
      if (startAlgo && !isVisualizing) {
        startBidirectionalSwarm();
        setStartAlgo(false);
      }
    }
  }, [
    algorithm,
    startAlgo,
    isVisualizing,
    startBfs,
    startDfs,
    startDijkstra,
    startAstar,
    startGreedyBfs,
    startSwarm,
    startConvergentSwarm,
    startBidirectionalSwarm,
  ]);

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white text-xl font-bold tracking-tight">
              PathFinding Visualizer
            </a>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={addBombNode}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Add Bomb
            </button>

            <div className="relative">
              <button
                onClick={toggleAlgorithm}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
              >
                Algorithms
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {!algorithmToggle && (
                <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={() => setAlgorithm("bfs")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Breadth First Search
                    </button>
                    <button
                      onClick={() => setAlgorithm("dfs")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Depth First Search
                    </button>
                    <button
                      onClick={() => setAlgorithm("dijkstra")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Dijkstra's Algorithm
                    </button>
                    <button
                      onClick={() => setAlgorithm("astar")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      A* Algorithm
                    </button>
                    <button
                      onClick={() => setAlgorithm("greedyBfs")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Greedy Best-First Search
                    </button>
                    <button
                      onClick={() => setAlgorithm("swarm")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Swarm Algorithm
                    </button>
                    <button
                      onClick={() => setAlgorithm("convergentSwarm")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Convergent Swarm Algorithm
                    </button>
                    <button
                      onClick={() => setAlgorithm("bidirectionalSwarm")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Bi-Directional Swarm Algorithm
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={toggleMazeAndPatterns}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
              >
                Maze and Pattern
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {!mazeAndPatternsToggle && (
                <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={startRecursiveDivision}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Recursive Division
                    </button>
                    <button
                      onClick={startRecursiveDivisionVertical}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Recursive Division (vertical skew)
                    </button>
                    <button
                      onClick={startRecursiveDivisionHorizontal}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Recursive Division (horizontal skew)
                    </button>
                    <button
                      onClick={startRandomMaze}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Basic Random Maze
                    </button>
                    <button
                      onClick={startRandomMazeWithWeights}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Basic Weight Maze
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={toggleSpeed}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
              >
                Speed
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {!speedToggle && (
                <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={() => speedChange(40)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Slow
                    </button>
                    <button
                      onClick={() => speedChange(25)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Normal
                    </button>
                    <button
                      onClick={() => speedChange(10)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Fast
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={toggleClear}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
              >
                Clear
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {!clearToggle && (
                <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={startClearBoard}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Clear Board
                    </button>
                    <button
                      onClick={startClearWallsAndWeights}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Clear Walls and Weights
                    </button>
                    <button
                      onClick={startClearBombs}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      Clear Bombs
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                if (algorithm) {
                  setStartAlgo(true);
                }
              }}
              className="bg-yellow-600 text-white hover:bg-yellow-500 px-6 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Visualize {currentAlgo}
            </button>
          </div>
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out z-1 ${
          menuToggle ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="px-6 space-y-2 mt-4">
          <button
            onClick={addBombNode}
            className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Add Bomb
          </button>

          <button
            onClick={toggleAlgorithm}
            className="w-full flex items-center justify-between text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Algorithms
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {!algorithmToggle && (
            <div className="pl-4 space-y-1">
              <button
                onClick={() => setAlgorithm("bfs")}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Breadth First Search
              </button>
              <button
                onClick={() => setAlgorithm("dfs")}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Depth First Search
              </button>
              <button
                onClick={() => setAlgorithm("dijkstra")}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Dijkstra's Algorithm
              </button>
              <button
                onClick={() => setAlgorithm("astar")}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                A* Algorithm
              </button>
              <button
                onClick={() => setAlgorithm("greedyBfs")}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Greedy Best-First Search
              </button>
              <button
                onClick={() => setAlgorithm("swarm")}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Swarm Algorithm
              </button>
              <button
                onClick={() => setAlgorithm("convergentSwarm")}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Convergent Swarm Algorithm
              </button>
              <button
                onClick={() => setAlgorithm("bidirectionalSwarm")}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Bi-Directional Swarm Algorithm
              </button>
            </div>
          )}

          <button
            onClick={toggleMazeAndPatterns}
            className="w-full flex items-center justify-between text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Maze and Pattern
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {!mazeAndPatternsToggle && (
            <div className="pl-4 space-y-1">
              <button
                onClick={startRecursiveDivision}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Recursive Division
              </button>
              <button
                onClick={startRecursiveDivisionVertical}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Recursive Division (vertical skew)
              </button>
              <button
                onClick={startRecursiveDivisionHorizontal}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Recursive Division (horizontal skew)
              </button>
              <button
                onClick={startRandomMaze}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Basic Random Maze
              </button>
              <button
                onClick={startRandomMazeWithWeights}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Basic Weight Maze
              </button>
            </div>
          )}

          <button
            onClick={toggleSpeed}
            className="w-full flex items-center justify-between text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Speed
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {!speedToggle && (
            <div className="pl-4 space-y-1">
              <button
                onClick={() => speedChange(40)}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Slow
              </button>
              <button
                onClick={() => speedChange(25)}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Normal
              </button>
              <button
                onClick={() => speedChange(10)}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Fast
              </button>
            </div>
          )}

          <button
            onClick={toggleClear}
            className="w-full flex items-center justify-between text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Clear
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {!clearToggle && (
            <div className="pl-4 space-y-1">
              <button
                onClick={startClearBoard}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Clear Board
              </button>
              <button
                onClick={startClearWallsAndWeights}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Clear Walls and Weights
              </button>
              <button
                onClick={startClearBombs}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Clear Bombs
              </button>
            </div>
          )}

          <button
            onClick={() => {
              if (algorithm) {
                setStartAlgo(true);
              }
            }}
            className="w-full bg-yellow-600 text-white hover:bg-yellow-500 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Visualize {currentAlgo}
          </button>
        </div>
      </div>
    </nav>
  );
}
