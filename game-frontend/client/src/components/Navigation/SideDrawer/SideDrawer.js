import React from "react";
import Aux from "../../../hoc/Aux";
import NavItems from "../../Header/NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Icon from "../../../assets/images/user_images/iconfinder_game_of_thrones_game_thrones_series_character_avatar_ice_dragon_4527369.png";

const SideDrawer = ({ closed, open, user }) => {
  console.log(user);
  return (
    <Aux>
      <Backdrop show={open} clicked={closed} />
      <div
        className={`side-drawer ${open ? "open" : "close"}`}
        onClick={closed}
      >
        <div className="user-container">
          <img className="user-logo" src={Icon} />
          <p>Username: {user.username}</p>
          <p>Level: {user.combat_level}</p>
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
