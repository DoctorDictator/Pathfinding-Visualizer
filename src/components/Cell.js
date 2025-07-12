import React, { memo } from "react";
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

export default function Cell({ cellSize, row, col, cell, startNodeDrag }) {
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const originalType = getOriginalType(cell);
    if (originalType === 2 || originalType === 3 || originalType === 4) {
      startNodeDrag(row, col, originalType, e.clientX, e.clientY);
    }
  };

  let cellClass = `border border-gray-200 transform transition ease-in-out duration-150`;
  let bgClass = "";
  let imageSrc = null;
  let isScaled = false;

  if (cell === 0) {
    bgClass = "bg-gray-50";
  } else if (cell === 1) {
    bgClass = "bg-gray-800";
  } else if (cell === 6) {
    bgClass = `bg-blue-800`;
  } else if (cell === 7) {
    bgClass = `bg-blue-700`;
  } else if (cell === 8) {
    bgClass = `bg-blue-600`;
  } else if (cell === 9) {
    bgClass = `bg-blue-500`;
  } else if (cell === 10) {
    bgClass = `bg-blue-400`;
  } else if (cell === 11) {
    bgClass = `bg-blue-300`;
  } else if (cell >= 30 && cell <= 35) {
    const level = cell - 30;
    bgClass = `bg-blue-${800 - level * 100}`;
    imageSrc = weight;
  } else if (cell >= 36 && cell <= 41) {
    const level = cell - 36;
    bgClass = `bg-blue-${800 - level * 100}`;
    imageSrc = bomb;
  } else if (cell >= 42 && cell <= 47) {
    const level = cell - 42;
    bgClass = `bg-blue-${800 - level * 100}`;
    imageSrc = start;
  } else if (cell >= 48 && cell <= 53) {
    const level = cell - 48;
    bgClass = `bg-blue-${800 - level * 100}`;
    imageSrc = circle;
  } else if (cell === 12) {
    bgClass = "bg-yellow-300";
    isScaled = true;
  } else if (cell === 17) {
    bgClass = "bg-yellow-300";
    imageSrc = bomb;
    isScaled = true;
  } else if (cell === 18) {
    bgClass = "bg-yellow-300";
    imageSrc = weight;
    isScaled = true;
  } else if (cell === 19) {
    bgClass = "bg-yellow-300";
    imageSrc = circle;
    isScaled = true;
  } else if (cell === 20) {
    bgClass = "bg-yellow-300";
    imageSrc = start;
    isScaled = true;
  } else if (cell >= 13 && cell <= 16) {
    bgClass = "bg-yellow-300";
    isScaled = true;
    if (cell === 13) imageSrc = triangleRight;
    else if (cell === 14) imageSrc = triangletwoLeft;
    else if (cell === 15) imageSrc = triangletwoUp;
    else if (cell === 16) imageSrc = triangletwoDown;
  } else if (cell === 2) {
    bgClass = "bg-gray-50";
    imageSrc = start;
  } else if (cell === 3) {
    bgClass = "bg-gray-50";
    imageSrc = circle;
  } else if (cell === 4) {
    bgClass = "bg-gray-50";
    imageSrc = bomb;
  } else if (cell === 5) {
    bgClass = "bg-gray-50";
    imageSrc = weight;
  }

  cellClass += ` ${bgClass}`;
  if (isScaled) {
    cellClass += " scale-110";
  } else if (
    getOriginalType(cell) !== 2 &&
    getOriginalType(cell) !== 3 &&
    getOriginalType(cell) !== 4
  ) {
    cellClass += " hover:scale-110 scale-100";
  } else {
    cellClass += " scale-100";
  }

  return (
    <div
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
      {imageSrc && <Image src={imageSrc} width="100%" height="100%" />}
    </div>
  );
}
