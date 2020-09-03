const { MongoClient } = require("mongodb");
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
  if (err) throw err;

  var dbo = db.db("mydb");
  // Test for delete collection
  var inventObj = {
    currency: {
      gold: 150,
      ether: 100,
      tokens: 20,
    },
    resources: {
      wood: 100,
      stone: 100,
      gems: 2,
    },
    equipment: [
      {
        item_name: "Bronze Sword",
        quantity: 1,
      },
      {
        item_name: "Wooden Shield",
        quantity: 1,
      },
    ],
    backpack: [
      {
        item_name: "Sorcerer Stone",
        quantity: 1,
      },
    ],
    user: "5f46718f51b10c5a3ab36b1e"
  };

  dbo.collection("inventory").insertOne(inventObj, (err, res) => {
    if (err) throw err;
    console.log("inserting one inventory by ID of " + inventObj.user);
    console.log("1 user inserted to collection");
    db.close();
});
});
