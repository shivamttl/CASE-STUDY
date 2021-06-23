const chai = require('chai');
const chaiHttp = require('chai-http');
const server=require("../inventory")
//const database = require("../routes/dbRoute");
var assert = require("assert");
chai.should(); 
// expect
// assert
chai.use(chaiHttp);
//get farmer
describe('Get /inventory/read',()=>{
    it('it should get all data',(done)=>{
        chai.request(server)
        .get('/inventory/read')
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
            // response.body.length.should.be.eq(3);
        done();
        })
    });
    it("It should NOT GET all the tasks", (done) => {
        chai.request(server)
            .get("/inventory/reads")
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });


});
describe("GET /inventory/read/:id", () => {
    it("It should GET a task by ID", (done) => {
        const taskId = "60cfa741b9cc9c42709cbd59";
        chai.request(server)                
            .get("/inventory/read/" + taskId)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('name');
            done();
            });
    }),
    it("It should NOT GET a task by ID", (done) => {
        const taskId = "12355984589748";
        chai.request(server)                
            .get("/inventory/read/" + taskId)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });

});
describe("POST /inventory/create", () => {
    // it("It should POST a new task", (done) => {
        // const task = {
        //     name: "Task 4",
        //     type: "chair",
        //     quantity: 5,
        //     roomNumber: 50
        // };
    //     chai.request(server)                
    //         .post("/inventory/create")
    //         .send(task)
    //         .end((err, response) => {
    //             response.should.have.status(200);
    //             response.body.should.be.a('object');
    //             response.body.should.have.property('name').eq("Task 4");
    //         done();
    //         });
    // });

    it("It should NOT POST a new task without the name property", (done) => {
        const task = {
            completed: false
        };
        chai.request(server)                
            .post("/create")
            .send(task)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });
/**
     * Test the PUT route
     */
 describe("PUT /inventory/update/:name", () => {
    it("It should PUT an existing task", (done) => {
        const taskId = "60d246cb6d38af4e5809f2e5";
        const task = {
            name: "Task 4",
            type: "chair",
            quantity: 5,
            roomNumber: 50
        };
        chai.request(server)                
            .put("/inventory/update/" + taskId)
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id').eq("60d246cb6d38af4e5809f2e5");
                response.body.should.have.property('name').eq("Task 5");
            done();
            });
    });

    it("It should NOT PUT ", (done) => {
        const taskId = "60d246cb6d38af4e5809f2e7";
        const task = {
            name: "Task 4",
            type: "chair",
            quantity: 5,
            roomNumber: 50
        };
        chai.request(server)                
            .put("/inventory/update/" + taskId)
            .send(task)
            .end((err, response) => {
                response.should.have.status(400);
            done();
            });
    });        
});



/**
 * Test the DELETE route
 */
describe("DELETE /inventory/delete/:id", () => {
    it("It should DELETE an existing task", (done) => {
        const taskId = "60d24630e962ea4bf8befe12";
        chai.request(server)                
            .delete("/inventory/delete/" + taskId)
            .end((err, response) => {
                response.should.have.status(200);
            done();
            });
    });

    it("It should NOT DELETE a task that is not in the database", (done) => {
        const taskId = "60d246cb6d38af4e5809f2e9";
        chai.request(server)                
            .delete("/inventory/delete/" + taskId)
            .end((err, response) => {
                response.should.have.status(404);
            done();
            });
    });

});


});


