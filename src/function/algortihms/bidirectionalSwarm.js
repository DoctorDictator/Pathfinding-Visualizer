import { getOriginalType } from "../../utils";

function getDir(from, to) {
  const dr = to[0] - from[0];
  const dc = to[1] - from[1];
  if (dc === 1) return "right";
  if (dc === -1) return "left";
  if (dr === 1) return "down";
  if (dr === -1) return "up";
}

function manhattan(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function getCost(type) {
  return type === 5 ? 15 : 1;
}

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  push(item, priority) {
    this.heap.push({ item, priority });
    this.heapifyUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    const root = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }
    return root.item;
  }

  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].priority < this.heap[parentIndex].priority) {
        [this.heap[index], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[index],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown(index) {
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;
      if (
        left < this.heap.length &&
        this.heap[left].priority < this.heap[smallest].priority
      ) {
        smallest = left;
      }
      if (
        right < this.heap.length &&
        this.heap[right].priority < this.heap[smallest].priority
      ) {
        smallest = right;
      }
      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[index],
        ];
        index = smallest;
      } else {
        break;
      }
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function bidirectionalSwarmSegment(
  box,
  rows,
  cols,
  startPos,
  endPos,
  offset = 0
) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const visitedStart = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );
  const visitedEnd = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );
  const parentStart = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );
  const parentEnd = Array.from({ length: rows }, () => Array(cols).fill(null));
  const distMapStart = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const distMapEnd = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const pqStart = new PriorityQueue();
  const pqEnd = new PriorityQueue();
  const [sr, sc] = startPos;
  const [er, ec] = endPos;
  pqStart.push([sr, sc], offset + 0.5 * manhattan(startPos, endPos));
  pqEnd.push([er, ec], 0 + 0.5 * manhattan(endPos, startPos));
  distMapStart[sr][sc] = offset;
  distMapEnd[er][ec] = 0;
  let visitedOrder = [];
  let found = false;
  let meetPoint = null;
  while (!pqStart.isEmpty() && !pqEnd.isEmpty()) {
    // Start side
    const [r1, c1] = pqStart.pop();
    if (visitedStart[r1][c1]) continue;
    visitedStart[r1][c1] = true;
    visitedOrder.push({ r: r1, c: c1, dist: distMapStart[r1][c1] });
    if (visitedEnd[r1][c1]) {
      found = true;
      meetPoint = [r1, c1];
      break;
    }
    for (let [dr, dc] of directions) {
      const nr = r1 + dr;
      const nc = c1 + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        !visitedStart[nr][nc] &&
        getOriginalType(box[nr][nc]) !== 1
      ) {
        const newDist =
          distMapStart[r1][c1] + getCost(getOriginalType(box[nr][nc]));
        if (newDist < distMapStart[nr][nc]) {
          distMapStart[nr][nc] = newDist;
          parentStart[nr][nc] = [r1, c1];
          pqStart.push([nr, nc], newDist + 0.5 * manhattan([nr, nc], endPos));
        }
      }
    }

    // End side
    const [r2, c2] = pqEnd.pop();
    if (visitedEnd[r2][c2]) continue;
    visitedEnd[r2][c2] = true;
    visitedOrder.push({ r: r2, c: c2, dist: distMapEnd[r2][c2] });
    if (visitedStart[r2][c2]) {
      found = true;
      meetPoint = [r2, c2];
      break;
    }
    for (let [dr, dc] of directions) {
      const nr = r2 + dr;
      const nc = c2 + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        !visitedEnd[nr][nc] &&
        getOriginalType(box[nr][nc]) !== 1
      ) {
        const newDist =
          distMapEnd[r2][c2] + getCost(getOriginalType(box[nr][nc]));
        if (newDist < distMapEnd[nr][nc]) {
          distMapEnd[nr][nc] = newDist;
          parentEnd[nr][nc] = [r2, c2];
          pqEnd.push([nr, nc], newDist + 0.5 * manhattan([nr, nc], startPos));
        }
      }
    }
  }
  if (!found) return { visitedOrder: [], path: [], distToTarget: Infinity };
  // Reconstruct path from start to meet
  let path = [];
  let curr = meetPoint;
  while (curr) {
    path.push(curr);
    if (!parentStart[curr[0]][curr[1]]) break;
    curr = parentStart[curr[0]][curr[1]];
  }
  path.reverse();
  // Add from meet to end (excluding meet if already added)
  curr = parentEnd[meetPoint[0]][meetPoint[1]];
  while (curr) {
    path.push(curr);
    curr = parentEnd[curr[0]][curr[1]];
  }
  const distToTarget =
    distMapStart[meetPoint[0]][meetPoint[1]] +
    distMapEnd[meetPoint[0]][meetPoint[1]];
  return { visitedOrder, path, distToTarget };
}

export default function generateBidirectionalSwarm(box, rows, cols) {
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
    const { visitedOrder, path, distToTarget } = bidirectionalSwarmSegment(
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
