import classNames from "classnames/dedupe";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { Dimension, Dimensions } from "../Generic/Dimension";
import DimensionsInfo from "../Generic/DimensionsInfo";
import { LeftForm, RightPreview } from "../Generic/Grid";
import { checkValidity } from "../Generic/Validity";
import { useTemplate } from "../hooks";
import { updateDetail, updateData, updateTemplate } from "../store/templates";
import { useMasuDimensions } from "./useMasuDimensions";
import MasuTemplateRecto from "./MasuTemplateRecto";

export default function StepPrepare() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [valid, setValid] = useState(false);
  const form = useRef(null);
  const { template, data: masu } = useTemplate();
  const { url } = useRouteMatch();
  const dimensionsBase = useMasuDimensions(masu, false);
  const dimensionsLid = useMasuDimensions(masu, true);

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
              value={template.title}
              onChange={handleTemplateInputChange}
            />
          </div>
          <div className="mb-3">
            <h5 className="mb-3">{t("template.dimensions")}</h5>
            <Dimensions>
              <Dimension
                name="length"
                value={masu.length}
                label={t("dimensions.length")}
                onChange={handleInputChange}
              />
              <Dimension
                name="width"
                value={masu.width}
                label={t("dimensions.width")}
                onChange={handleInputChange}
              />
              <Dimension
                name="height"
                value={masu.height}
                label={t("dimensions.height")}
                onChange={handleInputChange}
              />
            </Dimensions>
          </div>
          {!masu.withLid && (
            <DimensionsInfo className="mb-3" dimensions={dimensionsBase} />
          )}
          {masu.withLid && (
            <DimensionsInfo
              className="mb-3"
              blockName={t("masu:block.base")}
              dimensions={dimensionsBase}
            />
          )}
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
                {t("stepGeneral.withDesign")}
              </label>
            </div>
            <div className="text-muted">
              {t(`stepGeneral.withDesign${masu.withDesign ? "On" : "Off"}`)}
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
            <>
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

              <DimensionsInfo
                className="mb-3"
                blockName={t("masu:block.lid")}
                dimensions={dimensionsLid}
              />
            </>
          )}
          <div className="mb-3 mt-5 d-flex">
            {masu.withDesign && !masu.withLid && (
              <Link
                className={classNames("btn btn-primary ms-auto", {
                  disabled: !valid,
                })}
                to={`${url}/base`}
              >
                {t("stepDesign.box.linkTo")}
              </Link>
            )}
            {masu.withDesign && masu.withLid && (
              <Link
                className={classNames("btn btn-primary ms-auto", {
                  disabled: !valid,
                })}
                to={`${url}/base`}
              >
                {t("stepDesign.base.linkTo")}
              </Link>
            )}
            {!masu.withDesign && (
              <Link
                className={classNames("btn btn-primary ms-auto", {
                  disabled: !valid,
                })}
                to={`${url}/generate`}
              >
                {t("stepGenerate.linkTo")}
              </Link>
            )}
          </div>
        </form>
      </LeftForm>
      <RightPreview>
        {masu.withLid && (
          <div className="row">
            <div className="col-12 col-lg-6 mb-3">
              <MasuTemplateRecto />
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <MasuTemplateRecto lid />
            </div>
          </div>
        )}
        {!masu.withLid && <MasuTemplateRecto />}
      </RightPreview>
    </>
  );
}
