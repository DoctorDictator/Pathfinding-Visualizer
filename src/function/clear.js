import { getOriginalType } from "../utils";

export default function generateClearPath(box, rows, cols) {
  const animation = [];
  const newGrid = box.map((row) => row.slice());
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = box[r][c];
      const original = getOriginalType(cell);
      if (cell !== original && original !== 1) {
        animation.push([r, c, original]);
        newGrid[r][c] = original;
      }
    }
  }
  return { newGrid, animation };
}
