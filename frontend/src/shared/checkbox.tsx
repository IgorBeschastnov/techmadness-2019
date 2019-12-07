import React from "react";

import "./checkbox.scss";

import { Line } from "./line";
import { Icon } from "./icon";

export interface CheckboxProps {
  text?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ text,value,onChange }) => {

  return (
    <Line alignItems="center" className="auth-checkbox">
      <Icon
        name={value ? "check-square" : "square"}
        prefix="far"
        onClick={()=>onChange(!value)}
      ></Icon>
      <div className="text"onClick={()=>onChange(!value)}>{text}</div>
    </Line>
  );
};
