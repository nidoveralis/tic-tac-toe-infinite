import { FC } from 'react';

import styles from './modal.module.scss';

interface ModalProps {
  isDraw: boolean;
  isWinner: string | null;
  player1: string;
  player2: string;
  setIsOpenModal: (data: boolean) => void;
}

const Modal: FC<ModalProps> = ({ isDraw, isWinner, player1, player2, setIsOpenModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <h2>
          {isDraw
            ? 'Ничья!'
            : isWinner === 'player1'
              ? `${player1 || 'Игрок 1'} победил!`
              : `${player2 || 'Игрок 2'} победил!`}
        </h2>
        <button
          className={styles.modal__btn}
          onClick={() => {
            setIsOpenModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
