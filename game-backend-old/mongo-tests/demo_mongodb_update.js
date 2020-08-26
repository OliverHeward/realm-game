const {MongoClient} = require('mongodb');
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = {name: "Dan"};
    var newvalues = {$set: {name: "Daniel Holm", email: "dan165@msn.com"}};
    dbo.collection("users").updateOne(myquery, newvalues, (err, res) => {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });
});