import { FC, memo } from 'react';
import { CiLogin, CiLogout } from 'react-icons/ci';
import { IoLogoSnapchat } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';

import { Routes } from '../../../shared/types/routes';
import { menuItems } from './header.constant';

import { clearLocalStorage } from '../../../shared/utils/local-storage';
import styles from './header.module.scss';

interface HeaderProps {}

export const Header: FC<HeaderProps> = memo(() => {
  const isAuth = true;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={Routes.HOME}>
          <IoLogoSnapchat className={styles.logotip} />
        </Link>

        {isAuth ? (
          <nav className={styles.navigation}>
            <ul className={styles.menuItems}>
              {menuItems.map(({ name, path }) => (
                <li key={name}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      [
                        isActive ? styles.menuItemActive : '',
                        styles.menuItem,
                      ].join(' ')
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {isAuth ? (
          <button className={styles.button} onClick={clearLocalStorage}>
            <CiLogout className={styles.logotip} />
          </button>
        ) : (
          <Link to={Routes.AUTH}>
            <CiLogin className={styles.logotip} />
          </Link>
        )}
      </div>
    </header>
  );
});
