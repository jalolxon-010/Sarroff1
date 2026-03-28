const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sarrof Pro API',
      version: '1.0.0',
      description: 'Valyuta ayirboshlash tizimi API hujjatlari',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Local server' }],
  },
  // Barcha route fayllarini skaner qilish
  apis: ['./routes/*.js', './app.js'], 
};

module.exports = swaggerJsdoc(options);