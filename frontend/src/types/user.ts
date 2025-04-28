export interface User {
  accessToken: string;
  refreshToken: string;
  username: string;
  user: {
    id: string;
    email: string;
  };
}