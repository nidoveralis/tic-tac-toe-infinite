import { FC, useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import Cell from '../../components/cell/cell';
import Modal from '../../components/modal/modal';

import { GameResult, ICell } from '../../types/types';
import { fieldIndexTransformation, markWinningCells } from '../../utils/constants';

import styles from './game.module.scss';

const Game: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { player1, player2, gridSize, fieldHeight } = location.state || {};
  const prevData = localStorage.getItem('gameResults');
  const parsedPrevData: GameResult[] = prevData ? JSON.parse(prevData) : [];

  const [isActive, setIsActive] = useState<string>('player1');
  const [isWinner, setIsWinner] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [field, setField] = useState<{ id: number; value: string | null }[]>([]);

  const cellStyle = useMemo(() => {
    if (!fieldHeight || !gridSize) return {};

    const cellSize = Math.max(20, Math.floor(fieldHeight / gridSize) - 5);
    return {
      gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
    };
  }, [gridSize, fieldHeight]);

  const createField = () => {
    const newField = Array(gridSize * gridSize)
      .fill(null)
      .map((_, index) => ({
        id: index,
        value: null,
      }));
    setField(newField);
  };

  const winningGame = (winCells: number[]) => {
    setIsOpenModal(true);
    setIsWinner(isActive);
    setField((prev) => markWinningCells(winCells, prev));
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const gameData = {
      time,
      date,
      gridSize,
      fieldHeight,
      winner: isDraw ? '-' : isWinner === 'player1' ? player1 : player2,
      gamer: [player1, player2],
      field: markWinningCells(winCells, field),
    };
    const updatedGameData = [...parsedPrevData, gameData];
    localStorage.setItem('gameResults', JSON.stringify(updatedGameData));
  };

  const checkMovesForWinning = (id: number) => {
    const directions = Object.values(fieldIndexTransformation);

    for (const direction of directions) {
      let count = 1;
      let winCells: number[] = [id];

      const result1 = countConsecutive(id, direction.start);
      count += result1.count;
      if (result1.winCells) {
        winCells = [...result1.winCells, ...winCells];
      }

      const result2 = countConsecutive(id, direction.end);
      count += result2.count;
      if (result2.winCells) {
        winCells = [...result2.winCells, ...winCells];
      }

      if (count >= 5) {
        winningGame(winCells);
        return true;
      }
    }
    return false;
  };

  const countConsecutive = (
    startId: number,
    moveFn: (num: number, gridSize: number) => number | null,
  ): { count: number; winCells: number[] } => {
    let count = 0;
    let currentId = moveFn(startId, gridSize);
    const winCells: number[] = [];

    while (currentId !== null && currentId >= 0 && currentId < field.length && field[currentId]?.value === isActive) {
      count++;
      currentId !== null && winCells.push(currentId);
      currentId = moveFn(currentId, gridSize);
    }

    return { count, winCells };
  };

  const handleClickCell = (id: number) => {
    setField((prev) => prev.map((cell) => (cell.id === id ? { ...cell, value: isActive } : cell)));
    const isWin = checkMovesForWinning(id);
    if (!isWin) {
      setIsActive((prev) => (prev === 'player1' ? 'player2' : 'player1'));
    }
  };

  const resetGame = () => {
    createField();
    setIsWinner(null);
    setIsActive('player1');
  };

  useEffect(() => {
    if (field.length > 0 && !isWinner) {
      const isFieldFull = field.every((cell) => cell.value !== null);
      if (isFieldFull) {
        setIsDraw(true);
        setIsOpenModal(true);
        winningGame([]);
      }
    }
  }, [field, isWinner]);

  useEffect(() => {
    createField();
  }, [gridSize]);

  return (
    <section className="section section_top">
      {isOpenModal && (
        <Modal
          isWinner={isWinner}
          isDraw={isDraw}
          player1={player1}
          player2={player2}
          setIsOpenModal={setIsOpenModal}
        />
      )}
      <button className="btn-back" onClick={() => navigate('/login')} />
      <h2 className={styles.title}>TIC TAC TOE</h2>
      <div className={styles.container}>
        <div className={clsx(styles.player, isActive === 'player1' && styles.player_active)}>
          {player1 || 'Игрок 1'}
        </div>
        <div className={clsx(styles.player, isActive === 'player2' && styles.player_active)}>
          {player2 || 'Игрок 2'}
        </div>
        <button className={styles.close} onClick={resetGame} />
      </div>
      <div className={clsx(styles.field, { [styles.field_disabled]: isWinner })} style={cellStyle}>
        {field.map((el: ICell) => (
          <Cell key={el.id} onClick={handleClickCell} data={el} />
        ))}
      </div>
    </section>
  );
};

export default Game;
