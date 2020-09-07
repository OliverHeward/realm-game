import React, { useContext } from "react";
import "./UserInformation.scss";
import { AuthContext } from "../../context/auth";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import jwtDecode from "jwt-decode";

import gql from "graphql-tag";
import { userLoggedIn } from "../../cache";

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

const FETCH_USER_QUERY = gql`
  query User {
    userId
  }
`;

const UserInformation = (props) => {
  const { loading, data } = useQuery(FETCH_USER_QUERY);

  if (!loading && data) {
    console.log(data);
  }

  return (
    <div className="user-panel">
      <span className="level">Level: 15</span>
    </div>
  );
};

export default UserInformation;
