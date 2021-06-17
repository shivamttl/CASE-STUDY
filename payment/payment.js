const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const routes=require('./routes/api');
app.use('/payment',routes);

mongoose.connect("mongodb+srv://admin:admin@cluster0.clq6u.mongodb.net/Payment", () => {
    console.log("Payment database connected");
});
// listen for requests
app.listen(process.env.port || 5000, function(){
    console.log('Payment SERVER UP & RUNNING');
});
