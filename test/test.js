process.env.NODE_ENV = 'test';
const dal = require('../DAL/fileWriter');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
var path = require('path');
const { before,after } = require('mocha');
const baseDir = path.join(__dirname, '..', 'assets', 'users.json');

const data = {
    duncan_long: { id: "drekaner", name: 'Duncan Long', favorite_color: 'Blue' },
    kelsea_head: { id: "wagshark", name: 'Kelsea Head', favorite_color: 'Ping' },
    phoenix_knox: { id: "jikininer", name: 'Phoenix Knox', favorite_color: 'Green' },
    adina_norton: { id: "slimewagner", name: 'Adina Norton', favorite_color: 'Red' }
};


describe('RESTful API', function() {
    
    before(async function () {
         await dal.writeDataToFile(baseDir, data);
         app = require("../server");
         chaiAppServer = chai.request(app).keepOpen();
    });

    describe("GET /", function() {
        it("responds with Hello World!", function() {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.text.should.be.eql('Hello World!');
                    res.should.have.status(200);
                });
        });
    });

        describe("GET /users", function() {
            it("responds with all users", function() {
                chai.request(app)
                    .get('/users')
                    .end((err, res) => {
                        var checkObj = {
                            duncan_long: { name: 'Duncan Long', favorite_color: 'Blue' },
                            kelsea_head: { name: 'Kelsea Head', favorite_color: 'Ping' },
                            phoenix_knox: { name: 'Phoenix Knox', favorite_color: 'Green' },
                            adina_norton: { name: 'Adina Norton', favorite_color: 'Red' }
                        }
                        res.body.should.be.eql(checkObj);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                    });
            });
        });
     
        describe("GET /user", function() {
            it("responds with a user which is not exists", function() {
                chai.request(app)
                    .get('/user/talor')
                    .end((err, res) => {
                        res.body.should.be.eql('User does not exist');
                        res.should.have.status(404);
                    });
            });
        });

    describe("GET /user", function() {
        it("responds with a user which exists", function() {
            chai.request(app)
                .get('/user/duncan_long')
                .end((err, res) => {
                    var checkObj = {
                        duncan_long: { id: "drekaner", name: 'Duncan Long', favorite_color: 'Blue' }
                    }
                    res.body.should.be.eql(checkObj);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                });
        });
    });

    after((done) => {
        chaiAppServer.close();
        console.log(`===== Server closed! =====`);
        done();
      });
});