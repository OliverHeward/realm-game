const {MongoClient} = require('mongodb');
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("users").find().limit(3).toArray((err, result) => {
        if (err) throw err;
        console.log("attemping to return only 3 users");
        console.log(result);
        db.close();
    });
});