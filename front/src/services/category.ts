import { api } from '../api/axios';
import { Routes } from '../shared/types/routes';

export const CategoryService = {
  async getAll() {
    const response = await api.get(Routes.CATEGORIES);

    return response.data;
  },

  async create(id: string, title: string) {
    const category = {
      id,
      title,
    };

    return await api.post(Routes.CATEGORIES, category);
  },

  async update(id: string, title: string) {
    const category = {
      id,
      title,
    };

    return await api.patch(`${Routes.CATEGORIES}/category/${id}`, category);
  },

  async delete(id: string) {
    return await api.delete(`${Routes.CATEGORIES}/category/${id}`);
  },
};
