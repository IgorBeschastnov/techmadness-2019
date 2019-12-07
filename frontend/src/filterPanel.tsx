import React, { useState } from "react";

import { Line } from "./shared/line";
import { Icon } from "./shared/icon";
import { InputField } from "./shared/inputField";
import { RadioButton } from "./shared/radioButton";
import { Checkbox } from "./shared/checkbox";

import "./filterPanel.scss";

const activityList = [
  {
    data: "REAL_ESTATE",
    value: 1,
    text: "по операциям с недвижимым имуществом"
  },
  { data: "IT", value: 2, text: "в области информационных технологий" },
  { data: "HR", value: 3, text: "по трудоустройству и подбору персонала" },
  { data: "PUBLIC_ORGANIZATION", value: 4, text: "общественных организаций" },
  {
    data: "FOODSTUFFS",
    value: 5,
    text: "по предоставлению продуктов питания и напитков"
  }
];

const companyTypeList = [
  { data: "OOO", value: 1, text: "ООО" },
  { data: "ZAO", value: 2, text: "ЗАО" },
  { data: "PAO", value: 3, text: "ПАО" },
  { data: "OAO", value: 4, text: "ОАО" },
  { data: "IP", value: 5, text: "ИП" }
];

export interface Props {
  getCompanyList: () => void;
  onChange: (value: number) => void;
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

export const FilterPanel: React.FC<Props> = ({ getCompanyList, onChange }) => {
  const [filter, setFilter] = useState<FilterModel>({
    employeesFrom: 0,
    employeesTo: 0,
    activityType: "REAL_ESTATE",
    companyType: "OOO",
    companyAgeFrom: 0,
    companyAgeTo: 0,
    currencyAccount: false
  });

  const renderCompanyType = (data: string, text: string) => {
    return (
      <RadioButton
        key={data}
        value={filter.companyType}
        id={data}
        onChange={value => setFilter({ ...filter, ["companyType"]: value })}
        text={text}
      ></RadioButton>
    );
  };

  const renderActivity = (data: string, text: string) => {
    return (
      <RadioButton
        key={data}
        value={filter.activityType}
        id={data}
        onChange={value => setFilter({ ...filter, ["activityType"]: value })}
        text={text}
      ></RadioButton>
    );
  };

  return (
    <div className="filter-panel">
      <Line vertical>
        <Line justifyContent="between" alignItems="center" className="title">
          <div className="label-filter">Фильтры</div>
          <a className="call-to-action">
            <span
              className="link"
              onClick={() => {
                getCompanyList();
                onChange(1);
              }}
            >
              Подобрать компании
            </span>
            <Icon name="angle-right"></Icon>
          </a>
        </Line>
        <div className="block-filter">Количество сотрудников:</div>
        <Line className="panel-inputs" alignItems="center">
          <div>От</div>
          <InputField
            type="number"
            value={filter.employeesFrom.toString()}
            onChange={value =>
              setFilter({ ...filter, ["employeesFrom"]: parseInt(value) })
            }
          ></InputField>
          <div className="indent-left">до</div>
          <InputField
            type="number"
            value={filter.employeesTo.toString()}
            onChange={value =>
              setFilter({ ...filter, ["employeesTo"]: parseInt(value) })
            }
          ></InputField>
        </Line>
        <div className="block-filter">Деятельность:</div>
        {activityList.map(x => renderActivity(x.data, x.text))}
        <div className="block-filter">Тип:</div>
        {companyTypeList.map(x => renderCompanyType(x.data, x.text))}
        <div className="block-filter">Возраст юридического лица:</div>
        <Line className="panel-inputs" alignItems="center">
          <div>От</div>
          <InputField
            type="number"
            value={filter.companyAgeFrom.toString()}
            onChange={value =>
              setFilter({ ...filter, ["companyAgeFrom"]: parseInt(value) })
            }
          ></InputField>
          <div className="indent-left">до</div>
          <InputField
            type="number"
            value={filter.companyAgeTo.toString()}
            onChange={value =>
              setFilter({ ...filter, ["companyAgeTo"]: parseInt(value) })
            }
          ></InputField>
        </Line>
        <div className="block-filter">
          <Checkbox
            value={filter.currencyAccount}
            onChange={value =>
              setFilter({ ...filter, ["currencyAccount"]: value })
            }
            text="есть валютные счета"
          ></Checkbox>
        </div>
        <Line
          className="label-filter"
          justifyContent="center"
          alignItems="end"
        ></Line>
      </Line>
    </div>
  );
};
