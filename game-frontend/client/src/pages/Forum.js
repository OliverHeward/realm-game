import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ForumPost from "../components/ForumPost/ForumPost";

const Forum = () => {
  // data destruct getPosts and alias ->
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div className="forum">
      <h1>Forum Page</h1>
      {loading ? (
        <h1>Loading Posts...</h1>
      ) : (
        data.getPosts &&
        data.getPosts.map((post) => <ForumPost post={post} key={post.id} />)
      )}
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

export default Forum;
