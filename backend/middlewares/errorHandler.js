
module.exports = (err, req, res, next) => {
    // Проверяем, что это ошибка парсинга JSON
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Ошибка парсинга JSON:', err.message);
        return res.status(400).json({
            error: 'Неверный формат JSON',
            details: err.message
        });
    }

    // Обработка других ошибок, если надо
    console.error('Внутренняя ошибка сервера:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера', details: err.message });
};
