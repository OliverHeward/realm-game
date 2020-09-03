const { model, Schema } = require("mongoose");

const inventorySchema = new Schema({
  currency: {
    gold: Number,
    ether: Number,
    tokens: Number,
  },
  resources: {
    wood: Number,
    stone: Number,
    gems: Number,
  },
  ammo_pouch: [
    {
      item_name: String,
      quantity: Number,
      rarity: String,
      item_type: {
        slot_type: String,
        equipment_type: String,
      },
      item_description: String,
      ranged_attack: Number,
    }
  ],
  rune_pouch: [
    {
      item_name: String,
      quantity: Number,
      rarity: String,
      item_type: {
        slot_type: String,
        equipment_type: String
      },
      item_description: String,
    }
  ],
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
  backpack: [
    {
      item_name: String,
      quantity: Number,
    },
  ],
  bank: [
    {
      item_name: String,
      quantity: Number,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Inventory", inventorySchema);
 