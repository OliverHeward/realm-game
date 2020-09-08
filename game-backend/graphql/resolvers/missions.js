const Mission = require("../../models/Mission");
const checkAuth = require("../../utils/check-auth");
const MissionUser = require("../../models/MissionUser");
const Invent = require("../../models/Inventory");

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
        startMission: async (_, args, context) => {
            const user = checkAuth(context);
            const invent = await Invent.findOne({user: args.userInventId});
            // pass the missionId to startMission
            const mission = await Mission.findById(args.missionId);

            // Time handlers
            const start = new Date();
            const endTime = new Date(date.setMinutes(date.getMinutes() + mission_time));
            var diff = Math.abs(start, endTime)
            var minutes_remaining = Math.floor((diff/1000)/60);

            // Worn Item Stat Object
            const user_stats = invent.equipment.worn_equipment.item_stats;

            // take the mission time from payload
            // take mission start time + mission_time from payload
            // time remaining will be mission_start_time - mission_end_time
            const newUserOnMission = new MissionUser({
                user: user.id,  // may actually need to take the user object from User.findOne
                user_combat_level: user.combat_level,
                mission_started_time: start.toISOString(),
                mission_end_time: endTime.toISOString(),
                mission_time_remaining: minutes_remaining,
                    stats: {
                        // needs to be taken in from the users user_worn_equipment summary
                        attack: user_stats.attack,
                        ranged_attack: user_stats.ranged_attack,
                        magic_attack: user_stats.magic_attack,
                        defence: user_stats.defence,
                        hitpoints: user_stats.hitpoints,
                        ranged_defence: user_stats.ranged_defence,
                        magic_defence: user_stats.magic_defence
                    }
                }
            )
            mission.users_on_mission.insert()
        }
    }
}