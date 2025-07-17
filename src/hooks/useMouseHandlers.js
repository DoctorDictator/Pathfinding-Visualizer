import { useState, useRef } from "react";
import produce from "immer";
import { getOriginalType, getVisShade, isPath } from "../utils";
import { getCellsBetween } from "../utils/helper";

export const useMouseHandlers = ({
  box,
  setBox,
  rows,
  cols,
  cellSize,
  gridRef,
  algoMap,
  lastAlgo,
}) => {
  const [dragging, setDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState(null);
  const lastMousePos = useRef(null);
  const isClick = useRef(false);

  const addWalls = (cells) => {
    if (draggedNode) return;
    setBox(
      produce((draft) => {
        cells.forEach(([row, col]) => {
          const originalType = getOriginalType(draft[row][col]);
          if (originalType !== 2 && originalType !== 3 && originalType !== 4) {
            draft[row][col] = originalType === 1 ? 0 : 1;
          }
        });
      })
    );
  };

  const startNodeDrag = (row, col, type, x, y) => {
    setDraggedNode({ row, col, type, x, y });
    setDragging(true);
    isClick.current = false;
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const gridElement = gridRef.current;
    if (!gridElement) return;
    const rect = gridElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      const originalType = getOriginalType(box[row][col]);
      if (originalType === 2 || originalType === 3 || originalType === 4) {
        startNodeDrag(row, col, originalType, e.clientX, e.clientY);
      } else {
        setDragging(true);
        isClick.current = true;
        addWalls([[row, col]]);
        lastMousePos.current = { x, y };
      }
    }
  };

  const handleMouseUp = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setDragging(false);
    lastMousePos.current = null;
    if (isClick.current && !draggedNode) {
      isClick.current = false;
      return;
    }
    if (!draggedNode) {
      isClick.current = false;
      return;
    }
    const gridElement = gridRef.current;
    if (!gridElement) {
      setDraggedNode(null);
      isClick.current = false;
      return;
    }
    const rect = gridElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const targetCol = Math.floor(x / cellSize);
    const targetRow = Math.floor(y / cellSize);
    if (
      targetRow < 0 ||
      targetRow >= rows ||
      targetCol < 0 ||
      targetCol >= cols
    ) {
      setDraggedNode(null);
      isClick.current = false;
      return;
    }
    if (targetRow === draggedNode.row && targetCol === draggedNode.col) {
      setDraggedNode(null);
      isClick.current = false;
      return;
    }
    if (
      getOriginalType(box[targetRow][targetCol]) === 2 ||
      getOriginalType(box[targetRow][targetCol]) === 3 ||
      getOriginalType(box[targetRow][targetCol]) === 4
    ) {
      setDraggedNode(null);
      isClick.current = false;
      return;
    }
    const clearedGrid = produce(box, (draft) => {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const val = draft[r][c];
          if (getVisShade(val) > -1) {
            draft[r][c] = getOriginalType(val);
          } else if (isPath(val)) {
            draft[r][c] = getOriginalType(val);
          }
        }
      }
    });
    const newBoxAfterMove = produce(clearedGrid, (draft) => {
      draft[draggedNode.row][draggedNode.col] = 0;
      draft[targetRow][targetCol] = draggedNode.type;
    });
    let finalGrid = newBoxAfterMove;
    if (lastAlgo && algoMap[lastAlgo]) {
      const generateFunc = algoMap[lastAlgo];
      const { newGrid } = generateFunc(newBoxAfterMove, rows, cols);
      finalGrid = newGrid;
    }
    setBox(finalGrid);
    setDraggedNode(null);
    isClick.current = false;
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
    } else if (row >= 0 && row < rows && col >= 0 && col < cols) {
      isClick.current = false;
      const cells = lastMousePos.current
        ? getCellsBetween(
            lastMousePos.current.x,
            lastMousePos.current.y,
            x,
            y,
            cellSize,
            rows,
            cols
          )
        : [[row, col]];
      addWalls(cells);
      lastMousePos.current = { x, y };
    }
  };

  return {
    dragging,
    draggedNode,
    setDraggedNode,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    startNodeDrag,
  };
};
