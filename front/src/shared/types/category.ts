import { ITransaction } from './transaction';

export interface ICategory {
  id: string;
  title: string;
  transactions: ITransaction[];
}
