const mongoose =require("mongoose");
mongoose.model("Room",{
    name: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
});
mongoose.model("Guest",{
    name: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
});