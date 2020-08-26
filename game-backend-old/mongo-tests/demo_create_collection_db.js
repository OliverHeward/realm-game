const {MongoClient} = require('mongodb');
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    var dbo = db.db("mydb");
    // Test for delete collection
    // var userObj = { name: "Oliver Heward", email: "oliver@hewy.dev", address: "125 Redriff Road", postcode: "SE16 7PS" }

    var userObj = { name: "Oliver", email: "oliver@hewy.dev" }
    dbo.createCollection("users", (err, res) => {
        console.log("collection was created");
        console.log("inserting user object");
        dbo.collection("users").insertOne(userObj, (err, res) => {
            if (err) throw err;
            console.log("1 user has been inserted");
        })
        db.close();
    })
})