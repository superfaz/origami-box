import { Helmet } from 'react-helmet';
import { useTranslation, Trans } from 'react-i18next';
import Loader from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { getProfile } from './store';
import { Login, Logout } from './Profile';

import './NavBar.css';

function ProfileMenu() {
  const profile = useSelector(getProfile);

  return (
    <div>
      <div className="card-body">
        <p className="card-text">
          <Trans i18nKey="navbar.welcome">
            Signed in as <strong>{{ name: profile.name }}</strong>
          </Trans>
        </p>
      </div>
      <div className="list-group list-group-flush">
        <Logout className="list-group-item list-group-item-action" />
      </div>
    </div>
  );
}

function LanguageMenu() {
  const { i18n } = useTranslation();

  return (
    <div>
      <div className="list-group list-group-flush">
        <button className="list-group-item list-group-item-action"
          onClick={() => i18n.changeLanguage('en')}>en (English)</button>
        <button className="list-group-item list-group-item-action"
          onClick={() => i18n.changeLanguage('fr')}>fr (Français)</button>
      </div>
    </div >
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
          <li className="nav-item ms-3">
            <Tippy className="card" content={<LanguageMenu />}
              interactive={true} interactiveBorder={20} trigger="click"
              placement="bottom-end" theme="light-border">
              <button className="btn nav-link">
                {i18n.language} <i className="fas fa-caret-down"></i>
              </button>
            </Tippy>
            <Helmet>
              <html lang={i18n.language} />
            </Helmet>
          </li>
          <li className="nav_item ms-3">
            {(profile.status === 'unknown' || profile.status === 'connected') &&
              <Loader
                className="mt-2"
                type="Bars"
                color="#fff"
                height='1.5rem'
                width='40px'
                timeout={0} />
            }
            {profile.status === 'not-connected' &&
              <Login className="btn btn-outline-primary text-white">
                {t('navbar.signin')}
              </Login>
            }
            {profile.status === 'initialized' &&
              <Tippy className="card" content={<ProfileMenu />}
                interactive={true} interactiveBorder={20} trigger="click"
                placement="bottom-end" theme="light-border">
                <img src={profile.picture} alt={profile.name} className="rounded" />
              </Tippy>
            }
          </li>
        </ul>
      </div>
    </nav>
  );
}
