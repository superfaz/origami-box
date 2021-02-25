import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { getMasu } from '../store';
import ColorPicker from '../Generic/ColorPicker';
import { LeftForm, RightPreview } from '../Generic/Grid';
import { updateDetail, deleteText, deleteImage } from './reducer';
import MasuTemplateBack from './MasuTemplateBack';
import Nav from './Nav';

export default function StepBDesign({ lid = false }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const masu = useSelector(getMasu);
  const { url } = useRouteMatch();
  const block = lid ? masu.lid : masu.base;

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
          <label htmlFor="backgroundColor" className="form-label">{t('masu.stepBDesign.backgroundColor')}</label>
          <ColorPicker name="backgroundColor" style={{ maxWidth: '3rem' }}
            color={block.background} onColorChange={handleBackgroundColorChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="backgroundImage" className="form-label">{t('masu.stepBDesign.backgroundImage')}</label>
          <input className="form-control" type="file" name="backgroundImage" id="backgroundImage" accept="image/png, image/jpeg, image/svg+xml"
            onChange={handleBackgroundImageChange} />
        </div>
        <div className="mb-3">
          <table className="table">
            <thead>
              <tr>
                <th>{t('masu.stepBDesign.textContent')}</th>
                <th>{t('masu.stepBDesign.textFace')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(block.texts).map(key =>
                <tr key={key} className="align-middle">
                  <td>{block.texts[key].content.split('\n')
                    .map((line, index) => {
                      return <div key={index}>{line}</div>;
                    })
                  }</td>
                  <td>{t(`masu.face.${block.texts[key].face}`)}</td>
                  <td className="text-end">
                    <Link className="btn btn-outline-primary ms-1 btn-sm" title={t('masu.stepBDesign.textEdit')}
                      to={`${url}/text/${key}`}>
                      <i className="fas fa-pen" style={{ width: '14px' }}></i>
                    </Link>
                    <button className="btn btn-outline-danger ms-1 btn-sm" title={t('masu.stepBDesign.textDelete')}
                      onClick={() => handleTextDelete(key)}>
                      <i className="fas fa-times" style={{ width: '14px' }}></i>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="d-flex">
            <Link className="btn btn-outline-primary" to={`${url}/text`}>{t('masu.stepCText.linkTo')}</Link>
          </div>
        </div>
        <div className="mb-3">
          <table className="table">
            <thead>
              <tr>
                <th>{t('masu.stepBDesign.imageContent')}</th>
                <th>{t('masu.stepBDesign.imageFace')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(block.images).map(key =>
                <tr key={key} className="align-middle">
                  <td><img alt="" src={block.images[key].content} style={{ height: '2rem' }} /></td>
                  <td>{t(`masu.face.${block.images[key].face}`)}</td>
                  <td className="text-end">
                    <Link className="btn btn-outline-primary ms-1 btn-sm" title={t('masu.stepBDesign.imageEdit')}
                      to={`${url}/image/${key}`}>
                      <i className="fas fa-pen" style={{ width: '14px' }}></i>
                    </Link>
                    <button className="btn btn-outline-danger ms-1 btn-sm" title={t('masu.stepBDesign.imageDelete')}
                      onClick={() => handleImageDelete(key)}>
                      <i className="fas fa-times" style={{ width: '14px' }}></i>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="d-flex">
            <Link className="btn btn-outline-primary" to={`${url}/image`}>{t('masu.stepDImage.linkTo')}</Link>
          </div>
        </div>
        <div className="mb-3 mt-5 d-flex">
          {!lid && masu.withLid &&
            <Link className="btn btn-primary ms-auto" to={`/masu/lid`}>{t('masu.stepBDesign.lid.linkTo')}</Link>
          }
          {(lid || !masu.withLid) &&
            <Link className="btn btn-primary ms-auto" to={`/masu/generate`}>{t('masu.stepZGenerate.linkTo')}</Link>
          }
        </div>
      </LeftForm>
      <RightPreview>
        <MasuTemplateBack lid={lid} />
      </RightPreview>
    </div>
  );
}
