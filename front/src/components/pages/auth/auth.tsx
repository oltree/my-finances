import cn from 'classnames';
import { FC, FormEvent, memo, useState } from 'react';

import { toast } from 'react-toastify';
import { AuthService } from '../../../services/auth';
import styles from './auth.module.scss';

interface AuthProps {}

export const Auth: FC<AuthProps> = memo(() => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const data = isLogin
        ? await AuthService.login({ email, password })
        : await AuthService.registration({ email, password });

      if (data) {
        toast.success(isLogin ? 'Login success!' : 'Registration success!');
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
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
