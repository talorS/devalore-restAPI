const express = require("express");
const dotenv = require("dotenv");
const petsRoute = require("./routes/petsRouter");
const cors = require('cors');
const { connectDB, dbDisconnect } = require('./configs/petsDatabase');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

//------------------------Pets WS Server------------------------------------------//
dotenv.config();
connectDB();
var app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Allowing get requests (access) from any unknown domains 
app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Pets Management API',
      version: '1.0.0',
      description: 'RESTFul API',
      contact: {
        name: 'Talor Samara',
        url: 'https://www.linkedin.com/in/talor-samara/',
        email: 'talorsamara@gmail.com'
      }
    },
    basePath: '/api',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ["server.js"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
  * @swagger
  * /api/token:
  *  get:
  *   summary: access token
  *   description: create access token for authorization
  *   responses:
  *    200:
  *     description: token created succesfully
  *    500:
  *     description: failure in creating token
  */

/**
 * @swagger
 * /api/pets:
 *  get:
 *   summary: get pets
 *   description: get all pets based on limit & page
 *   parameters:
 *       - in: query
 *         name: page
 *         schema:
 *         type: integer
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         schema:
 *         type: integer
 *         description: The numbers of items to return  
 *   security:
 *   - bearerAuth: []
 *   responses:
 *    200:
 *     description: success
 *    401:
 *     description: Unauthorized 
 */

/**
  * @swagger
  * /api/calculates/pets-ages:
  *  get:
  *   summary: calculates pets ages
  *   description: calculates the ages of all the pets in the DB
  *   responses:
  *    200:
  *     description: token created succesfully
  *    500:
  *     description: failure in creating token
  */

/**
 * @swagger
 * /api/pet:
 *  delete:
 *   summary: delete a pet
 *   description: delete a pet by name
 *   parameters:
 *       - in: query
 *         name: name
 *         schema:
 *          type: string
 *         required: true
 *         description: The name of the pet to be deleted
 *   security:
 *   - bearerAuth: []
 *   responses:
 *    200:
 *     description: success
 *    401:
 *     description: Unauthorized 
 */

/**
 * @swagger
 * /api/pet:
 *  post:
 *   summary: Creates a new pet
 *   description: add new pet to the DB
 *   requestBody:
 *      content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - age
 *              - type
 *            properties:
 *             name:
 *              type: string
 *             age:
 *              type: integer
 *              default : 1
 *             type:
 *              type: string
 *              enum: ['Dog','Cat','Hourse','Bag']
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: success
 *    401:
 *     description: Unauthorized 
 */

//setup route path
app.use("/api", petsRoute);

// listen for requests
var server = app.listen(process.env.PORT, () => {
  console.log(`===== Server is running on port ${process.env.PORT}! =====`);
});

process.once('SIGTERM', async () => {
  await dbDisconnect();
  server.close(() => {
    console.log('===== Server closed =====')
    process.exit(0);
  });
});

module.exports = app;
