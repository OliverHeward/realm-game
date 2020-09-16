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
        var user_hitpoints = {
          hitpoints: user_stats.hitpoints,
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
        function getNumbers(string){
          string = string.split(" ");
          var int = ""; 
        for(var i=0;i<string.length;i++){
            if(isNaN(string[i])==false){
            int+=string[i];
            }
        }
        return parseInt(int);
      }
        console.log({
          user_defence_type: user_defence_type,
          m_recommend_attack_style: m_recommend_attack_style,
          m_recommended_armour_type: m_recommended_armour_type,
          user_attack_type: user_attack_type,
          m_level: getNumbers(m_level),
          user_combat_level: user_combat_level,

          user: user,
          invent: invent,
          mission: mission.mission_rewards,
        })
        m_level = getNumbers(m_level)
        let result = false;
        // HANDLE SUCCESS
        if (
          user_defence_type === m_recommended_armour_type &&
          m_level < user_combat_level &&
          user_attack_type === m_recommend_attack_style
        ) {
          result = probability(1);
          console.log('1');

        } else if (
          user_defence_type !== m_recommended_armour_type &&
          m_level <= user_combat_level &&
          user_attack_type === m_recommend_attack_style
        ) {
          // If user has incorrect armour but correct attack style and the mission is their level or lower
          result = probability(.7);

        } else if (
          user_defence_type === m_recommended_armour_type &&
          m_level <= user_combat_level &&
          user_attack_type !== m_recommend_attack_style 
        ) {
          // If user has incorrcet attack but correct armour type and the mission is their level or lower
          result = probability(.7);

        } else if (
          user_defence_type !== m_recommended_armour_type &&
          m_level <= user_combat_level &&
          user_attack_type !== m_recommend_attack_style
        ) {
          // If user has incorrect attack and armour type and the mission is their level or lower
          console.log('4');

        } else if (
          user_defence_type !== m_recommended_armour_type &&
          m_level > user_combat_level &&
          user_attack_type !== m_recommend_attack_style
        ) {
          // If the mission is level is greater and user has incorrect attack and armour 
          console.log('5');
        } else if (
          user_defence_type === m_recommended_armour_type &&
          m_level > user_combat_level &&
          user_attack_type === m_recommend_attack_style
        ) {
         // if the mission is higher level than the user but they have the correct armour types
         console.log('6');
        }

        // If probability result = true
        if(result) {
          // grant user experience && rewards
          // move mission id into completed missions


          // User Object 
          // TODO: set mission_data is_on_mission - false
          // TODO: remove mission_start & mission_end time
          // TODO: move mission_id into missions_completed


          // Mission Object
          // TODO: take mission_rewards
          // TODO: pass all currency(gold, ether, tokens) - experience and items
          // TODO: add them too User & Invent Object

          // User Object

          
        } else {
          // else if the user failed
          // failed mission, remove mission from user object
          // take some Hitpoints away from total hitpoints level (will need remodelling for current and base hitpoints)
        }

      }
    },
  },
};
