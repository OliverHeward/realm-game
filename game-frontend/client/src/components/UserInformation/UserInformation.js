import React, { useContext } from "react";
import "./UserInformation.scss";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";

const FETCH_INVENTORY_QUERY = gql`
  query getInvent($userId: ID!) {
    getInventory(userInventId: $userId) {
      currency {
        gold
        ether
        tokens
      }
      resources {
        wood
        stone
        gems
      }
    }
  }
`;

const UserInformation = (props) => {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_INVENTORY_QUERY, {
      variables: {
          userId: user.id
      }
  });

  return (
    <div className="user-panel">
    {!loading ? (
        <div className="user-panel">
        <span className="username">Username: {user.username}</span>
        <span className="currency">Gold: {data.getInventory.currency.gold}</span>
      </div>
    ) : ''}
      <span className="level">Level: 15</span>
    </div>
  );
};

export default UserInformation;
