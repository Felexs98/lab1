require('dotenv').config();

const apiKeyMiddleware = (req, res, next) => {
    // 
    if (req.path.startsWith('/api-docs')) {
        return next();
    }

    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(403).json({ error: 'API-ключ отсутствует' });
    }

    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({ error: 'Неверный API-ключ' });
    }

    next();
};

module.exports = apiKeyMiddleware;
