import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameResult } from '../../types/types';

import styles from './history.module.scss';

const History: FC = () => {
  const navigate = useNavigate();
  const prevData = localStorage.getItem('gameResults');
  const parsedPrevData: GameResult[] = prevData ? JSON.parse(prevData) : [];

  const formatDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split('-');
    return `${day}.${month}.${year}`;
  };

  const handleRowClick = (gameId: number) => {
    navigate(`/history/${gameId}`, {
      state: {
        data: parsedPrevData[gameId],
      },
    });
  };

  return (
    <section className="section section_top">
      <button className="btn-back" onClick={() => navigate('/')} />
      <h2 className={styles.title}>История игр</h2>

      <div className={styles.tableContainer}>
        <table className={styles.historyTable}>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Игроки</th>
              <th>Победитель</th>
              <th>Время игры</th>
            </tr>
          </thead>
          <tbody>
            {parsedPrevData.map((game, index) => (
              <tr key={index} onClick={() => handleRowClick(index)} className={styles.tableRow}>
                <td>{formatDate(game.date)}</td>
                <td>{game.gamer.join(' vs ') || 'X vs O'}</td>
                <td>{game.winner}</td>
                <td>{game.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default History;
