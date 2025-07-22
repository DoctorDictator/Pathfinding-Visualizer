function chooseOrientation(width, height) {
  if (width < height) return "Horizontal";
  else if (height < width / 10) return "Vertical";
  return Math.random() < 0.5 ? "Horizontal" : "Vertical";
}

function divide(
  grid,
  animation,
  startRow,
  endRow,
  startCol,
  endCol,
  orientation,
  reservedSet
) {
  if (endRow - startRow < 2 || endCol - startCol < 2) return;

  if (orientation === "Horizontal") {
    const possibleRows = [];
    for (let i = startRow + 1; i < endRow; i += 2) possibleRows.push(i);
    const possibleCols = [];
    for (let i = startCol; i <= endCol; i += 2) possibleCols.push(i);
    const row = possibleRows[Math.floor(Math.random() * possibleRows.length)];
    const hole = possibleCols[Math.floor(Math.random() * possibleCols.length)];
    for (let col = startCol; col <= endCol; col++) {
      if (col === hole || reservedSet.has(`${row},${col}`)) continue;
      grid[row][col] = 1;
      animation.push([row, col]);
    }
    divide(
      grid,
      animation,
      startRow,
      row - 1,
      startCol,
      endCol,
      chooseOrientation(endCol - startCol + 1, row - startRow),
      reservedSet
    );
    divide(
      grid,
      animation,
      row + 1,
      endRow,
      startCol,
      endCol,
      chooseOrientation(endCol - startCol + 1, endRow - row),
      reservedSet
    );
  } else {
    const possibleCols = [];
    for (let i = startCol + 1; i < endCol; i += 2) possibleCols.push(i);
    const possibleRows = [];
    for (let i = startRow; i <= endRow; i += 2) possibleRows.push(i);
    const col = possibleCols[Math.floor(Math.random() * possibleCols.length)];
    const hole = possibleRows[Math.floor(Math.random() * possibleRows.length)];
    for (let row = startRow; row <= endRow; row++) {
      if (row === hole || reservedSet.has(`${row},${col}`)) continue;
      grid[row][col] = 1;
      animation.push([row, col]);
    }
    divide(
      grid,
      animation,
      startRow,
      endRow,
      startCol,
      col - 1,
      chooseOrientation(col - startCol, endRow - startRow + 1),
      reservedSet
    );
    divide(
      grid,
      animation,
      startRow,
      endRow,
      col + 1,
      endCol,
      chooseOrientation(endCol - col, endRow - startRow + 1),
      reservedSet
    );
  }
}

export default function generateMazeHorizontal(box, rows, cols) {
  // 0: empty, 1: wall, 2: start, 3: end, 4: bombs, 5: weights

  const startValues = [2, 20, 42, 43, 44, 45];
  const endValues = [3, 19, 48, 49, 50, 51];
  const bombValues = [4, 17, 36, 37, 38, 39];

  const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
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

  for (let i = 0; i < rows; i++) {
    newGrid[i][0] = 1;
    newGrid[i][cols - 1] = 1;
    animation.push([i, 0]);
    animation.push([i, cols - 1]);
  }
  for (let j = 0; j < cols; j++) {
    newGrid[0][j] = 1;
    newGrid[rows - 1][j] = 1;
    animation.push([0, j]);
    animation.push([rows - 1, j]);
  }

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

  divide(
    newGrid,
    animation,
    1,
    rows - 2,
    1,
    cols - 2,
    chooseOrientation(cols - 2, rows - 2),
    reservedSet
  );

  if (start) newGrid[start[0]][start[1]] = 2;
  if (end) newGrid[end[0]][end[1]] = 3;
  for (let i = 0; i < bombs.length; i++) {
    let [r, c] = bombs[i];
    newGrid[r][c] = 4;
  }

  return { newGrid, animation };
}
