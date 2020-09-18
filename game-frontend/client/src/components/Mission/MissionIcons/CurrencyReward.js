import React from "react";

import GoldCoins from "../../../assets/images/misc/gold_coins.png";
import Ether from "../../../assets/images/misc/ether.png";
import Tokens from "../../../assets/images/misc/tokens.png";

const CurrencyReward = ({ currency, reward }) => {
  const handleRewardIcon = (currency, reward) => {
    let icon;
    switch (currency) {
      case "gold":
        icon = <img src={GoldCoins} className="gold-reward" />;
        break;
      case "ether":
        icon = <img src={Ether} className="ether-reward" />;
        break;
      case "tokens":
        icon = <img src={Tokens} className="tokens-reward" />;
        break;
      default:
        console.log("unknown currency");
        break;
    }
    return icon;
  };
  return (
    <div className={`${currency} mission-reward`}>
      {handleRewardIcon(currency, reward)}
    </div>
  );
};

export default CurrencyReward;
