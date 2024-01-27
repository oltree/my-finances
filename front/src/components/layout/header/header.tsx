import { FC, memo } from 'react';
import { CiLogin, CiLogout } from 'react-icons/ci';
import { IoLogoSnapchat } from 'react-icons/io5';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/hooks';
import { useAuth } from '../../../hooks/useAuth';
import { Routes } from '../../../shared/types/routes';
import { removeTokenFromLocalStorage } from '../../../shared/utils/local-storage';
import { logout } from '../../../store/slices/user';
import { menuItems } from './header.constant';
import styles from './header.module.scss';

interface HeaderProps {}

export const Header: FC<HeaderProps> = memo(() => {
  const isAuth = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    removeTokenFromLocalStorage();
    navigate(Routes.AUTH);
  };

  return isAuth ? (
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
          <button className={styles.button} onClick={handleLogout}>
            <CiLogout className={styles.logotip} />
          </button>
        ) : (
          <Link to={Routes.AUTH}>
            <CiLogin className={styles.logotip} />
          </Link>
        )}
      </div>
    </header>
  ) : null;
});
