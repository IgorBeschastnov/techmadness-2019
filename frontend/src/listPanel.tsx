import React, { useState } from "react";

import { Line } from "./shared/line";
import { Icon } from "./shared/icon";

import "./listPanel.scss";

const test = [
  {
    id: 0,
    title: "Rosbank",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    id: 1,
    title: "Gremma",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    id: 2,
    title: "Intermedic",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    id: 3,
    title: "Intermedic",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    id: 4,
    title: "Intermedic",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    id: 5,
    title: "Intermedic",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    id: 6,
    title: "Intermedic",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    id: 7,
    title: "Intermedic",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    id: 8,
    title: "Intermedic",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    id: 9,
    title: "Intermedic",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  }
];

export interface Props {
  onChange: (value: number) => void;
}

export const ListPanel: React.FC<Props> = ({ onChange }) => {
  const [step, setStep] = useState(1);

  return (
    <Line vertical>
      <Line justifyContent="between" alignItems="center" className="title">
        <div>Компании</div>
        <a
          className="call-to-action"
          onClick={() => {
            onChange(2);
            setStep(2);
          }}
        >
          <span className="link">Выбрать предложение</span>
          <Icon name="angle-right"></Icon>
        </a>
      </Line>
      {test.map(x => (
        <div key={x.id} className="table-row">
          <span className="row-title">{x.title}</span>
          <span className="text">{x.text}</span>
        </div>
      ))}
    </Line>
  );
};
