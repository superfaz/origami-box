import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { getMasu } from '../store';
import classNames from 'classnames';
import { isGeneralValid } from './helper';
import './Nav.css';

const BreadcrumbItem = withRouter(function (props) {
    const { path, title, withLink } = props;
    const paths = Array.isArray(path) ? path : [path];
    const currentPath = props.location.pathname;
    return (
        <li className={classNames(
            "breadcrumb-item d-flex align-bottom",
            { "h4 active": paths.includes(currentPath) },
            { "mt-1": !paths.includes(currentPath) }
        )}>
            {withLink && !paths.includes(currentPath) &&
                <Link to={paths[0]}>{title}</Link>
            }
            {!(withLink && !paths.includes(currentPath)) && title}
        </li>
    );
});

class Nav extends React.PureComponent {
    render() {
        const { t } = this.props;

        return (
            <nav className="nav-steps" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <BreadcrumbItem path="/" title={t('masu.stepAGeneral.title')} withLink={isGeneralValid(this.props)} />
                    {this.props.withBackDesign &&
                        <BreadcrumbItem path={["/back", "/back/addText"]} title={t('masu.stepBBoxDesign.title')} withLink={isGeneralValid(this.props)} />
                    }
                    <BreadcrumbItem path="/generate" title={t('masu.stepZGenerate.title')} withLink={isGeneralValid(this.props)} />
                </ol>
            </nav>
        );
    }
}

export default withTranslation()(connect(state => getMasu(state))(Nav));
