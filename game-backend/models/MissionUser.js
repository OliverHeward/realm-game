const { model, Schema } = require("mongoose");

const missionUserSchema = new Schema({
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

module.exports = model("MissionUser", missionUserSchema);