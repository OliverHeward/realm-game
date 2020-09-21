import React, { useState } from "react";
import NavItems from "./NavItems/NavItems";
import { useApolloClient, gql } from "@apollo/react-hooks";
import "./Header.scss";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import DrawerToggle from "../Navigation/SideDrawer/DrawerToggle/DrawerToggle";

const Header = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState();
  const client = useApolloClient();

  const { userObject } = client.readQuery({
    query: gql`
      query User {
        userObject @client
      }
    `,
  });

  const sideDrawerClosedHandler = () => {
    setSideDrawerOpen(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  return (
    <header className="header">
      <DrawerToggle clicked={sideDrawerToggleHandler} />
      <nav className="desktop-only">
        <NavItems />
      </nav>
      <SideDrawer
        open={sideDrawerOpen} 
        closed={sideDrawerClosedHandler} 
        user={userObject}
        />
    </header>
  );
};

export default Header;
