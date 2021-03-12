import { useState } from "react";
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getTemplates } from "./store";
import { create } from "./store/templates";
import { TemplateMiniature } from "./Template";

export default function Home() {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState(null);
  const templates = useSelector(getTemplates);
  const dispatch = useDispatch();

  function handleCreate() {
    const key = uuidv4();
    dispatch(create(key));
    setRedirect("/edit/" + key);
  }

  function toArray(obj) {
    if (obj === undefined || obj === null) {
      return [];
    }

    return Object.keys(obj).reduce((acc, current) => {
      acc.push(obj[current]);
      return acc;
    }, []);
  }

  const latestTemplates = toArray(templates)
    .sort((a, b) => b.savedate - a.savedate)
    .filter((v, i) => i < 4);

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  } else {
    return (
      <div className="container">
        <h1 className="display-3">
          <Trans i18nKey="home.title">
            Welcome <i className="far fa-smile-wink"></i>
          </Trans>
        </h1>
        <div className="row">
          <div className="col-xl-8 col-lg-6 mb-3">
            <p className="lead mb-3">{t("home.description")}</p>
            <p>
              <button onClick={handleCreate} className="btn btn-lg btn-primary">
                {t("home.start")}
              </button>
            </p>
          </div>
          <div className="col-xl-4 col-lg-6 mb-3">
            <div className="card text-dark bg-warning mb-3">
              <div className="card-header">{t("home.beta.header")}</div>
              <div className="card-body">
                <h5 className="card-title">{t("home.beta.title")}</h5>
                <div className="card-text">
                  <Trans i18nKey="home.beta.text"></Trans>
                </div>
              </div>
            </div>
          </div>
          {latestTemplates.length > 0 && (
            <>
              <h2>{t("home.latestTemplates.title")}</h2>
              {latestTemplates.map((template, index) => (
                <TemplateMiniature
                  key={index}
                  template={template}
                  index={index}
                />
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}
