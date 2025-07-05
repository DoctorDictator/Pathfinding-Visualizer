export default function generateMazeRandomWithWeights(box, rows, cols) {
  // 0: empty, 1: wall, 2: start, 3: end, 4: weight
  const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
  let start = null,
    end = null,
    weight = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (box[i][j] === 2) start = [i, j];
      if (box[i][j] === 3) end = [i, j];
      if (box[i][j] === 4) weight.push([i, j]);
    }
  }
  let animation = [];

  const reservedSet = new Set();
  if (start) reservedSet.add(`${start[0]},${start[1]}`);
  if (end) reservedSet.add(`${end[0]},${end[1]}`);
  if (weight) reservedSet.add(`${weight[0]},${weight[1]}`);

  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      newGrid[i][j] = 0;
    }
  }

  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      let ele = Math.random() < 0.3 ? 5 : 0;
      newGrid[i][j] = ele;
      if (newGrid[i][j] === 5) {
        animation.push([i, j]);
      }
    }
  }

  if (start) newGrid[start[0]][start[1]] = 2;
  if (end) newGrid[end[0]][end[1]] = 3;
  for (let i = 0; i < weight.length; i++) {
    let [r, c] = weight[i];
    newGrid[r][c] = 4;
  }

  return { newGrid, animation };
}
