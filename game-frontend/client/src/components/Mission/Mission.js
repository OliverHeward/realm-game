import React, { useState } from "react";
import Aux from "../../hoc/Aux";
import Moment from "react-moment";

import { gql, useQuery, useApolloClient, useMutation } from "@apollo/client";
import OnMission from "./OnMission/OnMission";

import AttackStyle from "./MissionIcons/AttackStyle";
import DefenceStyle from "./MissionIcons/DefenceStyle";
import CurrencyReward from "./MissionIcons/CurrencyReward";


const FETCH_USER = gql`
  query GetUsers($username: String!) {
    getUsers(userName: $username) {
      id
      combat_level
      experience
      mission_data {
        is_on_mission
        mission_id
        mission_start_time
        mission_end_time
      }
    }
  }
`;

const ADD_USER_TO_MISSION = gql`
  mutation startMission($inventId: String, $IDmission: String) {
    startMission(userInventId: $inventId, missionId: $IDmission) {
      id
    }
  }
`;

const Mission = (props) => {
  const {
    id,
    mission_title,
    mission_level,
    mission_description,
    mission_time,
    mission_rewards,
    mission_attack_style,
    recommended_attack_style,
    recommended_armour_type,
    mission_image_url
  } = props;

  const [startScreen, setStartScreen] = useState(false);

  const client = useApolloClient();

  const { userObject } = client.readQuery({
    query: gql`
      query User {
        userObject @client
      }
    `,
  });

  const { loading, data, error } = useQuery(FETCH_USER, {
    fetchPolicy: "cache-first",
    variables: {
      username: userObject.username,
    },
  });

  const [startMission] = useMutation(ADD_USER_TO_MISSION, {
    variables: {
      inventId: userObject.id,
      IDmission: id,
    },
    update(_, result) {
      console.log("[result]", result);
    },
  });

  const popStart = () => {
    setStartScreen(!startScreen);
  };

  const addUserToMission = (event) => {
    event.preventDefault();
    startMission();
  };

  const minutesUntilComplete = (s, e) => {
    var start = s;
    var end = new Date(e);
    var diff = (start.getTime() - end.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  };
  let matchMission;
  if (!loading) {
    if (data.getUsers.mission_data.is_on_mission) {
      let mission_id = data.getUsers.mission_data.mission_id;

      if (id === mission_id) {
        matchMission = <div>On This Mission</div>;
      }
    }
  }

  let startMissionScreen = startScreen ? (
    <div className="mission-start-screen">
      <h3>Would you like to start this mission?</h3>
      <div className="mission-start-container">
        <button className="mission-start cancel" onClick={popStart}>
          Cancel
        </button>
        <button className="mission-start continue" onClick={addUserToMission}>
          Continue
        </button>
      </div>
    </div>
  ) : null;

  let image = require(`../../assets/images/mission_images/${mission_image_url}`);

  return (
    <div className="mission-tab">
      {!matchMission ? (
        <Aux>
          <div
            className="mission-screen"
            style={{ backgroundImage: `url(${image})` }}
            onClick={popStart}
          >
            <div className="mission-meta">
              <p className="mission-meta-inner">
                Level <span>{mission_level}</span>
              </p>
              <p className="mission-meta-inner">
                Experience <span>{mission_rewards.experience}xp</span>
              </p>
              <p className="mission-meta-inner">
                Time <span>{mission_time}min</span>
              </p>
            </div>
            <div className="mission-text">
              <h3 className="mission-title">{mission_title}</h3>
              <p>{mission_description}</p>
            </div>
            <div className="mission-info">
              <div className="mission-attack-style">
                <p>Mission Attack Style</p>
                <AttackStyle mission={mission_attack_style} />
              </div>
              <div className="recommended-info">
                <p>Recommended Styles</p>
                <div className="mission-recommended-styles">
                  <DefenceStyle mission={recommended_armour_type} />
                  <AttackStyle mission={recommended_attack_style} />
                </div>
              </div>
              <div className="rewards-info">
                <p>Mission Rewards</p>
                <div className="mission-rewards">
                  {Object.entries(mission_rewards.currency).map(
                    ([key, value]) => (
                      key !== "__typename" ? (
                        <CurrencyReward
                          currency={key}
                          reward={value}
                          key={key}
                        />
                      ) : null
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          {startMissionScreen}
        </Aux>
      ) : (
        <OnMission {...props} {...data} />
      )}
    </div>
  );
};

export default Mission;
