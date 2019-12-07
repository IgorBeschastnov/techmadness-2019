import React, { useState, useCallback } from "react";

import "./checkbox.scss";

import { Line } from "./line";
import { Icon } from "./icon";

export interface CheckboxProps {
  text?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ text }) => {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = useCallback(() => setIsChecked(!isChecked), [isChecked]);

  return (
    <Line alignItems="center" className="auth-checkbox">
      <Icon
        name={isChecked ? "check-square" : "square"}
        prefix="far"
        onClick={onChange}
      ></Icon>
      <div className="text">{text}</div>
    </Line>
  );
};
