var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema({
    userName:{
        type:String
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    startDate:{
        type:String
    },
    score:{
        type:Number
    }
});

mongoose.model("unity", Schema);
