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
            {this.props.withBackDesign &&
              <FormDetail title={t('masu.box.title')} block={this.props.box} />
            }
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
                <a className="nav-link active" id="front-tab" data-bs-toggle="tab" href="#front" role="tab"
                  aria-controls="front" aria-selected="true">{t('masu.front')}</a>
              </li>
              {this.props.withBackDesign &&
                <li className="nav-item" role="presentation">
                  <a className="nav-link" id="back-tab" data-bs-toggle="tab" href="#back" role="tab"
                    aria-controls="back" aria-selected="false">{t('masu.back')}</a>
                </li>
              }
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="front" role="tabpanel" aria-labelledby="front-tab">
                <MasuTemplate side="front" detail={this.props.box} />
              </div>
              {this.props.withBackDesign &&
                <div className="tab-pane fade" id="back" role="tabpanel" aria-labelledby="back-tab">
                  <MasuTemplate side="back" detail={this.props.box} />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(connect(state => getMasu(state))(Masu));
