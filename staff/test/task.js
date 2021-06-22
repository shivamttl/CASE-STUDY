let chai = require("chai");
let chaiHttp = require("chai-http");
let server = 'http://localhost:4000';

//Assertion Style
chai.should();
chai.use(chaiHttp);
chai.request('http://localhost:4000');
describe('Tasks API', () => {

    /**
     * Test the GET route
     */
    describe("GET /staff/read", () => {

        it("It should GET all the tasks", async (done) => {
            chai.request(server)
                .get("/staff/read")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(6);
                done();
                });
        }).timeout(15000);

        it("It should NOT GET all the tasks", (done) => {
            chai.request(server)
                .get("/staff/read")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });
});
