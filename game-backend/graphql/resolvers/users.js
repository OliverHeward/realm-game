// Dependancies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const Inventory = require("../../models/Inventory");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    getUsers: async (_, { userName }) => {
      try {
        const users = await User.findOne({ username: userName });
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found!", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(
      _,
      {
        registerInput: {
          username,
          email,
          confirmEmail,
          password,
          confirmPassword,
        },
      }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        confirmEmail,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // make sure user doesn't exist
      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken.",
          },
        });
      }
      // hash password abd create auth token
      password = await bcrypt.hash(password, 12); // 12 - number of rounds

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = generateToken(res);

      const newInvent = new Inventory({
        currency: {
          gold: 150,
          ether: 10,
          tokens: 1,
        },
        resources: {
          wood: 100,
          stone: 100,
          gems: 2,
        },
        ammo_pouch: [
          {
            item_name: "Wooden Arrow",
            quantity: 100,
            rarity: "normal",
            item_type: {
              slot_type: "Ammunition",
              equipment_type: "Ammo",
            },
            item_description: "Basic arrows.",
            ranged_attack: 2,
          },
        ],
        rune_pouch: [
          {
            item_name: "Wind rune",
            quantity: 100,
            rarity: "normal",
            item_type: {
              slot_type: "Runic",
              equipment_type: "Runes",
            },
            item_description: "Basic air rune for casting spells.",
          },
          {
            item_name: "Ember rune",
            quantity: 100,
            rarity: "normal",
            item_type: {
              slot_type: "Runic",
              equipment_type: "Runes",
            },
            item_description: "Basic fire rune for casting spells.",
          },
          {
            item_name: "Rain rune",
            quantity: 100,
            rarity: "normal",
            item_type: {
              slot_type: "Runic",
              equipment_type: "Runes",
            },
            item_description: "Basic water rune for casting spells.",
          },
          {
            item_name: "Dirt rune",
            quantity: 100,
            rarity: "normal",
            item_type: {
              slot_type: "Runic",
              equipment_type: "Runes",
            },
            item_description: "Basic earth rune for casting spells.",
          },
        ],
        worn_equipment: {
          equipment: [
            {
              item_name: "Cloth shirt",
              rarity: "normal",
              item_type: {
                slot_type: "Primary",
                equipment_type: "Sword",
              },
              item_description: "A few holes, but it will hold for a little... although it could use with a wash.",
              item_stats: {
                attack: 0,
                ranged_attack: 0,
                magic_attack: 0,
                hitpoints: 0,
                defence: 1,
                ranged_defence: 0,
                magic_defence: 1,
              }
            },
            {
              item_name: "Dirty linen trousers",
              rarity: "normal",
              item_type: {
                slot_type: "Legs",
                equipment_type: "Legs",
              },
              item_description: "Definitely slept in something the other night whilst wearing these...",
              item_stats: {
                attack: 0,
                ranged_attack: 0,
                magic_attack: 0,
                hitpoints: 0,
                defence: 1,
                ranged_defence: 0,
                magic_defence: 1
              }
            }
          ],
          worn_equipment_stats: {
            attack: 0,
            ranged_attack: 0,
            magic_attack: 0,
            defence: 2,
            hitpoints: 100,
            ranged_defence: 0,
            magic_defence: 2,
          },
        },
        backpack: {
          equipment: [
            {
              item_name: "Bronze Sword",
              rarity: "normal",
              item_type: {
                slot_type: "Primary",
                equipment_type: "Sword",
              },
              item_description:
                "Your first sword, crafted from when you we're but a boy... many memories",
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
                slot_type: "Primary",
                equipment_type: "Sword",
              },
              item_description:
                "Crafted from the tree back home that you swore mum you didn't take a chunk out of.",
              item_stats: {
                attack: 0,
                ranged_attack: 0,
                magic_attack: 0,
                defence: 6,
                hitpoints: 0,
                ranged_defence: 3,
                magic_defence: 0,
              },
            },
          ],
          misc: [
            {
              item_name: "Frayed fishing net",
              rarity: "normal",
              item_description: "Served me well, but I\'m always surprised I ever catch anything with this.",
              item_type: "Fishing",
              quantity: 1,
            },
          ],
        },
        bank: {
          equipment: [
            {
              item_name: "Fathers Axe",
              rarity: "normal",
              item_type: {
                slot_type: "Primary",
                equipment_type: "Axe",
              },
              item_description: "Written on a small note attached to the axe are the words: \"Please, only use in grave peril my child \" ",
              item_stats: {
                attack: 4,
                ranged_attack: 0,
                magic_attack: 0,
                defence: 6,
                hitpoints: 0,
                ranged_defence: 3,
                magic_defence: 0,
              }
            },
          ],
          misc: [
            {
              item_name: "Welcome Pack",
              rarity: "exotic",
              item_description:
                "A present, from me to you... thank you for beginning your adventure",
              item_type: "Pack",
              quantity: 1
            },
          ],
        },
        user: res._id,
      });

      const initInvent = await newInvent.save();

      return {
        ...res._doc,
        id: res._id,
        token,
        ...initInvent,
      };
    },
  },
};
