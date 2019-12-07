import React, { useCallback } from "react";

import "./inputField.scss";

export interface InputFieldProps {
  label?: string;
  value: string | null | undefined;
  onChange: (value: string) => void;
  type?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type
}) => {
  value = value == null ? "" : value;
  const onchange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange]
  );
  return (
    <div className="form-group input-field">
      <label className="label">{label}</label>
      <input
        className="form-control"
        value={value}
        type={type}
        onChange={onchange}
      ></input>
    </div>
  );
};
