import { api } from '../api/axios';
import { Routes } from '../shared/types/routes';
import { ITransactionData } from '../shared/types/transaction';

export const TransactionService = {
  async getAll() {
    const response = await api.get(`${Routes.TRANSACTIONS}`);

    return response.data;
  },

  async create(transaction: ITransactionData) {
    return await api.post(Routes.TRANSACTIONS, transaction);
  },

  async update(id: string, transaction: ITransactionData) {
    return await api.patch(
      `${Routes.TRANSACTIONS}/transaction/${id}`,
      transaction
    );
  },

  async delete(id: string) {
    return await api.delete(`${Routes.TRANSACTIONS}/transaction/${id}`);
  },
};
