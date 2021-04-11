import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LeftForm, RightPreview } from "../Generic/Grid";
import { updateDetail, deleteText, deleteImage } from "../store/templates";
import MasuTemplateBack from "./MasuTemplateBack";
import { useTemplate } from "../hooks";

export default function StepBlock({ lid = false }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { template, data: masu } = useTemplate();
  const block = lid ? masu.lid : masu.base;
  const baseUrl = "/edit/" + template.key;

  function handleBackgroundColorChange(event) {
    dispatch(
      updateDetail(
        template.key,
        block.key,
        event.target.name,
        event.target.value
      )
    );
  }

  function handleBackgroundImageChange(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          updateDetail(
            template.key,
            block.key,
            "backgroundImage",
            reader.result
          )
        );
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      dispatch(updateDetail(template.key, block.key, "backgroundImage", null));
    }
  }

  function handleTextDelete(key) {
    dispatch(deleteText(template.key, block.key, key));
  }

  function handleImageDelete(key) {
    dispatch(deleteImage(template.key, block.key, key));
  }

  return (
    <>
      <LeftForm>
        <div className="mb-3">
          <label htmlFor="backgroundColor" className="form-label">
            {t("masu.stepBDesign.backgroundColor")}
          </label>
          <input
            className="form-control form-control-color"
            type="color"
            name="background"
            value={block.background}
            onChange={handleBackgroundColorChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="backgroundImage" className="form-label">
            {t("masu.stepBDesign.backgroundImage")}
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
                <th>{t("masu.stepBDesign.textContent")}</th>
                <th>{t("masu.stepBDesign.textFace")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(block.texts).map((key) => (
                <tr key={key} className="align-middle">
                  <td>
                    {block.texts[key].content.split("\n").map((line, index) => {
                      return <div key={index}>{line}</div>;
                    })}
                  </td>
                  <td>{t(`masu:face.${block.texts[key].face}`)}</td>
                  <td className="text-end">
                    <Link
                      className="btn btn-outline-primary ms-1 btn-sm"
                      title={t("masu.stepBDesign.textEdit")}
                      to={`${baseUrl}/${block.key}/text/${key}`}
                    >
                      <i className="fas fa-pen" style={{ width: "14px" }}></i>
                    </Link>
                    <button
                      className="btn btn-outline-danger ms-1 btn-sm"
                      title={t("masu.stepBDesign.textDelete")}
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
              to={`${baseUrl}/${block.key}/text`}
            >
              {t("stepText.linkTo")}
            </Link>
          </div>
        </div>
        <div className="mb-3">
          <table className="table">
            <thead>
              <tr>
                <th>{t("masu.stepBDesign.imageContent")}</th>
                <th>{t("masu.stepBDesign.imageFace")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(block.images).map((key) => (
                <tr key={key} className="align-middle">
                  <td>
                    <img
                      alt=""
                      src={block.images[key].content}
                      style={{ height: "2rem" }}
                    />
                  </td>
                  <td>{t(`masu:face.${block.images[key].face}`)}</td>
                  <td className="text-end">
                    <Link
                      className="btn btn-outline-primary ms-1 btn-sm"
                      title={t("masu.stepBDesign.imageEdit")}
                      to={`${baseUrl}/${block.key}/image/${key}`}
                    >
                      <i className="fas fa-pen" style={{ width: "14px" }}></i>
                    </Link>
                    <button
                      className="btn btn-outline-danger ms-1 btn-sm"
                      title={t("masu.stepBDesign.imageDelete")}
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
              to={`${baseUrl}/${block.key}/image`}
            >
              {t("stepImage.linkTo")}
            </Link>
          </div>
        </div>
        <div className="mb-3 mt-5 d-flex">
          {!lid && masu.withLid && (
            <Link className="btn btn-primary ms-auto" to={`${baseUrl}/lid`}>
              {t("masu.stepBDesign.lid.linkTo")}
            </Link>
          )}
          {(lid || !masu.withLid) && (
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
        <MasuTemplateBack lid={lid} />
      </RightPreview>
    </>
  );
}
