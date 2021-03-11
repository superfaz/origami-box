import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getTemplates } from "../store";
import { logout } from "../store/profile";
import { removeAll } from "../store/templates";
import "./ProfilePage.css";

export function ProfilePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const localTemplates = useSelector(getTemplates);
  const [remoteTemplates, setRemoteTemplates] = useState([]);

  useEffect(() => {
    fetch("api/template", {
      headers: {
        accesstoken: profile.accessToken,
        userId: profile.userId,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRemoteTemplates(data);
      });
  }, [profile.userId, profile.accessToken]);

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
                  count: Object.keys(localTemplates).length,
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
                  count: Object.keys(remoteTemplates).length,
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

        <div
          className="modal fade"
          id="localCleanModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="localCleanModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="localCleanModalLabel">
                  {t("profile.localCleanModal.title")}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label={t("profile.localCleanModal.close")}
                ></button>
              </div>
              <div className="modal-body">
                {t("profile.localCleanModal.content")}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  {t("profile.localCleanModal.cancel")}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleLocalClean}
                >
                  {t("profile.localCleanModal.confirm")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="removeModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="removeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="removeModalLabel">
                  {t("profile.removeModal.title")}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label={t("profile.removeModal.close")}
                ></button>
              </div>
              <div className="modal-body">
                {t("profile.removeModal.content")}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  {t("profile.removeModal.cancel")}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleRemove}
                >
                  {t("profile.removeModal.confirm")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
