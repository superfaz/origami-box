import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import objectMap from "../objectMap";
import { getTemplates } from "../store";
import { TemplateMiniature } from "./TemplateMiniature";

export default function TemplateList() {
  const { t } = useTranslation();
  const templates = useSelector(getTemplates);

  return (
    <div className="container">
      <h1>{t("templates.title")}</h1>
      <div className="row">
        {objectMap(templates, (template, key, index) => (
          <TemplateMiniature key={key} template={template} index={index} />
        ))}
      </div>
    </div>
  );
}
