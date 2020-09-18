const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    combat_level: Number,
    experience: Number,
    base_hitpoints: Number,
    current_hitpoints: Number,
    createdAt: String,
    mission_data: {
      is_on_mission: Boolean,
      mission_id: String,
      mission_start_time: String,
      mission_end_time: String,
      missions_completed: [{
        mission_id: String,
      }]
    },
    quest_data: {
      is_on_quest: Boolean,
      quest_id: String,
      quest_start_time: String,
      quest_end_time: String,
      quests_completed: [{
        quest_id: String
      }]
    }
  },
  { collection: "users" }
);

module.exports = model("User", userSchema);
