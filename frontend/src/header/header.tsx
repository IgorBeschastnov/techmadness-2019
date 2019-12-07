import React, { useState } from "react";

import { Line } from "../shared/line";
import { Icon } from "../shared/icon";
import logo from "../resources/logo.png";

import "./header.scss";

const menuItems = [
  { id: 0, label: "Подбор предложений" },
  { id: 1, label: "Планирование стратегии" }
];

export interface Props {
  onChange: (value: number) => void;
}

export const Header: React.FC<Props> = ({ onChange }) => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <Line className="header" justifyContent="between" alignItems="center">
      <img src={logo} alt="" className="logo"></img>
      <Line justifyContent="between" className="items">
        {menuItems.map(item => (
          <Line
            key={item.id}
            className={`header-item ${
              activeItem === item.id ? "active" : "not-active"
            }`}
            alignItems="center"
            onClick={() => {
              setActiveItem(item.id);
              onChange(item.id);
            }}
          >
            <div className="label">{item.label}</div>
          </Line>
        ))}
      </Line>
      <Line className="icons" justifyContent="between">
        <Icon name="user"></Icon>
        <Icon name="sign-out-alt"></Icon>
      </Line>
    </Line>
  );
};
