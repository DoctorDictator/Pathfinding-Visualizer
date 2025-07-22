export default function generateMazeRandom(box, rows, cols) {
  // 0: empty, 1: wall, 2: start, 3: end, 4: bombs, 5: weights

  const startValues = [2, 20, 42, 43, 44, 45];
  const endValues = [3, 19, 48, 49, 50, 51];
  const bombValues = [4, 17, 36, 37, 38, 39];

  const newGrid = box.map((row) => row.slice());
  let start = null,
    end = null,
    bombs = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (startValues.includes(box[i][j])) start = [i, j];
      if (endValues.includes(box[i][j])) end = [i, j];
      if (bombValues.includes(box[i][j])) bombs.push([i, j]);
    }
  }

  let animation = [];

  const reservedSet = new Set();
  if (start) {
    startValues.forEach((val) =>
      reservedSet.add(`${start[0]},${start[1]},${val}`)
    );
  }
  if (end) {
    endValues.forEach((val) => reservedSet.add(`${end[0]},${end[1]},${val}`));
  }
  bombs.forEach(([r, c]) => {
    bombValues.forEach((val) => reservedSet.add(`${r},${c},${val}`));
  });

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (
        startValues.includes(newGrid[i][j]) ||
        endValues.includes(newGrid[i][j]) ||
        bombValues.includes(newGrid[i][j]) ||
        reservedSet.has(`${i},${j},${newGrid[i][j]}`)
      ) {
        continue;
      }
      let ele = Math.random() < 0.3 ? 1 : 0;
      newGrid[i][j] = ele;
      if (newGrid[i][j] === 1) {
        animation.push([i, j]);
      }
    }
  }

  if (start) newGrid[start[0]][start[1]] = 2;
  if (end) newGrid[end[0]][end[1]] = 3;
  for (let i = 0; i < bombs.length; i++) {
    let [r, c] = bombs[i];
    newGrid[r][c] = 4;
  }

  return { newGrid, animation };
}
