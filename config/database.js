if(process.env.NODE_ENV === "production")
{
    module.exports = {mongoURI:"mongodb+srv://Unmuted:Blackadder01@cluster0.up9tvrz.mongodb.net/?retryWrites=true&w=majority"};
}
else
{
    module.exports = {mongoURI:"mongodb://localhost:27017/gameEntries"};
}