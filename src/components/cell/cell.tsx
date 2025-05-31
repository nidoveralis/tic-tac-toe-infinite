import { FC } from 'react';
import clsx from 'clsx';
import { ICell } from '../../types/types';

import styles from './cell.module.scss';

interface CellProps {
  onClick?: (id: number) => void;
  data: ICell;
}

const Cell: FC<CellProps> = ({ onClick, data }) => {
  const handleClick = () => {
    if (onClick) {
      if (data.value) return;
      onClick(data.id);
    }
  };

  return (
    <button
      className={clsx(styles.cell, {
        [styles.cell_x]: data.value === 'player2',
        [styles.cell_o]: data.value === 'player1',
        [styles.cell_win]: data.win,
      })}
      onClick={handleClick}
      disabled={data.value ? true : false}
    />
  );
};

export default Cell;
