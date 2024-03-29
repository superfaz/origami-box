import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { Dimension, Dimensions } from "../Generic/Dimension";
import DimensionsInfo from "../Generic/DimensionsInfo";
import { LeftForm, RightPreview } from "../Generic/Grid";
import { checkValidity } from "../Generic/Validity";
import { useTemplate } from "../hooks";
import { updateData, updateTemplate } from "../store/templates";
import BaggiTemplate from "./BaggiTemplate";
import { getPageDimensions } from "./dimensions";

export default function StepPrepare() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [valid, setValid] = useState(false);
  const form = useRef(null);
  const { template, data: baggi } = useTemplate();
  const { url } = useRouteMatch();
  const dimensions = getPageDimensions(baggi);

  useEffect(() => {
    setValid(form.current.checkValidity());
  }, [form, baggi]);

  function handleTemplateInputChange(event) {
    const value = checkValidity(event.target);
    dispatch(updateTemplate(template.key, event.target.name, value));
  }

  function handleInputChange(event) {
    const value = checkValidity(event.target);
    dispatch(updateData(template.key, event.target.name, value));
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
            <h5 className="mb-3">{t("template.dimensions")}</h5>
            <Dimensions>
              <Dimension
                name="width"
                value={baggi.width}
                label={t("baggi:dimensions.width")}
                onChange={handleInputChange}
              />
              <Dimension
                name="length"
                value={baggi.length}
                label={t("dimensions.length")}
                onChange={handleInputChange}
              />
            </Dimensions>
          </div>
          <DimensionsInfo className="mb-3" dimensions={dimensions} />
          <div className="mb-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="withDesign"
                name="withDesign"
                checked={baggi.withDesign}
                onChange={handleCheckedChange}
              />
              <label className="form-check-label" htmlFor="withDesign">
                {t("stepGeneral.withDesign")}
              </label>
            </div>
            <div className="text-muted">
              {t(`stepGeneral.withDesign${baggi.withDesign ? "On" : "Off"}`)}
            </div>
          </div>
          <div className="mb-3 mt-5 d-flex">
            {baggi.withDesign && (
              <Link
                className={classNames("btn btn-primary ms-auto", {
                  disabled: !valid,
                })}
                to={`${url}/base`}
              >
                {t("stepDesign.box.linkTo")}
              </Link>
            )}
            {!baggi.withDesign && (
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
        <BaggiTemplate baggi={baggi} />
      </RightPreview>
    </>
  );
}
