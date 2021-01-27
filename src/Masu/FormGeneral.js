import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateGeneral } from './reducer';
import { getMasu } from '../store';

class FormGeneral extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckedChange = this.handleCheckedChange.bind(this);
    }

    handleInputChange(e) {
        this.props.updateGeneral(e.target.name, e.target.value);
    }

    handleCheckedChange(e) {
        this.props.updateGeneral(e.target.name, e.target.checked);
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <h4>{t('masu.general')}</h4>
                <div className="mb-3">
                    <label htmlFor="pageFormat" className="form-label">{t('masu.format.label')}</label>
                    <select name="pageFormat" className="form-select" value={this.props.pageFormat} onChange={this.handleInputChange}>
                        <option value="A4-p">{t('masu.format.A4p')}</option>
                        <option value="A4-l">{t('masu.format.A4l')}</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="length" className="form-label">{t('masu.dimensions.label')}</label>
                    <div className="input-group">
                        <input name="length" type="number" className="form-control"
                            placeholder={t('masu.dimensions.length')} aria-label={t('masu.dimensions.length')}
                            value={this.props.length} onChange={this.handleInputChange} />
                        <input name="width" type="number" className="form-control"
                            placeholder={t('masu.dimensions.width')} aria-label={t('masu.dimensions.width')}
                            value={this.props.width} onChange={this.handleInputChange} />
                        <input name="height" type="number" className="form-control"
                            placeholder={t('masu.dimensions.height')} aria-label={t('masu.dimensions.height')}
                            value={this.props.height} onChange={this.handleInputChange} />
                    </div>
                </div>
                <div className="mb-3 d-none">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="withLid" name="withLid"
                            checked={this.props.withLid} onChange={this.handleCheckedChange} />
                        <label className="form-check-label" htmlFor="withLid">{t('masu.withLid')}</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(connect(state => getMasu(state), { updateGeneral })(FormGeneral));
