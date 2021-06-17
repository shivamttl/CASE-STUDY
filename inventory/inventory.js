const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const routes=require('./routes/api'); 
app.use('/inventory',routes);
mongoose.connect("mongodb+srv://admin:admin@cluster0.clq6u.mongodb.net/Inventory", () => {
    console.log("Inventory database connected");
});

// listen for requests
app.listen(process.env.port || 3000, function(){
    console.log('INVENTORY SERVER UP & RUNNING');
});
