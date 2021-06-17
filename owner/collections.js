const mongoose =require("mongoose");
mongoose.model("Staff",{
    name: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
});