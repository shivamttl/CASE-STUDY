const express = require('express');
const app = express.Router();
const dataBase = require("../collections");

// test data
// {
//     "name": "ac",
//     "type": "fixed",
//     "quantity": 1,
//     "roomNumber": 750
// }
//post (create)
app.post('/create', (req, res) => {
    var data = new dataBase(req.body);
    data.save().then(() => {
        console.log("new data created")
    }).catch((err) => {
        throw err;
    })
    console.log(req.body);
    res.send("data sent")
});

//get all
app.get('/read', (req, res) => {
    dataBase.find().then((items) => {
        res.json(items)
    }).catch(err => {
        throw err;
    })
});

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
});

//put update
app.put("/update/:name", (req, res) => {
    dataBase.findByIdAndUpdate(req.params.name, req.body).then((items) => {
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
});

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
