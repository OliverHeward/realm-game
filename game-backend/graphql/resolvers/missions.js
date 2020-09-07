const Mission = require("../../models/Mission");
const checkAuth = require("../../utils/check-auth");
const { AuthenticationError, UserInputError } = require("apollo-server");
const MissionUser = require("../../models/MissionUser");
const Invent = require("../../models/Inventory");

module.exports = {
    Query: {
        getMissions: async () => {
            try {
                const missions = await Mission.find();
                console.log(missions);
                return missions;
            } catch (err) {
                console.log('failed');
                throw new Error(err);
            }
        },
    },
    Mutation: {
        startMission: async (_, {missionId, userInventId}, context) => {
            const user = checkAuth(context);
            const invent = await Invent.findOne({user: userInventId});
            // pass the missionId to startMission
            const mission = await Mission.findById(args.missionId);

            const newUserOnMission = new MissionUser({
                user: user.id,
                user_combat_level: user.combat_level,
                mission_started_time: Date.now().toISOstring(),
                mission_end_time: Date.now().toISOstring(),
                mission_time_remaining: mission_started_time - mission_end_time
                }
            )
            mission.users_on_mission.insert()
        }
    }
}