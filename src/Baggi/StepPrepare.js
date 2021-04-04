import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Dimension, Dimensions } from "../Generic/Dimension";
import { LeftForm, RightPreview } from "../Generic/Grid";
import { checkValidity } from "../Generic/Validity";
import { useTemplate } from "../hooks";
import { updateData, updateTemplate } from "../store/templates";
import BaggiTemplateFront from "./BaggiTemplateFront";

export default function StepPrepare() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [, setValid] = useState(false);
  const form = useRef(null);
  const { template, data: baggi } = useTemplate();

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
          <div>
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
        </form>
      </LeftForm>
      <RightPreview>
        <BaggiTemplateFront />
      </RightPreview>
    </>
  );
}
