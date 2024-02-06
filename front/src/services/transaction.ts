import { api } from '../api/axios';
import { Routes } from '../shared/types/routes';

export const TransactionService = {
  async getAll() {
    const response = await api.get(Routes.TRANSACTIONS);

    return response.data;
  },

  async create(id: string, title: string) {
    const transaction = {
      id,
      title,
    };

    return await api.post(Routes.TRANSACTIONS, transaction);
  },

  async update(id: string, title: string) {
    const transaction = {
      id,
      title,
    };

    return await api.patch(
      `${Routes.TRANSACTIONS}/transaction/${id}`,
      transaction
    );
  },

  async delete(id: string) {
    return await api.delete(`${Routes.TRANSACTIONS}/transaction/${id}`);
  },
};
