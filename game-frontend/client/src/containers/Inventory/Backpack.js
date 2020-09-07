import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";

const FETCH_INVENTORY_QUERY = gql`
  query getInvent($userId: ID!) {
    getInventory(userInventId: $userId) {
      backpack {
        item_name
        quantity
      }
    }
  }
`;

const Backpack = () => {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_INVENTORY_QUERY, {
    variables: {
      userId: user.id,
    },
  });
  if(!loading) {
    console.log(data);
  }
  return (
    <div>
      <h3>Backpack Tab</h3>
      
    </div>
  );
};

export default Backpack;
