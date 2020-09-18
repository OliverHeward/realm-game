import React from "react";
import "./UserInformation.scss";
import { useApolloClient, gql, useQuery } from "@apollo/client";

const FETCH_USER = gql`
  query GetUsers($username: String!) {
    getUsers(userName: $username) {
      username
      combat_level
      experience
      base_hitpoints
      current_hitpoints
    }
  }
`;

const UserInformation = (props) => {
  const client = useApolloClient();

  const { userObject } = client.readQuery({
    query: gql`
      query User {
        userObject @client
      }
    `,
  });

  const { loading, data, error } = useQuery(FETCH_USER, {
    fetchPolicy: "cache-and-network",
    variables: {
      username: userObject.username,
    },
  });

  let user_data = !loading ? (
    <div className="user-data">
      <div className="user-stats">
        <span className="username">Username: {userObject.username}</span>
        <span className="level">Level: {data.getUsers.combat_level}</span>
        <span className="experience">Experience: {data.getUsers.experience}</span>
      </div>
      <div className="user-hitpoints">
      Hitpoints: 
        <span>{data.getUsers.current_hitpoints}</span>/
        <span>{data.getUsers.base_hitpoints}</span>
      </div>
    </div>
  ) : null;

  if (!loading) {
    console.log(data);
  }

  return user_data;
};

export default UserInformation;
