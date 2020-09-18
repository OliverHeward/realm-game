import React from "react";
import LeatherRed from "../../../assets/images/defence_styles/leather_red.png";
import MeleeIcon from "../../../assets/images/defence_styles/melee.png";
import MagicIcon from "../../../assets/images/defence_styles/magic_defence.png";



const DefenceStyle = ({ mission }) => {
  const handleIcon = (defence_style) => {
    let icon;
    switch (defence_style) {
      case "Ranged":
        icon = <img className="ranged defence-style-icon" src={LeatherRed} />;
        break;
      case "Melee":
        icon = <img className="melee defence-style-icon" src={MeleeIcon} /> 
        break;
      default:
        icon = <img className="melee defence-style-icon" src={MagicIcon} />
        console.log("unknown defence style");
        break;
    }
    return icon;
  };
  return <div className="mission-icon">{handleIcon(mission)}</div>
};

export default DefenceStyle