import React, { useState, useEffect } from "react";

import { Line as LineGraph } from "react-chartjs-2";
import { Line } from "./shared/line";
import { Icon } from "./shared/icon";

import "./correctionScreen.scss";

const cards = [
  { title: "Стратегия 1", field: "Вес" },
  { title: "Стратегия 2", field: "Вес" },
  { title: "Стратегия 3", field: "Вес" },
  { title: "Стратегия 4", field: "Вес" }
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
  const [model, setModel] = useState({});
  useEffect(() => {}, []);

  return (
    <Line className="correctionScreen">
      {cards.map((x, i) => (
        <Line
          vertical
          key={i}
          className="card strategy-card"
          alignItems="center"
        >
          <h4 className="title-card">{x.title}</h4>
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
          <Line className="input-card" justifyContent="around" alignItems="baseline">
            <label className="input-label">Вес</label>
            <div className="input-group mb-3 ml-4">
              <input type="text" className="form-control" />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary">Сохранить</button>
              </div>
            </div>
          </Line>
        </Line>
      ))}
    </Line>
  );
};
