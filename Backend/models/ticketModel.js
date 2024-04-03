const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({

    user : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
        ref : "SupportUser"
    },
    product : {
        type : String,
        required : [true, "Please select product"],
        enum : ["iPhone", "iPad", "iMac", "Macbook"],
    },
    description : {
        type : String,
        required : [true, "Please enter a description of issue"],

    },
    status : {
        type : String,
        required : true,
        enum : ["new", "open", "closed"],
        default : "new"
    }

},{
    timestamps : true
})

module.exports = mongoose.model("Ticket", ticketSchema)