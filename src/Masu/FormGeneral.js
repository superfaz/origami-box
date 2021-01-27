import React from 'react';
import { TwitterPicker } from 'react-color';
import { withTranslation } from 'react-i18next';

class FormGeneral extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBackgroundColorChange = this.handleBackgroundColorChange.bind(this);
        this.handleBackgroundColor2Change = this.handleBackgroundColor2Change.bind(this);
        this.handleCheckedChange = this.handleCheckedChange.bind(this);
    }

    handleInputChange(e) {
        this.props.onInputChange(e);
    }

    handleBackgroundColorChange(color) {
        this.handleInputChange({ target: { name: 'backgroundColor', value: color.hex } });
    }

    handleBackgroundColor2Change(color) {
        this.handleInputChange({ target: { name: 'backgroundColor2', value: color.hex } });
    }

    handleCheckedChange(e) {
        this.handleInputChange({ target: { name: e.target.name, value: e.target.checked } });
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <h4>General Options</h4>
                <div className="mb-3">
                    <label htmlFor="pageFormat" className="form-label">{t('masu.format.label')}</label>
                    <select name="pageFormat" className="form-select" value={this.props.masu.pageFormat} onChange={this.handleInputChange}>
                        <option value="A4-p">{t('masu.format.A4p')}</option>
                        <option value="A4-l">{t('masu.format.A4l')}</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="length" className="form-label">{t('masu.dimensions.label')}</label>
                    <div className="input-group">
                        <input name="length" type="number" className="form-control"
                            placeholder={t('masu.dimensions.length')} aria-label={t('masu.dimensions.length')}
                            value={this.props.masu.length} onChange={this.handleInputChange} />
                        <input name="width" type="number" className="form-control"
                            placeholder={t('masu.dimensions.width')} aria-label={t('masu.dimensions.width')}
                            value={this.props.masu.width} onChange={this.handleInputChange} />
                        <input name="height" type="number" className="form-control"
                            placeholder={t('masu.dimensions.height')} aria-label={t('masu.dimensions.height')}
                            value={this.props.masu.height} onChange={this.handleInputChange} />
                    </div>
                </div>
                <div className="mb-3">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="withLid" name="withLid"
                            checked={this.props.masu.withLid} onChange={this.handleCheckedChange} />
                        <label className="form-check-label" htmlFor="withLid">{t('masu.withLid')}</label>
                    </div>
                </div>
                <h4>Box</h4>
                <div className="mb-3">
                    <label htmlFor="frontText" className="form-label">{t('masu.frontText.label')}</label>
                    <input name="frontText" type="text" className="form-control"
                        value={this.props.masu.frontText} onChange={this.handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="backgroundColor" className="form-label">{t('masu.backgroundColor.label')}</label>
                    <TwitterPicker name="backgroundColor" triangle="hide" width="312px"
                        colors={['#FFFFFF', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
                        color={this.props.masu.backgroundColor} onChangeComplete={this.handleBackgroundColorChange} />
                </div>
                <h4>Lid</h4>
                <div className="mb-3">
                    <label htmlFor="frontText2" className="form-label">{t('masu.frontText.label')}</label>
                    <input name="frontText2" type="text" className="form-control"
                        value={this.props.masu.frontText} onChange={this.handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="backgroundColor2" className="form-label">{t('masu.backgroundColor.label')}</label>
                    <TwitterPicker name="backgroundColor2" triangle="hide" width="312px"
                        colors={['#FFFFFF', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
                        color={this.props.masu.backgroundColor} onChangeComplete={this.handleBackgroundColor2Change} />
                </div>
            </div>
        );
    }
}

export default withTranslation()(FormGeneral);
