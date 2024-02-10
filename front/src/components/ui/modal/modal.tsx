import { FC, memo, useEffect, useState } from 'react';
import styles from './modal.module.scss';

interface ModalProps {
  onSubmit: (title: string) => void;
  onToggleModal: () => void;
  title?: string;
}

export const Modal: FC<ModalProps> = memo(
  ({ onSubmit, onToggleModal, title }) => {
    // use custom hook and divide into components
    const [text, setText] = useState('');

    useEffect(() => {
      if (title?.length) {
        setText(title);
      }
    }, [title]);

    const handleSave = () => {
      onSubmit(text);
      setText('');
      onToggleModal();
    };

    return (
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <p className={styles.title}>Category title</p>

          <input
            type='text'
            name='title'
            placeholder='Title...'
            value={text}
            className={styles.input}
            onChange={e => setText(e.target.value)}
          />

          <div className={styles.buttons}>
            <button className={styles.button} onClick={handleSave}>
              save
            </button>
            <button className={styles.button} onClick={onToggleModal}>
              close
            </button>
          </div>
        </div>
      </div>
    );
  }
);
