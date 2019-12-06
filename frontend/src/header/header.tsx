import React, { useState } from "react";

import { Line } from "../shared/line";
import { Icon } from "../shared/icon";
import logo from "../resources/logo.png";

import "./header.scss";

const menuItems = [{ id: 0, label: "Подбор предложений" }];

export const Header: React.FC = () => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <Line className="header" justifyContent="between" alignItems="center">
      <img src={logo} className="logo"></img>
      {menuItems.map(item => (
        <Line
          key={item.id}
          className={`header-item ${activeItem === item.id ? "active" : ""}`}
          alignItems="center"
        >
          <div>{item.label}</div>
        </Line>
      ))}
      <Line className="icons" justifyContent="between">
        <Icon name="user"></Icon>
        <Icon name="sign-out-alt"></Icon>
      </Line>
    </Line>
  );
};
