export const saveAuthData = (token: string, refreshToken: string, username: string) => {
  if (!token) {
    console.error('Попытка сохранить пустой token! Сохранение отменено.');
    return; // НЕ сохраняем, если token пустой или undefined!
  }
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('username', username);
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('username');
  console.log('Auth data cleared!');
};

export const getToken = () => localStorage.getItem('token');
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const getUsername = () => localStorage.getItem('username');
