import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getMasu } from '../store';
import classNames from 'classnames';

import './Nav.css';

const NavItem = withRouter(function (props) {
    const { path, title } = props;
    const paths = Array.isArray(path) ? path : [path];
    const currentPath = props.location.pathname;
    return (
        <li className={classNames(
            "breadcrumb-item d-flex align-bottom",
            { "h4 active": paths.includes(currentPath) },
            { "mt-1": !paths.includes(currentPath) }
        )}>
            {title}
        </li>
    );
});

class Nav extends React.PureComponent {
    render() {
        const { t, masu } = this.props;

        return (
            <nav className="nav-steps" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <NavItem path="/" title={t('masu.stepAGeneral.title')} />
                    <NavItem path={["/back", "/back/addText"]} title={t('masu.stepBBoxDesign.title')} />
                    <NavItem path="/generate" title={t('masu.stepZGenerate.title')} />
                </ol>
            </nav>
        );
    }
}

export default withTranslation()(connect(state => getMasu(state))(Nav));
