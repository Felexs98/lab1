const jwt = require('jsonwebtoken');
const config = require('../config');

exports.generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        config.jwtSecret,
        { expiresIn: config.accessTokenExpired }
    );
};