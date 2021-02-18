import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addText } from './reducer';
import MasuTemplateBack from './MasuTemplateBack';
import Nav from './Nav';
import { getMasu } from '../store';
import ColorPicker from '../ColorPicker';

export default function StepCBoxText(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const masu = useSelector(getMasu);
  const [redirect, setRedirect] = useState(false);
  const [state, setState] = useState({
    content: '',
    face: 'front',
    horizontal: 'center',
    vertical: 'middle',
    marginHorizontal: 2,
    marginVertical: 2,
    family: '',
    size: 8,
    color: 'black',
  });

  function onInputChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function onColorChange(color) {
    setState({ ...state, color: color.hex });
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
            <div className="mb-3">
              <label htmlFor="horizontal">{t('masu.stepCAddText.horizontal')}</label>
              <div className="input-group">
                <select className="form-select" name="horizontal" required
                  value={state.horizontal} onChange={onInputChange}>
                  <option value="left">{t('masu.horizontal.left')}</option>
                  <option value="center">{t('masu.horizontal.center')}</option>
                  <option value="right">{t('masu.horizontal.right')}</option>
                </select>
                <select className="form-select" name="vertical" required
                  value={state.vertical} onChange={onInputChange}>
                  <option value="top">{t('masu.vertical.top')}</option>
                  <option value="middle">{t('masu.vertical.middle')}</option>
                  <option value="bottom">{t('masu.vertical.bottom')}</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="marginHorizontal">{t('masu.stepCAddText.margins')}</label>
              <div className="input-group">
                <input type="number" name="marginHorizontal" className="form-control" required
                  value={state.marginHorizontal} onChange={onInputChange} />
                <input type="number" name="marginVertical" className="form-control" required
                  value={state.marginVertical} onChange={onInputChange} />
              </div>
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
                <ColorPicker name="color" style={{ maxWidth: '3rem' }}
                  color={state.color} onColorChange={onColorChange} />
                <input type="number" name="size" className="form-control" style={{ maxWidth: '4.5rem' }}
                  value={state.size} required min="1" onChange={onInputChange} placeholder="8" />
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
        <MasuTemplateBack detail={masu.box} text={state} />
      </div>
    </div>
  );
}
