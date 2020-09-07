import React from "react";

const Mission = ({
  id,
  mission_title,
  mission_level,
  mission_description,
  mission_time,
  mission_rewards,
  mission_attack_style,
  recommended_attack_style,
  recommended_armour_type,
}) => {
  return (
    <div className="mission-tab">
      <div className="mission-text">
        <h3 className="mission-title">{mission_title}</h3>
        <p>{mission_description}</p>
      </div>
      <div className="mission-meta">
        <p className="mission-level">Mission Level: {mission_level}</p>
        <p className="mission-time">Mission Time: {mission_time}</p>
      </div>
      <div className="mission-rewards">
        <span className="gold-reward">
          Gold: {mission_rewards.currency.gold}
        </span>
        <span className="ether-reward">
          Ether: {mission_rewards.currency.ether}
        </span>
        {mission_rewards.currency.token ? (
          <span className="token-reward">
            Tokens:
            {mission_rewards.currency.tokens}
          </span>
        ) : null}
        <span className="experience-reward">
          Experience: {mission_rewards.experience}
        </span>
      </div>
      <div className="mission-info">
        <span className="mission-attack-style">
          Mission attack style:
           {mission_attack_style}
        </span>
        <span className="recommended-armour-type">
          Recommended armour type:
           {recommended_armour_type}
        </span>
        <span className="recommended-attack-style">
          Recommended attack style:
           {recommended_attack_style}
        </span>
      </div>
    </div>
  );
};

export default Mission;
