import React, { useContext } from "react";
import { AuthContext } from "../context/auth";

const Account = () => {
    const {user} = useContext(AuthContext);
  return (
    <div>
      <h1>{user.username}'s Account</h1>
      <div className="account-tab-wrapper">
        <div className="account-tab-detail">
            <p>Display name</p>
            <h3>{user.username}</h3>
        </div>
        <div className="account-tab-detail">
            <p>Email Address</p>
            <h3>{user.email}</h3>
        </div>
      </div>
    </div>
  );
};

export default Account;
