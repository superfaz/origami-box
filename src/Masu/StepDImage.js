import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getMasu } from "../store";
import { addImage } from "./reducer";
import MasuTemplate from "./MasuTemplate";
import Nav from "./Nav";

export default function StepDImage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const masu = useSelector(getMasu);
  const [redirect, setRedirect] = useState(false);
  const [state, setState] = useState({
    content: null,
    face: 'front',
  });

  function handleInputChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handleImageChange(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState({ ...state, [event.target.name]: reader.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    else {
      setState({ ...state, [event.target.name]: null });
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
              accept="image/png, image/jpeg" required
              onChange={handleImageChange} />
          </div>
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
        <MasuTemplate side="back" detail={masu.box} image={state} />
      </div>
    </div>
  );
}
