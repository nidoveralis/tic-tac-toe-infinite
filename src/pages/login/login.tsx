import { FC, useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './login.module.scss';
import { GridSelect } from '../../components/select/select';

const Login: FC = () => {
  const navigate = useNavigate();

  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [player1, setPlayer1] = useState<string>('');
  const [player2, setPlayer2] = useState<string>('');
  const [gridSize, setGridSize] = useState<number>(5);
  const [fieldHeight, setFieldHeight] = useState<number | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!player1.trim() || !player2.trim()) {
      setIsError(true);
      setError('Введите имена обоих игроков');
      return;
    } else if (player1 === player2) {
      setIsError(true);
      setError('Введите разные имена игроков');
      return;
    }

    navigate('/game', {
      state: {
        player1,
        player2,
        gridSize,
        fieldHeight,
      },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'player1') {
      setPlayer1(value);
    } else if (name === 'player2') {
      setPlayer2(value);
    }

    if (isError) {
      setIsError(false);
      setError('');
    }
  };

  useEffect(() => {
    const calculateCellSize = () => {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      setFieldHeight(viewportHeight > viewportWidth ? viewportWidth : viewportHeight - 140);
    };

    calculateCellSize();
    window.addEventListener('resize', calculateCellSize);

    return () => {
      window.removeEventListener('resize', calculateCellSize);
    };
  }, []);

  return (
    <section className="section">
      <button className="btn-back" onClick={() => navigate('/')} />
      <h2 className={styles.title}>Введите имена игроков</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          type="text"
          className={styles.input}
          name="player1"
          placeholder="Игрок 1"
          maxLength={10}
        />
        <input
          onChange={handleInputChange}
          type="text"
          className={styles.input}
          name="player2"
          placeholder="Игрок 2"
          maxLength={10}
        />
        <GridSelect onSizeChange={setGridSize} />
        {isError && <span className={styles.error__message}>{error}</span>}
        <button disabled={isError} type="submit" className={styles.button}>
          Играть
        </button>
      </form>
    </section>
  );
};

export default Login;
