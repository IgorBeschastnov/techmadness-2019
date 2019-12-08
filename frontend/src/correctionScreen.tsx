import React, { useState, useEffect, useCallback, useMemo } from "react";

import { Line as LineGraph, ChartData } from "react-chartjs-2";
import { Line } from "./shared/line";
import axios from "axios";

import "./correctionScreen.scss";
import { InputField } from "./shared/inputField";

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
  { title: "Важные события", field: "Вес" }
];

export interface Props {
  offers: Offer[];
}
const graph: ChartData<Chart.ChartData>[] = [];
export const CorrectionScreen: React.FC<Props> = ({ offers }) => {
  const [model, setModel] = useState<{
    creditFrom: number;
    creditTo: number;
    depositFrom: number;
    depositTo: number;
    trans: number;
    date: number;
  }>();
  useEffect(() => {
    setModel({
      creditFrom: 0,
      creditTo: 0,
      depositFrom: 0,
      depositTo: 0,
      trans: 0,
      date: 0
    });
  }, []);

  const postStrategy = useCallback((value: any) => {
    axios
      .post(`${"http://spacehub.su/strategy/params"}`, {
        window: parseInt(value.window),
        years: [value.creditFrom, value.creditTo]
      })
      .then(response => response.data);
  }, []);

  const getValues = useCallback((type: number) => {
    const months = offers
      .filter(
        x =>
          x.offer_template.type == type &&
          new Date(x.created_at).getFullYear() == 2019
      )
      .map(x => new Date(x.created_at).getMonth());

    var map: { [key: number]: number };
    map = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
    };
    months.forEach(y => {
      map[y] = map[y] + 1;
    });
    return Object.keys(map).map(x => map[parseInt(x)]);
  }, []);

  useMemo(() => {
    const types: number[] = [1, 2, 3, 4];
    types.forEach(x => {
      if (offers.length > 0) {
        graph.push({
          labels: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
          ],
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
              data: getValues(x),
              fill: false
            }
          ]
        });
      }
    });
  }, [getValues, offers]);

  const inputGroup = (type: number) => {
    return type == 1 || type == 0 ? (
      <Line className="input-card" alignItems="center">
        <div>От</div>
        <InputField
          type="number"
          value={
            model
              ? type == 1
                ? model.creditFrom.toString()
                : model.depositFrom.toString()
              : ""
          }
          onChange={value => {
            if (model) {
              type == 1
                ? setModel({
                    creditFrom: parseInt(value),
                    creditTo: model.creditTo,
                    depositFrom: model.depositFrom,
                    depositTo: model.depositTo,
                    trans: model.trans,
                    date: model.date
                  })
                : setModel({
                    creditFrom: model.creditFrom,
                    creditTo: model.creditTo,
                    depositFrom: parseInt(value),
                    depositTo: model.depositTo,
                    trans: model.trans,
                    date: model.date
                  });
            }
          }}
        ></InputField>
        <div>до</div>
        <InputField
          type="number"
          value={
            model
              ? type == 1
                ? model.creditTo.toString()
                : model.depositTo.toString()
              : ""
          }
          onChange={value => {
            if (model) {
              type == 1
                ? setModel({
                    creditFrom: model.creditFrom,
                    creditTo: parseInt(value),
                    depositFrom: model.depositFrom,
                    depositTo: model.depositTo,
                    trans: model.trans,
                    date: model.date
                  })
                : setModel({
                    creditFrom: model.creditFrom,
                    creditTo: model.creditTo,
                    depositFrom: model.depositFrom,
                    depositTo: parseInt(value),
                    trans: model.trans,
                    date: model.date
                  });
            }
          }}
        ></InputField>
      </Line>
    ) : (
      <Line className="input-card" alignItems="center">
        <InputField
          type="number"
          value={
            model
              ? type == 2
                ? model.trans.toString()
                : model.date.toString()
              : ""
          }
          onChange={value => {
            if (model) {
              type == 2
                ? setModel({
                    creditFrom: model.creditFrom,
                    creditTo: model.creditTo,
                    depositFrom: model.depositFrom,
                    depositTo: model.depositTo,
                    trans: parseInt(value),
                    date: model.date
                  })
                : setModel({
                    creditFrom: model.creditFrom,
                    creditTo: model.creditTo,
                    depositFrom: model.depositFrom,
                    depositTo: model.depositTo,
                    trans: model.trans,
                    date: parseInt(value)
                  });
            }
          }}
        ></InputField>
      </Line>
    );
  };

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
              layout: { padding: { right: 25, left: 15, bottom: 10 } },
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
            <Line alignItems="center">
              {inputGroup(i)}
              <button
                className="button btn btn-outline-secondary"
                onClick={() => postStrategy(model)}
              >
                Сохранить
              </button>
            </Line>
          </Line>
        </Line>
      ))}
    </Line>
  );
};
