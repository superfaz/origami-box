import React from 'react';
import { withTranslation } from 'react-i18next';
import MasuTemplate from './MasuTemplate';
import FormGeneral from './FormGeneral';
import FormDetail from './FormDetail';
import { connect } from 'react-redux';
import { getMasu } from '../store';
import generatePdf from './generatePdf';

class Masu extends React.Component {
  constructor(props) {
    super(props);

    this.onGeneratePdf = this.onGeneratePdf.bind(this);
  }

  onGeneratePdf() {
    generatePdf(this.props);
  }

  render() {
    const { t } = this.props;
    return (
      <div className="container">
        <h1>{t('masu.title')}</h1>
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-3">
            <FormGeneral />
            <FormDetail title={t('masu.box.title')} block={this.props.box} />
            {this.props.withLid &&
              <FormDetail title={t('masu.lid.title')} block={this.props.lid} />
            }
            <div className="mb-6">
              <button type="button" className="btn btn-primary" onClick={this.onGeneratePdf}>{t('masu.generatePDF')}</button>
            </div>
          </div>
          <div className="col-md-6 col-lg-8">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item" role="presentation">
                <a className="nav-link active" id="recto-tab" data-bs-toggle="tab" href="#recto" role="tab"
                  aria-controls="recto" aria-selected="true">{t('masu.recto')}</a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link" id="verso-tab" data-bs-toggle="tab" href="#verso" role="tab"
                  aria-controls="verso" aria-selected="false">{t('masu.verso')}</a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="recto" role="tabpanel" aria-labelledby="recto-tab">
                <MasuTemplate side="recto" detail={this.props.box} />
              </div>
              <div className="tab-pane fade" id="verso" role="tabpanel" aria-labelledby="verso-tab">
                <MasuTemplate side="verso" detail={this.props.box} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(connect(state => getMasu(state))(Masu));
