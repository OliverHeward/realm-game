import React from "react";

import { Grid } from "semantic-ui-react";
import { gql, useQuery, useApolloClient } from "@apollo/client";

import Pouches from "../../components/Pouches/Pouches";

const FETCH_WORN_EQUIPMENT = gql`
  query getInvent($userId: ID!) {
    getInventory(userInventId: $userId) {
      worn_equipment {
        equipment {
          item_name
          rarity
          item_type {
            slot_type
            equipment_type
          }
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
      }
    }
  }
`;

const Equipment = () => {
  const client = useApolloClient();
  const {userObject} = client.readQuery({
    query: gql`
      query User {
        userObject @client
      }
    `
  });

  const { loading, data, error } = useQuery(FETCH_WORN_EQUIPMENT, {
    fetchPolicy: "cache-first",
    variables: {
      userId: userObject.id,
    },
  });

  let itemsObj = {
    head: {},
    back: {},
    neck: {},
    shoulder: {},
    primary: {},
    torso: {},
    secondary: {},
    gloves: {},
    legs: {},
    ring_slot_1: {},
    boots: {},
  };

  if (!loading) {
    data.getInventory.worn_equipment &&
      data.getInventory.worn_equipment.equipment.map((item) => {
        const slot_type = item.item_type.slot_type.toLowerCase();
        // assign key with dynamic slot type name the item object
        itemsObj[slot_type] = item;
      });
  }


  return (
    <div>
      <h3>Equipment Tab</h3>
      <Pouches />
      <Grid columns={3} divided padded className="equipment-wrapper">
        <Grid.Row className="equipt-wrapper">
          <Grid.Column className="spacer" />
          <Grid.Column className="equipt-icon">
            <div className="item-slot">{itemsObj.head.item_name}</div>
          </Grid.Column>
          <Grid.Column className="spacer" />
        </Grid.Row>

        <Grid.Row className="equipt-wrapper">
          <Grid.Column className="equipt-icon">
            <div className="item-slot">{itemsObj.back.item_name}</div>
          </Grid.Column>
          <Grid.Column className="equipt-icon">
            <div className="item-slot">{itemsObj.neck.item_name}</div>
          </Grid.Column>

          <Grid.Column className="equipt-icon">
            <div className="item-slot">{itemsObj.shoulder.item_name}</div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="equipt-wrapper">
          <Grid.Column className="equipt-icon">
            <div className="item-slot">{itemsObj.primary.item_name}</div>
          </Grid.Column>
          <Grid.Column className="equipt-icon">
            <div className="item-slot">{itemsObj.torso.item_name}</div>
          </Grid.Column>
          <Grid.Column className="equipt-icon">
            <div className="item-slot">{itemsObj.secondary.item_name}</div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="equipt-wrapper">
          <Grid.Column className="equipt-icon">
            <div className="item-slot">{itemsObj.gloves.item_name}</div>
          </Grid.Column>
          <Grid.Column className="equipt-icon">
            <div className="item-slot">{itemsObj.legs.item_name}</div>
          </Grid.Column>
          <Grid.Column className="equipt-icon">
            <div className="item-slot">{itemsObj.ring_slot_1.item_name}</div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="equipt-wrapper">
          <Grid.Column className="spacer" />
          <Grid.Column className="equipt-icon">
            <div className="item-slot">{itemsObj.boots.item_name}</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Equipment;
