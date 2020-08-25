const {MongoClient} = require('mongodb');
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = {name: "Oliver Heward"};
    dbo.collection("customers").find(query).toArray((err, result) => {
        if (err) throw err;
        console.log("finding result");
        console.log(result);
        db.close();
    });
});