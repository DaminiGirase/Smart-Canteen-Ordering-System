import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#333",
        color: "#fff",
        textAlign: "center",
        padding: "10px",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%"
      }}
    >
      <p>© {new Date().getFullYear()} Quick Bite | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
