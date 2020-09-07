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
        console.log("hello");
        throw new Error(err);
      }
    },
  },
};
