import React, { useEffect } from "react";
import axios from "axios";

import { Line } from "./shared/line";

export const App: React.FC = () => {
  useEffect(() => {
    axios
      .get(`${"https://swapi.co/api/people"}`)
      .then(response => console.log(response.data));
  }, []);

  return (
    <Line justifyContent="center">
      <h1>Hello, Techmadness 2019!</h1>
    </Line>
  );
};
