export default function generateClearBoard(box, rows, cols) {
  // 0: empty, 1: wall, 2: start, 3: end, 4: bombst, 5: weights
  const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
  let start = null,
    end = null;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (box[i][j] === 2) start = [i, j];
      if (box[i][j] === 3) end = [i, j];
    }
  }

  let animation = [];

  for (let i = 0; i < rows; i++) {
    newGrid[i][0] = 0;
    newGrid[i][cols - 1] = 0;
    animation.push([i, 0]);
    animation.push([i, cols - 1]);
  }
  for (let j = 0; j < cols; j++) {
    newGrid[0][j] = 0;
    newGrid[rows - 1][j] = 0;
    animation.push([0, j]);
    animation.push([rows - 1, j]);
  }

  const reservedSet = new Set();
  if (start) reservedSet.add(`${start[0]},${start[1]}`);
  if (end) reservedSet.add(`${end[0]},${end[1]}`);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      newGrid[i][j] = 0;
      animation.push([i, j]);
    }
  }

  if (start) newGrid[start[0]][start[1]] = 2;
  if (end) newGrid[end[0]][end[1]] = 3;

  return { newGrid, animation };
}
