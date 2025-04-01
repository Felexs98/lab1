const express = require('express');
const passport = require('../config/passport');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const eventRoutes = require('./events');

const router = express.Router();

// Подключаем маршруты
router.use('/auth', authRoutes);
router.use('/users', passport.authenticate('jwt', { session: false }), userRoutes);
router.use('/events', eventRoutes);

module.exports = router;
