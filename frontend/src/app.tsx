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
  name: string;
  balance: number;
  currency: string;
}

export const App: React.FC = () => {
  const [step, setStep] = useState(0);

  const [companyList, setCompanyList] = useState<Company[]>([]);

  useEffect(() => {
    axios
      .get(`${"http://spacehub.su/offerfilters"}`)
      .then(response => console.log(response.data));
  }, []);

  const getCompanyList = useCallback(() => {
    axios
      .get(`${"http://spacehub.su/accounts"}`)
      .then(response => setCompanyList(response.data));
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
          getCompanyList={getCompanyList}
          onChange={() => setStep(1)}
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
