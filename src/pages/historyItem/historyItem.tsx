import { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import Cell from '../../components/cell/cell';

import { ICell } from '../../types/types';

import styles from './history.module.scss';

const HistoryItem: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};
  const { gamer, gridSize, fieldHeight, field } = data.data;

  const cellStyle = useMemo(() => {
    if (!fieldHeight || !gridSize) return {};

    const cellSize = Math.max(20, Math.floor(fieldHeight / gridSize) - 5);
    return {
      gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
    };
  }, [gridSize, fieldHeight]);

  return (
    <section className="section section_top">
      <button className="btn-back" onClick={() => navigate('/history')} />
      <h2 className={styles.title}>TIC TAC TOE</h2>
      <div className={styles.container}>
        <div className={styles.player}>{gamer[0] || 'Игрок 1'}</div>
        <div className={styles.player}>{gamer[1] || 'Игрок 2'}</div>
      </div>
      <div className={clsx(styles.field, styles.field_disabled)} style={cellStyle}>
        {field ? field.map((el: ICell) => <Cell key={el.id} data={el} />) : <p>Ошибка</p>}
      </div>
    </section>
  );
};

export default HistoryItem;
