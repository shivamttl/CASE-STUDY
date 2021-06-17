const mongoose =require("mongoose");
mongoose.model("Staff",{
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
    desingnation: {
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