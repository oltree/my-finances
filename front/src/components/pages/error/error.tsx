import { FC, memo } from 'react';

import { Link } from 'react-router-dom';
import { Routes } from '../../../types/routes';

import styles from './error.module.scss';

export const Error: FC = memo(() => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Page not found!</p>

      <Link to={Routes.HOME} className={styles.link}>
        home
      </Link>
    </div>
  );
});
