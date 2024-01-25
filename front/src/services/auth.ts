import { api } from '../api/axios';
import { IUser } from '../shared/types/user';

export const AuthService = {
  async registration(data: IUser) {
    const response = await api.post<IUser>('/user', data);

    return response.data;
  },
  async login(data: IUser) {
    const response = await api.post<IUser>('/auth/login', data);

    return response.data;
  },
  async getMe() {},
};
