import React from 'react';
import './Nav.css';

class Nav extends React.Component {

    constructor() {
        super();
        this.state = { checked: false };

        this.handleChanges = this.handleChanges.bind(this);
    }

    handleChanges(checked) {
        this.setState({ checked: checked })
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark text-light">
                <div className="container">
                    <a className="navbar-brand" href="/">Origami</a>
                    <div>
                        <a className="theme-dark text-white"><i className="bi bi-moon"></i></a>
                        <div className="form-check form-switch d-inline-block">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                            <label className="form-check-label theme-light" htmlFor="flexSwitchCheckDefault"><i className="bi bi-brightness-high"></i></label>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;
