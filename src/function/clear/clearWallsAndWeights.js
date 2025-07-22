export default function generateClearWallsAndWeights(box, rows, cols) {
  // 0: empty, 1: wall, 2: start, 3: end, 4: bombs, 5: weights

  const bombValues = [4, 17, 36, 37, 38, 39];
  const clearValues = [1, 5];

  const newGrid = box.map((row) => row.slice());
  let bombs = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (bombValues.includes(box[i][j])) bombs.push([i, j]);
    }
  }

  let animation = [];

  for (let i = 0; i < rows; i++) {
    if (clearValues.includes(newGrid[i][0])) {
      newGrid[i][0] = 0;
      animation.push([i, 0]);
    }
    if (clearValues.includes(newGrid[i][cols - 1])) {
      newGrid[i][cols - 1] = 0;
      animation.push([i, cols - 1]);
    }
  }
  for (let j = 0; j < cols; j++) {
    if (clearValues.includes(newGrid[0][j])) {
      newGrid[0][j] = 0;
      animation.push([0, j]);
    }
    if (clearValues.includes(newGrid[rows - 1][j])) {
      newGrid[rows - 1][j] = 0;
      animation.push([rows - 1, j]);
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (clearValues.includes(newGrid[i][j])) {
        newGrid[i][j] = 0;
        animation.push([i, j]);
      }
    }
  }

  return { newGrid, animation };
}
