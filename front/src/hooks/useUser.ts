import { RootState } from '../store/store';
import { useAppSelector } from './hooks';

export const useUser = () => {
  const user = useAppSelector((state: RootState) => state.user.user);

  return user;
};
