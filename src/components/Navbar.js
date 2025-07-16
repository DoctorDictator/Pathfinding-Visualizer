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
    startClearWallsAdnWeights,
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
  const [mazeAndPatternsToggle, setmazeAndPatternsToggle] = useState(true);
  const [speedToggle, setSpeedToggle] = useState(true);
  const [clearToggle, setClearToggle] = useState(true);
  const [menuToggle, setMenuToggle] = useState(true);
  const [algorithm, setAlgorithm] = useState("");
  const [currentAlgo, setCurrentAlgo] = useState("");
  const [startAlgo, setStartAlgo] = useState(false);
  function toggleMenu(e) {
    e.stopPropagation();
    setMenuToggle((prevState) => !prevState);
    setAlgorithmToggle(true);
    setmazeAndPatternsToggle(true);
    setSpeedToggle(true);
    setClearToggle(true);
  }

  function toggleAlgorithm(e) {
    e.stopPropagation();
    setAlgorithmToggle((prevState) => !prevState);
    setmazeAndPatternsToggle(true);
    setSpeedToggle(true);
    setClearToggle(true);
  }
  function toggleMazeAndPatterns(e) {
    e.stopPropagation();
    setAlgorithmToggle(true);
    setmazeAndPatternsToggle((prevState) => !prevState);
    setSpeedToggle(true);
    setClearToggle(true);
  }
  function toggleSpeed(e) {
    e.stopPropagation();
    setAlgorithmToggle(true);
    setmazeAndPatternsToggle(true);
    setSpeedToggle((prevState) => !prevState);
    setClearToggle(true);
  }

  function toggleClear(e) {
    e.stopPropagation();
    setAlgorithmToggle(true);
    setmazeAndPatternsToggle(true);
    setSpeedToggle(true);
    setClearToggle((prevState) => !prevState);
  }

  useEffect(() => {
    function toggleOut() {
      setAlgorithmToggle(true);
      setmazeAndPatternsToggle(true);
      setSpeedToggle(true);
      setClearToggle(true);
      setMenuToggle(true);
    }

    document.addEventListener("click", toggleOut);
    return () => {
      document.removeEventListener("click", toggleOut);
    };
  }, []);

  useEffect(() => {
    if (algorithm === "bfs") {
      setCurrentAlgo("Breadth First Search");
      if (startAlgo && algorithm === "bfs" && !isVisualizing) {
        startBfs();
        startAlgo(false);
      }
    }
    if (algorithm === "dfs") {
      setCurrentAlgo("Depth First Search");
      if (startAlgo && algorithm === "dfs" && !isVisualizing) {
        startDfs();
        setStartAlgo(false);
      }
    }
    if (algorithm === "dijkstra") {
      setCurrentAlgo("Dijkstra");
      if (startAlgo && algorithm === "dijkstra" && !isVisualizing) {
        startDijkstra();
        setStartAlgo(false);
      }
    }
    if (algorithm === "astar") {
      setCurrentAlgo("A*");
      if (startAlgo && algorithm === "astar" && !isVisualizing) {
        startAstar();
        setStartAlgo(false);
      }
    }
    if (algorithm === "greedyBfs") {
      setCurrentAlgo("Greedy Best-First Search");
      if (startAlgo && algorithm === "greedyBfs" && !isVisualizing) {
        startGreedyBfs();
        setStartAlgo(false);
      }
    }
    if (algorithm === "swarm") {
      setCurrentAlgo("Swarm");
      if (startAlgo && algorithm === "swarm" && !isVisualizing) {
        startSwarm();
        setStartAlgo(false);
      }
    }
    if (algorithm === "convergentSwarm") {
      setCurrentAlgo("Convergent Swarm");
      if (startAlgo && algorithm === "convergentSwarm" && !isVisualizing) {
        startConvergentSwarm();
        setStartAlgo(false);
      }
    }
    if (algorithm === "bidirectionalSwarm") {
      setCurrentAlgo("Bidirectional Swarm");
      if (startAlgo && algorithm === "bidirectionalSwarm" && !isVisualizing) {
        startBidirectionalSwarm();
        setStartAlgo(false);
      }
    }
  }, [algorithm, startAlgo]);

  return (
    <>
      <nav className="bg-gray-800 w-max-3xl">
        <div className="max-w-7xl py-4 mx-auto w-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="text-white outline-none text-lg font-bold">
                PathFinding Visualizer
              </a>
            </div>
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={addBombNode}
                  className="text-gray-300  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Add Bomb
                </button>

                <div className="relative">
                  <button
                    id="algorithms"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    onClick={toggleAlgorithm}
                  >
                    Algorithms
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="algorithm-dropdown"
                    className={`${
                      algorithmToggle && `hidden`
                    } absolute z-10 mt-2 w-48 rounded shadow-lg bg-gray-700`}
                  >
                    <button
                      onClick={() => {
                        setAlgorithm("bfs");
                      }}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Breadth First Search
                    </button>
                    <button
                      onClick={() => {
                        setAlgorithm("dfs");
                      }}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Depth First Search
                    </button>
                    <button
                      onClick={() => {
                        setAlgorithm("dijkstra");
                      }}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Dijkstra's Algorithm
                    </button>
                    <button
                      onClick={() => {
                        setAlgorithm("astar");
                      }}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      A* Algorithm
                    </button>
                    <button
                      onClick={() => {
                        setAlgorithm("greedyBfs");
                      }}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Greedy Best-First Search
                    </button>
                    <button
                      onClick={() => {
                        setAlgorithm("swarm");
                      }}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Swarm Algorithm
                    </button>
                    <button
                      onClick={() => {
                        setAlgorithm("convergentSwarm");
                      }}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Convergent Swarm Algorithm
                    </button>
                    <button
                      onClick={() => {
                        setAlgorithm("bidirectionalSwarm");
                      }}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Bi-Directional Swarm Algorithm
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <button
                    id="mazeAndPattern"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    onClick={toggleMazeAndPatterns}
                  >
                    Maze and Pattern
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="mazeAndPattern-dropdown"
                    className={`${
                      mazeAndPatternsToggle && `hidden`
                    } absolute z-10 mt-2 w-48 rounded shadow-lg bg-gray-700`}
                  >
                    <button
                      onClick={startRecursiveDivision}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Recursive Division
                    </button>
                    <button
                      onClick={startRecursiveDivisionVertical}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Recursive Division (vertical skew)
                    </button>
                    <button
                      onClick={startRecursiveDivisionHorizontal}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Recursive Division (horizontal skew)
                    </button>
                    <button
                      onClick={startRandomMaze}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Basic Random Maze
                    </button>
                    <button
                      onClick={startRandomMazeWithWeights}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Basic Weight Maze
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <button
                    id="speed"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    onClick={toggleSpeed}
                  >
                    Speed
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="speed-dropdown"
                    className={`${
                      speedToggle && `hidden`
                    } absolute z-10 mt-2 w-48 rounded shadow-lg bg-gray-700`}
                  >
                    <button
                      onClick={() => {
                        speedChange(40);
                      }}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Slow
                    </button>
                    <button
                      onClick={() => {
                        speedChange(25);
                      }}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Normal
                    </button>
                    <button
                      onClick={() => {
                        speedChange(10);
                      }}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Fast
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <button
                    id="clear"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    onClick={toggleClear}
                  >
                    Clear
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="clear-dropdown"
                    className={`${
                      clearToggle && `hidden`
                    } absolute z-10 mt-2 w-48 rounded shadow-lg bg-gray-700`}
                  >
                    <button
                      onClick={startClearBoard}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Clear Board
                    </button>
                    <button
                      onClick={startClearWallsAdnWeights}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Clear Walls and Weights
                    </button>
                    <button
                      onClick={startClearBombs}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Clear Bombs
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setStartAlgo(true)}
                  className="text-white bg-yellow-300 hover:bg-gray-700 hover:text-white px-10 py-2 rounded-md text-sm font-medium"
                >
                  Visualize {currentAlgo}
                </button>
              </div>
            </div>
            <div className="lg:hidden">
              <button
                id="menu-toggle"
                className="text-gray-300 hover:text-white focus:outline-none p-2"
                onClick={toggleMenu}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`${
            menuToggle ? "-translate-x-full" : "translate-x-0"
          } lg:hidden fixed inset-y-0 left-0 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out z-10`}
        >
          <div className="px-2 pt-16 pb-3 space-y-1 sm:px-3">
            <button
              onClick={addBombNode}
              className="text-gray-300  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Add Weights
            </button>
            <div>
              <button
                id="mobile-algorithm-toggle"
                className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center w-full px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleAlgorithm}
              >
                Algorithms
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                id="mobile-algorithm-dropdown"
                className={`${algorithmToggle && `hidden`} pl-4 space-y-1`}
              >
                <button
                  onClick={() => {
                    setAlgorithm("bfs");
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Breadth First Search
                </button>
                <button
                  onClick={() => {
                    setAlgorithm("dfs");
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Depth First Search
                </button>
                <button
                  onClick={() => {
                    setAlgorithm("dijkstra");
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dijkstra's Algorithm
                </button>
                <button
                  onClick={() => {
                    setAlgorithm("astar");
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  A* Algorithm
                </button>
                <button
                  onClick={() => {
                    setAlgorithm("greedyBfs");
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Greedy Best-First Search
                </button>
                <button
                  onClick={() => {
                    setAlgorithm("swarm");
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Swarm Algorithm
                </button>
                <button
                  onClick={() => {
                    setAlgorithm("convergentSwarm");
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Convergent Swarm Algorithm
                </button>
                <button
                  onClick={() => {
                    setAlgorithm("bidirectionalSwarm");
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Bi-Directional Swarm Algorithm
                </button>
              </div>
            </div>
            <div>
              <button
                id="mobile-algorithm-toggle"
                className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center w-full px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMazeAndPatterns}
              >
                Maze and Pattern
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                id="mobile-algorithm-dropdown"
                className={`${
                  mazeAndPatternsToggle && `hidden`
                } pl-4 space-y-1`}
              >
                <button
                  onClick={startRecursiveDivision}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Recursive Division
                </button>
                <button
                  onClick={startRecursiveDivisionVertical}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Recursive Division (vertical skew)
                </button>
                <button
                  onClick={startRecursiveDivisionHorizontal}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Recursive Division (horizontal skew)
                </button>
                <button
                  onClick={startRandomMaze}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Basic Random Maze
                </button>
                <button
                  onClick={startRandomMazeWithWeights}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Basic Weight Maze
                </button>
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Simple Stair Pattern
                </a>
              </div>
            </div>
            <div>
              <button
                id="mobile-algorithm-toggle"
                className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center w-full px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleSpeed}
              >
                Speed
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                id="mobile-algorithm-dropdown"
                className={`${speedToggle && `hidden`} pl-4 space-y-1`}
              >
                <button
                  onClick={() => {
                    speedChange(40);
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Slow
                </button>
                <button
                  onClick={() => {
                    speedChange(25);
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Normal
                </button>
                <button
                  onClick={() => {
                    speedChange(10);
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Fast
                </button>
              </div>
            </div>
            <div>
              <button
                id="mobile-algorithm-toggle"
                className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center w-full px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleClear}
              >
                Clear
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                id="mobile-algorithm-dropdown"
                className={`${clearToggle && `hidden`} pl-4 space-y-1`}
              >
                <button
                  onClick={startClearBoard}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Clear Board
                </button>
                <button
                  onClick={startClearWallsAdnWeights}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Clear Walls and Weights
                </button>
                <button
                  onClick={startClearBombs}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Clear Bombs
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button className="text-white justify-center items-center bg-yellow-300 hover:bg-gray-700 hover:text-white px-10 py-2 rounded-md text-sm font-medium">
                Visualize
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
