import React from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import Aux from "../../hoc/Aux";

const FETCH_RESOURCES = gql`
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

const Resources = () => {
  const client = useApolloClient();
  const { userObject } = client.readQuery({
    query: gql`
      query User {
        userObject @client
      }
    `,
  });

  const { loading, data, error } = useQuery(FETCH_RESOURCES, {
    fetchPolicy: "cache-first",
    variables: {
      userId: userObject.id,
    },
  });

  return (
    <div>
      <h3>Resources Tab</h3>
      <div className="resources">
        <div className="currency-tab">
          {!loading ? (
            <Aux>
              <div className="gold">
                Gold: {data.getInventory.currency.gold}
              </div>
              <div className="ether">
                Ether: {data.getInventory.currency.ether}
              </div>
              <div className="token">
                Tokens: {data.getInventory.currency.tokens}
              </div>
            </Aux>
          ) : null}
        </div>
        <div className="resources-tab">
          {!loading ? (
            <Aux>
              <div className="gems">
                Gems: {data.getInventory.resources.gems}
              </div>
              <div className="stone">
                Stone: {data.getInventory.resources.stone}
              </div>
              <div className="wood">
                Wood: {data.getInventory.resources.wood}
              </div>
            </Aux>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Resources;
