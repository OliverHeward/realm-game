import React, { useContext } from "react";
import { useQuery, gql, useApolloClient } from "@apollo/react-hooks";
import "./Inventory.scss";

const FETCH_INVENTORY_QUERY = gql`
  query getInvent($userId: ID!) {
    getInventory(userInventId: $userId) {
      backpack {
        equipment {
          item_name
          rarity
          item_type {
            equipment_type
            slot_type
          }
          item_description
          item_stats {
            attack
            ranged_attack
            magic_attack
            defence
            hitpoints
            ranged_defence
            magic_defence
          }
        }
        misc {
          item_name
          quantity
        }
      }
    }
  }
`;

const Backpack = () => {
  const client = useApolloClient();
  const {userObject} = client.readQuery({
    query: gql`
      query User {
        userObject @client
      }
    `
  })
  const { loading, data, error } = useQuery(FETCH_INVENTORY_QUERY, {
    fetchPolicy: "cache-first",
    variables: {
      userId: userObject.id,
    },
  });

  // Init backpack array
  const backpack = [];

  if (!loading) {
    // Combine both data sets into array
    data.getInventory &&
      data.getInventory.backpack.equipment.map((item) => {
        backpack.push(item);
      });
    data.getInventory &&
      data.getInventory.backpack.misc.map((item) => {
        backpack.push(item);
      });
  }

  return (
    <div>
      <h3>Backpack Tab</h3>
      <div className="backpack">
        {backpack.length >= 1
          ? backpack.map((item) => (
              <div key={item.item_name} className="backpack-item">{item.item_name}</div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Backpack;
