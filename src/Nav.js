import './Nav.css';
import React from 'react';
import { changeTheme, getTheme } from './store';
import { connect } from 'react-redux';

function Nav({ theme, changeTheme }) {
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark text-light">
            <div className="container">
                <a className="navbar-brand" href="/">Origami</a>
                <div>
                    <label className="theme-dark" onClick={() => changeTheme('dark')}><i className="bi bi-moon"></i></label>
                    <div className="form-check form-switch d-inline-block">
                        <input className="form-check-input" type="checkbox" id="theme" checked={theme === 'light'} onChange={changeTheme} />
                        <label className="form-check-label theme-light" onClick={() => changeTheme('light')}><i className="bi bi-brightness-high"></i></label>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const mapStateToProps = state => {
    const theme = getTheme(state);
    return { theme };
};

export default connect(mapStateToProps, { changeTheme })(Nav);
