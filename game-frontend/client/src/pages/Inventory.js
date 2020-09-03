import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";
import { AuthContext } from "../context/auth";
import Backpack from "../containers/Inventory/Backpack";
import Equipment from "../containers/Inventory/Equipment";
import Resources from "../containers/Inventory/Resources";
import Bank from "../containers/Inventory/Bank";

const FETCH_INVENTORY_QUERY = gql`
  query getInvent($userId: ID!) {
    getInventory(userInventId: $userId) {
      currency {
        gold
        ether
        tokens
      }
      resources {
        wood
        stone
        gems
      }
    }
  }
`;

const Inventory = () => {
  const [activeTab, setActiveTab] = useState();
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_INVENTORY_QUERY, {
    variables: {
      userId: user.id,
    },
  });
  const handleTabbing = (event) => {
    switch (event.target.id) {
      case "Backpack":
        setActiveTab(<Backpack />);
        break;
      case "Equipment":
        setActiveTab(<Equipment />);
        break;
      case "Resources":
        setActiveTab(<Resources />);
        break;
      case "Bank":
        setActiveTab(<Bank />);
        break;
    }
  };

  return (
    <div className="inventory-page">
      <h1>Inventory</h1>
      <ul>
        <li onClick={handleTabbing} id="Backpack">
          Backpack
        </li>
        <li onClick={handleTabbing} id="Equipment">
          Equipment
        </li>
        <li onClick={handleTabbing} id="Resources">
          Resources
        </li>
        <li onClick={handleTabbing} id="Bank">
          Bank
        </li>
      </ul>
      <div className="inventory-active">{activeTab}</div>
    </div>
  );
};

export default Inventory;
