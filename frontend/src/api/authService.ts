import { baseApi } from "@/api/axios";
import { User } from '@/types/user';
import { saveAuthData, clearAuthData } from '@/utils/localStorageUtils';

export const loginUser = async (email: string, password: string): Promise<User> => {
  const response = await baseApi.post('/auth/login', { email, password });
  const { accessToken, refreshToken, username } = response.data;

  saveAuthData(accessToken, refreshToken, username);
  return response.data;
};

export const registerUser = async (email: string, name: string, password: string) => {
  const response = await baseApi.post(
    '/auth/register',
    { email, name, password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};

export const logoutUser = (): void => {
  clearAuthData();
  window.location.href = '/login';
};
