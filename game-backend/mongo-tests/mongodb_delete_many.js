const { MongoClient } = require("mongodb");
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = {email: /^o/};
    dbo.collection("users").deleteMany(myquery, (err, obj) => {
        if (err) throw err;
        console.log("attempting to delete users");
        console.log(obj.result.n + "document(s) deleted");
        db.close();
    });
});

// P R S