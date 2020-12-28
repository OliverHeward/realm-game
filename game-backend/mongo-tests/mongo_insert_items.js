const { MongoClient } = require("mongodb");
var url = "mongodb://127.0.0.1:27017/mydb";

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  var dbo = db.db("mydb");

  const myquery = [
    {
      item_name: "Bronze Sword",
      rarity: "normal",
      item_type: {
        slot_type: "Primary",
        equipment_type: "Sword",
      },
      item_image: "bronze_sword.png",
      item_description:
        "Your first sword, crafted from when you we're but a child... many memories",
      item_stats: {
        attack: 1,
        ranged_attack: 0,
        magic_attack: 0,
        defence: 0,
        hitpoints: 0,
        ranged_defence: 0,
        magic_defence: 0,
      },
    },
    {
      item_name: "Wooden Shield",
      rarity: "normal",
      item_type: {
        slot_type: "Secondary",
        equipment_type: "Shield",
      },
      item_image: "wooden_shield.png",
      item_description: "Crafted from the tree back where you were raised.",
      item_stats: {
        attack: 0,
        ranged_attack: 0,
        magic_attack: 0,
        defence: 5,
        hitpoints: 0,
        ranged_defence: 3,
        magic_defence: 0,
      },
    },
    {
      item_name: "Fathers Axe",
      rarity: "normal",
      item_type: {
        slot_type: "Primary",
        equipment_type: "Axe",
      },
      item_image: "fathers_axe.png",
      item_description:
        'Written on a small note attached to the axe are the words: "Please, only use in grave peril" ',
      item_stats: {
        attack: 4,
        ranged_attack: 0,
        magic_attack: 0,
        defence: 3,
        hitpoints: 0,
        ranged_defence: 3,
        magic_defence: 0,
      },
    },
    {
      item_name: "Cloth shirt",
      rarity: "normal",
      item_type: {
        slot_type: "Torso",
        equipment_type: "Top",
      },
      item_image: "cloth_torso.png",
      item_description: "A few holes, but it will hold for a little.",
      item_stats: {
        attack: 0,
        ranged_attack: 0,
        magic_attack: 0,
        hitpoints: 0,
        defence: 1,
        ranged_defence: 0,
        magic_defence: 1,
      },
    },
    {
      item_name: "Dirty linen trousers",
      rarity: "normal",
      item_type: {
        slot_type: "Legs",
        equipment_type: "Legs",
      },
      item_description:
        "Definitely slept in something the other night whilst wearing these...",
      item_image: "linen_trousers.png",
      item_stats: {
        attack: 0,
        ranged_attack: 0,
        magic_attack: 0,
        hitpoints: 0,
        defence: 1,
        ranged_defence: 0,
        magic_defence: 1,
      },
    },
  ];

  dbo
    .collection("equipment-items")
    .insertMany(myquery, function (error, response) {
      if (error) throw error;
      console.log("inserting items");
      db.close();
    });
});
