if(process.env.NODE_ENV === "production")
{
    module.exports = {MongoURI:"mongodb+srv://Unmuted:Blackadder01@cluster0.up9tvrz.mongodb.net/?retryWrites=true&w=majority"};
}
else
{
    module.exports = {MongoURI:"mongodb://localhost:27017/gameEntries"};
}