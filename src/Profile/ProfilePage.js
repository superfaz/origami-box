import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Generic/Modal";
import { useTemplates } from "../hooks";
import { getProfile } from "../store";
import { logout } from "../store/profile";
import { removeAll } from "../store/templates";
import "./ProfilePage.css";

export function ProfilePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const { localTemplates, remoteTemplates } = useTemplates();

  function handleLocalClean() {
    dispatch(removeAll());
  }

  function handleRemove() {
    // clean-up local templates
    dispatch(removeAll());

    // clean-up remove templates
    fetch("/api/profile", {
      method: "DELETE",
      headers: {
        accesstoken: profile.accessToken,
        userId: profile.userId,
      },
    }).then(() => {
      // logout
      dispatch(logout());
    });
  }

  if (profile.status !== "initialized") {
    return null;
  }

  return (
    <div className="container">
      <h1>{t("profile.title")}</h1>
      <div className="row">
        <div className="col-md-6">
          <fieldset className="mb-3">
            <legend>{t("profile.facebook")}</legend>
            <div className="text-muted mb-3">
              {t("profile.facebookDescription")}
            </div>
            <div className="mb-3">
              <label htmlFor="userId">{t("profile.userId")}</label>
              <input
                id="userId"
                type="text"
                className="form-control"
                disabled
                value={profile.userId}
              />
              <div className="text-muted small">
                {t("profile.userIdDescription")}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="name">{t("profile.name")}</label>
              <input
                id="name"
                type="text"
                className="form-control"
                disabled
                value={profile.name}
              />
              <div className="text-muted small">
                {t("profile.nameDescription")}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="picture">{t("profile.picture")}</label>
              <div className="input-group">
                <span className="input-group-text p-0">
                  <img src={profile.picture} alt={profile.name} />
                </span>
                <input
                  id="picture"
                  type="text"
                  className="form-control"
                  disabled
                  value={profile.picture}
                />
              </div>
              <div className="text-muted small">
                {t("profile.pictureDescription")}
              </div>
            </div>
          </fieldset>
        </div>

        <div className="col-md-6">
          <fieldset className="mb-3">
            <legend>{t("profile.storage")}</legend>
            <div className="text-muted mb-3">
              {t("profile.storageDescription")}
            </div>
            <div className="mb-3">
              <div>{t("profile.localStorage")}</div>
              <div className="form-control disabled">
                {t("profile.localStorageMessage", {
                  count: localTemplates.length,
                })}
              </div>
              <div className="text-muted small">
                {t("profile.localStorageDescription")}
              </div>
            </div>
            <div className="mb-3">
              <div>{t("profile.remoteStorage")}</div>
              <div className="form-control disabled">
                {t("profile.remoteStorageMessage", {
                  count: remoteTemplates.length,
                })}
              </div>
              <div className="text-muted small">
                {t("profile.remoteStorageDescription")}
              </div>
            </div>
          </fieldset>
        </div>

        <div className="offset-md-6 col-md-6">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">{t("profile.danger.title")}</div>
            <div className="card-body">
              <div className="card-text">{t("profile.danger.content")}</div>
            </div>
            <div className="list-group list-group-flush">
              <div className="list-group-item d-flex">
                <button
                  className="btn btn-warning text-nowrap mb-auto"
                  data-bs-toggle="modal"
                  data-bs-target="#localCleanModal"
                >
                  {t("profile.danger.localClean")}
                </button>
                <div className="mb-auto ms-3">
                  {t("profile.danger.localCleanDescription")}
                </div>
              </div>
              <div className="list-group-item d-flex">
                <button
                  className="btn btn-dark text-nowrap mb-auto"
                  data-bs-toggle="modal"
                  data-bs-target="#removeModal"
                >
                  {t("profile.danger.remove")}
                </button>
                <div className="mb-auto ms-3">
                  {t("profile.danger.removeDescription")}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          id="localCleanModal"
          title={t("profile.localCleanModal.title")}
          onConfirm={handleLocalClean}
        >
          {t("profile.localCleanModal.content")}
        </Modal>

        <Modal
          id="removeModal"
          title={t("profile.removeModal.title")}
          onConfirm={handleRemove}
        >
          {t("profile.removeModal.content")}
        </Modal>
      </div>
    </div>
  );
}
