import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "semantic-ui-react";

import UserInformation from "../components/UserInformation/UserInformation";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <UserInformation />
      <div className="hot-menu-wrap">
        <ul className="dash-hot-menu">
          <NavLink to="/quest" className="tile-link-wrap">
            <Container className="tile">Quests</Container>
          </NavLink>
          <NavLink to="/missions" className="tile-link-wrap">
            <Container className="tile">Missions</Container>
          </NavLink>
          <NavLink to="/inventory" className="tile-link-wrap">
            <Container className="tile">Inventory</Container>
          </NavLink>
          <NavLink to="/account" className="tile-link-wrap">
            <Container className="tile">Account</Container>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
