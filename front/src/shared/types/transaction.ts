import { ICategory } from './category';

export interface ITransaction {
  id: string;
  title: string;
  amount: number;
  category: ICategory;
}
