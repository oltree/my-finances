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

    const response = await api.post(Routes.CATEGORIES, category);

    return response.data;
  },

  async update(id: string, title: string) {
    const category = {
      id,
      title,
    };

    const response = await api.patch(
      `${Routes.CATEGORIES}/category/${id}`,
      category
    );

    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(id);

    return response.data;
  },
};
