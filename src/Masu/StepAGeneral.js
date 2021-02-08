import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateGeneral } from './reducer';
import { getMasu } from '../store';
import { Link } from 'react-router-dom';
import MasuTemplate from './MasuTemplate';
import Nav from './Nav';
import classNames from 'classnames/dedupe';

class StepAGeneral extends React.Component {
    constructor(props) {
        super(props);
        this.state = { valid: false };
        this.form = new React.createRef();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckedChange = this.handleCheckedChange.bind(this);
    }

    handleInputChange(e) {
        if (e.target.checkValidity()) {
            e.target.className = classNames(e.target.className, "is-valid", { "is-invalid": false });
        }
        else {
            e.target.className = classNames(e.target.className, "is-invalid", { "is-valid": false });
        }

        this.setState({ valid: e.target.form.checkValidity() });

        this.props.updateGeneral(e.target.name, e.target.value);
    }

    handleCheckedChange(e) {
        this.props.updateGeneral(e.target.name, e.target.checked);
    }

    componentDidMount() {
        this.setState({ valid: this.form.current.checkValidity() });
    }

    render() {
        const { t } = this.props;
        return (
            <div className="row">
                <Nav />
                <div className="col-md-6 col-lg-4 mb-3">
                    <form ref={this.form} noValidate>
                        <div className="mb-3">
                            <label htmlFor="length" className="form-label">{t('masu.dimensions.label')}</label>
                            <div className="input-group">
                                <input name="length" type="number" style={{ width: 'calc(100%/3)' }} className="form-control" autoFocus required min="1"
                                    placeholder={t('masu.dimensions.length')} aria-label={t('masu.dimensions.length')}
                                    value={this.props.length} onChange={this.handleInputChange} />
                                <input name="width" type="number" style={{ width: 'calc(100%/3)' }} className="form-control" required min="1"
                                    placeholder={t('masu.dimensions.width')} aria-label={t('masu.dimensions.width')}
                                    value={this.props.width} onChange={this.handleInputChange} />
                                <input name="height" type="number" style={{ width: 'calc(100%/3)' }} className="form-control" required min="1"
                                    placeholder={t('masu.dimensions.height')} aria-label={t('masu.dimensions.height')}
                                    value={this.props.height} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="withBackDesign" name="withBackDesign"
                                    checked={this.props.withBackDesign} onChange={this.handleCheckedChange} />
                                <label className="form-check-label" htmlFor="withBackDesign">{t('masu.withBackDesign')}</label>
                            </div>
                        </div>
                        <div className="mb-3 d-none">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="withLid" name="withLid"
                                    checked={this.props.withLid} onChange={this.handleCheckedChange} />
                                <label className="form-check-label" htmlFor="withLid">{t('masu.withLid')}</label>
                            </div>
                        </div>
                        <div className="mb-3 mt-5 d-flex">
                            {this.props.withBackDesign &&
                                <Link className={classNames("btn btn-primary ms-auto", { "disabled": !this.state.valid })} to="/back">{t('masu.stepBBoxDesign.linkTo')}</Link>
                            }
                            {!this.props.withBackDesign &&
                                <Link className={classNames("btn btn-primary ms-auto", { "disabled": !this.state.valid })} to="/generate">{t('masu.stepZGenerate.linkTo')}</Link>
                            }
                        </div>
                    </form>
                </div>
                <div className="col-md-6 col-lg-8 mb-3">
                    <MasuTemplate side="front" detail={this.props.box} />
                </div>
            </div>
        );
    }
}

export default withTranslation()(connect(state => getMasu(state), { updateGeneral })(StepAGeneral));
