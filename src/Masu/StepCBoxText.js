import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addText } from './reducer';
import MasuTemplate from './MasuTemplate';
import Nav from './Nav';
import { getMasu } from '../store';

export default function StepCBoxText(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const masu = useSelector(getMasu);
  const [redirect, setRedirect] = useState(false);
  const [state, setState] = useState({
    content: '',
    face: 'front',
    family: '',
    size: 8,
  });

  function onInputChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch(addText('box', state));
    setRedirect(true);
  }

  return (
    <div className="row">
      <Nav />
      <div className="col-md-6 col-lg-4 mb-3">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="content">{t('masu.stepCAddText.content')}</label>
            <input type="text" name="content" className="form-control" required
              value={state.content} onChange={onInputChange} />
          </div>
          <fieldset>
            <legend>{t('masu.stepCAddText.positioning')}</legend>
            <div className="mb-3">
              <label htmlFor="face">{t('masu.stepCAddText.face')}</label>
              <select className="form-select" name="face" required
                value={state.face} onChange={onInputChange}>
                <option value="front">{t('masu.face.front')}</option>
                <option value="back">{t('masu.face.back')}</option>
                <option value="left">{t('masu.face.left')}</option>
                <option value="right">{t('masu.face.right')}</option>
              </select>
            </div>
          </fieldset>
          <fieldset>
            <legend>{t('masu.stepCAddText.font')}</legend>
            <div className="mb-3">
              <div className="d-flex">
                <label htmlFor="family">{t('masu.stepCAddText.family')}</label>
                <label htmlFor="size" className="ms-auto" style={{ width: '4.5rem' }}>{t('masu.stepCAddText.size')}</label>
              </div>
              <div className="input-group">
                <input type="text" name="family" className="form-control"
                  value={state.family} onChange={onInputChange} placeholder="Open Sans" />
                <input type="number" name="size" className="form-control" style={{ maxWidth: '4.5rem' }}
                  value={state.size} onChange={onInputChange} placeholder="8" />
              </div>
              <div className="text-muted">{t('masu.stepCAddText.familyExplanation')}</div>
            </div>
          </fieldset>
          <div className="mb-3 mt-5 d-flex">
            <Link className="btn btn-link" to="/back">{t('masu.stepCAddText.cancel')}</Link>
            <button type="submit" className="btn btn-primary ms-auto">{t('masu.stepCAddText.submit')}</button>
            {redirect &&
              <Redirect to='/back' />
            }
          </div>
        </form>
      </div>
      <div className="col-md-6 col-lg-8 mb-3">
        <MasuTemplate side="back" detail={masu.box} text={state} />
      </div>
    </div>
  );
}
