import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { LeftForm, RightPreview } from "../Generic/Grid";
import { useTemplate } from "../hooks";
import objectMap from "../objectMap";
import { updateDetail, deleteText, deleteImage } from "../store/templates";
import MasuTemplateVerso from "./MasuTemplateVerso";

export default function StepBlock() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { templateKey, block } = useParams();
  const { data: masu, blockData } = useTemplate();
  const baseUrl = "/edit/" + templateKey;

  function handleBackgroundColorChange(event) {
    dispatch(
      updateDetail(templateKey, block, event.target.name, event.target.value)
    );
  }

  function handleBackgroundImageChange(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          updateDetail(templateKey, block, "backgroundImage", reader.result)
        );
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      dispatch(updateDetail(templateKey, block, "backgroundImage", null));
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
        <div className="mb-3">
          <label htmlFor="backgroundColor" className="form-label">
            {t("masu:stepDesign.backgroundColor")}
          </label>
          <input
            className="form-control form-control-color"
            type="color"
            name="background"
            value={blockData.background}
            onChange={handleBackgroundColorChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="backgroundImage" className="form-label">
            {t("masu:stepDesign.backgroundImage")}
          </label>
          <input
            className="form-control"
            type="file"
            name="backgroundImage"
            id="backgroundImage"
            accept="image/png, image/jpeg, image/svg+xml"
            onChange={handleBackgroundImageChange}
          />
        </div>
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
                  <td>{t(`masu:face.${text.face}`)}</td>
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
                  <td>{t(`masu:face.${image.face}`)}</td>
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
          {block === "base" && masu.withLid && (
            <Link className="btn btn-primary ms-auto" to={`${baseUrl}/lid`}>
              {t("stepDesign.lid.linkTo")}
            </Link>
          )}
          {(block === "lid" || !masu.withLid) && (
            <Link
              className="btn btn-primary ms-auto"
              to={`${baseUrl}/generate`}
            >
              {t("stepGenerate.linkTo")}
            </Link>
          )}
        </div>
      </LeftForm>
      <RightPreview>
        <MasuTemplateVerso lid={block === "lid"} />
      </RightPreview>
    </>
  );
}
