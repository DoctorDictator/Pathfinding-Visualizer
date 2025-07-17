import { useState, useEffect } from "react";
import { debounce } from "../utils/helper";

export const useGridResize = () => {
  const [box, setBox] = useState([]);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [cellSize, setCellSize] = useState(20);

  const updateGridSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isWide = width > height;
    const margin = width < 640 ? 16 : width < 768 ? 24 : 32;
    const availableWidth = width - 2 * margin;
    const availableHeight = height - 2 * margin;
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
    const newBox = Array.from({ length: maxRows }, () =>
      Array.from({ length: maxCols }, () => 0)
    );
    const startRow = Math.floor(maxRows / 2);
    const startCol = Math.floor(maxCols / 4);
    const endRow = startRow;
    const endCol = Math.floor((maxCols * 3) / 4);
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

  return { box, setBox, rows, cols, cellSize };
};
