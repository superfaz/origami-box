import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemplates } from "./store";

export default function Home() {
  const { t } = useTranslation();
  const templates = useSelector(getTemplates);

  return (
    <div className="container">
      <h1 className="display-3">
        <Trans i18nKey="home.title">
          Welcome <i className='far fa-smile-wink'></i>
        </Trans>
      </h1>
      <div className="row">
        <div className="col-xl-8 col-lg-6 mb-3">
          <p className="lead mb-3">{t('home.description')}</p>
          <p>
            <Link to="/masu" className="btn btn-lg btn-primary">{t('home.start')}</Link>
          </p>
          {templates.length > 0 &&
            <div className="row">
              {templates.map(template =>
                <div key={template.id} className="col-xl-4 col-lg-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{template.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Unsaved template</h6>
                      <p className="card-text"></p>
                      <button className="card-link">Continue</button>
                      <button className="card-link">Discard</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          }
        </div>
        <div className="col-xl-4 col-lg-6 mb-3">
          <div className="card text-dark bg-warning mb-3">
            <div className="card-header">{t('home.beta.header')}</div>
            <div className="card-body">
              <h5 className="card-title">{t('home.beta.title')}</h5>
              <div className="card-text">
                <Trans i18nKey="home.beta.text"></Trans>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
