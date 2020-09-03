const { model, Schema } = require("mongoose");

const missionSchema = new Schema({
  mission_title: String,
  mission_level: String,
  mission_time: String,
  mission_description: String,
  mission_attack_style: String,
  recommended_armour_type: String,
  recommended_attack_style: String,
  mission_rewards: {
    currency: {
      gold: Number,
      ether: Number,
    },
    experience: Number,
    items: [
      {
        reward_potential: Number,
        item_name: String,
        rarity: String,
        item_type: {
          slot_type: String,
          equipment_type: String,
        },
        item_description: String,
        item_stats: {
          attack: Number,
          ranged_attack: Number,
          magic_attack: Number,
          defence: Number,
          hitpoints: Number,
          ranged_defence: Number,
          magic_defence: Number,
        },
      },
    ],
  },
  users_on_mission: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      user_combat_level: Number,
      mission_started_time: String,
      mission_end_time: String,
      mission_time_remaining: String,
      stats: {
        attack: Number,
        ranged_attack: Number,
        magic_attack: Number,
        defence: Number,
        hitpoints: Number,
        ranged_defence: Number,
        magic_defence: Number,
      },
    },
  ],
});

module.expoerts = model("Mission", missionSchema);