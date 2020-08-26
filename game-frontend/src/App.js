import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SignUp from "./containers/Auth/SignUp";

function App() {
  // var [user, fetchedUser] = useState();

  useEffect(() => {
    fetchUser();
  });

  var fetchUser = () => {
    console.log("clicked");
    fetch(
      "http://localhost:4002/graphql?query={todo(email:%22oliver@hewy.dev%22){first_name,last_name,%20email,%20password}}"
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <span>Welcome to Realm</span>
      <SignUp />
    </div>
  );
}

export default App;
