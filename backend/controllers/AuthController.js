const bcrypt = require('bcryptjs');
const { User, RefreshToken } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken } = require('../services/tokenService');

class AuthController {
    static async register(req, res) {
        const { email, name, password } = req.body;
        if (!email || !name || !password) return res.status(400).json({ message: 'Заполните все поля' });

        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) return res.status(400).json({ message: 'Email уже используется' });

            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ email, name, password: hashedPassword });

            res.status(201).json({ message: 'Регистрация успешна' });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка сервера', error: error.message });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Заполните email и пароль' });

        try {
            const user = await User.findOne({ where: { email } });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Неверные email или пароль' });
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = uuidv4();

            await RefreshToken.create({ token: refreshToken, userId: user.id, expiresAt: new Date(Date.now() + 604800000) });

            res.status(200).json({ message: 'Вход выполнен успешно', accessToken, refreshToken });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка сервера', error: error.message });
        }
    }

    static async refresh(req, res) {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({ message: 'Отсутствует refresh token' });

        try {
            const tokenData = await RefreshToken.findOne({ where: { token: refreshToken } });
            if (!tokenData || tokenData.expiresAt < new Date()) return res.status(401).json({ message: 'Refresh token недействителен' });

            const user = await User.findByPk(tokenData.userId);
            const newAccessToken = generateAccessToken(user);

            res.status(200).json({ accessToken: newAccessToken });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка сервера', error: error.message });
        }
    }
}

module.exports = AuthController;
