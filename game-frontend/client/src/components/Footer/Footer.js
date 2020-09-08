import React from "react";

import logo from "../../logo.svg";
import graphLogo from "../../grapql_logo.svg";
import mongoLogo from "../../mongodb_logo.svg";
import nodeLogo from "../../nodejs_logo.svg";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="lower-container">
        <span className="powered-by">Powered By</span>
        <div className="logo-container">
          <img src={logo} alt="React Logo" className="footer-logo" />
          <img src={graphLogo} alt="GraphQL Logo" className="footer-logo" />
          <img src={nodeLogo} alt="NodeJS Logo" className="footer-logo" />
          <img src={mongoLogo} alt="MongoDB Logo" className="footer-logo" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
