import React from "react";

import { Line } from "./shared/line";
import { Icon } from "./shared/icon";

import "./correctionScreen.scss";

const cards = [
  { title: "Title 1" },
  { title: "Title 2" },
  { title: "Title 3" },
  { title: "Title 4" }
];

export const CorrectionScreen: React.FC = ({}) => {
  return (
    <Line className="correctionScreen">
      {cards.map((x,i) => (
        <div key={i} className="card strategy-card">
          Title
          <hr />
        </div>
      ))}
    </Line>
  );
};
