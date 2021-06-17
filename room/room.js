const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const routes=require('./routes/api');
app.use('/room',routes);
require("./collections");
const roomCollection = mongoose.model("Room");

mongoose.connect("mongodb+srv://admin:admin@cluster0.clq6u.mongodb.net/Room", () => {
    console.log("Room database connected");
});

// listen for requests
app.listen(process.env.port || 2000, function(){
    console.log('ROOM SERVER UP & RUNNING');
});