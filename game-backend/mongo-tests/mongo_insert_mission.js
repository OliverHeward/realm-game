const { MongoClient } = require("mongodb");
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  var dbo = db.db("mydb");

  const myquery = [
    {
      mission_title: "Mission",
      mission_level: "1",
      mission_time: "10",
      mission_description: "this is a mission description",
      mission_attack_style: "Melee",
      recommended_armour_type: "Melee",
      recommended_attack_style: "Magic",
      mission_rewards: {
        currency: {
          gold: 100,
          ether: 0,
        },
        experience: 280,
        items: [],
      },
      users_on_mission: [],
    },
    {
      mission_title: "Mission 2",
      mission_level: "2",
      mission_time: "15",
      mission_description: "this is a mission description 2",
      mission_attack_style: "Magic",
      recommended_armour_type: "Ranged",
      recommended_attack_style: "Ranged",
      mission_rewards: {
        currency: {
          gold: 150,
          ether: 0,
        },
        experience: 380,
        items: [],
      },
      users_on_mission: [],
    },
  ];

  dbo.collection("missions").insert(myquery, function (error, response) {
    if (error) throw error;
    console.log("inserting mission");
    db.close();
  });
});
