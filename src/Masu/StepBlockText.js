import { useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Error404 from "../Error/Error404";
import { LeftForm, RightPreview } from "../Generic/Grid";
import { checkValidity } from "../Generic/Validity";
import { useTemplate, useGoogleFonts } from "../hooks";
import { addOrUpdateText } from "../store/templates";
import MasuTemplateBack from "./MasuTemplateBack";

export default function StepBlockText() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { block, key } = useParams();
  const { template, data } = useTemplate();
  const baseUrl = "/edit/" + template.key;

  let initialState;
  if (key !== undefined && block !== undefined && data[block] !== undefined) {
    initialState = data[block].texts[key];
  }
  if (!initialState) {
    initialState = {
      content: "",
      face: "0",
      horizontal: "center",
      vertical: "middle",
      marginHorizontal: 2,
      marginVertical: 2,
      lineSpacing: 1.15,
      family: "",
      size: 8,
      color: "black",
    };
  }

  const [redirect, setRedirect] = useState(false);
  const [multiline, setMultiline] = useState(false);
  const [state, setState] = useState(initialState);
  const fonts = useGoogleFonts();

  if (!["base", "lid"].includes(block)) {
    throw new Error404();
  }

  function handleInputChange(event) {
    const value = checkValidity(event.target);
    setState({ ...state, [event.target.name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addOrUpdateText(template.key, block, state));
    setRedirect(true);
  }

  return (
    <>
      <LeftForm>
        <form onSubmit={handleSubmit}>
          {!multiline && (
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                {t("stepText.content")}
              </label>
              <input
                type="text"
                name="content"
                className="form-control"
                required
                value={state.content}
                onChange={handleInputChange}
              />
            </div>
          )}
          {multiline && (
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                {t("stepText.content")}
              </label>
              <textarea
                name="content"
                className="form-control"
                rows="5"
                value={state.content}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="mb-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="multiline"
                name="multiline"
                checked={multiline}
                onChange={(e) => setMultiline(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="withDesign">
                {t("stepText.multiline")}
              </label>
            </div>
          </div>
          {multiline && (
            <div className="mb-3">
              <label htmlFor="lineSpacing" className="form-label">
                {t("stepText.lineSpacing")}
              </label>
              <input
                type="number"
                name="lineSpacing"
                className="form-control"
                required
                min="0"
                step="0.01"
                value={state.lineSpacing}
                onChange={handleInputChange}
              />
            </div>
          )}
          <fieldset>
            <legend>{t("stepText.positioning")}</legend>
            <div className="mb-3">
              <label htmlFor="face" className="form-label">
                {t("stepText.face")}
              </label>
              <select
                className="form-select"
                name="face"
                required
                value={state.face}
                onChange={handleInputChange}
              >
                <option value="0">{t("masu.face.0")}</option>
                <option value="1">{t("masu.face.1")}</option>
                <option value="2">{t("masu.face.2")}</option>
                <option value="3">{t("masu.face.3")}</option>
                <option value="4">{t("masu.face.4")}</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="horizontal" className="form-label">
                {t("stepText.horizontal")}
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
                  <option value="left">{t("masu.horizontal.left")}</option>
                  <option value="center">{t("masu.horizontal.center")}</option>
                  <option value="right">{t("masu.horizontal.right")}</option>
                </select>
                <select
                  className="form-select"
                  style={{ width: "calc(100%/2)" }}
                  name="vertical"
                  required
                  value={state.vertical}
                  onChange={handleInputChange}
                >
                  <option value="top">{t("masu.vertical.top")}</option>
                  <option value="middle">{t("masu.vertical.middle")}</option>
                  <option value="bottom">{t("masu.vertical.bottom")}</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="marginHorizontal" className="form-label">
                {t("stepText.margins")}
              </label>
              <div className="input-group">
                <input
                  type="number"
                  name="marginHorizontal"
                  className="form-control"
                  style={{ width: "calc(100%/2)" }}
                  required
                  value={state.marginHorizontal}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="marginVertical"
                  className="form-control"
                  style={{ width: "calc(100%/2)" }}
                  required
                  value={state.marginVertical}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>{t("stepText.font")}</legend>
            <div className="mb-3">
              <div className="d-flex">
                <label htmlFor="family" className="form-label">
                  {t("stepText.family")}
                </label>
                <label
                  htmlFor="size"
                  className="form-label ms-auto"
                  style={{ width: "6rem" }}
                >
                  {t("stepText.size")}
                </label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="family"
                  className="form-control"
                  value={state.family}
                  onChange={handleInputChange}
                  placeholder="Open Sans"
                  list="fontslist"
                />
                <datalist id="fontslist">
                  {fonts.map((font) => (
                    <option key={font} value={font} />
                  ))}
                </datalist>

                <input
                  type="color"
                  name="color"
                  className="form-control form-control-color"
                  color={state.color}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="size"
                  className="form-control"
                  style={{ maxWidth: "6rem" }}
                  value={state.size}
                  required
                  min="1"
                  onChange={handleInputChange}
                  placeholder="8"
                />
              </div>
              <div className="text-muted">
                <Trans i18nKey="stepText.familyExplanation">
                  Name of the
                  <a
                    href="https://fonts.google.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    google font
                  </a>
                  to be used
                </Trans>
              </div>
            </div>
          </fieldset>
          <div className="mb-3 mt-5 d-flex">
            <Link className="btn btn-link" to={`${baseUrl}/${block}`}>
              {t("stepText.cancel")}
            </Link>
            <button type="submit" className="btn btn-primary ms-auto">
              {t("stepText.submit")}
            </button>
            {redirect && <Redirect push to={`${baseUrl}/${block}`} />}
          </div>
        </form>
      </LeftForm>
      <RightPreview>
        <MasuTemplateBack lid={block === "lid"} text={state} />
      </RightPreview>
    </>
  );
}
