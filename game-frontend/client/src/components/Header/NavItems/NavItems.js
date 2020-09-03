import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import NavItem from "./NavItem/NavItem";
import { Redirect } from "react-router-dom";

const NavItems = (props) => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);

  const handleLogout = () => {
    logout();
  }

  const navMenu = user ? (
    <ul>
      <NavItem link="/dashboard">
        Home
      </NavItem>
      <NavItem link="/forum">Forum</NavItem>
      <NavItem link="/account">Account</NavItem>
      <li onClick={handleLogout}>Logout</li>
    </ul>
  ) : (
    <ul>
      <NavItem link="/" exact>
        Home
      </NavItem>
      <NavItem link="/register">Register</NavItem>
      <NavItem link="/forum">Forum</NavItem>
    </ul>
  );
  return navMenu;
};

export default NavItems;
