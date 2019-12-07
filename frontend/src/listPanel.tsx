import React from "react";

import { Line } from "./shared/line";
import { Icon } from "./shared/icon";

import "./listPanel.scss";

export interface Company {
  id: number;
  login: string;
  address: string;
}

export interface Props {
  content: Company[];
  onChange: (value: number) => void;
}

export const ListPanel: React.FC<Props> = ({ content, onChange }) => {
  return (
    <Line vertical>
      <Line justifyContent="between" alignItems="center" className="title">
        <div>Компании</div>
        <a className="call-to-action" onClick={() => onChange(2)}>
          <span className="link">Выбрать предложения</span>
          <Icon name="angle-right"></Icon>
        </a>
      </Line>
      {content &&
        content.map(x => (
          <Line key={x.id} className="table-row">
            <span className="row-title">{x.login}</span>
            <span className="text">{x.address}</span>
          </Line>
        ))}
    </Line>
  );
};
