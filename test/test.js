process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
const app = require("../server");
const chaiAppServer = chai.request(app).keepOpen();
const { after } = require('mocha');


describe('RESTful API', function() {
    
    describe("GET /", function() {
        it("responds with a welcome message", function(done) {
            chai.request(app)
                .get('/api')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.eql('Welcome to Pets Service!');
                    done();
                });
        });
    });
    describe("GET /token", function() {
        it("responds with access token", function(done) {
            chai.request(app)
            .get('/api/token')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                token = res.body.token;
                done();
            });
        });
    });

    
    describe("GET /pets", function() {
        it("responds with all pets", function(done) {
            chai.request(app)
            .get('/api/pets')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.results.should.be.a('Array');
                done();
            });
        });
    });

    describe("POST /pet", function() {
        it("responds with a new pet", function(done) {
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
                done();
            });
        });
    });

    describe("DELETE /pet", function() {
        it("responds with deleted pet", function(done) {
            chai.request(app)
            .delete('/api/pet?name=talor')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });
    
    describe("GET /calculates/pets-ages", function() {
        it("responds with age calculation", function(done) {
            chai.request(app)
            .get('/api/calculates/pets-ages')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.totalAges.should.be.a('Number');
                done();
            });
        });
    });

    after((done) => {
        chaiAppServer.close();
        console.log(`===== Server closed! =====`);
        done();
      });
});