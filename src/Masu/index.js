import React from 'react';
import { jsPDF } from 'jspdf';
import { withTranslation } from 'react-i18next';
import MasuTemplate from './MasuTemplate.js';
import FormGeneral from './FormGeneral.js';

class Masu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageFormat: 'A4-p',
      pageLength: 297,
      pageWidth: 210,
      length: 60,
      width: 30,
      height: 10,
      withLid: false,
      frontText: '',
      background: '#8ED1FC',
      frontText2: '',
      background2: '#8ED1FC',
    };

    this.updatePageFormat = this.updatePageFormat.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.generatePdf = this.generatePdf.bind(this);
  }

  updatePageFormat() {
    if (this.state.pageFormat === 'A4-p') {
      this.setState({ pageLength: 210, pageWidth: 297 });
    }
    else {
      this.setState({ pageLength: 297, pageWidth: 210 });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if (name === 'pageFormat') {
      this.updatePageFormat();
    }
  }

  generatePdf() {
    var orientation = this.state.pageFormat === 'A4-p' ? 'p' : 'l';
    const pdf = new jsPDF(orientation, 'mm', 'A4');

    const l = parseFloat(this.state.length);
    const w = parseFloat(this.state.width);
    const h = parseFloat(this.state.height);

    const max = l + 0.0 + w + 4.0 * h;

    const l_2 = l / 2.0;
    const w_2 = w / 2.0;
    const max_2 = max / 2.0;

    const h2 = h * 2.0;

    const translation = "1 0 0 1 " + (this.state.pageWidth / 2.0) + " " + (this.state.pageLength / 2.0);
    const cos = Math.cos(45 * Math.PI / 180);
    const sin = Math.sin(45 * Math.PI / 180);

    // Recto
    pdf.advancedAPI(pdf => {
      pdf.setCurrentTransformationMatrix(translation);
      pdf.setCurrentTransformationMatrix(`${cos} ${sin} ${-sin} ${cos} 0 0`);
      pdf.setDrawColor('#000000');

      // Cut
      pdf.setLineWidth(0.2);
      pdf.lines([[max_2, max_2], [-max_2, max_2], [-max_2, -max_2], [max_2, -max_2]], 0, -max_2)
        .stroke();

      // Flip
      pdf.setLineDashPattern([4, 2]);
      pdf.line(-w_2 - h, -l_2 - h, w_2 + h, -l_2 - h);
      pdf.line(-w_2 - h2, -l_2, w_2 + h2, -l_2);
      pdf.line(-w_2 - h2, l_2, w_2 + h2, l_2);
      pdf.line(-w_2 - h, l_2 + h, w_2 + h, l_2 + h);
      pdf.line(-w_2 - h, -l_2 - h, -w_2 - h, l_2 + h);
      pdf.line(-w_2, -l_2 - h2, -w_2, l_2 + h2);
      pdf.line(w_2, -l_2 - h2, w_2, l_2 + h2);
      pdf.line(w_2 + h, -l_2 - h, w_2 + h, l_2 + h);

      // Inverted
      pdf.setLineDashPattern([2, 4]);
      pdf.line(-w_2, -l_2 - h2, w_2, -l_2 - h2);
      pdf.line(-w_2, l_2 + h2, w_2, l_2 + h2);
      pdf.line(-w_2 - h2, -l_2, -w_2 - h2, l_2);
      pdf.line(w_2 + h2, -l_2, w_2 + h2, l_2);
      pdf.line(-w_2 - h, -l_2 - h, -w_2, -l_2);
      pdf.line(w_2 + h, -l_2 - h, w_2, -l_2);
      pdf.line(-w_2 - h, l_2 + h, -w_2, l_2);
      pdf.line(w_2 + h, l_2 + h, w_2, l_2);
    });

    // Verso
    pdf.addPage(orientation, 'mm', 'A4');
    pdf.advancedAPI(pdf => {
      pdf.setCurrentTransformationMatrix(translation);
      pdf.setCurrentTransformationMatrix(`${cos} ${-sin} ${sin} ${cos} 0 0`);

      // Background
      if (this.state.background !== null) {
        pdf.setFillColor(this.state.background);
        pdf.lines([[max_2 + 5, max_2 + 5], [-max_2 - 5, max_2 + 5], [-max_2 - 5, -max_2 - 5], [max_2 + 5, -max_2 - 5]], 0, -max_2 - 5, [1, 1], 'F');
      }

      // Text
      if (this.state.frontText != null) {
        pdf.setFontSize(8 * 72 / 25.4);
        pdf.text(this.state.frontText, 0, l_2 + h / 2, { align: 'center', baseline: 'middle' });
      }
    });

    pdf.save('test.pdf');
  }

  render() {
    const { t } = this.props;
    return (
      <div className="container">
        <h1>{t('masu.title')}</h1>
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-3">
            <FormGeneral masu={this.state} onInputChange={this.handleInputChange} />
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
                <MasuTemplate side="recto"
                  pageLength={this.state.pageLength}
                  pageWidth={this.state.pageWidth}
                  length={this.state.length}
                  width={this.state.width}
                  height={this.state.height} />
              </div>
              <div className="tab-pane fade" id="verso" role="tabpanel" aria-labelledby="verso-tab">
                <MasuTemplate side="verso"
                  pageLength={this.state.pageLength}
                  pageWidth={this.state.pageWidth}
                  length={this.state.length}
                  width={this.state.width}
                  height={this.state.height}
                  frontText={this.state.frontText}
                  background={this.state.background} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Masu);
