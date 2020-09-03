const { MongoClient } = require("mongodb");
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    const myquery = {user: '5f4d2601b3f001e151134d22'}
    dbo.collection("inventory").remove();
})