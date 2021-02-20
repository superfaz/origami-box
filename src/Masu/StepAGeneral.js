import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/dedupe';
import { getMasu } from '../store';
import { LeftForm, RightPreview } from '../Generic/Grid';
import { updateGeneral } from './reducer';
import Nav from './Nav';
import MasuTemplateFront from './MasuTemplateFront';
import { checkValidity } from './helper';

export default function StepAGeneral() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [valid, setValid] = useState(false);
  const form = useRef(null);
  const masu = useSelector(getMasu);

  useEffect(() => {
    setValid(form.current.checkValidity());
  });

  function handleInputChange(event) {
    const value = checkValidity(event.target);
    dispatch(updateGeneral(event.target.name, value));
  }

  function handleCheckedChange(event) {
    dispatch(updateGeneral(event.target.name, event.target.checked));
  }

  return (
    <div className="row">
      <Nav />
      <LeftForm>
        <form ref={form} noValidate>
          <div className="mb-3">
            <label htmlFor="length" className="form-label">{t('masu.dimensions.label')}</label>
            <div className="input-group">
              <input name="length" type="number" className="form-control" style={{ width: 'calc(100%/3)' }}
                autoFocus required min="1" placeholder={t('masu.dimensions.length')} aria-label={t('masu.dimensions.length')}
                value={masu.length} onChange={handleInputChange} />
              <input name="width" type="number" className="form-control" style={{ width: 'calc(100%/3)' }}
                required min="1" placeholder={t('masu.dimensions.width')} aria-label={t('masu.dimensions.width')}
                value={masu.width} onChange={handleInputChange} />
              <input name="height" type="number" className="form-control" style={{ width: 'calc(100%/3)' }}
                required min="1" placeholder={t('masu.dimensions.height')} aria-label={t('masu.dimensions.height')}
                value={masu.height} onChange={handleInputChange} />
            </div>
          </div>
          <div className="mb-3">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="withBackDesign" name="withBackDesign"
                checked={masu.withBackDesign} onChange={handleCheckedChange} />
              <label className="form-check-label" htmlFor="withBackDesign">{t('masu.withBackDesign')}</label>
            </div>
          </div>
          <div className="mb-3 d-none">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="withLid" name="withLid"
                checked={masu.withLid} onChange={handleCheckedChange} />
              <label className="form-check-label" htmlFor="withLid">{t('masu.withLid')}</label>
            </div>
          </div>
          <div className="mb-3 mt-5 d-flex">
            {masu.withBackDesign &&
              <Link className={classNames("btn btn-primary ms-auto", { "disabled": !valid })} to="/back">{t('masu.stepBBoxDesign.linkTo')}</Link>
            }
            {!masu.withBackDesign &&
              <Link className={classNames("btn btn-primary ms-auto", { "disabled": !valid })} to="/generate">{t('masu.stepZGenerate.linkTo')}</Link>
            }
          </div>
        </form>
      </LeftForm>
      <RightPreview>
        <MasuTemplateFront />
      </RightPreview>
    </div>
  );
}
