import React from "react";
import Login from "../components/Login/Login";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Home = () => {
  // data destruct getPosts and alias ->
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div>
      <div className="banner">
        <div className="text-container">
          <h1>Forgotten Realms</h1>
        </div>
      </div>
      <div className="homepage-content-wrap">
        <div className="login-controller">
          <Login />
        </div>
        <div className="recent-posts">
          {loading ? (
            <h1>Loading Posts...</h1>
          ) : (
            data.getPosts &&
            data.getPosts.map((post) => (
              <div key={post.id}>
                <h2>{post.username}</h2>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        id
        createdAt
        username
      }
    }
  }
`;

export default Home;
