import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TwitterPicker } from 'react-color';
import { LeftForm, RightPreview } from '../Generic/Grid';
import { updateDetail, deleteText, deleteImage } from './reducer';
import MasuTemplateBack from './MasuTemplateBack';
import Nav from './Nav';
import { getMasu } from '../store';

export default function StepBBoxDesign({ block }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const masu = useSelector(getMasu);

  function handleBackgroundColorChange(color) {
    dispatch(updateDetail(block.key, 'background', color.hex));
  }

  function handleBackgroundImageChange(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateDetail(block.key, 'backgroundImage', reader.result));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    else {
      dispatch(updateDetail(block.key, 'backgroundImage', null));
    }
  }

  function handleTextDelete(key) {
    dispatch(deleteText(block.key, key));
  }

  function handleImageDelete(key) {
    dispatch(deleteImage(block.key, key));
  }

  return (
    <div className="row">
      <Nav />
      <LeftForm>
        <div className="mb-3">
          <label htmlFor="backgroundColor" className="form-label">{t('masu.stepBBoxDesign.backgroundColor')}</label>
          <TwitterPicker name="backgroundColor" triangle="hide" width="312px"
            colors={['#000000', '#FFFFFF', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
            color={block.background} onChangeComplete={handleBackgroundColorChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="backgroundImage" className="form-label">{t('masu.stepBBoxDesign.backgroundImage')}</label>
          <input className="form-control" type="file" name="backgroundImage" id="backgroundImage" accept="image/png, image/jpeg, image/svg+xml"
            onChange={handleBackgroundImageChange} />
        </div>
        <div className="mb-3">
          <table className="table">
            <thead>
              <tr>
                <th>{t('masu.stepBBoxDesign.textContent')}</th>
                <th>{t('masu.stepBBoxDesign.textFace')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(block.texts).map(key =>
                <tr key={key} className="align-middle">
                  <td>{block.texts[key].content}</td>
                  <td>{t(`masu.face.${block.texts[key].face}`)}</td>
                  <td className="text-end">
                    <button className="btn btn-outline-danger btn-sm"
                      onClick={() => handleTextDelete(key)} title={t('masu.stepBBoxDesign.textDelete')}>
                      <i className="fas fa-times"></i>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="d-flex">
            <Link className="btn btn-outline-primary" to="/back/text">{t('masu.stepCAddText.linkTo')}</Link>
          </div>
        </div>
        <div className="mb-3">
          <table className="table">
            <thead>
              <tr>
                <th>{t('masu.stepBBoxDesign.imageContent')}</th>
                <th>{t('masu.stepBBoxDesign.imageFace')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(block.images).map(key =>
                <tr key={key} className="align-middle">
                  <td><img src={block.images[key].content} style={{ height: '2rem' }} /></td>
                  <td>{t(`masu.face.${block.images[key].face}`)}</td>
                  <td className="text-end">
                    <button className="btn btn-outline-danger btn-sm"
                      onClick={() => handleImageDelete(key)} title={t('masu.stepBBoxDesign.imageDelete')}>
                      <i className="fas fa-times"></i>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="d-flex">
            <Link className="btn btn-outline-primary" to="/back/image">{t('masu.stepDImage.linkTo')}</Link>
          </div>
        </div>
        <div className="mb-3 mt-5 d-flex">
          {masu.withLid &&
            <Link className="btn btn-primary ms-auto" to="/lid">{t('masu.stepELidDesign.linkTo')}</Link>
          }
          {!masu.withLid &&
            <Link className="btn btn-primary ms-auto" to="/generate">{t('masu.stepZGenerate.linkTo')}</Link>
          }
        </div>
      </LeftForm>
      <RightPreview>
        <MasuTemplateBack detail={block} />
      </RightPreview>
    </div>
  );
}
