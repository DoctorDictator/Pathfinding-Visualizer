import { useEffect } from "react";
import produce from "immer";

export const useVisualizeMaze = ({
  trigger,
  startFunc,
  generateFunc,
  box,
  rows,
  cols,
  setBox,
  speed,
  wallValue = 1,
  dependencies = [],
}) => {
  useEffect(() => {
    if (trigger && rows > 0 && cols > 0 && box.length > 0) {
      const { newGrid, animation } = generateFunc(box, rows, cols);
      let i = 0;
      function animateStep() {
        if (!Array.isArray(animation) || i >= animation.length) {
          setBox(newGrid);
          startFunc();
          return;
        }
        const cell = animation[i];
        if (Array.isArray(cell) && cell.length === 2) {
          setBox((prev) =>
            produce(prev, (draft) => {
              const [r, c] = cell;
              if (draft[r][c] !== 2 && draft[r][c] !== 3 && draft[r][c] !== 4) {
                draft[r][c] = wallValue;
              }
            })
          );
        }
        i++;
        setTimeout(animateStep, speed);
      }
      if (Array.isArray(animation) && animation.length > 0) {
        animateStep();
      } else if (newGrid) {
        setBox(newGrid);
        startFunc();
      }
    }
  }, [trigger, rows, cols, box.length, ...dependencies]);
};
