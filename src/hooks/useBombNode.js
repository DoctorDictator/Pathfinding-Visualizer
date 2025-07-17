import { useEffect, useRef } from "react";
import produce from "immer";
import { getRandomRow, getRandomCol } from "../utils/helper";

export const useBombNode = ({
  bombNode,
  rows,
  cols,
  box,
  setBox,
  lastAlgo,
  setClearPath,
  setPendingAlgo,
}) => {
  const isInitialRender = useRef(true);
  const prevBombNode = useRef(null);

  useEffect(() => {
    if (isInitialRender.current || !rows || !cols) {
      isInitialRender.current = false;
      prevBombNode.current = bombNode;
      return;
    }
    if (prevBombNode.current === bombNode) {
      return;
    }
    if (bombNode === 0) {
      return;
    }
    let rowRandom = getRandomRow(rows);
    let colRandom = getRandomCol(cols);
    setBox(
      produce((draft) => {
        while (
          draft[rowRandom][colRandom] === 1 ||
          draft[rowRandom][colRandom] === 2 ||
          draft[rowRandom][colRandom] === 3 ||
          draft[rowRandom][colRandom] === 4
        ) {
          rowRandom = getRandomRow(rows);
          colRandom = getRandomCol(cols);
        }
        draft[rowRandom][colRandom] = 4;
        // bombSquad.push([rowRandom, colRandom]); // Assuming bombSquad is global or managed elsewhere
      })
    );
    if (lastAlgo) {
      setClearPath(true);
      setPendingAlgo(lastAlgo);
    }
    prevBombNode.current = bombNode;
  }, [
    bombNode,
    rows,
    cols,
    box,
    setBox,
    lastAlgo,
    setClearPath,
    setPendingAlgo,
  ]);
};
