const { MongoClient } = require("mongodb");
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  var dbo = db.db("mydb");
  var userObj = [
    { name: "Ella", email: "ella@hewy.dev" },
    { name: "Scott", email: "scott@hewy.dev" },
    { name: "Dan", email: "dan@hewy.dev" },
    { name: "Jacob", email: "jacob@hewy.dev" },
    { name: "David", email: "david@hewy.dev" },
    { name: "Sandy", email: "sandy@hewy.dev" },
    { name: "Chuck", email: "chuck@hewy.dev" },
  ];
  dbo.collection("users").insertMany(userObj, (err, res) => {
    if (err) throw err;
    console.log("attempting to insert users");
    console.log("Number of users inserted:" + res.insertedCount);
    db.close();
  });
});
