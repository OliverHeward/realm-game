import React, { useState } from "react";

const InventoryNav = (props) => {
  const [link, setLink] = useState({
    links: [
      {
        id: "backpack",
        className: "inventory-nav-item",
        innerText: "Backpack",
      },
      {
        id: "equipment",
        className: "inventory-nav-item",
        innerText: "Equipment",
      },
      {
        id: "resources",
        className: "inventory-nav-item",
        innerText: "Resources",
      },
      {
        id: "bank",
        className: "inventory-nav-item",
        innerText: "Bank",
      },
    ],
    activeLink: null,
  });

  const handleNav = (id) => {
    setLink(prevState => ({
        ...prevState,
        activeLink: id
    }));
    props.click(id);
  };

  const { links, activeLink } = link;

  return (
    <ul>
      {links.map((link) => {
        return (
          <li
            key={link.id}
            onClick={() => handleNav(link.id)}
            className={
              link.className + (link.id === activeLink ? " active" : "")
            }
          >
            {link.innerText}
          </li>
        );
      })}
    </ul>
  );
};

export default InventoryNav;
