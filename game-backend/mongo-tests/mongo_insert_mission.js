const { MongoClient } = require("mongodb");
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  var dbo = db.db("mydb");

  const myquery = [
    {
      mission_title: "Dwarven Mines",
      mission_level: 1,
      mission_time: 1,
      mission_description: "Explore the old dwarven mines of an ancient era when dwarves ruled these lands.",
      mission_attack_style: "Melee",
      recommended_armour_type: "Melee",
      recommended_attack_style: "Melee",
      mission_image_url: "dwarven_mines.jpg",
      mission_rewards: {
        currency: {
          gold: 150,
          ether: 0,
          tokens: 0
        },
        experience: 240,
        items: [],
      },
    },
    {
      mission_title: "Enchanted Woods",
      mission_level: 1,
      mission_time: 1,
      mission_description: "Patrol the woods near the city, there hasn\'t been any enemy activity but people say they see things in these woods.",
      mission_attack_style: "Magic",
      recommended_armour_type: "Ranged",
      recommended_attack_style: "Ranged",
      mission_image_url: "dark_swamp.jpg",

      mission_rewards: {
        currency: {
          gold: 50,
          ether: 0,
          tokens: 0
        },
        experience: 180,
        items: [],
      },
    },
    {
      mission_title: "Tomb of Ra\'juab",
      mission_level: 3,
      mission_time: 1,
      mission_description: "Lord Ra\'juab, once a powerful dark wizard lay waste here, Dark Witches have been heard using powerful magic here.",
      mission_attack_style: "Magic",
      recommended_armour_type: "Ranged",
      recommended_attack_style: "Ranged",
      mission_image_url: "tomb.jpg",
      mission_rewards: {
        currency: {
          gold: 100,
          ether: 30,
          tokens: 0
        },
        experience: 580,
        items: [],
      },
    },
    {
      mission_title: "Ars Thalas",
      mission_level: 2,
      mission_time: 1,
      mission_description: "There is a mercenary that has operated in your city, bring him back to be tried for his crimes.",
      mission_attack_style: "Ranged",
      recommended_armour_type: "Melee",
      recommended_attack_style: "Melee",
      mission_image_url: "dark_elves.jpg",
      mission_rewards: {
        currency: {
          gold: 200,
          ether: 0,
          tokens: 0
        },
        experience: 580,
        items: [],
      },
    },
  ];

  dbo.collection("missions").insert(myquery, function (error, response) {
    if (error) throw error;
    console.log("inserting mission");
    db.close();
  });
});
