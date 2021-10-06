process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;
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
        it("responds with all pets",async function() {
            chai.request(app)
            .get('/api/pets??page=5&limit=10')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.results.should.be.a('Array');
                expect(res.body.results).to.have.lengthOf(10);
            });
        });
    });

    describe("POST /pet", function() {
        it("responds with a new pet",async function() {
            chai.request(app)
            .post('/api/pet')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('x-access-token', token)
            .send({
                name : "i1",
                type : "Insect",
                age : 8
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.string('added');
                
            });
        });
    });

    describe("DELETE /pet", function() {
        it("responds with deleted pet",async function() {
            chai.request(app)
            .delete('/api/pet?name=talor')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.have.string('deleted');
            });
        });
    });
    
    describe("GET /calculates/pets-ages", function() {
        it("responds with age calculation",async function() {
            chai.request(app)
            .get('/api/calculates/pets-ages')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.totalAges.should.be.a('Number');
                expect(res.body.totalAges).to.not.eql(0);
            });
        });
    });

    after(() => {
        chaiServer.close();
        process.emit('SIGTERM');
      });
});