import React, { useState } from "react";
import axios from "axios";

import "./app.scss";

import { Line } from "./shared/line";
import { Header } from "./header/header";
import { InputField } from "./shared/inputField";
import { Checkbox } from "./shared/checkbox";
import { Button } from "./shared/button";
import { ListPanel } from "./listPanel";

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

  return (
    <Line vertical>
      <Header />
      <Line className="main-screen" justifyContent="start">
        <div className="filter-panel">
          <Line vertical>
            <div style={{ paddingTop: "1rem" }}>Фильтры</div>
            <div style={{ paddingTop: "2rem" }}>Количество сотрудников:</div>
            <Line className="panel-inputs" alignItems="center">
              <div>От</div>
              <InputField></InputField>
              <div style={{ paddingLeft: "1rem" }}>до</div>
              <InputField></InputField>
            </Line>
            <div style={{ marginTop: "2rem" }}>Деятельность:</div>
            <Checkbox text="по операциям с недвижимым имуществом"></Checkbox>
            <Checkbox text="в области информационных технологий"></Checkbox>
            <Checkbox text="по трудоустройству и подбору персонала"></Checkbox>
            <Checkbox text="общественных организаций"></Checkbox>
            <Checkbox text="по предоставлению продуктов питания и напитков"></Checkbox>
            <div style={{ marginTop: "2rem" }}>Тип:</div>
            <Checkbox text="ОАО"></Checkbox>
            <Checkbox text="ООО"></Checkbox>
            <div style={{ paddingTop: "2rem" }}>Возраст юр.лица:</div>
            <Line className="panel-inputs" alignItems="center">
              <div>От</div>
              <InputField></InputField>
              <div style={{ paddingLeft: "1rem" }}>до</div>
              <InputField></InputField>
            </Line>
            <div style={{ paddingTop: "2rem" }}>
              <Checkbox text="есть валютные счета"></Checkbox>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem"
              }}
            >
              <Button
                buttonType="danger"
                label={"Подобрать компании"}
                onClick={() => setStep(1)}
                disabled={step != 0}
              ></Button>
            </div>
          </Line>
        </div>
        <div className="list-panel">
          {step != 0 ? renderListPanel() : renderListPanelWait()}
        </div>
      </Line>
    </Line>
  );
};
