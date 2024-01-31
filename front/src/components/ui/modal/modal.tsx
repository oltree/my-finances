import { FC, memo, useState } from 'react';
import styles from './modal.module.scss';

interface ModalProps {
  onSubmit: () => void;
  onToggleModal: () => void;
}

export const Modal: FC<ModalProps> = memo(({ onToggleModal }) => {
  const [title, setTitle] = useState('');

  return (
    <div className={styles.wrapper}>
      <p>Category title</p>

      <input
        type='text'
        name='title'
        placeholder='Title...'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <div>
        <button type='submit'>save</button>
        <button onClick={onToggleModal}>close</button>
      </div>
    </div>
  );
});
