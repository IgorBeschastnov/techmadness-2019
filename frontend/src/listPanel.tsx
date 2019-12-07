import React, { useState } from "react";

import { Line } from "./shared/line";
import { Button } from "./shared/button";

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
  }
];

export interface Props {
  onChange: (value: number) => void;
}

export const ListPanel: React.FC<Props> = ({ onChange }) => {
  const [step, setStep] = useState(1);

  return (
    <Line vertical>
      <div className="title">Компании</div>
      {test.map(x => (
        <div key={x.id} className="table-row">
          <span className="row-title">{x.title}</span>
          <span className="text">{x.text}</span>
        </div>
      ))}
      <Line justifyContent="center">
        <Button
          buttonType="danger"
          label={"Выбрать оффер"}
          onClick={() => {
            onChange(2);
            setStep(2);
          }}
          disabled={step != 1}
        ></Button>
      </Line>
    </Line>
  );
};
