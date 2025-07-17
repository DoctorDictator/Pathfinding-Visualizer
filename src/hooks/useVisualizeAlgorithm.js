import { useEffect } from "react";
import produce from "immer";

export const useVisualizeAlgorithm = ({
  trigger,
  setTrigger,
  generateFunc,
  box,
  rows,
  cols,
  setBox,
  setIsVisualizing,
  setLastAlgo,
  algoName,
  dependencies = [],
}) => {
  useEffect(() => {
    if (trigger && rows > 0 && cols > 0 && box.length > 0) {
      setLastAlgo(algoName);
      setIsVisualizing(true);
      const { newGrid, animation } = generateFunc(box, rows, cols);
      let i = 0;
      const batchSize = 10;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          setTrigger(false);
          setIsVisualizing(false);
          return;
        }
        let updates = [];
        for (let j = 0; j < batchSize && i < animation.length; j++, i++) {
          const cellUpdate = animation[i];
          if (Array.isArray(cellUpdate) && cellUpdate.length === 3) {
            updates.push(cellUpdate);
          }
        }
        if (updates.length > 0) {
          setBox((prev) =>
            produce(prev, (draft) => {
              updates.forEach(([r, c, val]) => {
                draft[r][c] = val;
              });
            })
          );
        }
        requestAnimationFrame(animateStep);
      }
      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
      } else if (newGrid) {
        setBox(newGrid);
        setTrigger(false);
        setIsVisualizing(false);
      }
    }
  }, [trigger, rows, cols, box.length, ...dependencies]);
};
