import React, { memo, useEffect, useRef } from "react";
import start from "../icons/start.svg";
import triangleRight from "../icons/triangletwo-right.svg";
import triangletwoLeft from "../icons/triangletwo-left.svg";
import triangletwoUp from "../icons/triangletwo-up.svg";
import triangletwoDown from "../icons/triangletwo-down.svg";
import circle from "../icons/circle.svg";
import weight from "../icons/weight.svg";
import bomb from "../icons/bomb.svg";
import Image from "./Image";
import { getOriginalType } from "../utils";

const visitedColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-cyan-500",
  "bg-violet-500",
  "bg-indigo-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-emerald-500",
];

const pathColor = "bg-amber-400";

function Cell({ cellSize, row, col, cell, startNodeDrag }) {
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const originalType = getOriginalType(cell);
    if (originalType === 2 || originalType === 3 || originalType === 4) {
      startNodeDrag(row, col, originalType, e.clientX, e.clientY);
    }
  };

  const cellRef = useRef(null);

  useEffect(() => {
    if (cell >= 6 && cell <= 11 && cellRef.current) {
      cellRef.current.classList.remove("animate-boink");
      void cellRef.current.offsetWidth; // Force reflow
      cellRef.current.classList.add("animate-boink");
    }
  }, [cell]);

  let cellClass = `border border-slate-800 transform transition-colors duration-150 ease-in-out relative overflow-hidden`;
  let bgClass = "";
  let imageSrc = null;
  let isScaled = false;

  if (cell === 0) {
    bgClass = "bg-slate-900";
  } else if (cell === 1) {
    bgClass = "bg-black";
  } else if (cell >= 6 && cell <= 11) {
    bgClass = visitedColors[(cell - 6) % visitedColors.length];
  } else if (cell >= 30 && cell <= 35) {
    const level = cell - 30;
    bgClass = visitedColors[level % visitedColors.length];
    imageSrc = weight;
  } else if (cell >= 36 && cell <= 41) {
    const level = cell - 36;
    bgClass = visitedColors[level % visitedColors.length];
    imageSrc = bomb;
  } else if (cell >= 42 && cell <= 47) {
    const level = cell - 42;
    bgClass = visitedColors[level % visitedColors.length];
    imageSrc = start;
  } else if (cell >= 48 && cell <= 53) {
    const level = cell - 48;
    bgClass = visitedColors[level % visitedColors.length];
    imageSrc = circle;
  } else if (cell === 12) {
    bgClass = pathColor;
    isScaled = true;
  } else if (cell === 17) {
    bgClass = pathColor;
    imageSrc = bomb;
    isScaled = true;
  } else if (cell === 18) {
    bgClass = pathColor;
    imageSrc = weight;
    isScaled = true;
  } else if (cell === 19) {
    bgClass = pathColor;
    imageSrc = circle;
    isScaled = true;
  } else if (cell === 20) {
    bgClass = pathColor;
    imageSrc = start;
    isScaled = true;
  } else if (cell >= 13 && cell <= 16) {
    bgClass = pathColor;
    isScaled = true;
    if (cell === 13) imageSrc = triangleRight;
    else if (cell === 14) imageSrc = triangletwoLeft;
    else if (cell === 15) imageSrc = triangletwoUp;
    else if (cell === 16) imageSrc = triangletwoDown;
  } else if (cell === 2) {
    bgClass = "bg-slate-900";
    imageSrc = start;
  } else if (cell === 3) {
    bgClass = "bg-slate-900";
    imageSrc = circle;
  } else if (cell === 4) {
    bgClass = "bg-slate-900";
    imageSrc = bomb;
  } else if (cell === 5) {
    bgClass = "bg-slate-900";
    imageSrc = weight;
  }

  cellClass += ` ${bgClass}`;
  if (isScaled) {
    cellClass += " scale-105";
  } else if (
    getOriginalType(cell) !== 2 &&
    getOriginalType(cell) !== 3 &&
    getOriginalType(cell) !== 4
  ) {
    cellClass +=
      " hover:scale-105 hover:ring-1 hover:ring-purple-500/50 scale-100";
  } else {
    cellClass += " scale-100";
  }

  return (
    <div
      ref={cellRef}
      className={cellClass}
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        cursor:
          getOriginalType(cell) === 2 || getOriginalType(cell) === 3
            ? "grab"
            : "default",
      }}
      onMouseDown={handleMouseDown}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          width="100%"
          height="100%"
          className="text-slate-300 hover:text-purple-300 transition-colors duration-150"
        />
      )}
      <style jsx>{`
        .animate-boink {
          animation: boink 0.15s ease-out forwards;
        }
        @keyframes boink {
          0% {
            clip-path: circle(0% at 50% 50%);
          }
          100% {
            clip-path: circle(100% at 50% 50%);
          }
        }
      `}</style>
    </div>
  );
}

export default memo(Cell);
