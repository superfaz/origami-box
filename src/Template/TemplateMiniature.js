import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { localSave, remove } from "../store/templates";
import { MasuTemplate } from "../Masu/MasuTemplateBack";

export function TemplateMiniature({ template, index }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function handleContinue() {
    dispatch(localSave(template));
  }

  function handleDiscard() {
    dispatch(remove(template.key));
  }

  return (
    <div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
      <div className="card h-100">
        <div className="card-img-top">
          {template.data.withLid && (
            <div
              id={`carouselTemplate${index}`}
              className="carousel carousel-dark slide"
              data-bs-ride="carousel"
              data-bs-interval={false}
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target={`#carouselTemplate${index}`}
                  data-bs-slide-to="0"
                  className="active"
                  title={t("masu.stepBDesign.lid.title")}
                ></button>
                <button
                  type="button"
                  data-bs-target={`#carouselTemplate${index}`}
                  data-bs-slide-to="1"
                  title={t("masu.stepBDesign.base.title")}
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <MasuTemplate
                    masu={template.data}
                    lid={true}
                    withPaper={false}
                  />
                </div>
                <div className="carousel-item">
                  <MasuTemplate
                    masu={template.data}
                    lid={false}
                    withPaper={false}
                  />
                </div>
              </div>
            </div>
          )}
          {!template.data.withLid && (
            <MasuTemplate masu={template.data} withPaper={false} />
          )}
        </div>
        <div className="card-body">
          <h5 className="card-title">
            {template.title || <em>{t("template.notitle")}</em>}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted d-flex">
            <span className="me-auto">
              {t("date", { date: template.savedate })}
            </span>
            {template.local && (
              <span className="badge bg-warning text-dark">
                {t("home.template.unsaved")}
              </span>
            )}
          </h6>
          <Link
            to={`/edit/${template.key}`}
            className="card-link"
            onClick={handleContinue}
          >
            {t("home.template.continue")}
          </Link>
          <button className="btn btn-link card-link" onClick={handleDiscard}>
            {t("home.template.discard")}
          </button>
        </div>
      </div>
    </div>
  );
}
