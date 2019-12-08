import React, { useState, useEffect, useCallback } from "react";

import { Line as LineGraph, ChartData } from "react-chartjs-2";
import { Line } from "./shared/line";
import axios from "axios";

import "./correctionScreen.scss";

export interface Strategy {
  window: number;
  years: number[];
}

export interface Offer {
  user_id: number;
  offer_template_id: number;
  accepted: boolean;
  id: number;
  created_at: Date;
  user: {
    login: string;
    address: string;
    type: number;
    activity: number;
    num_of_employees: number;
    id: number;
    created_at: Date;
    age: number;
    accounts: [
      {
        name: string;
        balance: number;
        currency: string;
        type: number;
        interest: number;
        id: number;
      }
    ];
  };
  offer_template: {
    type: number;
    text: string;
    data: {};
    id: number;
    created_at: Date;
  };
}

const cards = [
  { title: "Кредит", field: "Вес" },
  { title: "Депозит", field: "Вес" },
  { title: "Автоперевод", field: "Вес" },
  { title: "Лизинг", field: "Вес" }
];


export interface lineGraph {
  dataLine: {
    labels: number[],
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
        data: number[],
        fill: false
      }
    ]
  }
};

export const CorrectionScreen: React.FC = () => {
  // const [model, setModel] = useState();
  useEffect(() => {}, []);
  useCallback(() => {}, []);
  const [strategy, setStrategy] = useState<Strategy>({
    window: 0,
    years: [1, 5, 6]
  });
  const [offers, setOffers] = useState<Offer[]>([]);
  const postTest = useCallback(() => {
    axios
      .post(`${"http://spacehub.su/strategy/params"}`, {
        strategy
      })
      .then(response => response.data);
  }, []);

  const getOffers = useCallback(() => {
    axios
      .get(`${"http://spacehub.su/offers"}`)
      .then(response => setOffers(response.data));
  }, []);

  const graph:ChartData<Chart.ChartData>[] =[];
  useEffect(() => {
    getOffers();
    const types:number[]=[1,2,3,5];
    console.log(offers)
    const months = types.map(type => 
        offers.filter(x=>x.accepted && x.offer_template.type==type &&new Date(x.created_at).getFullYear()==2015).map(x=> new Date(x.created_at).getMonth())
      );
    console.log(months)
    // const mounth =  offers.filter(x=>x.accepted && x.offer_template.type==2 &&new Date(x.created_at).getFullYear()===2015 ).map(x=> new Date(x.created_at).getMonth());
    // var result:number[] = [];
    // months.forEach(function(a){
    //   result[a] = result[a] + 1 || 1;
    // });
    // var labels=new Array(result.length);
    // graph.push({
    //   labels:labels,
    //     datasets: [
    //       {
    //         lineTension: 0.3,
    //         backgroundColor: "#2e2e38",
    //         borderColor: "#2e2e38",
    //         pointBorderColor: "#d22d32",
    //         pointBackgroundColor: "rgb(255,255,255)",
    //         pointBorderWidth: 9,
    //         pointHoverRadius: 6,
    //         pointHoverBackgroundColor: "#f3f4f6",
    //         pointHoverBorderColor: "#2e2e38",
    //         pointHoverBorderWidth: 2,
    //         pointRadius: 1,
    //         data: result,
    //         fill: false
    //       }
    //     ]
    // });
  }, [getOffers]);

  console.log(offers.filter(x=>x.accepted && x.offer_template.type==3 &&new Date(x.created_at).getFullYear()===2015 ));

 

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
            data={graph[i]}
            options={{
              layout: { padding: { right: 25, left: 15, bottom: 30 } },
              responsive: true,
              legend: { display: false },
              scales: {
                yAxes: [
                  {
                    gridLines: { borderDash: [4, 1.5], drawBorder: false }
                  }
                ]
              }
            }}
          ></LineGraph>
          <Line
            className="input-card"
            justifyContent="around"
            alignItems="baseline"
          >
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
