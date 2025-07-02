export default function Cell({ cellSize, handleAddWall, row, col, cell }) {
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleAddWall(row, col);
  };

  return (
    <div
      className={`border border-gray-200  transform transition  ease-in-out hover:scale-120 scale-100" ${
        cell === 1 ? "bg-gray-800" : "bg-gray-50 hover:bg-gray-100"
      }`}
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
      }}
      onMouseDown={handleMouseDown}
      onDragStart={(e) => e.preventDefault()}
    ></div>
  );
}
