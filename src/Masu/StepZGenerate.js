import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { updateGeneral } from './reducer';
import { getMasu } from '../store';
import classNames from 'classnames/dedupe';
import MasuTemplate from './MasuTemplate';
import Nav from './Nav';
import { getFonts } from './helper';

class StepZGenerate extends React.Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.print = this.print.bind(this);
    }

    print() {
        let newWindow = window.open('empty.html', '_blank');
        newWindow.onload = () => {
            newWindow.document.head.innerHTML = `
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <style>
            * {
                margin: 0;
                padding: 0;
                font-family: 'Open Sans', sans-serif;
                font-weight: 400;
            }
            @media print {
                @page {
                    size: A4;
                    margin: 0;
                }
            </style>`;

            let templates = document.getElementsByClassName("template");
            for (let index = 0; index < templates.length; index++) {
                const template = templates[index];
                newWindow.document.body.innerHTML += template.outerHTML;
            }

            let fonts = getFonts(this.props)
                .map(f => 'family=' + f.replace(' ', '+'))
                .join('&');
            let link = newWindow.document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `https://fonts.googleapis.com/css2?${fonts}&display=block`;
            link.onload = () => {
                // setTimeout used to ensure rendering before print
                setTimeout(() => {
                    newWindow.print();
                    newWindow.close();
                }, 1);
            }

            newWindow.document.head.appendChild(link);
        };
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
                <Nav />
                <div className="col-md-6 col-lg-4 mb-3">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="pageFormat" className="form-label">{t('masu.format.label')}</label>
                            <select name="pageFormat" className="form-select" value={this.props.pageFormat} onChange={this.handleInputChange}>
                                <option value="A4-p">{t('masu.format.A4')}</option>
                            </select>
                        </div>
                        <div className="mb-3 mt-5 d-flex">
                            <button type="button" className="btn btn-primary ms-auto" onClick={this.print}>{t('masu.stepZGenerate.print')}</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-6 col-lg-8 mb-3">
                    {this.props.withBackDesign &&
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <MasuTemplate key="front" side="front" detail={this.props.box} print="true" />
                            </div>
                            <div className="col-12 col-lg-6">
                                <MasuTemplate key="back" side="back" detail={this.props.box} print="true" />
                            </div>
                        </div>
                    }
                    {!this.props.withBackDesign &&
                        <MasuTemplate side="front" detail={this.props.box} print="true" />
                    }
                </div>
            </div>
        );
    }
}

export default withTranslation()(connect(state => getMasu(state), { updateGeneral })(StepZGenerate));
