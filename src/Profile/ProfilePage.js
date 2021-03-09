import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getProfile, getTemplates } from '../store';
import './ProfilePage.css'

export function ProfilePage() {
  const { t } = useTranslation();
  const profile = useSelector(getProfile);
  const localTemplates = useSelector(getTemplates);

  return (
    <div className="container">
      <h1>{t('profile.title')}</h1>
      <div className="row">
        <div className="col-md-6">
          <fieldset className="mb-3">
            <legend>{t('profile.facebook')}</legend>
            <div className="text-muted mb-3">{t('profile.facebookDescription')}</div>
            <div className="mb-3">
              <label htmlFor="userId">{t('profile.userId')}</label>
              <input type="text" className="form-control" disabled value={profile.userId} />
              <div className="text-muted small">{t('profile.userIdDescription')}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="userId">{t('profile.name')}</label>
              <input type="text" className="form-control" disabled value={profile.name} />
              <div className="text-muted small">{t('profile.nameDescription')}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="userId">{t('profile.picture')}</label>
              <div className="input-group">
                <span className="input-group-text p-0"><img src={profile.picture} alt={profile.name} /></span>
                <input type="text" className="form-control" disabled value={profile.picture} />
              </div>
              <div className="text-muted small">{t('profile.pictureDescription')}</div>
            </div>
          </fieldset>
        </div>

        <div className="col-md-6">
          <fieldset className="mb-3">
            <legend>{t('profile.storage')}</legend>
            <div className="text-muted mb-3">{t('profile.storageDescription')}</div>
            <div className="mb-3">
              <div>{t('profile.localStorage')}</div>
              <div className="form-control disabled">
                {t('profile.localStorageMessage', { count: Object.keys(localTemplates).length })}
              </div>
              <div className="text-muted small">{t('profile.localStorageDescription')}</div>
            </div>
          </fieldset>
        </div>

        <div className="offset-md-6 col-md-6">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">{t('profile.danger.title')}</div>
            <div className="card-body">
              <div className="card-text">
                {t('profile.danger.content')}
              </div>
            </div>
            <div className="list-group list-group-flush">
              <div className="list-group-item d-flex">
                <button className="btn btn-warning text-nowrap mb-auto"
                  data-bs-toggle="modal" data-bs-target="#localCleanModal">{t('profile.danger.localClean')}</button>
                <div className="mb-auto ms-3">{t('profile.danger.localCleanDescription')}</div>
              </div>
              <div className="list-group-item d-flex">
                <button className="btn btn-dark text-nowrap mb-auto">{t('profile.danger.remove')}</button>
                <div className="mb-auto ms-3">{t('profile.danger.removeDescription')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
