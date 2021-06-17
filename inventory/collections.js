const mongoose =require("mongoose");
mongoose.model("Inventory",{
    name: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
});