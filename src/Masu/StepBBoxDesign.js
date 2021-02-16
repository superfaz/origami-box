import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateDetail, deleteText } from './reducer';
import { TwitterPicker } from 'react-color';
import MasuTemplate from './MasuTemplate';
import { Link } from 'react-router-dom';
import Nav from './Nav';

export default function StepBBoxDesign(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { block } = props;

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

  function handleDelete(key) {
    dispatch(deleteText(block.key, key));
  }

  return (
    <div className="row">
      <Nav />
      <div className="col-md-6 col-lg-4 mb-3">
        <div className="mb-3">
          <label htmlFor="backgroundColor" className="form-label">{t('masu.stepBBoxDesign.backgroundColor')}</label>
          <TwitterPicker name="backgroundColor" triangle="hide" width="312px"
            colors={['#000000', '#FFFFFF', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
            color={block.background} onChangeComplete={handleBackgroundColorChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="backgroundImage" className="form-label">{t('masu.stepBBoxDesign.backgroundImage')}</label>
          <input className="form-control" type="file" name="backgroundImage" id="backgroundImage" accept="image/png, image/jpeg"
            onChange={handleBackgroundImageChange} />
        </div>
        <div className="mb-3">
          {block.texts.length !== 0 &&
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
                        onClick={() => handleDelete(key)} title={t('masu.stepBBoxDesign.textDelete')}>
                        <i className="fas fa-times"></i>
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          }
          {block.texts.length === 0 &&
            <div className="mb-5"></div>
          }
          <div className="d-flex">
            <Link className="btn btn-outline-primary" to="/back/text">{t('masu.stepCAddText.linkTo')}</Link>
          </div>
        </div>
        <div className="mb-3 mt-5 d-flex">
          <Link className="btn btn-primary ms-auto" to="/generate">{t('masu.stepZGenerate.linkTo')}</Link>
        </div>
      </div>
      <div className="col-md-6 col-lg-8 mb-3">
        <MasuTemplate side="back" detail={block} />
      </div>
    </div>
  );
}
