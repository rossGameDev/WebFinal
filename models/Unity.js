var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema({
    userName:{
        type:String
    },
    score:{
        type:Number
    }
});

mongoose.model("unity", Schema);
