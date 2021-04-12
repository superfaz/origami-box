import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { LeftForm, RightPreview } from "../Generic/Grid";
import { useTemplate } from "../hooks";
import objectMap from "../objectMap";
import { updateDetail, deleteText, deleteImage } from "../store/templates";
import BaggiTemplateRecto from "./BaggiTemplateRecto";

export default function StepBlock() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { templateKey, block } = useParams();
  const { blockData } = useTemplate();
  const baseUrl = "/edit/" + templateKey;

  function handleColorChange(event) {
    dispatch(
      updateDetail(templateKey, block, event.target.name, event.target.value)
    );
  }

  function handleImageChange(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          updateDetail(templateKey, block, event.target.name, reader.result)
        );
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      dispatch(updateDetail(templateKey, block, event.target.name, null));
    }
  }

  function handleTextDelete(key) {
    dispatch(deleteText(templateKey, block, key));
  }

  function handleImageDelete(key) {
    dispatch(deleteImage(templateKey, block, key));
  }

  return (
    <>
      <LeftForm>
        <fieldset className="mb-3">
          <legend>{t("baggi:stepDesign.recto")}</legend>
          <div className="d-flex">
            <label htmlFor="rectoImage" className="form-label">
              {t("baggi:stepDesign.backgroundImage")}
            </label>
            <label
              htmlFor="rectoColor"
              className="form-label ms-auto"
              style={{ minWidth: "3rem" }}
            >
              {t("baggi:stepDesign.backgroundColor")}
            </label>
          </div>
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="file"
              name="rectoImage"
              id="rectoImage"
              accept="image/png, image/jpeg, image/svg+xml"
              onChange={handleImageChange}
            />
            <input
              className="form-control form-control-color"
              type="color"
              name="rectoColor"
              value={blockData.rectoColor || "#ffffff"}
              onChange={handleColorChange}
            />
          </div>
        </fieldset>

        <fieldset className="mb-3">
          <legend>{t("baggi:stepDesign.verso")}</legend>
          <div className="d-flex">
            <label htmlFor="versoImage" className="form-label">
              {t("baggi:stepDesign.backgroundImage")}
            </label>
            <label
              htmlFor="versoColor"
              className="form-label ms-auto"
              style={{ minWidth: "3rem" }}
            >
              {t("baggi:stepDesign.backgroundColor")}
            </label>
          </div>
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="file"
              name="versoImage"
              id="versoImage"
              accept="image/png, image/jpeg, image/svg+xml"
              onChange={handleImageChange}
            />
            <input
              className="form-control form-control-color"
              type="color"
              name="versoColor"
              value={blockData.versoColor || "#ffffff"}
              onChange={handleColorChange}
            />
          </div>
        </fieldset>

        <div className="mb-3">
          <table className="table">
            <thead>
              <tr>
                <th>{t("stepDesign.textContent")}</th>
                <th>{t("stepDesign.textFace")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {objectMap(blockData.texts, (text, key) => (
                <tr key={key} className="align-middle">
                  <td>
                    {text.content.split("\n").map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </td>
                  <td>{t(`baggi:face.${text.face}`)}</td>
                  <td className="text-end">
                    <Link
                      className="btn btn-outline-primary ms-1 btn-sm"
                      title={t("stepDesign.textEdit")}
                      to={`${baseUrl}/${block}/text/${key}`}
                    >
                      <i className="fas fa-pen" style={{ width: "14px" }}></i>
                    </Link>
                    <button
                      className="btn btn-outline-danger ms-1 btn-sm"
                      title={t("stepDesign.textDelete")}
                      onClick={() => handleTextDelete(key)}
                    >
                      <i className="fas fa-times" style={{ width: "14px" }}></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex">
            <Link
              className="btn btn-outline-primary"
              to={`${baseUrl}/${block}/text`}
            >
              {t("stepText.linkTo")}
            </Link>
          </div>
        </div>
        <div className="mb-3">
          <table className="table">
            <thead>
              <tr>
                <th>{t("stepDesign.imageContent")}</th>
                <th>{t("stepDesign.imageFace")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {objectMap(blockData.images, (image, key) => (
                <tr key={key} className="align-middle">
                  <td>
                    <img
                      alt=""
                      src={image.content}
                      style={{ height: "2rem" }}
                    />
                  </td>
                  <td>{t(`baggi:face.${image.face}`)}</td>
                  <td className="text-end">
                    <Link
                      className="btn btn-outline-primary ms-1 btn-sm"
                      title={t("stepDesign.imageEdit")}
                      to={`${baseUrl}/${block}/image/${key}`}
                    >
                      <i className="fas fa-pen" style={{ width: "14px" }}></i>
                    </Link>
                    <button
                      className="btn btn-outline-danger ms-1 btn-sm"
                      title={t("stepDesign.imageDelete")}
                      onClick={() => handleImageDelete(key)}
                    >
                      <i className="fas fa-times" style={{ width: "14px" }}></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex">
            <Link
              className="btn btn-outline-primary"
              to={`${baseUrl}/${block}/image`}
            >
              {t("stepImage.linkTo")}
            </Link>
          </div>
        </div>
        <div className="mb-3 mt-5 d-flex">
          <Link className="btn btn-primary ms-auto" to={`${baseUrl}/generate`}>
            {t("stepGenerate.linkTo")}
          </Link>
        </div>
      </LeftForm>
      <RightPreview>
        <BaggiTemplateRecto />
      </RightPreview>
    </>
  );
}
