import { useTranslation, Trans } from "react-i18next";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MasuTemplate } from "../Masu/MasuTemplateBack";
import { localSave } from "../store/templates";
import Modal from "../Generic/Modal";
import { getProfile } from "../store";
import { isConnected } from "../Profile/selectors";
import "./TemplateMiniature.css";

export function TemplateMiniature({
  template,
  index,
  loading,
  onSave,
  onDiscard,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const profile = useSelector(getProfile);

  function handleContinue() {
    dispatch(localSave(template));
  }

  function handleSave() {
    onSave(template.key, template);
  }

  function handleDiscard() {
    onDiscard(template.key, template);
  }

  return (
    <div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
      <div className="card h-100">
        <div className="card-img-top" style={{ position: "relative" }}>
          {loading && (
            <div className="d-flex align-items-center justify-content-center mini-overlay">
              <Loader type="Oval" color="#fff" />
            </div>
          )}
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
            <span
              className="me-auto"
              title={t("datetime", { date: template.savedate })}
            >
              {t("date", { date: template.savedate })}
            </span>
            {template.local && template._id === undefined && (
              <span className="badge bg-warning text-dark">
                {t("template.unsaved")}
              </span>
            )}
            {template.local && template._id !== undefined && (
              <span className="badge bg-info">{t("template.draft")}</span>
            )}
          </h6>
          <Link
            to={`/edit/${template.key}`}
            className="card-link"
            onClick={handleContinue}
          >
            {t("template.continue")}
          </Link>
          {template.local && isConnected(profile) && (
            <button
              className="btn btn-link card-link ps-0 pe-0"
              onClick={handleSave}
            >
              {t("template.save")}
            </button>
          )}
          <button
            className="btn btn-link card-link ps-0 pe-0"
            data-bs-toggle="modal"
            data-bs-target={`#discardModal${index}`}
          >
            {template.local ? t("template.discard") : t("template.remove")}
          </button>
        </div>
      </div>
      {template.local && template._id === undefined && (
        <Modal
          id={`discardModal${index}`}
          title={t("template.modal.unsavedTitle")}
          onConfirm={handleDiscard}
        >
          <Trans i18nKey="template.modal.unsavedContent">
            Are you sure that you want to discard the local template named{" "}
            <strong>
              {{ title: template.title || `'${t("template.notitle")}'` }}
            </strong>
            ?
          </Trans>
        </Modal>
      )}
      {template.local && template._id !== undefined && (
        <Modal
          id={`discardModal${index}`}
          title={t("template.modal.draftTitle")}
          onConfirm={handleDiscard}
        >
          <Trans i18nKey="template.modal.draftContent">
            Are you sure that you want to discard the draft named{" "}
            <strong>
              {{ title: template.title || `'${t("template.notitle")}'` }}
            </strong>
            ?
          </Trans>
        </Modal>
      )}
      {!template.local && (
        <Modal
          id={`discardModal${index}`}
          title={t("template.modal.remoteTitle")}
          onConfirm={handleDiscard}
        >
          <Trans i18nKey="template.modal.remoteContent">
            Are you sure that you want to remove the template named{" "}
            <strong>
              {{ title: template.title || `'${t("template.notitle")}'` }}
            </strong>
            ?
          </Trans>
        </Modal>
      )}
    </div>
  );
}
