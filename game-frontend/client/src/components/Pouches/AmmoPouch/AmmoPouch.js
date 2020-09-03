import React, { useContext, useState } from "react";
import PouchItem from "../PouchItem/Runes";

import { AuthContext } from "../../../context/auth";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Arrows from "../PouchItem/Arrows";
import Aux from "../../../hoc/Layout/Aux";

const FETCH_AMMO_QUERY = gql`
  query getInvent($userId: ID!) {
    getInventory(userInventId: $userId) {
      ammo_pouch {
        item_name
        quantity
        rarity
        item_description
      }
    }
  }
`;

const AmmoPouch = () => {
  const { user } = useContext(AuthContext);
  const [ showInfo, setShowInfo ] = useState(false);

  const { loading, error, data } = useQuery(FETCH_AMMO_QUERY, {
    variables: {
      userId: user.id,
    },
  });

  const handleEnter = () => {
        setShowInfo(true);
  }

  const handleLeave = () => {
      setShowInfo(false);
  }

  return (
    <div>
      Ammo Pouch
      <div className="pouch-wrapper">
        {!loading
          ? data.getInventory &&
            data.getInventory.ammo_pouch.map((ammo) => (
                <div className="item-wrapper" onMouseEnter={handleEnter} onMouseLeave={handleLeave} >
                    <Arrows key={ammo.item_name} quantity={ammo.quantity} />
                    <div className={`info-box ${showInfo ? 'show-tab' : '' } `}>
                        <p>{ammo.item_name}</p>
                    </div>
              </div>
            ))
          : null}
      </div>
      <PouchItem />
    </div>
  );
};

export default AmmoPouch;
