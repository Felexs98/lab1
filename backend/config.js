module.exports = {
    accessTokenExpired: '15m',
    refreshTokenExpiredDays: 7, // срок жизни refresh токена в днях
    jwtSecret: process.env.JWT_SECRET
};
