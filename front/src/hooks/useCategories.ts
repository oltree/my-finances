import { RootState } from '../store/store';
import { useAppSelector } from './hooks';

export const useCategoties = () => {
  const { categories, status, error } = useAppSelector(
    (state: RootState) => state.categories
  );

  return { categories, status, error };
};
