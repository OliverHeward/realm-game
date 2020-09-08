import React, { useState } from "react";

import Backpack from "../containers/Inventory/Backpack";
import Equipment from "../containers/Inventory/Equipment";
import Resources from "../containers/Inventory/Resources";
import Bank from "../containers/Inventory/Bank";
import InventoryNav from "../components/InventoryNav/InventoryNav";


const Inventory = () => {
  const [activeTab, setActiveTab] = useState();
  const handleTabbing = (id) => {
    switch (id) {
      case "backpack":
        setActiveTab(<Backpack />);
        break;
      case "equipment":
        setActiveTab(<Equipment />);
        break;
      case "resources":
        setActiveTab(<Resources />);
        break;
      case "bank":
        setActiveTab(<Bank />);
        break;
      default: 
        break;
    }
  };

  return (
    <div className="inventory-page">
      <h1>Inventory</h1>
      <InventoryNav click={handleTabbing} />
      <div className="inventory-active">{activeTab}</div>
    </div>
  );
};

export default Inventory;
