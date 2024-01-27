import { api } from '../api/axios';
import { IUser, IUserData } from '../shared/types/user';

export const AuthService = {
  async registration(data: IUserData) {
    const response = await api.post<IUser>('/user', data);

    return response.data;
  },
  async login(data: IUserData) {
    const response = await api.post<IUser>('/auth/login', data);

    return response.data;
  },
};
