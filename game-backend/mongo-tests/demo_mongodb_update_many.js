const {MongoClient} = require('mongodb');
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { name: /^S/ };
    var newvalues = {$set: {name: "Sandeep"}};
    dbo.collection("users").updateMany(myquery, newvalues, (err, res) => {
        if (err) throw err;
        console.log(res.result.nModified + " documents(s) updated");
        db.close();
    });
});