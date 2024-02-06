import { RootState } from '../store/store';
import { useAppSelector } from './hooks';

export const useTransactions = () => {
  const { transactions, status, error } = useAppSelector(
    (state: RootState) => state.transactions
  );

  return { transactions, status, error };
};
