import React, { useRef } from "react";
import { useQuery, gql, useApolloClient } from "@apollo/react-hooks";
import "./Inventory.scss";
import BackpackTooltip from "../../components/UI/Tooltips/BackpackTooltip";
import ReactTooltip from "react-tooltip";
import { useObjClean } from "../../utils/hooks";

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
  let tooltip = useRef();
  const client = useApolloClient();
  const { userObject } = client.readQuery({
    query: gql`
      query User {
        userObject @client
      }
    `,
  });
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

  // console.log(useObjClean(backpack, "__typename"));

  // On Hover
  const handleItemHover = () => {};

  // On Item Click
  const handleItemClick = () => {};

  // On Equip
  const handleItemEquip = () => {};

  return (
    <div>
      <h3>Backpack Tab</h3>
      <div className="backpack">
        {backpack.length >= 1
          ? backpack.map((item) => (
              <div className="backpack-wrapper" key={item.item_name}>
                <ReactTooltip
                  className="backpack-tooltip"
                  id={item.item_name.toLowerCase()}
                  clickable
                  effect="solid"
                  globalEventOff="click"
                  delayHide={100}
                  ref={(el) => (tooltip = el)}
                >
                  <span>{item.item_name}</span>
                  <div className="tooltip-info">
                    {item.__typename === "Equipment" ? (
                      <div className="item-stats">
                      {Object.entries(item.item_stats).map((stat) => {
                        if (stat[0] !== "__typename") {
                          return (
                            <div key={stat[0]} className="stat-wrapper">
                              <span className="stat-type">{stat[0]}</span>
                              <span className="stat-number">{stat[1]}</span>
                            </div>
                          );
                        }
                      })}
                      </div>
                    ) : (
                      <span>{item.quantity}</span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      tooltip.tooltipRef = null;
                      ReactTooltip.hide();
                    }}
                  >
                    Equip
                  </button>
                  <button
                    onClick={() => {
                      tooltip.tooltipRef = null;
                      ReactTooltip.hide();
                    }}
                  >
                    Bank
                  </button>
                </ReactTooltip>
                <div
                  key={item.item_name}
                  data-tip
                  data-for={item.item_name.toLowerCase()}
                  className="backpack-item"
                ></div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Backpack;
