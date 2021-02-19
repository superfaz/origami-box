import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getMasu } from "../store";
import { addImage } from "./reducer";
import MasuTemplateBack from "./MasuTemplateBack";
import Nav from "./Nav";
import { loadImageAsync } from "./helper";

export default function StepDImage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const masu = useSelector(getMasu);
  const [redirect, setRedirect] = useState(false);
  const [state, setState] = useState({
    content: null,
    originalWidth: null,
    originalHeight: null,
    face: 'front',
    size: 'auto',
    width: '',
    height: '',
    horizontal: 'center',
    vertical: 'middle',
  });

  function handleInputChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handleSizeChange(event) {
    const checked = event.target.checked;
    setState({ ...state, size: checked ? 'auto' : 'manual' });
  }

  function handleImageChange(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        loadImageAsync(reader.result)
          .then(img => {
            setState({ ...state, content: reader.result, originalWidth: img.width, originalHeight: img.height });
          })
          .catch(error => {
            console.error("Can't load properly the image", error);
            setState({ ...state, content: null, originalWidth: null, originalHeight: null });
          });
      };

      reader.readAsDataURL(event.target.files[0]);
    }
    else {
      setState({ ...state, content: null, originalWidth: null, originalHeight: null });
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch(addImage('box', state));
    setRedirect(true);
  }

  return (
    <div className="row">
      <Nav />
      <div className="col-md-6 col-lg-4 mb-3">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="content">{t('masu.stepDImage.content')}</label>
            <input className="form-control" type="file" name="content" id="content"
              accept="image/png, image/jpeg, image/svg+xml" required
              onChange={handleImageChange} />
          </div>
          <div className="mb-3">
            <label>{t('masu.stepDImage.size')}</label>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="size" name="size"
                checked={state.size === 'auto'} onChange={handleSizeChange} />
              <label className="form-check-label" htmlFor="size">{t('masu.stepDImage.sizeAuto')}</label>
            </div>
            <div className="input-group">
              <input type="number" className="form-control" name="width" placeholder={t('masu.stepDImage.width')}
                disabled={state.size === 'auto'} required={state.size === 'manual'}
                value={state.width} onChange={handleInputChange} />
              <input type="number" className="form-control" name="height" placeholder={t('masu.stepDImage.height')}
                disabled={state.size === 'auto'} required={state.size === 'manual'}
                value={state.height} onChange={handleInputChange} />
            </div>
          </div>
          <fieldset>
            <legend>{t('masu.stepDImage.positioning')}</legend>
            <div className="mb-3">
              <label htmlFor="face">{t('masu.stepDImage.face')}</label>
              <select className="form-select" name="face" required
                value={state.face} onChange={handleInputChange}>
                <option value="front">{t('masu.face.front')}</option>
                <option value="back">{t('masu.face.back')}</option>
                <option value="left">{t('masu.face.left')}</option>
                <option value="right">{t('masu.face.right')}</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="horizontal">{t('masu.stepDImage.horizontal')}</label>
              <div className="input-group">
                <select className="form-select" name="horizontal" required
                  value={state.horizontal} onChange={handleInputChange}>
                  <option value="left">{t('masu.horizontal.left')}</option>
                  <option value="center">{t('masu.horizontal.center')}</option>
                  <option value="right">{t('masu.horizontal.right')}</option>
                </select>
                <select className="form-select" name="vertical" required
                  value={state.vertical} onChange={handleInputChange}>
                  <option value="top">{t('masu.vertical.top')}</option>
                  <option value="middle">{t('masu.vertical.middle')}</option>
                  <option value="bottom">{t('masu.vertical.bottom')}</option>
                </select>
              </div>
            </div>
          </fieldset>
          <div className="mb-3 mt-5 d-flex">
            <Link className="btn btn-link" to="/back">{t('masu.stepDImage.cancel')}</Link>
            <button type="submit" className="btn btn-primary ms-auto">{t('masu.stepDImage.submit')}</button>
            {redirect &&
              <Redirect to='/back' />
            }
          </div>
        </form>
      </div>
      <div className="col-md-6 col-lg-8 mb-3">
        <MasuTemplateBack detail={masu.box} image={state} />
      </div>
    </div>
  );
}
