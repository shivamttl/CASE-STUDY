const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const routes=require('./routes/api');
app.use('/guest',routes);
require("./collections");
const guestCollection = mongoose.model("Guest");

mongoose.connect("mongodb+srv://admin:admin@cluster0.clq6u.mongodb.net/Guest", () => {
    console.log("Guest database connected");
});

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('Guest SERVER UP & RUNNING');
});
