import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";

import "./app.scss";

import { Line } from "./shared/line";
import { Header } from "./header/header";
import { Checkbox } from "./shared/checkbox";
import { Button } from "./shared/button";
import { ListPanel } from "./listPanel";
import { FilterPanel } from "./filterPanel";

const offers:OfferTemplate[] = [
  {
    id: 1,
    type: 0,
    data:{},
    text:'Бизнес Рациональ',
    created_at: new Date()
  },
  {
    id: 2,
    type: 0,
    data:{},
    text:'Бизнес Рациональ',
    created_at: new Date()
  },
  {
    id: 3,
    type: 0,
    data:{},
    text:'Бизнес Рациональ',
    created_at: new Date()
  },
  {
    id: 4,
    type: 0,
    data:{},
    text:'Бизнес Рациональ',
    created_at: new Date()
  },
  {
    id: 5,
    type: 0,
    data:{},
    text:'Бизнес Рациональ',
    created_at: new Date()
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

export interface OfferTemplate{
    id: number,
    type: number,
    text: string,
    data: {},
    created_at: Date
}

export const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState(undefined);
  const [id, setId] = useState(undefined);
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [offerTemplates, setOfferTemplates] = useState<OfferTemplate[]>([]);
  const offerApproveIds:number[]=[];

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

  const getOfferTemplates = useCallback(() => {
    axios
      .get(`${"http://spacehub.su//offertemplates"}`)
      .then(response => setOfferTemplates(response.data));
  }, []);

const onchange = useCallback((ind:number)=>{
  const index = offerApproveIds.findIndex(y=>y==ind)
  console.log('on change  ', index)
  index!=-1 
  ? offerApproveIds.splice(index,1)
  : offerApproveIds.push(ind)
  console.log(offerApproveIds)
},[])
  useEffect(()=>{
    console.log(offerApproveIds)
  },[offerApproveIds])


  const renderOfferTemplates = () =>{
    return offers.map(x => {
      return (
        <div key={x.id} onClick={()=>onchange(x.id)}>
          <Checkbox
            value={offerApproveIds.includes(x.id)? true: false}
            onChange={() =>{}}
            key={x.id}
            text={x.text}
          ></Checkbox>
          </div>
      );
    });
  }
  useEffect(()=>{renderOfferTemplates()},[renderOfferTemplates])


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
          {step === 2  && 
          // getOfferTemplates() &&
           (
            <div className="content">
              <div className="label-font">Предложения</div>
              <Line justifyContent="center" vertical>
                <div>{renderOfferTemplates()}</div>
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
