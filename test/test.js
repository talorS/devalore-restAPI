process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
const { before,after } = require('mocha');

describe('Testing RESTful API', function() {
    
    before(() => {
        app = require("../server");
        chaiServer = chai.request(app).keepOpen();
      });
    
    describe("GET /", function() {
        it("responds with a welcome message", function() {
            chai.request(app)
                .get('/api')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.eql('Welcome to Pets Service!');
                });
        });
    });

    describe("GET /token", function() {
        it("responds with access token", function() {
            chai.request(app)
            .get('/api/token')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                token = res.body.token;
            });
        });
    });

    
    describe("GET /pets", function() {
        it("responds with all pets", function() {
            chai.request(app)
            .get('/api/pets')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.results.should.be.a('Array');
            });
        });
    });

    describe("POST /pet", function() {
        it("responds with a new pet", function() {
            chai.request(app)
            .post('/api/pet')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('x-access-token', token)
            .send({
                name : "cati",
                type : "Cat",
                age : 8
            })
            .end((err, res) => {
                res.should.have.status(200);
            });
        });
    });

    describe("DELETE /pet", function() {
        it("responds with deleted pet", function() {
            chai.request(app)
            .delete('/api/pet?name=talor')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
            });
        });
    });
    
    describe("GET /calculates/pets-ages", function() {
        it("responds with age calculation", function() {
            chai.request(app)
            .get('/api/calculates/pets-ages')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.totalAges.should.be.a('Number');
            });
        });
    });

    after(() => {
        chaiServer.close();
        process.emit('SIGTERM');
      });
});