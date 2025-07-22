export default function generateClearBoard(box, rows, cols) {
  // 0: empty, 1: wall, 2: start, 3: end, 4: bombs, 5: weights
  const startValues = [2, 20, 42, 43, 44, 45];
  const endValues = [3, 19, 48, 49, 50, 51];

  const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
  let start = null,
    end = null;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (startValues.includes(box[i][j])) start = [i, j];
      if (endValues.includes(box[i][j])) end = [i, j];
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
