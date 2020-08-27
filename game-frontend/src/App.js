import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SignUp from "./containers/Auth/SignUp/SignUp";
import image from './assets/images/c584c2cae05a4591db1d40a24903bb90.jpg';
import SignIn from "./containers/Auth/SignIn/SignIn";

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
        <h3 className="header-title">Forgotten Realms</h3>
      </header>
      <section className="entry">
        <img src={image} />
        <div className="text-container">
          <h3>Welcome to Forgotten Realms</h3>
          <div className="auth-control">  
            <SignIn />
            <SignUp />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
