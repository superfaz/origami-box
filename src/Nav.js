import React from 'react';
import { useTranslation } from 'react-i18next';

function Nav() {
    const { i18n } = useTranslation();
    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark text-light">
            <div className="container">
                <a className="navbar-brand" href="/">Origami Box</a>
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <ul id="languageDropdown" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {i18n.language}
                        </ul>
                        <ul className="dropdown-menu" aria-labelledby="languageDropdown">
                            <li><button className="dropdown-item" onClick={() => i18n.changeLanguage('en')}>en (English)</button></li>
                            <li><button className="dropdown-item" onClick={() => i18n.changeLanguage('fr')}>fr (Français)</button></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
