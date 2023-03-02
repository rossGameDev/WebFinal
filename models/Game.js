var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema({
    game:{
        type:String
    },
    timeElapsed:{
        type:Number
    },
    level:{
        type:Number
    }
});

mongoose.model("game", Schema);
