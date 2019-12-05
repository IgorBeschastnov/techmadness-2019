import React from "react";

import "./inputField.scss";

export interface InputFieldProps {
  label?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label }) => {
  return (
    <div className="form-group input-field">
      <label className="label">{label}</label>
      <input className="form-control" />
    </div>
  );
};
