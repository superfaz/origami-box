import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateDetail } from './reducer';
import { TwitterPicker } from 'react-color';
import MasuTemplate from './MasuTemplate';
import { Link } from 'react-router-dom';
import { getMasu } from '../store';
import Nav from './Nav';

class StepBBoxDesign extends React.Component {
    constructor(props) {
        super(props);

        this.handleBackgroundColorChange = this.handleBackgroundColorChange.bind(this);
        this.handleBackgroundImageChange = this.handleBackgroundImageChange.bind(this);
    }

    handleBackgroundColorChange(color) {
        this.props.updateDetail(this.props.block.key, 'background', color.hex);
    }

    handleBackgroundImageChange(event) {
        if (event.target.files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.props.updateDetail(this.props.block.key, 'backgroundImage', reader.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        else {
            this.props.updateDetail(this.props.block.key, 'backgroundImage', null);
        }
    }

    render() {
        const { t, block } = this.props;
        return (
            <div className="row">
                <Nav />
                <div className="col-md-6 col-lg-4 mb-3">
                    <div className="mb-3">
                        <label htmlFor={`${this.props.key}.backgroundColor`} className="form-label">{t('masu.stepBBoxDesign.backgroundColor')}</label>
                        <TwitterPicker name={`${this.props.key}.backgroundColor`} triangle="hide" width="312px"
                            colors={['#FFFFFF', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
                            color={block.background} onChangeComplete={this.handleBackgroundColorChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="backgroundImage" className="form-label">{t('masu.stepBBoxDesign.backgroundImage')}</label>
                        <input className="form-control" type="file" name="backgroundImage" id="backgroundImage" accept="image/png, image/jpeg"
                            onChange={this.handleBackgroundImageChange} />
                    </div>
                    <div className="mb-3">
                        {block.texts.length !== 0 &&
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>{t('masu.stepBBoxDesign.textContent')}</th>
                                        <th>{t('masu.stepBBoxDesign.textFace')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {block.texts.map((text, i) =>
                                        <tr key={i}>
                                            <td>{text.content}</td>
                                            <td>{t(`masu.face.${text.face}`)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        }
                        {block.texts.length === 0 &&
                            <div className="mb-5"></div>
                        }
                        <div className="d-flex">
                            <Link className="btn btn-outline-primary" to="/back/addText">{t('masu.stepCAddText.linkTo')}</Link>
                        </div>
                    </div>
                    <div className="mb-3 mt-5 d-flex">
                        <Link className="btn btn-primary ms-auto" to="/generate">{t('masu.stepZGenerate.linkTo')}</Link>
                    </div>
                </div>
                <div className="col-md-6 col-lg-8 mb-3">
                    <MasuTemplate side="back" detail={block} />
                </div>
            </div>
        );
    }
}

export default withTranslation()(connect(state => getMasu(state), { updateDetail })(StepBBoxDesign));
