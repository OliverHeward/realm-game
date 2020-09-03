import React from "react";
import AmmoPouch from "./AmmoPouch/AmmoPouch";
import RunePouch from "./RunePouch/RunePouch";

const Pouches = () => {
  return (
    <div>
      Your Pouches
      <AmmoPouch />
      <RunePouch />
    </div>
  );
};

export default Pouches;
