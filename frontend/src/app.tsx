import React, { useEffect } from "react";
import axios from "axios";

import "./app.scss";

import { Line } from "./shared/line";
import { InputField } from "./shared/inputField";
import { Checkbox } from "./shared/checkbox";

export const App: React.FC = () => {
  // useEffect(() => {
  //   axios
  //     .get(`${"https://swapi.co/api/people"}`)
  //     .then(response => console.log(response.data));
  // }, []);

  return (
    <Line vertical>
      <div className="header">Header</div>
      <Line justifyContent='start'>
        <div className="filter-panel">
          <Line vertical>
            <div>Фильтры</div>
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
          </Line>
        </div>
      </Line>
    </Line>
  );
};
