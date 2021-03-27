import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TemplateList from "./Template/TemplateList";

export default function HomePage() {
  const { t } = useTranslation();

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
          <p className="lead mb-3">
            <Trans i18nKey="home.description2">
              And if you need some inspiration to get started, please pass by
              the
              <a
                href="https://www.facebook.com/groups/406940570021633/"
                target="_blank"
                rel="noreferrer"
              >
                Les ludistes origamistes
              </a>
              group on Facebook.
            </Trans>
          </p>
          <p>
            <Link className="btn btn-lg btn-primary" to="/create">
              {t("home.start")}
            </Link>
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
