import React, { useEffect } from "react";
import axios from "axios";

import './app.scss';

import { Line } from "./shared/line";

export const App: React.FC = () => {
  useEffect(() => {
    axios
      .get(`${"https://swapi.co/api/people"}`)
      .then(response => console.log(response.data));
  }, []);

  return (
    <Line vertical>
      <div className="header">Header</div>
      <Line>
        <div className="balance">Balance</div>
        <div className="operations">Operations</div>
      </Line>
    </Line>
  );
};
