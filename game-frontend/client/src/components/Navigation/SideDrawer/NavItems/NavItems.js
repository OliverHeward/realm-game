import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Aux from "../../../../hoc/Aux";

const NavItems = () => {
  const [sidebarMenu, setSidebarMenu] = useState({
    home: {
      title: "home",
      isActive: false,
      to: "/",
    },
    quests: {
      title: "quests",
      isActive: false,
      to: "/quest",
    },
    missions: {
      title: "missions",
      isActive: false,
      to: "/missions",
    },
    inventory: {
      title: "inventory",
      isActive: false,
      to: "/inventory",
    },
    forum: {
      title: "forum",
      isActive: false,
      to: "/forum",
    },
    account: {
      title: "account",
      isActive: false,
      to: "/account",
    },
  });

  let menuArray = [];

  Object.entries(sidebarMenu).map((item) => {
    let menuItem = (
      <NavLink
        to={`${item[1].to}`}
        key={item[1].title.toLowerCase()}
        className={`sidebar-nav-item`}
      >
        {item[1].title}
      </NavLink>
    );
    menuArray.push(menuItem);
  });

  return <ul className="sidebar-nav">{menuArray}</ul>;
};

export default NavItems;
