import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { useTranslation, Trans } from 'react-i18next';
import Loader from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { getProfile } from './store';
import { Login, Logout } from './Profile';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

import './NavBar.css';

function ProfileMenu() {
  const profile = useSelector(getProfile);
  const { t } = useTranslation();

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
        <NavLink to="/profile" className="list-group-item list-group-item-action">{t('navbar.profile')}</NavLink>
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
          onClick={() => { i18n.changeLanguage('en'); collapse() }}>en (English)</button>
        <button className="list-group-item list-group-item-action"
          onClick={() => { i18n.changeLanguage('fr'); collapse() }}>fr (Français)</button>
      </div>
    </div >
  );
}

function collapse() {
  const navbar = document.getElementById('navbar');
  const collapse = bootstrap.Collapse.getInstance(navbar);
  if (collapse !== null) {
    collapse.hide();
  }
}

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const profile = useSelector(getProfile);
  const languages = i18n.options.supportedLngs.filter(lng => lng !== 'cimode');

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark text-light">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/" onClick={collapse}>
          <img alt="logo" src="/logo-plain.svg" height="30" className="me-2 align-top" />
          Origami Box
        </Link>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/"
                onClick={collapse}>{t('navbar.home')}</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/templates"
                onClick={collapse}>{t('navbar.templates')}</NavLink>
            </li>
            <li className="nav-item d-lg-none">
              Change language to:
              <div className="btn-group ms-2">
                {languages.map(lng =>
                  <button key={lng}
                    className={classNames("btn", { "btn-secondary": i18n.language === lng }, { "btn-outline-secondary": i18n.language !== lng })}
                    onClick={() => {
                      i18n.changeLanguage(lng);
                      collapse();
                    }}>{lng}</button>
                )}
              </div>
            </li>
            {profile.status === 'not-connected' && process.env.REACT_APP_FACEBOOK !== 'false' &&
              <li className="nav-item d-lg-none">
                <Login className="nav-link btn">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  {t('navbar.signin')}
                </Login>
              </li>
            }
            {profile.status === 'initialized' &&
              <li className="nav-item d-lg-none">
                <NavLink className="nav-link" to="/profile" onClick={collapse}>
                  <img src={profile.picture} height="24" alt={profile.name} className="rounded me-2" />
                  {profile.name}
                </NavLink>
              </li>
            }
            {profile.status === 'initialized' &&
              <li className="nav-item d-lg-none">
                <Logout className="nav-link btn" onClick={collapse} />
              </li>
            }
          </ul>
          <ul className="navbar-nav d-none d-lg-flex">
            <li className="nav-item ms-lg-3">
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
            <li className="nav-item ms-lg-3">
              {(profile.status === 'unknown' || profile.status === 'connected') &&
                <Loader
                  className="mt-2"
                  type="Bars"
                  color="#fff"
                  height='1.5rem'
                  width='40px'
                  timeout={0} />
              }
              {profile.status === 'not-connected' && process.env.REACT_APP_FACEBOOK !== 'false' &&
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
      </div>
    </nav>
  );
}
