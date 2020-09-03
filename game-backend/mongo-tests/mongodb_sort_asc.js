const { MongoClient } = require("mongodb");
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("users").find().toArray((err, result) => {
        if (err) throw err;
        console.log("attempting to sort collection");
        console.log(result);
        db.close();
    });
});