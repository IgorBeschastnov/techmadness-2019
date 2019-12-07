import React from "react";

import { Line as LineGraph } from "react-chartjs-2";
import { Line } from "./shared/line";

import "./correctionScreen.scss";

const cards = [
  { title: "Title 1" },
  { title: "Title 2" },
  { title: "Title 3" },
  { title: "Title 4" }
];

const state = {
  dataLine: {
    
    labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль"],
    datasets: [
      {
        lineTension: 0.3,
        backgroundColor: "#2e2e38",
        borderColor: "#2e2e38",
        pointBorderColor: "#d22d32",
        pointBackgroundColor: "rgb(255,255,255)",
        pointBorderWidth: 9,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#f3f4f6",
        pointHoverBorderColor: "#2e2e38",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        data: [250, 803, 305, 330, 451, 780, 550],
        fill: false
      }
    ]
  }
};

export const CorrectionScreen: React.FC = ({}) => {
  return (
    <Line className="correctionScreen">
      {cards.map((x, i) => (
        <div key={i} className="card strategy-card">
          Title
          <hr />
          <LineGraph
            data={state.dataLine}
            options={{
              layout: { padding: { right: 25, left: 15, bottom: 30 } },
              responsive: true,
              legend: { display: false, labels: { display: false } },
              scales: {
                xAxes: [
                  {
                    // gridLines: { display: false, drawBorder: false },
                    // ticks: { display: false }
                  }
                ],
                yAxes: [
                  {
                    gridLines: { borderDash: [4, 1.5], drawBorder: false }
                    // ticks: { display: false }
                  }
                ]
              }
            }}
          ></LineGraph>
        </div>
      ))}
    </Line>
  );
};
