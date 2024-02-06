import { Routes } from '../../../shared/types/routes';

export const menuItems: Record<string, string>[] = [
  {
    name: 'home',
    path: Routes.HOME,
  },
  {
    name: 'transactions',
    path: Routes.TRANSACTIONS,
  },
  {
    name: 'categories',
    path: Routes.CATEGORIES,
  },
];
