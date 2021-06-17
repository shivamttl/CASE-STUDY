const mongoose =require("mongoose");
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