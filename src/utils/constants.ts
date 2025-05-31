import { ICell } from '../types/types';

export const fieldIndexTransformation = {
  horisontal: {
    start: (num: number, gridSize: number) => {
      if (num === gridSize - 1 || num % gridSize === gridSize - 1) {
        return null;
      }
      return num + 1;
    },
    end: (num: number, gridSize: number) => {
      if (num == 0 || num % gridSize === 0) {
        return null;
      }
      return num - 1;
    },
  },
  vertical: {
    start: (num: number, gridSize: number) => num + gridSize,
    end: (num: number, gridSize: number) => num - gridSize,
  },
  right: {
    start: (num: number, gridSize: number) => {
      if (num == 0 || num % gridSize === 0) {
        return null;
      }
      return num + (gridSize - 1);
    },
    end: (num: number, gridSize: number) => {
      if (num === gridSize - 1 || num % gridSize === gridSize - 1) {
        return null;
      }
      return num - (gridSize - 1);
    },
  },
  left: {
    start: (num: number, gridSize: number) => num + (gridSize + 1),
    end: (num: number, gridSize: number) => num - (gridSize + 1),
  },
};

export const markWinningCells = (winCells: number[], field: ICell[]): ICell[] => {
  return field.map((cell) => {
    if (winCells.includes(cell.id)) {
      return { ...cell, win: true };
    }
    return cell;
  });
};
