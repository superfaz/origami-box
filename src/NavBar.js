import { Helmet } from 'react-helmet';
import { useTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { getProfile } from './store';
import { Login } from './Profile';
import { logout } from './Profile/reducer';

function ProfileMenu() {
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const name = profile.name;
  const { t } = useTranslation();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div>
      <div className="card-body">
        <p className="card-text">
          <Trans i18nKey="navbar.welcome">
            Signed in as <strong>{{name}}</strong>
          </Trans>
        </p>
      </div>
      <div className="list-group list-group-flush">
        <button className="list-group-item list-group-item-action"
          onClick={handleLogout}>
          <i className="fas fa-sign-out-alt me-2"></i>
          <span>{t('profile.logout')}</span>
        </button>
      </div>
    </div>
  );
}

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const profile = useSelector(getProfile);

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark text-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img alt="logo" src="/logo-plain.svg" height="30" className="me-2 align-top" />
          Origami Box
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item dropdown ms-3">
            <ul id="languageDropdown" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {i18n.language}
              <Helmet>
                <html lang={i18n.language} />
              </Helmet>
            </ul>
            <ul className="dropdown-menu" aria-labelledby="languageDropdown">
              <li><button className="dropdown-item" onClick={() => i18n.changeLanguage('en')}>en (English)</button></li>
              <li><button className="dropdown-item" onClick={() => i18n.changeLanguage('fr')}>fr (Français)</button></li>
            </ul>
          </li>
          {profile.picture &&
            <li className="nav_item ms-3">
              <Tippy className="card" content={<ProfileMenu />}
                interactive={true} interactiveBorder={20}
                placement='bottom-end' theme='light-border'>
                <img src={profile.picture} alt={profile.name} className="rounded" />
              </Tippy>
            </li>
          }
          {!profile.accessToken &&
            <Login className="btn  ms-3 btn-outline-primary text-white">
              {t('navbar.signin')}
            </Login>
          }
        </ul>
      </div>
    </nav>
  );
}
