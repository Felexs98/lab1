import axios from 'axios';
import { getToken, getRefreshToken, clearAuthData, saveAuthData, getUsername } from '@/utils/localStorageUtils';

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ➡️ Добавляем accessToken в каждый запрос
baseApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ➡️ Перехватываем 401 и делаем refresh
baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          console.error('❌ Refresh token отсутствует!');
          throw new Error('Refresh token missing');
        }

        const refreshResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, { refreshToken });
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;

        if (!newAccessToken) {
          console.error('❌ Access token отсутствует в refresh response!');
          throw new Error('Access token missing in refresh response');
        }

        // ✅ Сохраняем только если accessToken есть
        saveAuthData(newAccessToken, newRefreshToken || refreshToken, getUsername());
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest); // Повторяем исходный запрос
      } catch (refreshError) {
        console.error('❌ Ошибка при обновлении токена:', refreshError);
        clearAuthData();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
