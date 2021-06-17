const express = require('express');
const app = express.Router();
const mongoose = require("mongoose");
const dataBase = mongoose.model("Staff");
//post (create)
app.post('/create', (req, res) => {
    var newData = {
        name: req.body.name,
        empid: req.body.quantity,
        role: req.body.role,
        desingnation: req.body.desingnation,
        salary: req.body.salary,
        age: req.body.age,
        username: req.body.username,
        password: req.body.password
    }
    var data = new dataBase(newData)
    data.save().then(() => {
        console.log("new data created")
    }).catch((err) => {
        throw err;
    })
    console.log(req.body);
    res.send("data sent")
})

//get all
app.get('/read', (req, res) => {
    dataBase.find().then((items) => {
        res.json(items)
    }).catch(err => {
        throw err;
    })
})

//get by id
app.get('/read/:id', (req, res) => {
    dataBase.findById(req.params.id).then((data) => {
        if (data) {
            res.json(data)
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
})

//put update
app.put("/update/:name", (req, res) => {
    var itemName = req.params.name;
    dataBase.findByIdAndUpdate(itemName, req.body).then((items) => {
        res.send(items);
    }).catch((err) => {
        console.log(err);
    })
});

//delete by id
app.delete('/delete/:id', (req, res) => {
    dataBase.findByIdAndRemove({ _id: req.params.id }).then(console.log("deleted")).catch((err) => {
        if (err) {
            throw err;
        }
    })
    res.send("deleted");
})

// //delete all
// app.delete('/inventory', (req, res) => {
//     dataBase.remove().then(() => {
//         console.log("removed all");
//         res.send("deleted all");
//     }).catch(err => {
//         throw err;
//     })
// })
module.exports = app;
