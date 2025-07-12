export function getOriginalType(cell) {
  if (
    cell === 0 ||
    (cell >= 6 && cell <= 11) ||
    cell === 12 ||
    (cell >= 13 && cell <= 16)
  )
    return 0;
  if (cell === 1) return 1;
  if (cell === 5 || (cell >= 30 && cell <= 35) || cell === 18) return 5;
  if (cell === 4 || (cell >= 36 && cell <= 41) || cell === 17) return 4;
  if (cell === 3 || (cell >= 48 && cell <= 53) || cell === 19) return 3;
  if (cell === 2 || (cell >= 42 && cell <= 47) || cell === 20) return 2;
  return 0;
}

export function getVisShade(cell) {
  if (cell >= 6 && cell <= 11) return cell - 6;
  if (cell >= 30 && cell <= 35) return cell - 30;
  if (cell >= 36 && cell <= 41) return cell - 36;
  if (cell >= 42 && cell <= 47) return cell - 42;
  if (cell >= 48 && cell <= 53) return cell - 48;
  return -1;
}

export function isPath(cell) {
  return [12, 17, 18, 19, 20].includes(cell);
}
