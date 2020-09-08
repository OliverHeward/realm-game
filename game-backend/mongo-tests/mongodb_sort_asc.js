const { MongoClient } = require("mongodb");
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = "5f578c0784e80230e57a1dc1";
    dbo.collection("inventories").findOne(query, (err, result) => {
        if (err) throw err;
        console.log("attempting to sort collection");
        console.log(result.worn_equipment);
        db.close();
    })
});