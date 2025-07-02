import { useEffect, useState } from "react";

export default function Navbar() {
  const [algorithmToggle, setAlgorithmToggle] = useState(true);
  const [mazeAndPatternsToggle, setmazeAndPatternsToggle] = useState(true);
  const [speedToggle, setSpeedToggle] = useState(true);
  const [clearToggle, setClearToggle] = useState(true);
  const [menuToggle, setMenuToggle] = useState(true);

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

  return (
    <>
      <nav className="bg-gray-800 w-max-3xl">
        <div className="max-w-7xl py-4 mx-auto w-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="" className="text-white outline-none text-lg font-bold">
                PathFinding Visualizer
              </a>
            </div>
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
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
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Algorithm 1
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Algorithm 2
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Algorithm 3
                    </a>
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
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Recursive Division
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Recursive Division (vertical skew)
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Recursive Division (horizontal skew)
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Basic Random Maze
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Basic Weight Maze
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Simple Stair Pattern
                    </a>
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
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Slow
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Normal
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Fast
                    </a>
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
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Clear Board
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Clear Walls and Weights
                    </a>
                    <a
                      href=""
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Clear Walls and Weights
                    </a>
                  </div>
                </div>
                <button className="text-white bg-yellow-300 hover:bg-gray-700 hover:text-white px-10 py-2 rounded-md text-sm font-medium">
                  Visualize
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
            <a
              href=""
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
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
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Algorithm 1
                </a>
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Algorithm 2
                </a>
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Algorithm 3
                </a>
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
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Recursive Division
                </a>
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Recursive Division (vertical skew)
                </a>
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Recursive Division (horizontal skew)
                </a>
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Basic Random Maze
                </a>
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Basic Weight Maze
                </a>
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
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Slow
                </a>
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Normal
                </a>
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Fast
                </a>
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
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Clear Board
                </a>
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Clear Walls and Weights
                </a>
                <a
                  href=""
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Clear Walls and Weights
                </a>
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
