import triangleRight from "../icons/triangletwo-right.svg";
import circle from "../icons/circle.svg";

import { useState, useEffect, useRef } from "react";
import Cell from "./Cell";
import Image from "./Image";

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default function Board() {
  // 0 -> path (default)
  // 1 -> wall
  // 2 -> starting node
  // 3 -> ending node
  const [dragging, setDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState(null); // { row, col, type, x, y }
  const gridRef = useRef(null);
  const [box, setBox] = useState([]);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [cellSize, setCellSize] = useState(20);

  const addWall = (row, column) => {
    if (draggedNode) return; // Skip wall drawing during node drag
    setBox((prevBox) => {
      const newBox = prevBox.map((r) => [...r]);
      if (newBox[row][column] === 0) {
        newBox[row][column] = 1;
      } else if (newBox[row][column] === 2 || newBox[row][column] === 3) {
        console.log(row, column);
      } else {
        newBox[row][column] = 0;
      }
      return newBox;
    });
  };

  const startNodeDrag = (row, col, type, x, y) => {
    setDraggedNode({ row, col, type, x, y });
    setDragging(true);
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      e.preventDefault();
      if (!draggedNode) {
        setDragging(true);
      }
    }
  };

  const handleMouseUp = (e) => {
    if (e.button !== 0) return;

    setDragging(false);
    if (!draggedNode) return;

    const gridElement = gridRef.current;
    if (!gridElement) {
      console.log("Grid element not found");
      setDraggedNode(null);
      return;
    }

    const rect = gridElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const targetCol = Math.floor(x / cellSize);
    const targetRow = Math.floor(y / cellSize);

    // console.log(`Drop at: targetRow=${targetRow}, targetCol=${targetCol}`);

    if (
      targetRow < 0 ||
      targetRow >= rows ||
      targetCol < 0 ||
      targetCol >= cols
    ) {
      setDraggedNode(null);
      return;
    }

    if (targetRow === draggedNode.row && targetCol === draggedNode.col) {
      setDraggedNode(null);
      return;
    }

    if (box[targetRow][targetCol] === 2 || box[targetRow][targetCol] === 3) {
      setDraggedNode(null);
      return;
    }

    setBox((prevBox) => {
      const newBox = prevBox.map((r) => [...r]);
      newBox[draggedNode.row][draggedNode.col] = 0; // Clear original
      newBox[targetRow][targetCol] = draggedNode.type; // Set new position
      return newBox;
    });

    setDraggedNode(null);
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
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
      }
    } else if (row >= 0 && row < rows && col >= 0 && col < cols) {
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

  useEffect(() => {
    updateGridSize();
    const debouncedUpdate = debounce(updateGridSize, 100);
    window.addEventListener("resize", debouncedUpdate);
    return () => window.removeEventListener("resize", debouncedUpdate);
  }, []);

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
              handleAddWall={addWall}
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
          className={`border border-gray-200 opacity-70 pointer-events-none `}
          style={{
            position: "absolute",
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            left: draggedNode.x - 25, // Small offset to align with cursor tip
            top: draggedNode.y - 110,
            zIndex: 10,
            cursor: "grabbing",
          }}
        >
          {draggedNode.type === 2 && (
            <Image src={triangleRight} width="100%" height="100%" />
          )}
          {draggedNode.type === 3 && (
            <Image src={circle} width="100%" height="100%" />
          )}
        </div>
      )}
    </div>
  );
}
