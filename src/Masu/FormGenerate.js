import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateGeneral } from './reducer';
import { getMasu } from '../store';
import { Link } from 'react-router-dom';
import generatePdf from './generatePdf';
import classNames from 'classnames/dedupe';

class GeneratePDF extends React.Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onGeneratePdf = this.onGeneratePdf.bind(this);
    }

    onGeneratePdf() {
        generatePdf(this.props);
    }

    handleInputChange(e) {
        if (e.target.checkValidity()) {
            e.target.className = classNames(e.target.className, "is-valid", { "is-invalid": false });
        }
        else {
            e.target.className = classNames(e.target.className, "is-invalid", { "is-valid": false });
        }

        if (e.target.form.checkValidity()) {
            this.setState({ valid: true });
        }
        else {
            this.setState({ valid: false });
        }

        this.props.updateGeneral(e.target.name, e.target.value);
    }

    render() {
        const { t } = this.props;
        return (
            <div className="row">
                <div className="col-md-6 col-lg-4 mb-3">
                    <div className="mb-3">
                        <label htmlFor="pageFormat" className="form-label">{t('masu.format.label')}</label>
                        <select name="pageFormat" className="form-select" value={this.props.pageFormat} onChange={this.handleInputChange}>
                            <option value="A4-p">{t('masu.format.A4')}</option>
                        </select>
                    </div>
                    <div className="mb-3 d-flex">
                        <Link className="btn btn-link" to="/back">Back to Back Design</Link>
                        <button type="button" className="btn btn-primary ms-auto" onClick={this.onGeneratePdf}>{t('masu.generatePDF')}</button>
                    </div>
                </div>
                <div className="col-md-6 col-lg-8">
                </div>
            </div>
        );
    }
}

export default withTranslation()(connect(state => getMasu(state), { updateGeneral })(GeneratePDF));
