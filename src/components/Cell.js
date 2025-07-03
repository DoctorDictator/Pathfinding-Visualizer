import triangleRight from "../icons/triangletwo-right.svg";
import circle from "../icons/circle.svg";

import Image from "./Image";

export default function Cell({
  cellSize,
  handleAddWall,
  row,
  col,
  cell,
  startNodeDrag,
}) {
  const handleMouseDown = (e) => {
    e.preventDefault();
    if (cell === 2 || cell === 3) {
      startNodeDrag(row, col, cell, e.clientX, e.clientY);
      return;
    }
    handleAddWall(row, col);
  };

  return (
    <div
      className={`border border-gray-200 transform transition duration-100 ease-in-out hover:scale-120 scale-100 ${
        cell === 1 ? "bg-gray-800" : "bg-gray-50 hover:bg-gray-100"
      }`}
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        cursor: cell === 2 || cell === 3 ? "grab" : "default",
      }}
      onMouseDown={handleMouseDown}
    >
      {cell === 2 && <Image src={triangleRight} width="100%" height="100%" />}
      {cell === 3 && <Image src={circle} width="100%" height="100%" />}
    </div>
  );
}
