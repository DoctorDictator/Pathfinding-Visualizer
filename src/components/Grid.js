import Cell from "./Cell";
import Image from "./Image";
import start from "../icons/start.svg";
import circle from "../icons/circle.svg";
import bomb from "../icons/bomb.svg";

export default function Grid({
  box,
  rows,
  cols,
  cellSize,
  gridRef,
  handleMouseDown,
  handleMouseUp,
  handleMouseMove,
  draggedNode,
  startNodeDrag,
}) {
  return (
    <div className="w-full h-full p-4 sm:p-6 md:p-8 flex justify-center items-center relative bg-black">
      <div
        ref={gridRef}
        className="grid bg-black rounded-md shadow-md border border-slate-800 overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          boxShadow:
            "0 4px 6px -1px rgba(0, 0,0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
          userSelect: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        {box.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
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
          className="border border-slate-700 bg-black/80 opacity-90 pointer-events-none rounded-md shadow-sm ring-1 ring-slate-500"
          style={{
            position: "absolute",
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            left: `${draggedNode.x - 25}px`,
            top: `${draggedNode.y - 70}px`,
            zIndex: 10,
            cursor: "grabbing",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {draggedNode.type === 2 && (
            <Image
              src={start}
              width="80%"
              height="80%"
              className="text-purple-400"
            />
          )}
          {draggedNode.type === 3 && (
            <Image
              src={circle}
              width="80%"
              height="80%"
              className="text-purple-400"
            />
          )}
          {draggedNode.type === 4 && (
            <Image
              src={bomb}
              width="80%"
              height="80%"
              className="text-purple-400"
            />
          )}
        </div>
      )}
    </div>
  );
}
