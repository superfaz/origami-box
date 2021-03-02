import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Login } from "./Profile";
import { getProfile } from "./store";
import { isConnected } from "./Profile/selectors";

export default function Home() {
  const { t } = useTranslation();
  const profile = useSelector(getProfile);

  return (
    <div className="container">
      <h1 className="display-3">
        <Trans i18nKey="home.title">
          Welcome <i className='far fa-smile-wink'></i>
        </Trans>
      </h1>
      <div className="row">
        <div className="col-lg-6 mb-3">
          <p className="lead">{t('home.description')}</p>
          <Link to="/masu" className="btn btn-lg btn-primary">{t('home.start')}</Link>
          {!isConnected(profile) &&
            <Login className="btn-lg ms-3" />
          }
        </div>
        <div className="col-lg-6 mb-3">
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
