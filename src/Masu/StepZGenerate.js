import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ReactJson from 'react-json-view';
import { getMasu } from '../store';
import { LeftForm, RightPreview } from '../Generic/Grid';
import { updateGeneral } from './reducer';
import { getFonts } from './selectors';
import Nav from './Nav';
import MasuTemplateFront from './MasuTemplateFront';
import MasuTemplateBack from './MasuTemplateBack';
import { checkValidity } from './helper';

export default function StepZGenerate() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const masu = useSelector(getMasu);

  function print() {
    let newWindow = window.open('/empty.html', '_blank');
    newWindow.onload = () => {
      newWindow.document.head.innerHTML = `
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <style>
        :not(tspan) {
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

      const fonts = getFonts(masu)
        .map(f => 'family=' + f.replace(' ', '+'))
        .join('&');
      if (fonts !== '') {
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
      }
      else {
        // setTimeout used to ensure rendering before print
        setTimeout(() => {
          newWindow.print();
          newWindow.close();
        }, 1);
      }
    };
  }

  function handleInputChange(event) {
    const value = checkValidity(event.target);
    dispatch(updateGeneral(event.target.name, value));
  }

  return (
    <div className="row">
      <Nav />
      <LeftForm>
        <form>
          <div className="mb-3">
            <label htmlFor="pageFormat" className="form-label">{t('masu.format.label')}</label>
            <select name="pageFormat" className="form-select" value={masu.pageFormat} onChange={handleInputChange}>
              <option value="A4">{t('masu.format.A4')}</option>
            </select>
          </div>
          <div className="mb-3 mt-5 d-flex">
            <button type="button" className="btn btn-primary ms-auto" onClick={print}>{t('masu.stepZGenerate.print')}</button>
          </div>
        </form>
        {process.env.REACT_APP_JSON_DEBUG &&
          <div className="mb-3">
            <ReactJson src={masu} name="masu" />
          </div>
        }
      </LeftForm>
      <RightPreview>
        <div className="row">
          <div className="col-12 col-lg-6 mb-3">
            <MasuTemplateFront print="true" />
          </div>
          {masu.withDesign &&
            <div className="col-12 col-lg-6 mb-3">
              <MasuTemplateBack print="true" />
            </div>
          }
          {masu.withLid &&
            <div className="col-12 col-lg-6 mb-3">
              <MasuTemplateFront lid print="true" />
            </div>
          }
          {masu.withLid && masu.withDesign &&
            <div className="col-12 col-lg-6 mb-3">
              <MasuTemplateBack lid print="true" />
            </div>
          }
        </div>
      </RightPreview>
    </div>
  );
}
