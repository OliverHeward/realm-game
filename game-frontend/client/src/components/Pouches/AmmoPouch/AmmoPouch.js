import React, { useContext, useState } from "react";
import PouchItem from "../PouchItem/Runes";

import { AuthContext } from "../../../context/auth";
import { gql, useQuery } from "@apollo/client";

import Arrows from "../PouchItem/Arrows";
import ReactTooltip from "react-tooltip";

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

  const { loading, error, data } = useQuery(FETCH_AMMO_QUERY, {
    variables: {
      userId: user.id,
    },
  });

  return (
    <div>
      Ammo Pouch
      <div className="pouch-wrapper">
        {!loading
          ? data.getInventory &&
            data.getInventory.ammo_pouch.map((ammo) => (
              <div className="item-wrapper" key={ammo.item_name} data-tip
              data-for={ammo.item_name.toLowerCase()}>
                <ReactTooltip id={ammo.item_name.toLowerCase()}>
                  <span>{ammo.item_name}</span>
                </ReactTooltip>
                <Arrows
                  key={ammo.item_name}
                  quantity={ammo.quantity}
                />
              </div>
            ))
          : null}
      </div>
      <PouchItem />
    </div>
  );
};

export default AmmoPouch;
