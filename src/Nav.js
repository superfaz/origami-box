import './Nav.css';
import React from 'react';

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark text-light">
            <div className="container">
                <a className="navbar-brand" href="/">Origami</a>
            </div>
        </nav>
    );
}

export default Nav;
