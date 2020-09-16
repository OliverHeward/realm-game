import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import {gql, useApolloClient, useQuery} from "@apollo/react-hooks";

const FETCH_USER = gql`
  query GetUsers($username: String!) {
    getUsers(userName: $username) {
      id
      email
      username
      combat_level
      experience
      createdAt
      mission_data { 
        is_on_mission
        mission_id
        mission_start_time
        mission_end_time
      }
      quest_data {
        is_on_quest
        quest_id
        quest_start_time
        quest_end_time
      }
    }
  }
`

const Account = () => {
    const {user} = useContext(AuthContext);
    const client = useApolloClient();
    const {userObject} = client.readQuery({
      query: gql`
        query User {
          userObject @client
        }
      `
    });

    const {loading, data, error} = useQuery(FETCH_USER, {
      fetchPolicy: "cache-first",
      variables: {
        username: userObject.username
      }
    });

    if(!loading) {
      console.log(data);
    }
  return (
    <div>
      <h1>{user.username}'s Account</h1>
      <div className="account-tab-wrapper">
        <div className="account-tab-detail">
            <p>Display name</p>
            <h3>{user.username}</h3>
        </div>
        <div className="account-tab-detail">
            <p>Email Address</p>
            <h3>{user.email}</h3>
        </div>
      </div>
    </div>
  );
};

export default Account;
