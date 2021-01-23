import React from 'react';

class Nav extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">Origami Templates</a>
                </div>
            </nav>
        );
    }
}

export default Nav;
