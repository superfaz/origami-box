import React from 'react';
import { getMasu } from '../store';
import { Link, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import MasuTemplate from './MasuTemplate';
import { connect } from 'react-redux';
import { addText } from './reducer';

class StepCAddText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            content: '',
            face: 'front',
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.addText('box', this.state.content, this.state.face);
        this.setState({ redirect: true })
    }

    render() {
        const { t } = this.props;
        return (
            <div className="row">
                <div className="col-md-6 col-lg-4 mb-3">
                    <h4>{t('masu.stepCAddText.title')}</h4>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="content">Content</label>
                            <input type="text" name="content" className="form-control" required
                                value={this.state.content} onChange={this.onInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="face">Face</label>
                            <select className="form-control" name="face" required
                                value={this.state.face} onChange={this.onInputChange}>
                                <option value="front">Front</option>
                                <option value="back">Back</option>
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                            </select>
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
