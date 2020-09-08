import React from "react";
import "./UserInformation.scss";
import { useApolloClient, gql } from "@apollo/client";

const UserInformation = (props) => {
  const client = useApolloClient();
  const {userObject} = client.readQuery({
    query: gql`
      query User {
        userObject @client
      }
    `
  });

  return (
    <div className="user-panel">
      <span className="level">{userObject.username}</span>
      <span className="level">Level: 15</span>
    </div>
  );
};

export default UserInformation;
