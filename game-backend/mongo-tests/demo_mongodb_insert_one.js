const { MongoClient } = require("mongodb");
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = {name: "Ella", email: "ella-rose@hewy.dev", favourite_food: "chicken nuggets"};
    dbo.collection("users").insertOne(query, (err, res) => {
        if (err) throw err;
        console.log("inserting one user by name of " + query.name);
        console.log("1 user inserted to collection");
        db.close();
    });
});