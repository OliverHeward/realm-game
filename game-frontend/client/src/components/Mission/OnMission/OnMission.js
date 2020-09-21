import React, { useState } from "react";

import { gql, useMutation } from "@apollo/react-hooks";
import Moment from "react-moment";

const HANDLE_MISSION_COMPLETE = gql`
  mutation handleMissionComplete(
    $missionCompleted: Boolean
    $inventId: String
    $IDmission: String
  ) {
    handleMissionComplete(
      finishedMission: $missionCompleted
      userInventId: $inventId
      missionId: $IDmission
    ) {
      id
      current_hitpoints
      base_hitpoints
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

const OnMission = (props) => {
  const [isComplete, setIsComplete] = useState(false);

  const minutesUntilComplete = (s, e) => {
    var start = s;
    var end = new Date(e);
    var diff = (start.getTime() - end.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  };

  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  // when user is on mission and there is still time remaining, show one type
  const [handleMissionComplete] = useMutation(HANDLE_MISSION_COMPLETE, {
    variables: {
      missionCompleted: isComplete,
      inventId: props.getUsers.id,
      IDmission: props.id,
    },
    update: (cache, { data }) => {
      try {
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  // take mission end time, check against time now
  const handleComplete = (event) => {
    event.preventDefault();
    setIsComplete(true);
    handleMissionComplete();
  };

  let completeMission = (
    <div className="mission-complete">
      <h3 className="complete-title">Mission Complete</h3>
      <button type="button" onClick={handleComplete}>
        Complete
      </button>
    </div>
  );

  let missionInProgress = (
    <div className="mission-in-progress">
      <p>Mission is currently in progress</p>
      <p>{getTimeRemaining(
        new Date(props.getUsers.mission_data.mission_end_time)
      ).minutes}min left</p>
    </div>
  );

  var dateNow = new Date();

  let minutesRemaining = minutesUntilComplete(
    dateNow,
    props.getUsers.mission_data.mission_end_time
  );

  // TODO: missionStatus needs to take the minutesRemaining check that new Date().now() is <= mission_end_time
 
  var missionStatus =
    minutesRemaining > props.mission_time ? completeMission : missionInProgress;

  let image = require(`../../../assets/images/mission_images/${props.mission_image_url}`);

  return (
    <div
      className="mission-started"
      style={{
        backgroundImage: `linear-gradient(145deg, rgb(0 0 0 / 49%), rgb(31 3 9 / 31%)), url(${image})`,
      }}
    >
      {missionStatus}
    </div>
  );
};

export default OnMission;
