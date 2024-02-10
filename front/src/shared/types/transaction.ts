import { ICategory } from './category';

export interface ITransaction {
  id: string;
  title: string;
  amount: number;
  category: ICategory;
  type: string;
}

export interface ITransactionData {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: string;
}
