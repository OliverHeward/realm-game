const { MongoClient } = require("mongodb");
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = {email: "oliver@hewy.dev"};
    dbo.collection("users").deleteOne(myquery, (err, obj) => {
        if (err) throw err;
        console.log("attempting to delete 1 user, by name of" + myquery.name);
        db.close();
    })
})