import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import UserInformation from "../components/UserInformation/UserInformation";

import QuestsIcon from "../assets/images/mission_images/skeleton_cove.jpg";
import MissionsIcon from "../assets/images/mission_images/dwarven_mines.jpg";
import InventoryIcon from "../assets/images/mission_images/fire_realm.jpg";
import AccountIcon from "../assets/images/mission_images/tomb.jpg";

const Dashboard = () => {
  const [menuState, setMenuState] = useState({
    quest: {
      backgroundImage: QuestsIcon,
      title: "Quests",
      to: "/quest",
      color: "#fbbd0869 "
    },
    missions: {
      backgroundImage: MissionsIcon,
      title: "Missions",
      to: "/missions",
      color: "rgb(8 194 251 / 41%)",
    },
    inventory: {
      backgroundImage: InventoryIcon,
      title: "Inventory",
      to: "/inventory",
      color: "#953e2391"
    },
    account: {
      backgroundImage: AccountIcon,
      title: "Account",
      to: "/account",
      color: "rgb(104 86 252 / 41%)"
    },
  });

  let menuArray = [];
  Object.entries(menuState).map((item) => {
    let menuItem = (
      <NavLink
        to={`${item[1].to}`}
        key={item[1].title.toLowerCase()}
        className="tile-link-wrap"
        style={{
          background: `linear-gradient(145deg, ${item[1].color}, rgba(0,0,0,.9)),url(${item[1].backgroundImage}) center center/cover no-repeat` ,
        }}
      >
        <h3 className="tile-title">{item[1].title}</h3>
      </NavLink>
    );
    menuArray.push(menuItem);
  });
  return (
    <div className="dashboard">
      <UserInformation />
      <div className="hot-menu-wrap">
        <ul className="dash-hot-menu">{menuArray}</ul>
      </div>
    </div>
  );
};

export default Dashboard;
