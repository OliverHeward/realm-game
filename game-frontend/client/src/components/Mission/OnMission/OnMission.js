import React, { useState } from "react";

import { gql, useMutation } from "@apollo/react-hooks";

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
    }
  }
`;

const OnMission = (props) => {
  console.log(props);
  const [isComplete, setIsComplete] = useState(false);

  const minutesUntilComplete = (s, e) => {
    var start = s;
    var end = new Date(e);
    var diff = (start.getTime() - end.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  };

  console.log(Math.random());
  // when user is on mission and there is still time remaining, show one type
  const [handleMissionComplete] = useMutation(HANDLE_MISSION_COMPLETE, {
    variables: {
      missionCompleted: isComplete,
      inventId: props.getUsers.id,
      IDmission: props.id,
    },
    update(_, result) {
      console.log("result", result);
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
    </div>
  );
  var dateNow = new Date();

  let minutesRemaining = minutesUntilComplete(
    dateNow,
    props.getUsers.mission_data.mission_end_time
  );
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
