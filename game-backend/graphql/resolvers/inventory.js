const Inventory = require("../../models/Inventory");
const checkAuth = require("../../utils/check-auth");
const User = require("../../models/User");

module.exports = {
  Query: {
    getInventory: async (_, { userInventId }, context) => {
      const currUser = checkAuth(context);
      try {
        const inventory = await Inventory.findOne({user: userInventId}); // find Inventory assigned to user _id created by Mongo
        console.log("[inventory user]", inventory);
        return inventory;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    equipItem: async (_, { userInventId }, context) => {
      const currUser = checkAuth(context); // check user is auth to do action
      // try {
      //   const inventory = await Inventory.findOne({user: userInventId});

      //   // Get the players inventory
      //   // Get the item object that is to be worn, and place it in worn_equipment

      // }
    }
  }
};
