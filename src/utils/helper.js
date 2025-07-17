export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const getCellsBetween = (x0, y0, x1, y1, cellSize, rows, cols) => {
  const cells = [];
  const col0 = Math.floor(x0 / cellSize);
  const row0 = Math.floor(y0 / cellSize);
  const col1 = Math.floor(x1 / cellSize);
  const row1 = Math.floor(y1 / cellSize);

  if (
    row0 < 0 ||
    row0 >= rows ||
    col0 < 0 ||
    col0 >= cols ||
    row1 < 0 ||
    row1 >= rows ||
    col1 < 0 ||
    col1 >= cols
  ) {
    return cells;
  }

  const dx = col1 - col0;
  const dy = row1 - row0;
  const steps = Math.max(Math.abs(dx), Math.abs(dy)) + 1;

  for (let i = 0; i <= steps; i++) {
    const t = steps === 0 ? 0 : i / steps;
    const row = Math.round(row0 + dy * t);
    const col = Math.round(col0 + dx * t);
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      cells.push([row, col]);
    }
  }

  return cells;
};

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomRow(rows) {
  return getRandomNumber(0, rows - 1);
}

export function getRandomCol(cols) {
  return getRandomNumber(0, cols - 1);
}
