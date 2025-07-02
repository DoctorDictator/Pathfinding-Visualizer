import { useState, useEffect, useRef } from "react";
import Cell from "./Cell";

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default function Board() {
  const [dragging, setDragging] = useState(false);
  const gridRef = useRef(null);
  const [box, setBox] = useState([]);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [cellSize, setCellSize] = useState(20);

  const addWall = (row, column) => {
    setBox((prevBox) => {
      const newBox = prevBox.map((r) => [...r]);
      if (newBox[row][column] === 0) {
        newBox[row][column] = 1;
      } else {
        newBox[row][column] = 0;
      }
      return newBox;
    });
  };
  const handleMouseDown = (e) => {
    if (e.button === 0) {
      e.preventDefault();
      setDragging(true);
    }
  };

  const handleMouseUp = (e) => {
    if (e.button === 0) {
      setDragging(false);
    }
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

    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      addWall(row, col);
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

    setBox(newBox);
    setRows(maxRows);
    setCols(maxCols);
    setCellSize(baseCellSize);
  };

  useEffect(() => {
    updateGridSize();
    const debouncedUpdate = debounce(updateGridSize, 100);
    window.addEventListener("resize", debouncedUpdate);
    return () => window.removeEventListener("resize", debouncedUpdate);
  }, []);

  return (
    <div className="w-full h-full p-1 sm:p-2 md:p-3 flex justify-center">
      <div
        ref={gridRef}
        className="grid bg-white rounded-lg shadow-xl border border-gray-200"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 4px 0 6px rgba(0, 0, 0, 0.1), -4px 0 6px rgba(0, 0, 0, 0.1)",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        {box.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <Cell
              handleAddWall={addWall}
              grid={box}
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              cell={box[rowIndex][colIndex]}
            />
          ))
        )}
      </div>
    </div>
  );
}
