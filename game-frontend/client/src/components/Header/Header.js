import React, { useContext } from "react";
import NavItems from "./NavItems/NavItems";
import { AuthContext } from "../../context/auth";

import "./Header.scss";

const Header = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const helloUser = user ? (
    <span className="greetings">Welcome back... {user.username}</span>
  ) : null;
  return (
    <div className="header">
      <nav>
        <NavItems />
      </nav>
      {helloUser}
    </div>
  );
};

export default Header;
