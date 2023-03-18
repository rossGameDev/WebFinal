var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port||3000;

//var searchTerm = "BigNutsGuy";
var searchedDataToSend;

var db = require("./config/database");
const { randomInt } = require("crypto");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect("mongodb://0.0.0.0:27017/",{
    useNewURLParser:true, useUnifiedTopology:true
}).then(function(){
    console.log("Connected to MongoDB!");
}).catch(function(err){
    console.log(err);
});

require("./models/Game");
var Game = mongoose.model("game");
require("./models/Unity");
var Unity = mongoose.model("unity");

var searchedData = new Unity();

//example routes
app.get("/", function(req, res){
    //res.send("Hello!");
    res.redirect("gameList.html")
});

app.post("/saveGame", function(req, res){
    console.log(req.body);

    new Game(req.body).save().then(function(){
        //res.send(req.body);
        //res.redirect("index.html");
        res.redirect("gameList.html");
    });
});

app.get("/getGames", function(req, res){
    Unity.find({}).then(function(unity){
        //console.log({game});
        res.json({unity});
    });
});

app.post("/deleteGame", function(req, res){
    console.log(`Game Deleted! ${req.body.unity}`)
    Unity.findByIdAndDelete(req.body.unity).exec();
});

app.get("/getID::id", function(req, res){
    res.redirect("updatePage.html?id=" + req.params.id);
    console.log(req.body.game._id);
});

//update route
app.post("/updateGame", function(req, res){
    console.log(req.body);
    console.log(req.body.name)
    //res.redirect("gameList.html");
    Unity.findByIdAndUpdate(req.body.id, {userName:req.body.name}, function(){
        res.redirect("gameList.html");
    });
})

app.post("/search", async function(req, res){
    console.log("Searching...");
    var searchTerm = req.body.userName;
    console.log(searchTerm);
    //Unity.find({}).then
    searchedData = await Unity.findOne({'userName':searchTerm}).then(function(err, person){
        if (err) return err;
    });

    console.log("Player found!\n" + searchedData.userName + ", " + searchedData.score);
    searchedDataToSend = {
        "userName" : searchedData.userName,
        "score" : searchedData.score
    }
    //console.log(searchedDataToSend);
})

app.get("/sendSearchResult", async function(req, res){
    //console.log(searchedDataToSend + "balls");
    if(searchedData != undefined)
    {
        await res.send(searchedData);
    }
    else
    {
        var errorData = {
            "userName" : "Error: User not found!"
        }
        res.send(errorData)
    }
})

//Unity Route Testing
app.post("/unity", function(req, res){
    const doc = new Unity();
    console.log("Hello from Unity.");
    //prep an object to recieve the object data
    //var unityData = {
    //    "userName" : req.body.userName,   //we can grab basedon the parameter name values of the obj we want to grab
    //    "firstName" : req.body.firstName,
    //    "lastName" : req.body.lastName,
    //    "startDate" : req.body.startDate,
    //    "score" : req.body.score
    //}
    //console.log(unityData);
    doc.userName = req.body.userName;
    doc.score = 0;
    //console.log(doc);
    doc.save().then(function(){
        //res.redirect("gameList.html");
        console.log("Saving unity data...");
    });
    //console.log("Unity data saved!");
})

app.post("/updateScore", function(req, res){
    //Unity.findByIdAndUpdate(req.body._id)
    console.log(req.body);
})

app.get("/sendUnityData", function(req, res){

    var doc = Unity.find();
    doc.sort();
    doc.lean().exec(function(err, people){
        return res.end(JSON.stringify(people))
    })
    console.log("request complete!")
})

app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on Port ${port}`);
});
