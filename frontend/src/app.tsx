import React, { useState, useCallback } from "react";
import axios from "axios";

import "./app.scss";

import { Line } from "./shared/line";
import { Header } from "./header/header";
import { Checkbox } from "./shared/checkbox";
import { Button } from "./shared/button";
import { ListPanel } from "./listPanel";
import { FilterPanel } from "./filterPanel";
import { CorrectionScreen } from "./correctionScreen";

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

export interface OfferTemplate {
  id: number;
  type: number;
  text: string;
  data: {};
  created_at: Date;
}

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [step, setStep] = useState(0);
  const [error, setError] = useState(undefined);
  const [id, setId] = useState("");
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [offerTemplates, setOfferTemplates] = useState<OfferTemplate[]>([]);
  const [offerApproveIds, setOfferApproveIds] = useState<number[]>([]);

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

  const boundOfferTemplates = async () => {
    const requests = offerApproveIds.map(x =>
      axios
        .post(`${"http://spacehub.su/boundoffertemplates"}`, {
          offer_filter_id: parseInt(id),
          offer_template_id: x
        })
        .then(res => res.data)
        .catch(error => setError(error))
    );
    Promise.all(requests);
    setOfferApproveIds([]);
  };

  const getOfferTemplates = useCallback(() => {
    axios
      .get(`${"http://spacehub.su/offertemplates"}`)
      .then(response => setOfferTemplates(response.data));
  }, []);

  const onchange = useCallback(
    (ind: number) => {
      const index = offerApproveIds.findIndex(y => y == ind);
      let newModel: number[];
      newModel = [...offerApproveIds];
      index != -1 ? newModel.splice(index, 1) : newModel.push(ind);
      setOfferApproveIds(newModel);
    },
    [offerApproveIds]
  );

  const renderOfferTemplates = () => {
    return offerTemplates.map(x => {
      return (
        <div key={x.id} onClick={() => onchange(x.id)}>
          <Checkbox
            value={offerApproveIds.includes(x.id) ? true : false}
            onChange={() => {}}
            key={x.id}
            text={x.text}
          ></Checkbox>
        </div>
      );
    });
  };

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
        onChange={value => {
          setStep(value);
          getOfferTemplates();
        }}
      ></ListPanel>
    );
  };

  return (
    <Line vertical>
      <Header onChange={(value: number) => setCurrentPage(value)}></Header>
      {currentPage == 0 && (
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
                <Line vertical>
                  <div>{renderOfferTemplates()}</div>
                  <Line alignItems="end" justifyContent="center">
                    <Button
                      className="custom-button"
                      onClick={() => boundOfferTemplates()}
                      buttonType="danger"
                      label={"Отправить предложения"}
                    ></Button>
                  </Line>
                </Line>
              </div>
            )}
            </div>
            </Line>)}
      {currentPage == 1 && <CorrectionScreen></CorrectionScreen>}
    </Line>
  );
};
