import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";

import "./app.scss";

import { Line } from "./shared/line";
import { Header } from "./header/header";
import { Checkbox } from "./shared/checkbox";
import { Button } from "./shared/button";
import { ListPanel } from "./listPanel";
import { FilterPanel } from "./filterPanel";

const offers = [
  {
    id: 1,
    type: 0,
    data:
      "Классический депозит с повышенной процентной ставкой и особыми условиями досрочного отзыва.",
    text: "Бизнес Рациональ",
    interest: 5.15
  },
  {
    id: 2,
    type: 1,
    data: "",
    text:
      "Инвестиционный кредит. Долгосрочное кредитование на приобретение основных средств"
  },
  {
    id: 3,
    type: 0,
    data: "",
    text:
      "Бизнес Стандарт. Классический депозит с высокой доходностью. 0,35% ставка в долларах в год"
  },
  {
    id: 4,
    type: 0,
    data: "",
    text:
      "Бизнес Стандарт. Классический депозит с высокой доходностью. 0,35% ставка в долларах в год"
  },
  {
    id: 5,
    type: 0,
    data: "",
    text:
      "Бизнес Стандарт. Классический депозит с высокой доходностью. 0,35% ставка в долларах в год"
  }
];

export interface Company {
  id: number;
  login: string;
  address: string;
}

export interface FilterModel {
  ["employeesFrom"]: number;
  ["employeesTo"]: number;
  ["activityType"]: string;
  ["companyType"]: string;
  ["companyAgeFrom"]: number;
  ["companyAgeTo"]: number;
  ["currencyAccount"]: boolean;
}

export const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState(undefined);
  const [id, setId] = useState(undefined);
  const [companyList, setCompanyList] = useState<Company[]>([]);

  const getCompanyList = useCallback((data: FilterModel) => {
    axios
      .get(`${"http://spacehub.su/users"}`, { data })
      .then(response => setCompanyList(response.data));
  }, []);

  const postFilters = useCallback((data: FilterModel) => {
    axios
      .post(`${"http://spacehub.su/offerfilters"}`, {
        filter: {
          ...data,
          companyType: parseInt(data.companyType),
          activityType: parseInt(data.activityType)
        }
      })
      .then(response => setId(response.data.id))
      .catch(error => setError(error));
  }, []);

  const renderListPanelWait = () => {
    return (
      <Line
        vertical
        justifyContent="center"
        className="number"
        alignItems="center"
      >
        <span className="value">2</span>
        <p className="desc">Определить список компаний</p>
      </Line>
    );
  };

  const renderListPanel = () => {
    return (
      <ListPanel
        content={companyList}
        onChange={value => setStep(value)}
      ></ListPanel>
    );
  };

  const renderOffers = () => {
    return offers.map(x => {
      return (
        <div>
          <Checkbox
            value={false}
            onChange={() => {}}
            key={x.id}
            text={x.text}
          ></Checkbox>
        </div>
      );
    });
  };

  return (
    <Line vertical>
      <Header />
      <Line className="main-screen" justifyContent="start">
        <FilterPanel
          getCompanyList={(data: FilterModel) => getCompanyList(data)}
          onChange={() => (error ? console.log(error) : setStep(1))}
          postFilters={postFilters}
        ></FilterPanel>
        <div className="list-panel">
          {step > 0 ? renderListPanel() : renderListPanelWait()}
        </div>
        <div className="offer-panel">
          {step < 2 && (
            <Line
              vertical
              justifyContent="center"
              className="number"
              alignItems="center"
            >
              <span className="value">3</span>
              <p className="desc">Определить список предложений</p>
            </Line>
          )}
          {step === 2 && (
            <div className="content">
              <div className="label-font">Предложения</div>
              <Line justifyContent="center" vertical>
                <div>{renderOffers()}</div>
                <Button
                  onClick={() => {}}
                  buttonType="danger"
                  label={"Отправить предложения"}
                ></Button>
              </Line>
            </div>
          )}
        </div>
      </Line>
    </Line>
  );
};
