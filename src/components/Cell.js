import React, { memo } from "react";
import triangleRight from "../icons/triangletwo-right.svg";
import circle from "../icons/circle.svg";
import weight from "../icons/weight.svg";
import bomb from "../icons/bomb.svg";
import Image from "./Image";

function Cell({ cellSize, row, col, cell, startNodeDrag }) {
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    if (cell === 2 || cell === 3 || cell === 4) {
      startNodeDrag(row, col, cell, e.clientX, e.clientY);
    }
  };

  let cellClass = `border border-gray-200 transform transition ease-in-out duration-0 ${
    cell === 1 ? "bg-gray-800" : "bg-gray-50"
  }`;

  if (cell === 2 || cell === 3 || cell === 4) {
    cellClass += " scale-100";
  } else {
    cellClass += " hover:scale-120 scale-100";
  }

  return (
    <div
      className={cellClass}
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        cursor: cell === 2 || cell === 3 ? "grab" : "default",
      }}
      onMouseDown={handleMouseDown}
    >
      {cell === 2 && <Image src={triangleRight} width="100%" height="100%" />}
      {cell === 3 && <Image src={circle} width="100%" height="100%" />}
      {cell === 4 && <Image src={bomb} width="100%" height="100%" />}
      {cell === 5 && <Image src={weight} width="100%" height="100%" />}
    </div>
  );
}

export default memo(Cell, (prevProps, nextProps) => {
  return (
    prevProps.cellSize === nextProps.cellSize &&
    prevProps.row === nextProps.row &&
    prevProps.col === nextProps.col &&
    prevProps.cell === nextProps.cell
  );
});
