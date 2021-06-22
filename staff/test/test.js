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
            response.body.length.should.be.eq(3);
        done();
        })
    });
    it("It should NOT GET all the tasks", (done) => {
        chai.request(server)
            .get("/staff/reads")
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });


});
describe("GET /staff/read/:id", () => {
    it("It should GET a task by ID", (done) => {
        const taskId = "60cfa741b9cc9c42709cbd59";
        chai.request(server)                
            .get("/staff/read/" + taskId)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('name');
            done();
            });
    }),
    it("It should NOT GET a task by ID", (done) => {
        const taskId = 12355984589748;
        chai.request(server)                
            .get("/staff/read/" + taskId)
            .end((err, response) => {
                response.should.have.status(404);
                response.text.should.be.eq("The task with the provided ID does not exist.");
            done();
            });
    });

});