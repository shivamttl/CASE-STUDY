const mongoose =require("mongoose");
mongoose.model("Payment",{
    name: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
});