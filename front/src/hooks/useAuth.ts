import { RootState } from '../store/store';
import { useAppSelector } from './hooks';

export const useAuth = () => {
  const isAuth = useAppSelector((state: RootState) => state.user.isAuth);

  return isAuth;
};
