"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("module-alias/register");
const express_1 = tslib_1.__importDefault(require("express"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const petsRouter_1 = tslib_1.__importDefault(require("@routes/petsRouter"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const petsDatabase_1 = require("@configs/petsDatabase");
const swagger_jsdoc_1 = tslib_1.__importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const express_mongo_sanitize_1 = tslib_1.__importDefault(require("express-mongo-sanitize"));
//------------------------Pets WS Server------------------------------------------//
dotenv_1.default.config();
(0, petsDatabase_1.connectDB)();
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//Allowing get requests (access) from any unknown domains 
app.use((0, cors_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
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
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
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
app.use("/api", petsRouter_1.default);
// listen for requests
const PORT = +process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`===== Server is running on port ${process.env.PORT}! =====`);
});
process.once('SIGTERM', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield (0, petsDatabase_1.dbDisconnect)().catch(e => console.error(e));
    server.close(() => {
        console.log('===== Server closed =====');
        process.exit(0);
    });
}));
exports.default = app;
//# sourceMappingURL=server.js.map