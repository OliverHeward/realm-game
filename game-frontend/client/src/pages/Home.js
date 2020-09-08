import React from "react";
import Login from "../components/Login/Login";

const Home = () => {
  // data destruct getPosts and alias ->

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
         
        </div>
      </div>
    </div>
  );
};

// const FETCH_POSTS_QUERY = gql`
//   {
//     getPosts {
//       id
//       body
//       createdAt
//       username
//       likeCount
//       commentCount
//       comments {
//         id
//         createdAt
//         username
//         body
//       }
//       likes {
//         id
//         createdAt
//         username
//       }
//     }
//   }
// `;

export default Home;
