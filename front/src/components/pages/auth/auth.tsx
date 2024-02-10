import cn from 'classnames';
import { FC, FormEvent, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../hooks/hooks';
import { AuthService } from '../../../services/auth';
import { Routes } from '../../../shared/types/routes';
import { setTokenToLocalStorage } from '../../../shared/utils/local-storage';
import { login } from '../../../store/slices/user';
import styles from './auth.module.scss';

export const Auth: FC = memo(() => {
  // use custom hook and divide into components
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAuth = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const user = { email, password };
      const data = isLogin
        ? await AuthService.login(user)
        : await AuthService.registration(user);

      if (data) {
        if (isLogin) {
          setTokenToLocalStorage(data.access_token);
          dispatch(login(data));
          navigate(Routes.HOME);
        }

        setEmail('');
        setPassword('');
        toast.success(isLogin ? 'Login success!' : 'Registration success!');
        setIsLogin(!isLogin);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.titleContainer, { [styles.moreGap]: isLogin })}>
        <h1 className={styles.title}>{isLogin ? 'login' : 'registration'}</h1>
        <button
          className={styles.titleButton}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'registration' : 'login'}
        </button>
      </div>

      <form className={styles.form} onSubmit={handleAuth}>
        <input
          type='email'
          value={email}
          placeholder='email'
          className={styles.input}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type='password'
          value={password}
          placeholder='password'
          className={styles.input}
          onChange={e => setPassword(e.target.value)}
        />

        <button type='submit' className={styles.button}>
          submit
        </button>
      </form>
    </div>
  );
});
