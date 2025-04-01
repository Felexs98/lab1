const { User } = require('../models');

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
            res.status(200).json({ data: users });
        } catch (error) {
            res.status(500).json({ error: 'Ошибка сервера', details: error.message });
        }
    }
}

module.exports = UserController;
