function chooseOrientation(width, height) {
  if (width < height) return "Horizontal";
  else if (height < width) return "Vertical";
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

export default function generateMaze(box, rows, cols) {
  // 0: empty, 1: wall, 2: start, 3: end, 4: bombst, 5: weights
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
  // Place outer walls
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

  // Reserve start/end/bombs positions
  const reservedSet = new Set();
  if (start) reservedSet.add(`${start[0]},${start[1]}`);
  if (end) reservedSet.add(`${end[0]},${end[1]}`);
  if (weight) reservedSet.add(`${weight[0]},${weight[1]}`);

  // Fill everything inside with empty first
  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      newGrid[i][j] = 0;
    }
  }

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

  // Restore start/end/bombs
  if (start) newGrid[start[0]][start[1]] = 2;
  if (end) newGrid[end[0]][end[1]] = 3;
  for (let i = 0; i < weight.length; i++) {
    let [r, c] = weight[i];
    newGrid[r][c] = 4;
  }

  return { newGrid, animation };
}
