import React from "react";
import UserInformation from "../components/UserInformation/UserInformation";

import { useQuery, gql } from "@apollo/react-hooks";

import Mission from "../components/Mission/Mission";

const FETCH_MISSIONS_QUERY = gql`
  {
    getMissions {
      id
      mission_title
      mission_level
      mission_time
      mission_description
      mission_attack_style
      recommended_armour_type
      recommended_attack_style
      mission_rewards {
        currency {
          gold
          ether
          tokens
        }
        experience
      }
    }
  }
`;

const Missions = (props) => {
  const { loading, error, data } = useQuery(FETCH_MISSIONS_QUERY);

  if (!loading) {
    // console.log(data);
  }
  return (
    <div>
      <UserInformation />
      <h1>Missions Page</h1>
      <p>
        Welcome to the missions page, soon this will have some missions to be
        done.
      </p>
      {!loading
        ? data.getMissions &&
          data.getMissions.map((mission) => <Mission {...mission} key={mission.id} />)
        : null}
    </div>
  );
};

export default Missions;
