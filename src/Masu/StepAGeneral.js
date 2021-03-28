import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import classNames from "classnames/dedupe";
import { LeftForm, RightPreview } from "../Generic/Grid";
import MasuTemplateFront from "./MasuTemplateFront";
import { checkValidity } from "./helper";
import { updateDetail, updateData, updateTemplate } from "../store/templates";
import { useTemplate } from "../hooks";

export default function StepAGeneral() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [valid, setValid] = useState(false);
  const form = useRef(null);
  const { template, data: masu } = useTemplate();
  const { url } = useRouteMatch();

  useEffect(() => {
    setValid(form.current.checkValidity());
  }, [form, masu]);

  function handleTemplateInputChange(event) {
    const value = checkValidity(event.target);
    dispatch(updateTemplate(template.key, event.target.name, value));
  }

  function handleInputChange(event) {
    const value = checkValidity(event.target);
    dispatch(updateData(template.key, event.target.name, value));
  }

  function handleLidInputChange(event) {
    const value = checkValidity(event.target);
    dispatch(updateDetail(template.key, "lid", event.target.name, value));
  }

  function handleCheckedChange(event) {
    dispatch(updateData(template.key, event.target.name, event.target.checked));
  }

  return (
    <>
      <LeftForm>
        <form ref={form} noValidate>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              {t("template.title")}
            </label>
            <input
              name="title"
              type="text"
              className="form-control"
              autoFocus
              value={template.title}
              onChange={handleTemplateInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="length" className="form-label">
              {t("masu.dimensions.label")}
            </label>
            <div className="input-group">
              <input
                name="length"
                type="number"
                className="form-control"
                style={{ width: "calc(100%/3)" }}
                required
                min="1"
                step="0.01"
                placeholder={t("masu.dimensions.length")}
                aria-label={t("masu.dimensions.length")}
                value={masu.length}
                onChange={handleInputChange}
              />
              <input
                name="width"
                type="number"
                className="form-control"
                style={{ width: "calc(100%/3)" }}
                required
                min="1"
                step="0.01"
                placeholder={t("masu.dimensions.width")}
                aria-label={t("masu.dimensions.width")}
                value={masu.width}
                onChange={handleInputChange}
              />
              <input
                name="height"
                type="number"
                className="form-control"
                style={{ width: "calc(100%/3)" }}
                required
                min="1"
                step="0.01"
                placeholder={t("masu.dimensions.height")}
                aria-label={t("masu.dimensions.height")}
                value={masu.height}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="withDesign"
                name="withDesign"
                checked={masu.withDesign}
                onChange={handleCheckedChange}
              />
              <label className="form-check-label" htmlFor="withDesign">
                {t("masu.stepAGeneral.withDesign")}
              </label>
            </div>
            <div className="text-muted">
              {t(
                `masu.stepAGeneral.withDesign${masu.withDesign ? "On" : "Off"}`
              )}
            </div>
          </div>
          <div className="mb-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="withLid"
                name="withLid"
                checked={masu.withLid}
                onChange={handleCheckedChange}
              />
              <label className="form-check-label" htmlFor="withLid">
                {t("masu.stepAGeneral.withLid")}
              </label>
            </div>
            <div className="text-muted">
              {t(`masu.stepAGeneral.withLid${masu.withLid ? "On" : "Off"}`)}
            </div>
          </div>
          {masu.withLid && (
            <div className="mb-3">
              <label htmlFor="delta" className="form-label">
                {t("masu.stepAGeneral.delta")}
              </label>
              <input
                className="form-control"
                type="number"
                name="delta"
                id="delta"
                required
                min="0"
                max="10"
                step="0.01"
                value={masu.lid.delta}
                onChange={handleLidInputChange}
              />
              <div className="text-muted">
                {t("masu.stepAGeneral.deltaExplanation")}
              </div>
            </div>
          )}
          {masu.withLid && (
            <div className="mb-3">
              <label htmlFor="lidHeight" className="form-label">
                {t("masu.stepAGeneral.lidHeight")}
              </label>
              <input
                className="form-control"
                type="number"
                name="height"
                id="lidHeight"
                min="0"
                max={masu.height}
                step="0.01"
                placeholder={t("masu.stepAGeneral.lidHeightAuto")}
                value={masu.lid.height}
                onChange={handleLidInputChange}
              />
              {masu.lid.height === "" && (
                <div className="text-muted">
                  {t("masu.stepAGeneral.lidHeightExplanation")}
                </div>
              )}
            </div>
          )}
          <div className="mb-3 mt-5 d-flex">
            {masu.withDesign && !masu.withLid && (
              <Link
                className={classNames("btn btn-primary ms-auto", {
                  disabled: !valid,
                })}
                to={`${url}/base`}
              >
                {t("masu.stepBDesign.box.linkTo")}
              </Link>
            )}
            {masu.withDesign && masu.withLid && (
              <Link
                className={classNames("btn btn-primary ms-auto", {
                  disabled: !valid,
                })}
                to={`${url}/base`}
              >
                {t("masu.stepBDesign.base.linkTo")}
              </Link>
            )}
            {!masu.withDesign && (
              <Link
                className={classNames("btn btn-primary ms-auto", {
                  disabled: !valid,
                })}
                to={`${url}/generate`}
              >
                {t("masu.stepZGenerate.linkTo")}
              </Link>
            )}
          </div>
        </form>
      </LeftForm>
      <RightPreview>
        {masu.withLid && (
          <div className="row">
            <div className="col-12 col-lg-6 mb-3">
              <MasuTemplateFront />
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <MasuTemplateFront lid />
            </div>
          </div>
        )}
        {!masu.withLid && <MasuTemplateFront />}
      </RightPreview>
    </>
  );
}
