const { model, Schema } = require("mongoose");

const equipmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  worn_equipment: {
    equipment: [
      {
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
    worn_equipment_stats: {
      attack: Number,
      ranged_attack: Number,
      magic_attack: Number,
      defence: Number,
      hitpoints: Number,
      ranged_defence: Number,
      magic_defence: Number,
    },
  },
});

module.exports = model("Equipment", equipmentSchema);