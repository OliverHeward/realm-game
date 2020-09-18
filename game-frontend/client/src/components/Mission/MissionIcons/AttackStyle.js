import React from "react";
import FireBolt from "../../../assets/images/attack_styles/firebolt.png";
import Ranged from "../../../assets/images/attack_styles/ranged.png";
import Melee from "../../../assets/images/attack_styles/melee.png"
import Aux from "../../../hoc/Aux";

const AttackStyle = ({ mission }) => {
  const handleIcon = (attack_style) => {
    let icon;
    switch (attack_style) {
      case "Magic":
        icon = (
          <Aux>
            <img className="magic attack-style-icon" src={FireBolt}></img>
          </Aux>
          );
        break;
      case "Ranged":
        icon = <img className="ranged attack-style-icon" src={Ranged}></img>;
        break;
      case "Melee":
        icon = <img className="melee attack-style-icon" src={Melee}></img>;
        break;
        default:
          console.log('unknown attack style');
          break
    }

    return icon;
  };
  return <div className="mission-icon">{handleIcon(mission)}</div>;
};

export default AttackStyle;
