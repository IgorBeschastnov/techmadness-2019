import React from "react";

import "./checkbox.scss";

import { Line } from "./line";
import { Icon } from "./icon";

export interface RadioButtonProps {
  text?: string;
  value: string;
  id: string;
  onChange: (value: string) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  text,
  value,
  id,
  onChange
}) => {
  return (
    <Line alignItems="center" className="auth-checkbox">
      <Icon
        name={id === value ? "check-circle" : "circle"}
        prefix="far"
        onClick={() => onChange(id)}
      ></Icon>
      <div className="text" onClick={() => onChange(id)}>
        {text}
      </div>
    </Line>
  );
};
