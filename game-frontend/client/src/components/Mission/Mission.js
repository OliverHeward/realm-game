import React, { useState } from "react";
import Aux from "../../hoc/Aux";
import Moment from "react-moment";

import { gql, useQuery, useApolloClient, useMutation } from "@apollo/client";
import OnMission from "./OnMission/OnMission";

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
    return Math.abs(Math.round(diff))
  }
  let matchMission;
  if(!loading) {
    if(data.getUsers.mission_data.is_on_mission) {
      let mission_id = data.getUsers.mission_data.mission_id;

      if(id === mission_id) {
        matchMission = (
          <div>On This Mission</div>
        )
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

  return (
    <div className="mission-tab">
      {!matchMission ? (
        <Aux>
          <div className="mission-screen">
            <div className="mission-text-tab">
              <div className="mission-text">
                <h3 className="mission-title">{mission_title}</h3>
                <p>{mission_description}</p>
              </div>
              <div className="mission-meta">
                <p className="mission-level">Mission Level: {mission_level}</p>
                <p className="mission-time">Mission Time: {mission_time}</p>
              </div>
              <div className="mission-rewards">
                <span className="gold-reward">
                  Gold: {mission_rewards.currency.gold}
                </span>
                <span className="ether-reward">
                  Ether: {mission_rewards.currency.ether}
                </span>
                {mission_rewards.currency.token ? (
                  <span className="token-reward">
                    Tokens:
                    {mission_rewards.currency.tokens}
                  </span>
                ) : null}
                <span className="experience-reward">
                  Experience: {mission_rewards.experience}
                </span>
              </div>
              <div className="mission-info">
                <span className="mission-attack-style">
                  Mission attack style:
                  {mission_attack_style}
                </span>
                <span className="recommended-armour-type">
                  Recommended armour type:
                  {recommended_armour_type}
                </span>
                <span className="recommended-attack-style">
                  Recommended attack style:
                  {recommended_attack_style}
                </span>
              </div>
            </div>
            <button type="button" className="start-mission" onClick={popStart}>
              Start Mission
            </button>
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
