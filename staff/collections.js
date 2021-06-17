const mongoose = require("mongoose");
var collection=mongoose.model("Staff", {
    name: {
        type: String,
        require: true
    },
    empid: {
        type: Number,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    designation: {
        type: String,
        require: true
    },
    salary:{
        type: Number,
        require: true
    },
    age:{
        type: Number,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
module.exports= collection;