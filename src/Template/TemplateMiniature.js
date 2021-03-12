import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { remove } from "../store/templates";
import { MasuTemplate } from "../Masu/MasuTemplateBack";

export function TemplateMiniature({ template, index }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
                ></button>
                <button
                  type="button"
                  data-bs-target={`#carouselTemplate${index}`}
                  data-bs-slide-to="1"
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
          <h5 className="card-title">{template.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted d-flex">
            <span className="badge bg-warning text-dark me-auto">
              {t("home.template.unsaved")}
            </span>
            <span>{t("date", { date: template.savedate })}</span>
          </h6>
          <Link to={`/edit/${template.key}`} className="card-link">
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
