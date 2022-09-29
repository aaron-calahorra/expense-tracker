const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Expense Tracker',
        description: 'Project for CSE 341 by Ruben A Calahorra',
    },
    host: 'expense-tracker-aaron-calahorra.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);