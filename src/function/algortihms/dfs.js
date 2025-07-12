import { getOriginalType } from "../../utils";

function getDir(from, to) {
  const dr = to[0] - from[0];
  const dc = to[1] - from[1];
  if (dc === 1) return "right";
  if (dc === -1) return "left";
  if (dr === 1) return "down";
  if (dr === -1) return "up";
}

function dfsSegment(box, rows, cols, startPos, endPos, offset = 0) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
  const distMap = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const stack = [];
  const [sr, sc] = startPos;
  stack.push(startPos);
  visited[sr][sc] = true;
  distMap[sr][sc] = offset;
  let visitedOrder = [];
  let found = false;
  while (stack.length > 0) {
    const [r, c] = stack.pop();
    visitedOrder.push({ r, c, dist: distMap[r][c] });
    if (r === endPos[0] && c === endPos[1]) {
      found = true;
      break;
    }
    for (let [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        !visited[nr][nc] &&
        getOriginalType(box[nr][nc]) !== 1
      ) {
        visited[nr][nc] = true;
        stack.push([nr, nc]);
        parent[nr][nc] = [r, c];
        distMap[nr][nc] = distMap[r][c] + 1;
      }
    }
  }
  if (!found) return { visitedOrder: [], path: [], distToTarget: Infinity };
  let path = [];
  let curr = endPos;
  while (curr) {
    path.push(curr);
    if (!parent[curr[0]][curr[1]]) break;
    curr = parent[curr[0]][curr[1]];
  }
  path.reverse();
  const distToTarget = distMap[endPos[0]][endPos[1]];
  return { visitedOrder, path, distToTarget };
}

export default function generateDfs(box, rows, cols) {
  let start = null;
  let end = null;
  const bombSquad = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (getOriginalType(box[r][c]) === 2) start = [r, c];
      if (getOriginalType(box[r][c]) === 3) end = [r, c];
      if (getOriginalType(box[r][c]) === 4) bombSquad.push([r, c]);
    }
  }
  if (!start || !end) return { newGrid: box, animation: [] };
  const typeGrid = box.map((row) => row.map((cell) => getOriginalType(cell)));
  const targets = bombSquad.length > 0 ? [...bombSquad, end] : [end];
  let totalVisitedOrder = [];
  let totalPath = [start];
  let currentStart = start;
  let offset = 0;
  let pathComplete = true;
  for (let target of targets) {
    const { visitedOrder, path, distToTarget } = dfsSegment(
      box,
      rows,
      cols,
      currentStart,
      target,
      offset
    );
    if (path.length === 0) {
      pathComplete = false;
      break;
    }
    totalVisitedOrder = [...totalVisitedOrder, ...visitedOrder];
    totalPath = [...totalPath, ...path.slice(1)];
    currentStart = target;
    offset = distToTarget;
  }
  const normalVisitedBase = 6;
  const weightVisitedBase = 30;
  const bombVisitedBase = 36;
  const startVisitedBase = 42;
  const endVisitedBase = 48;
  function getBase(origType) {
    if (origType === 5) return weightVisitedBase;
    if (origType === 4) return bombVisitedBase;
    if (origType === 2) return startVisitedBase;
    if (origType === 3) return endVisitedBase;
    return normalVisitedBase;
  }
  const animation = [];
  let currentMaxDist = -1;
  const cellShade = Array.from({ length: rows }, () => Array(cols).fill(-1));
  const visitedCells = [];
  for (let v of totalVisitedOrder) {
    const { r, c, dist } = v;
    if (dist > currentMaxDist) {
      for (let pv of visitedCells) {
        const pr = pv.r;
        const pc = pv.c;
        if (cellShade[pr][pc] < 5) {
          cellShade[pr][pc]++;
          const pbase = getBase(typeGrid[pr][pc]);
          animation.push([pr, pc, pbase + cellShade[pr][pc]]);
        }
      }
      currentMaxDist = dist;
    }
    cellShade[r][c] = 0;
    const thisBase = getBase(typeGrid[r][c]);
    animation.push([r, c, thisBase + 0]);
    visitedCells.push(v);
  }
  const finalGrid = box.map((row) => row.slice());
  for (let v of totalVisitedOrder) {
    const { r, c } = v;
    const shade = cellShade[r][c];
    const base = getBase(typeGrid[r][c]);
    finalGrid[r][c] = base + shade;
  }
  if (!pathComplete) {
    return { newGrid: finalGrid, animation };
  }
  const arrowValues = {
    right: 13,
    left: 14,
    up: 15,
    down: 16,
  };
  const n = totalPath.length;
  if (n >= 2) {
    let dir = getDir(totalPath[0], totalPath[1]);
    animation.push([totalPath[0][0], totalPath[0][1], arrowValues[dir]]);
    for (let i = 1; i < n - 1; i++) {
      const prevR = totalPath[i - 1][0];
      const prevC = totalPath[i - 1][1];
      const origType = typeGrid[prevR][prevC];
      let yVal = 12;
      if (origType === 4) yVal = 17;
      else if (origType === 5) yVal = 18;
      else if (origType === 3) yVal = 19;
      else if (origType === 2) yVal = 20;
      animation.push([prevR, prevC, yVal]);
      dir = getDir(totalPath[i], totalPath[i + 1]);
      animation.push([totalPath[i][0], totalPath[i][1], arrowValues[dir]]);
    }
    const prevR = totalPath[n - 2][0];
    const prevC = totalPath[n - 2][1];
    const origType = typeGrid[prevR][prevC];
    let yVal = 12;
    if (origType === 4) yVal = 17;
    else if (origType === 5) yVal = 18;
    else if (origType === 3) yVal = 19;
    else if (origType === 2) yVal = 20;
    animation.push([prevR, prevC, yVal]);
    const endR = totalPath[n - 1][0];
    const endC = totalPath[n - 1][1];
    animation.push([endR, endC, 19]);
  }
  for (let i = 0; i < n; i++) {
    const [r, c] = totalPath[i];
    const origType = typeGrid[r][c];
    let yVal = 12;
    if (origType === 4) yVal = 17;
    else if (origType === 5) yVal = 18;
    else if (origType === 3) yVal = 19;
    else if (origType === 2) yVal = 20;
    finalGrid[r][c] = yVal;
  }
  return { newGrid: finalGrid, animation };
}
