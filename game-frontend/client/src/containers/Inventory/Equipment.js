import React from "react";

import { Grid } from "semantic-ui-react";

import Pouches from "../../components/Pouches/Pouches";

const Equipment = () => {
  return (
    <div>
      <h3>Equipment Tab</h3>
      <Pouches />

      <Grid columns={3} divided padded className="equipment-wrapper">
        <Grid.Row className="equipt-wrapper">
        <Grid.Column className="spacer"/>
          <Grid.Column className="equipt-icon"><div className="item-slot">Head
          </div></Grid.Column>
        <Grid.Column className="spacer"/>
        </Grid.Row>

        <Grid.Row className="equipt-wrapper">
          <Grid.Column className="equipt-icon"><div className="item-slot">Back
          </div></Grid.Column>
          <Grid.Column className="equipt-icon"><div className="item-slot">Neck
          </div></Grid.Column>

          <Grid.Column className="equipt-icon"><div className="item-slot">Shoulder
          </div></Grid.Column>
        </Grid.Row>
        <Grid.Row className="equipt-wrapper">
          <Grid.Column className="equipt-icon"><div className="item-slot">Primary
          </div></Grid.Column>
          <Grid.Column className="equipt-icon"><div className="item-slot">Torso
          </div></Grid.Column>
          <Grid.Column className="equipt-icon"><div className="item-slot">Secondary
          </div></Grid.Column>

        </Grid.Row>
        <Grid.Row className="equipt-wrapper">
            <Grid.Column className="equipt-icon"><div className="item-slot">Gloves
            </div></Grid.Column>
            <Grid.Column className="equipt-icon"><div className="item-slot">Legs
            </div></Grid.Column>
            <Grid.Column className="equipt-icon"><div className="item-slot">Ring Slot 1
            </div></Grid.Column>
        </Grid.Row>
        <Grid.Row className="equipt-wrapper">
            <Grid.Column className="spacer"/>
            <Grid.Column className="equipt-icon"><div className="item-slot">Boots
            </div></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Equipment;
