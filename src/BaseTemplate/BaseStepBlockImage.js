import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import Error404 from "../Error/Error404";
import { LeftForm, RightPreview } from "../Generic/Grid";
import { checkValidity } from "../Generic/Validity";
import { useTemplate, useTemplateDefinition } from "../hooks";
import { addOrUpdateImage } from "../store/templates";

function loadImageAsync(url) {
  return new Promise((resolve, reject) => {
    let img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export function useStepBlockImageState() {
  const { block, key } = useParams();
  const { data } = useTemplate();

  let initialState;
  if (key !== undefined && block !== undefined && data[block] !== undefined) {
    initialState = data[block].images[key];
  }
  if (!initialState) {
    initialState = {
      content: null,
      originalWidth: null,
      originalHeight: null,
      face: "0",
      size: "auto",
      width: "",
      height: "",
      horizontal: "center",
      vertical: "middle",
      marginHorizontal: 0,
      marginVertical: 0,
    };
  }

  return useState(initialState);
}

export default function BaseStepBlockImage({ state, onStateChange, children }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { block } = useParams();
  const { template } = useTemplate();
  const definition = useTemplateDefinition(template.type);
  const [redirect, setRedirect] = useState(false);
  const baseUrl = "/edit/" + template.key;

  if (!["base", "lid"].includes(block)) {
    throw new Error404();
  }

  function handleInputChange(event) {
    const value = checkValidity(event.target);
    onStateChange({ ...state, [event.target.name]: value });
  }

  function handleSizeChange(event) {
    const checked = event.target.checked;
    onStateChange({ ...state, size: checked ? "auto" : "manual" });
  }

  function handleImageChange(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        loadImageAsync(reader.result)
          .then((img) => {
            onStateChange({
              ...state,
              content: reader.result,
              originalWidth: img.width,
              originalHeight: img.height,
            });
          })
          .catch((error) => {
            console.error("Can't load properly the image", error);
            onStateChange({
              ...state,
              content: null,
              originalWidth: null,
              originalHeight: null,
            });
          });
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      onStateChange({
        ...state,
        content: null,
        originalWidth: null,
        originalHeight: null,
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addOrUpdateImage(template.key, block, state));
    setRedirect(true);
  }

  return (
    <>
      <LeftForm>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              {t("stepImage.content")}
            </label>
            <input
              className="form-control"
              type="file"
              name="content"
              id="content"
              accept="image/png, image/jpeg, image/svg+xml"
              required={state.content === null}
              onChange={handleImageChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">{t("stepImage.size")}</label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="size"
                name="size"
                checked={state.size === "auto"}
                onChange={handleSizeChange}
              />
              <label className="form-check-label" htmlFor="size">
                {t("stepImage.sizeAuto")}
              </label>
            </div>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                name="width"
                placeholder={t("stepImage.width")}
                disabled={state.size === "auto"}
                required={state.size === "manual"}
                min="0"
                step="0.01"
                value={state.width}
                onChange={handleInputChange}
              />
              <input
                type="number"
                className="form-control"
                name="height"
                placeholder={t("stepImage.height")}
                disabled={state.size === "auto"}
                required={state.size === "manual"}
                min="0"
                step="0.01"
                value={state.height}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <fieldset>
            <legend>{t("stepImage.positioning")}</legend>
            <div className="mb-3">
              <label htmlFor="face" className="form-label">
                {t("stepImage.face")}
              </label>
              <select
                className="form-select"
                name="face"
                required
                value={state.face}
                onChange={handleInputChange}
              >
                {[...Array(definition.facesCount()).keys()].map((i) => (
                  <option key={i} value={i}>
                    {t([`${template.type}:face.${i}`, `face.${i}`])}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="horizontal" className="form-label">
                {t("stepImage.horizontal")}
              </label>
              <div className="input-group">
                <select
                  className="form-select"
                  style={{ width: "calc(100%/2)" }}
                  name="horizontal"
                  required
                  value={state.horizontal}
                  onChange={handleInputChange}
                >
                  <option value="left">{t("horizontal.left")}</option>
                  <option value="center">{t("horizontal.center")}</option>
                  <option value="right">{t("horizontal.right")}</option>
                </select>
                <select
                  className="form-select"
                  style={{ width: "calc(100%/2)" }}
                  name="vertical"
                  required
                  value={state.vertical}
                  onChange={handleInputChange}
                >
                  <option value="top">{t("vertical.top")}</option>
                  <option value="middle">{t("vertical.middle")}</option>
                  <option value="bottom">{t("vertical.bottom")}</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="marginHorizontal" className="form-label">
                {t("stepImage.margins")}
              </label>
              <div className="input-group">
                <input
                  type="number"
                  name="marginHorizontal"
                  className="form-control"
                  style={{ width: "calc(100%/2)" }}
                  required
                  step="0.01"
                  value={state.marginHorizontal}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="marginVertical"
                  className="form-control"
                  style={{ width: "calc(100%/2)" }}
                  required
                  step="0.01"
                  value={state.marginVertical}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>
          <div className="mb-3 mt-5 d-flex">
            <Link className="btn btn-link" to={`${baseUrl}/${block}`}>
              {t("stepImage.cancel")}
            </Link>
            <button type="submit" className="btn btn-primary ms-auto">
              {t("stepImage.submit")}
            </button>
            {redirect && <Redirect push to={`${baseUrl}/${block}`} />}
          </div>
        </form>
      </LeftForm>
      <RightPreview>{children}</RightPreview>
    </>
  );
}
