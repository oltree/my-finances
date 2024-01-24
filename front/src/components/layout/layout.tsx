import { FC, PropsWithChildren, memo } from 'react';

import { Outlet } from 'react-router-dom';
import { Header } from './header';
import styles from './layout.module.scss';

interface LayoutProps extends PropsWithChildren {}

export const Layout: FC<LayoutProps> = memo(() => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
});
