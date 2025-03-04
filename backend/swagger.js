const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Events API',
            version: '1.0.0',
            description: 'Документация API для управления пользователями и мероприятиями',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Локальный сервер',
            },
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',            // Ключ будет передаваться в заголовке
                    name: 'x-api-key'         // Вот тот самый заголовок
                }
            }
        }
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
