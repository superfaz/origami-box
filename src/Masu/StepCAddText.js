import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getMasu } from '../store';
import { addText } from './reducer';
import MasuTemplate from './MasuTemplate';
import Nav from './Nav';

class StepCAddText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            content: '',
            face: 'front',
            family: '',
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.addText('box', this.state.content, this.state.face, this.state.family);
        this.setState({ redirect: true })
    }

    render() {
        const { t } = this.props;
        return (
            <div className="row">
                <Nav />
                <div className="col-md-6 col-lg-4 mb-3">
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="content">{t('masu.stepCAddText.content')}</label>
                            <input type="text" name="content" className="form-control" required
                                value={this.state.content} onChange={this.onInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="face">{t('masu.stepCAddText.face')}</label>
                            <select className="form-select" name="face" required
                                value={this.state.face} onChange={this.onInputChange}>
                                <option value="front">{t('masu.face.front')}</option>
                                <option value="back">{t('masu.face.back')}</option>
                                <option value="left">{t('masu.face.left')}</option>
                                <option value="right">{t('masu.face.right')}</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="family">{t('masu.stepCAddText.family')}</label>
                            <input type="text" name="family" className="form-control"
                                value={this.state.family} onChange={this.onInputChange} placeholder="Open Sans" />
                            <div className="text-muted">{t('masu.stepCAddText.familyExplanation')}</div>
                        </div>
                        <div className="mb-3 mt-5 d-flex">
                            <Link className="btn btn-link" to="/back">{t('masu.stepCAddText.cancel')}</Link>
                            <button type="submit" className="btn btn-primary ms-auto">{t('masu.stepCAddText.submit')}</button>
                            {this.state.redirect &&
                                <Redirect to='/back' />
                            }
                        </div>
                    </form>
                </div>
                <div className="col-md-6 col-lg-8 mb-3">
                    <MasuTemplate side="back" detail={this.props.box} text={this.state} />
                </div>
            </div>
        );
    }
}

export default withTranslation()(connect(state => getMasu(state), { addText })(StepCAddText));
