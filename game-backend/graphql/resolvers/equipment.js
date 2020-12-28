const Inventory = require("../../models/Inventory");
const Items = require("../../models/EquipmentItems");

const checkAuth = require("../../utils/check-auth");

const User = require("../../models/User");

module.exports = {
  Query: {
    getEquipment: async (_, { userInventId }, context) => {
      const currUser = checkAuth(context);

      try {
        const inventory = await Inventory.findOne({ user: userInventId });
        console.log(inventory.worn_equipment);
        return inventory.worn_equipment;
      } catch (err) {
        throw new Error(err);
      }
    },
    getEquipmentItems: async (_, args, context) => {
      const currUser = checkAuth(context);
      try {
        const items = await Items.find();
        console.log(items);
        return items;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    equipItem: async (_, { userInventId }, context) => {
      const currUser = checkAuth(context);
      try {
        const inventory = await Inventory.findOne({ user: userInventId }); // invent.backpack.equipment
        const user = await User.findById(userInventId);

        /*
         *
         * When player equips item
         * take the item from backpack
         * ( if there is an item already in item_slot that matches new equipment to be worn --- take item and swap them around )
         * (else) insert it into worn_equipment
         * update worn_equipment_stats
         * remove item from backpack
         *
         * return update to user and inventory
         *
         */
      } catch (err) {
        throw new Error(err);
      }
    },
    unequipItem: async (_, { userInventId }, context) => {
      const currUser = checkAuth(context);
      try {
        const inventory = await Inventory.findOne({ user: userInventId });
        const user = await User.findById(userInventId);

        /*
         *
         * When player unequips item
         * take item from worn_equipment
         * insert it into backpack
         * update worn_equipment_stats
         * remove item from worn_equipment
         *
         * return update to user and inventory
         *
         */
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
