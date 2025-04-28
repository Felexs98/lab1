export const saveAuthData = (
  token: string,
  refreshToken: string,
  userId: string,
  username: string,
  email: string
) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('userId', userId);
  localStorage.setItem('username', username);
  localStorage.setItem('email', email);
};

export const clearTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
};

export const getToken = () => localStorage.getItem('token');
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const getUserId = () => localStorage.getItem('userId');
export const getUsername = () => localStorage.getItem('username');
export const getEmail = () => localStorage.getItem('email');
