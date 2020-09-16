import React, { useContext } from "react";
import Runes from "../PouchItem/Runes";
import { AuthContext } from "../../../context/auth";
import Aux from "../../../hoc/Aux";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const FETCH_POUCH_QUERY = gql`
  query getInvent($userId: ID!) {
    getInventory(userInventId: $userId) {
      rune_pouch {
        item_name
        quantity
        rarity
        item_description
      }
    }
  }
`;

const RunePouch = (props) => {
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery(FETCH_POUCH_QUERY, {
    variables: {
      userId: user.id,
    },
  });

  return (
    <div>
      RunePouch
      <div className="pouch-wrapper">
        {!loading
          ? data.getInventory &&
            data.getInventory.rune_pouch.map((rune) => <Runes key={rune.item_name} {...rune} />)
          : null}
      </div>
    </div>
  );
};

export default RunePouch;
