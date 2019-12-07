import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import "./app.scss";

import { Line } from "./shared/line";
import { Header } from "./header/header";
import { InputField } from "./shared/inputField";
import { Checkbox } from "./shared/checkbox";
import { Button } from "./shared/button";
import { ListPanel } from "./listPanel";

const offers = [
  {
    id: 1,
    type: 0,
    data: "",
    text:
      "Бизнес Рациональ. Классический депозит с повышенной процентной ставкой и особыми условиями досрочного отзыва. 5,15%"
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


export const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const renderListPanelWait = () => {
    return (
      <Line justifyContent="center" className="number">
        2
      </Line>
    );
  };

  const renderListPanel = () => {
    return <ListPanel onChange={value => setStep(value)}></ListPanel>;
  };

  const [numberEmployeesFrom, setNumberEmployeesFrom] = useState<string>("");
  const [numberEmployeesTo, setNumberEmployeesTo] = useState<string>("");
  const [companyAgeFrom, setCompanyAgeFrom] = useState<string>("");
  const [companyAgeTo, setCompanyAgeTo] = useState<string>("");
  const [typeActivity1, setTypeActivity1] = useState<boolean>(false);
  const [typeActivity2, setTypeActivity2] = useState<boolean>(false);
  const [typeActivity3, setTypeActivity3] = useState<boolean>(false);
  const [typeActivity4, setTypeActivity4] = useState<boolean>(false);
  const [typeActivity5, setTypeActivity5] = useState<boolean>(false);
  const [typeCompany1, setTypeCompany1] = useState<boolean>(false);
  const [typeCompany2, setTypeCompany2] = useState<boolean>(false);
  const [withCurrencyAccount, setWithCurrencyAccount] = useState<boolean>(false);


  const setFilters = useCallback(()=>{
    axios.post('/setFilters',{
        id: '',
        filter:{
          numberEmployeesFrom: numberEmployeesFrom,
          numberEmployeesTo: numberEmployeesFrom,
          typeActivity: {typeActivity1,typeActivity2,typeActivity3,typeActivity4,typeActivity5},
          typeCompany: {typeCompany1,typeCompany2},
          companyAgeFrom:companyAgeFrom,
          companyAgeTo:companyAgeTo,
          withCurrencyAccount:withCurrencyAccount
      }
    })
  },[]);

  const getUsers = useCallback(()=>{
    axios.get('./users',{})
  },[])

  const getOffers = useCallback(()=>{
    axios.get('./offers',{})
  },[])

  const addOffers = useCallback(()=>{

  },[]);

 
  const renderOffers = () => {
    return offers.map(x => {
      return (
        <div>
          <Checkbox
            value={typeActivity1}
            onChange={v => setTypeActivity1(v)}
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
        <div className="filter-panel">
          <Line vertical>
            <div className="label-filter">Фильтры</div>
            <div className="block-filter">Количество сотрудников:</div>
            <Line className="panel-inputs" alignItems="center">
              <div>От</div>
              <InputField
                type="number"
                value={numberEmployeesFrom}
                onChange={v => setNumberEmployeesFrom(v)}
              ></InputField>
              <div className="indent-left">до</div>
              <InputField
                type="number"
                value={numberEmployeesTo}
                onChange={v => setNumberEmployeesTo(v)}
              ></InputField>
            </Line>
            <div className="block-filter">Деятельность:</div>
            <Checkbox
              value={typeActivity1}
              onChange={v => setTypeActivity1(v)}
              text="по операциям с недвижимым имуществом"
            ></Checkbox>
            <Checkbox
              value={typeActivity2}
              onChange={v => setTypeActivity2(v)}
              text="в области информационных технологий"
            ></Checkbox>
            <Checkbox
              value={typeActivity3}
              onChange={v => setTypeActivity3(v)}
              text="по трудоустройству и подбору персонала"
            ></Checkbox>
            <Checkbox
              value={typeActivity4}
              onChange={v => setTypeActivity4(v)}
              text="общественных организаций"
            ></Checkbox>
            <Checkbox
              value={typeActivity5}
              onChange={v => setTypeActivity5(v)}
              text="по предоставлению продуктов питания и напитков"
            ></Checkbox>
            <div className="block-filter">Тип:</div>
            <Checkbox
              value={typeCompany1}
              onChange={v => setTypeCompany1(v)}
              text="ОАО"
            ></Checkbox>
            <Checkbox
              value={typeCompany2}
              onChange={v => setTypeCompany2(v)}
              text="ООО"
            ></Checkbox>
            <div className="block-filter">Возраст юр.лица:</div>
            <Line className="panel-inputs" alignItems="center">
              <div>От</div>
              <InputField
                type="number"
                value={companyAgeFrom}
                onChange={v => setCompanyAgeFrom(v)}
              ></InputField>
              <div className="indent-left">до</div>
              <InputField
                type="number"
                value={companyAgeTo}
                onChange={v => setCompanyAgeTo(v)}
              ></InputField>
            </Line>
            <div className="block-filter">
              <Checkbox
                value={withCurrencyAccount}
                onChange={v => setWithCurrencyAccount(v)}
                text="есть валютные счета"
              ></Checkbox>
            </div>
            <Line
              className="label-filter"
              justifyContent="center"
              alignItems="end"
            >
              <Button
                buttonType="danger"
                label={"Подобрать компании"}
                onClick={() => setStep(1)}
                disabled={step != 0}
              ></Button>
            </Line>
          </Line>
        </div>
        <div className="list-panel">
          {step > 0 ? renderListPanel() : renderListPanelWait()}
        </div>
        <div className="offer-panel">
          {step < 2 && (
            <Line justifyContent="center" className="number">
              3
            </Line>
          )}
          {step === 2 && (
            <div className='content'>
              <div className='label-font'>Выбрать предложения</div>
              <div>{renderOffers()}</div>
              <Line
                className="custom-button"
                justifyContent="center"
                alignItems="end"
              >
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
