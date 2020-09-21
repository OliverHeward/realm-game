const Mission = require("../../models/Mission");
const checkAuth = require("../../utils/check-auth");
const Invent = require("../../models/Inventory");
const { ApolloError } = require("apollo-server");
const User = require("../../models/User");

module.exports = {
  Query: {
    getMissions: async () => {
      try {
        const missions = await Mission.find();
        return missions;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // also need to destructure off mission time and mission id
    startMission: async (_, { userInventId, missionId }, context) => {
      const invent = await Invent.findOne({ user: userInventId });
      const mission = await Mission.findById(missionId);
      const userObj = await User.findById(userInventId);

      // Time handlers
      const date = new Date();
      const start = new Date();
      const endTime = new Date(
        date.setMinutes(date.getMinutes() + mission.mission_time)
      );

      var newValues = {
        "mission_data.is_on_mission": true,
        "mission_data.mission_id": missionId,
        "mission_data.mission_start_time": start.toISOString(),
        "mission_data.mission_end_time": endTime.toISOString(),
      };

      // if user is currently not on misson
      if (!userObj.mission_data.is_on_mission) {
        if (invent && mission) {
          // set all new values
          userObj.set({ ...newValues });
          await userObj.save();
          return userObj;
        } else throw new Error("Something went wrong");
      } else {
        console.log("currently on mission");
      }
    },
    handleMissionComplete: async (
      _,
      { finishedMission, userInventId, missionId },
      context
    ) => {
      const invent = await Invent.findOne({ user: userInventId });
      const mission = await Mission.findById(missionId);
      const user = await User.findById(userInventId); // userInventId === ID of user

      // Probability function
      var probability = function (n) {
        return !!n && Math.random() <= n;
      };

      const user_stats = invent.worn_equipment.worn_equipment_stats;
      // if mission is finished and invent & mission are both found
      if (finishedMission && invent && mission) {
        // Mission vars
        var m_level = mission.mission_level;
        var m_attack_style = mission.mission_level;
        var m_recommend_attack_style = mission.recommended_attack_style;
        var m_recommended_armour_type = mission.recommended_armour_type;

        // User vars
        var user_combat_level = user.combat_level;
        var user_defence = {
          defence: user_stats.defence,
          ranged_defence: user_stats.ranged_defence,
          magic_defence: user_stats.magic_defence,
        };
        var user_attack = {
          attack: user_stats.attack,
          ranged_attack: user_stats.ranged_attack,
          magic_attack: user_stats.magic_attack,
        };

        // HANDLE USER STYLES
        var user_defence_type;
        var user_attack_type;

        if (
          user_defence.defence >=
          (user_defence.magic_defence && user_defence.ranged_defence)
        ) {
          user_defence_type = "Melee";
        } else if (
          user_defence.magic_defence >
          (user_defence.defence && user_defence.ranged_defence)
        ) {
          user_defence_type = "Magic";
        } else if (
          user_defence.ranged_defence >
          (user_defence.defence && user_defence.magic_defence)
        ) {
          user_defence_type = "Ranged";
        }

        if (
          user_attack.attack >=
          (user_attack.magic_attack && user_attack.ranged_attack)
        ) {
          user_attack_type = "Melee";
        } else if (
          user_attack.magic_attack >
          (user_attack.attack && user_attack.ranged_attack)
        ) {
          user_attack_type = "Magic";
        } else if (
          user_attack.ranged_attack >
          (user_attack.attack && user_attack.magic_attack)
        ) {
          user_attack_type = "Ranged";
        }

        let result = false;
        // HANDLE SUCCESS
        if (
          user_defence_type === m_recommended_armour_type &&
          m_level <= user_combat_level &&
          user_attack_type === m_recommend_attack_style
        ) {
          result = probability(1);
          console.log("1");
        } else if (
          user_defence_type !== m_recommended_armour_type &&
          m_level <= user_combat_level &&
          user_attack_type === m_recommend_attack_style
        ) {
          // If user has incorrect armour but correct attack style and the mission is their level or lower
          result = probability(1);
        } else if (
          user_defence_type === m_recommended_armour_type &&
          m_level <= user_combat_level &&
          user_attack_type !== m_recommend_attack_style
        ) {
          // If user has incorrcet attack but correct armour type and the mission is their level or lower
          result = probability(1);
          console.log("should call on this [handle-success] statement");
        } else if (
          user_defence_type !== m_recommended_armour_type &&
          m_level <= user_combat_level &&
          user_attack_type !== m_recommend_attack_style
        ) {
          // If user has incorrect attack and armour type and the mission is their level or lower
          console.log("4");
          result = probability(1);

        } else if (
          user_defence_type !== m_recommended_armour_type &&
          m_level > user_combat_level &&
          user_attack_type !== m_recommend_attack_style
        ) {
          // If the mission is level is greater and user has incorrect attack and armour
          console.log("5");
          result = probability(1)
        } else if (
          user_defence_type === m_recommended_armour_type &&
          m_level > user_combat_level &&
          user_attack_type === m_recommend_attack_style
        ) {
          // if the mission is higher level than the user but they have the correct armour types
          console.log("6");
          result = probability(1)

        }

        // If probability result = true
        if (result) {
          console.log("user has successfully completed mission");
          // move mission id into completed missions
          // TODO: move mission_id into missions_completed
          /**********************
           *  Mission Rewards
           *********************/
          if (mission.mission_rewards.currency) {
            var user_currency = invent.currency;
            var reward_currency = mission.mission_rewards.currency;
            Object.assign(user_currency, {
              gold: parseInt(user_currency.gold + reward_currency.gold),
              ether: parseInt(user_currency.ether + reward_currency.ether),
            });

            invent.currency.set({
              ...user_currency
            })
          }

          // If there are items to be awarded
          if (mission.mission_rewards.items) {
            // Map each item
            mission.mission_rewards.items.map((item) => {
              // Spread each item into equipment
              invent.backpack.equipment.shift({
                ...item,
              });
            });
          }

          // if mission has experience (which it should)
          if (mission.mission_rewards.experience) {
            // pass experience gain to user object
            user.set({
              experience: parseInt(
                user.experience + mission.mission_rewards.experience
              ),
            });
          }

          /****************************
           * Update User Mission Object
           ***************************/
          const user_mission_update = {
            "mission_data.is_on_mission": false,
            "mission_data.mission_id": "",
            "mission_data.mission_start_time": "",
            "mission_data.mission_end_time": "",
          };

          user.set({ ...user_mission_update });

          /*********************************
           * Add Completed Mission To User
           ********************************/
          user.mission_data.missions_completed.unshift({
            mission_id: missionId,
          });


          await invent.save();
          await user.save();
          return user, invent;
        } else {
          console.log("user has not completed mission");
          /*********************
           * Failed Mission
           ********************/

          // failed mission, remove mission from user object
          // take some Hitpoints away from total hitpoints level (will need remodelling for current and base hitpoints)

          /*********
           *
           * hitpoints - represents current health
           * base_hitpoints - represents base total health
           *
           *
           * on a small probability, allow mission to take Gold from you too
           *
           */
          const getRandomInt = (maxInt) => {
            return Math.floor(Math.random() * Math.floor(maxInt));
          };

          let damage_chance = probability(0.1);
          if (damage_chance) {
            // take between 1 - 20% of health
            let damageInt = getRandomInt(20);
            let user_base_hitpoints = user.base_hitpoints;

            // Calculate percentage of health taken
            let damage_taken = (user_base_hitpoints / 100) * damageInt;

            // Damage users current_hitpoints
            user.set({
              current_hitpoints: parseInt(
                user.current_hitpoints - damage_taken
              ),
            });
          }

          /***************************
           * Remove Mission From User
           **************************/

          const user_mission_update = {
            "mission_data.is_on_mission": false,
            "mission_data.mission_id": "",
            "mission_data.mission_start_time": "",
            "mission_data.mission_end_time": "",
          };
          user.mission_data.set({ ...user_mission_update });
          await user.save()
          return user;
        }
      }
    },
  },
};
