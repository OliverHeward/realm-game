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
const Items = require("../../models/EquipmentItems");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      combat_level: user.combat_level,
      experience: user.experience,
    },
    SECRET_KEY,
    { expiresIn: "3h" }
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
        combat_level: 1,
        experience: 0,
        base_hitpoints: 100,
        current_hitpoints: 100,
        createdAt: new Date().toISOString(),
        mission_data: {
          is_on_mission: false,
          mission_id: "",
          mission_start_time: "",
          mission_end_time: "",
          missions_completed: [],
        },
        quest_data: {
          is_on_quest: false,
          quest_id: "",
          quest_start_time: String,
          quest_end_time: String,
          quests_completed: [],
        },
      });

      const res = await newUser.save();
      const token = generateToken(res);

      const startingItems = {
        backpack: {
          bronze_sword: await Items.findById("5f6b4325a4dc02118f11e5fd"),
          wooden_shield: await Items.findById("5f6b4325a4dc02118f11e5fe"),
        },
        worn_equipment: {
          linen_torso: await Items.findById("5f6b4325a4dc02118f11e600"),
          linen_trousers: await Items.findById("5f6b4325a4dc02118f11e601"),
        },
        bank: {
          fathers_axe: await Items.findById("5f6b4325a4dc02118f11e5ff"),
        },
      };

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
            startingItems.worn_equipment.linen_torso,
            startingItems.worn_equipment.linen_trousers,
          ],
          worn_equipment_stats: {
            attack: 0,
            ranged_attack: 0,
            magic_attack: 0,
            defence: 2,
            hitpoints: 0,
            ranged_defence: 0,
            magic_defence: 2,
          },
        },
        backpack: {
          equipment: [
            startingItems.backpack.bronze_sword,
            startingItems.backpack.wooden_shield,
          ],
          misc: [
            {
              item_name: "Frayed fishing net",
              rarity: "normal",
              item_description:
                "Served me well, but I'm always surprised I ever catch anything with this.",
              item_type: "Fishing",
              quantity: 1,
            },
          ],
        },
        bank: {
          equipment: [startingItems.bank.fathers_axe],
          misc: [
            {
              item_name: "Welcome Pack",
              rarity: "exotic",
              item_description:
                "A present, from me to you... thank you for beginning your adventure",
              item_type: "Pack",
              quantity: 1,
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
