const Inventory = require("../../models/Inventory");
const checkAuth = require("../../utils/check-auth");

const User = require("../../models/User");


module.exports = {
    Query: {
        getEquipment: async (_, {userInventId }, context) => {
            const currUser = checkAuth(context);

            try {
                const inventory = await Inventory.findOne({user: userInventId});
                console.log(inventory.worn_equipment);
                return inventory.worn_equipment;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        equipItem: async (_, { userInventId }, context) => {
            const currUser = checkAuth(context); // check user is auth to do 

            // remove the item from the backpack.equipment object
              // and move it back into worn_equipment
      
            // }
          },
          unequipItem: async (_, {userInventId}, context) => {
              const currUser = checkAuth(context);

              // remove the item from the worn_equipment object
              // and move it back into backpack.equipment
          }
    }
}
