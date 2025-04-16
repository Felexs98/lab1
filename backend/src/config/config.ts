export const accessTokenExpired = "15m";
export const refreshTokenExpiredDays = 7; // срок жизни refresh токена в днях
export const jwtSecret = process.env.JWT_SECRET as string;
