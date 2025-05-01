import { baseApi } from "@/api/axios";
import { clearTokens, saveTokens } from '@/utils/localStorageUtils';
import { AppDispatch } from "@/app/store";
import { loginSuccess, logout } from '@/features/auth/authSlice';
import { saveAuthData } from '@/utils/localStorageUtils.ts';

/**
 * Авторизация пользователя с обновлением Redux
 * @param email
 * @param password
 * @param dispatch
 */
export const loginUser = async (email: string, password: string, dispatch: AppDispatch) => {
  const response = await baseApi.post('/auth/login', { email, password });
  const { accessToken, refreshToken, username, user } = response.data;

  if (!accessToken) {
    throw new Error('Access token missing');
  }

  saveAuthData(accessToken, refreshToken, user.id, username, user.email);

  dispatch(loginSuccess({
    user: {
      id: user.id,
      username: username,
      email: user.email,
    }
  }));
};

/**
 * Регистрация нового пользователя
 */
export const registerUser = async (email: string, name: string, password: string) => {
  const response = await baseApi.post(
    '/auth/register',
    { email, name, password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

/**
 * Выход пользователя (очистка localStorage + Redux + redirect)
 * @param dispatch
 */
export const logoutUser = (dispatch: AppDispatch): void => {
  clearTokens();
  dispatch(logout());
  window.location.href = '/login';
};
