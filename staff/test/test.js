const chai = require('chai');
const chaiHttp = require('chai-http');
const server=require("../staff")
//const database = require("../routes/dbRoute");
var assert = require("assert");
chai.should(); 
// expect
// assert
chai.use(chaiHttp);
//get farmer
describe('Get /staff/read',()=>{
    it('it should get all data',(done)=>{
        chai.request(server)
        .get('/staff/read')
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
        done();
        })
    })
})