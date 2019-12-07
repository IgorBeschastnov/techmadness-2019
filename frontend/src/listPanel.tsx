import React from "react";

import { Line } from "./shared/line";
import { Icon } from "./shared/icon";

import "./listPanel.scss";

enum Money {
  DOLLAR = "dollar",
  RUBLE = "rub",
  EURO = "euro"
}

export interface Company {
  id: number;
  name: string;
  balance: number;
  currency: string;
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
      {content.map(x => (
        <Line key={x.id} className="table-row">
          <span className="row-title">{x.name}</span>
          <span className="text">
            {x.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, ",")}{" "}
            {getIcon(x.currency)}
          </span>
        </Line>
      ))}
    </Line>
  );
};

const getIcon = (value: string) => {
  switch (value) {
    case Money.DOLLAR:
      return <Icon name="dollar-sign"></Icon>;
    case Money.EURO:
      return <Icon name="euro-sign"></Icon>;
    case Money.RUBLE:
      return <Icon name="ruble-sign"></Icon>;
  }
};
