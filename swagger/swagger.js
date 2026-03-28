const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sarrof Pro API',
      version: '1.0.0',
      description: 'Valyuta ayirboshlash tizimi API hujjatlari',
    },
    servers: [
      { 
        url: 'https://sarrof-backend.onrender.com', 
        description: 'Production server (Render)' 
      },
      { 
        url: 'http://localhost:10000', 
        description: 'Local server' 
      }
    ],
  },
  // Barcha route fayllarini skaner qilish
  apis: ['./routes/*.js', './app.js'], 
};

module.exports = swaggerJsdoc(options);