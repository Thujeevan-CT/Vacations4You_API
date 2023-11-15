const authDoc = require('./auth');
const packageDoc = require('./package');
const activityDoc = require('./activity');
const cruiseDoc = require('./cruise');
const bookingDoc = require('./booking');

module.exports = {
  openapi: '3.0.3',
  info: {
    title: "Vacations4You -  Backend",
    description: "Vacations4You back-end API endpoints",
    termsOfService: "http://swagger.io/terms/",
  },
  servers: [
    {
      url: '/api/v1'
    }
  ],
  paths: {
    ...authDoc,
    ...packageDoc,
    ...activityDoc, 
    ...cruiseDoc, 
    ...bookingDoc, 
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  },
  tags: [
    {
      name: "Vacations4You",
      description: "API Endpoints"
    }
  ],
  security: [
    []
  ]
};