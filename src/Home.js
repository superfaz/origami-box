import { useState } from "react";
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { create } from "./store/templates";
import TemplateList from "./Template/TemplateList";

export default function Home() {
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState(null);
  const dispatch = useDispatch();

  function handleCreate() {
    const key = uuidv4();
    dispatch(create(key));
    setRedirect("/edit/" + key);
  }

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
          <TemplateList limit={4}>
            <h2>{t("home.latestTemplates.title")}</h2>
          </TemplateList>
        </div>
      </div>
    );
  }
}
