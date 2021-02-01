import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateDetail } from './reducer';
import { TwitterPicker } from 'react-color';
import MasuTemplate from './MasuTemplate';
import { Link } from 'react-router-dom';

class FormDetail extends React.Component {
    constructor(props) {
        super(props);

        this.handleFrontTextChange = this.handleFrontTextChange.bind(this);
        this.handleBackgroundColorChange = this.handleBackgroundColorChange.bind(this);
    }

    handleFrontTextChange(event) {
        this.props.updateDetail(this.props.block.key, 'frontText', event.target.value);
    }

    handleBackgroundColorChange(color) {
        this.props.updateDetail(this.props.block.key, 'background', color.hex);
    }

    render() {
        const { t, block } = this.props;
        return (
            <div className="row">
                <div className="col-md-6 col-lg-4 mb-3">
                    <h4>{this.props.title}</h4>
                    <div className="mb-3">
                        <label htmlFor={`${this.props.key}.backgroundColor`} className="form-label">{t('masu.backgroundColor.label')}</label>
                        <TwitterPicker name={`${this.props.key}.backgroundColor`} triangle="hide" width="312px"
                            colors={['#FFFFFF', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
                            color={block.background} onChangeComplete={this.handleBackgroundColorChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor={`${this.props.key}.frontText`} className="form-label">{t('masu.frontText.label')}</label>
                        <input name={`${this.props.key}.frontText`} type="text" className="form-control"
                            value={block.frontText} onChange={this.handleFrontTextChange} />
                    </div>
                    <div className="mb-3 d-flex">
                        <Link className="btn btn-link" to="/">Back to General Options</Link>
                        <Link className="btn btn-primary ms-auto" to="/generate">Generate the PDF</Link>
                    </div>
                </div>
                <div className="col-md-6 col-lg-8">
                    <MasuTemplate side="back" detail={block} />
                </div>
            </div>
        );
    }
}

export default withTranslation()(connect(null, { updateDetail })(FormDetail));
