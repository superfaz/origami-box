import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { v4 as uuidv4 } from "uuid";
import objectMap from "../objectMap";
import { getTemplates } from "../store";
import { create } from "../store/templates";
import { TemplateMiniature } from "./TemplateMiniature";

export default function TemplateList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(null);
  const templates = useSelector(getTemplates);

  function handleCreate() {
    const key = uuidv4();
    dispatch(create(key));
    setRedirect("/edit/" + key);
  }

  if (redirect !== null) {
    return <Redirect to={redirect} />;
  } else {
    return (
      <div className="container">
        <h1>{t("templates.title")}</h1>
        <div className="mb-3 d-flex">
          <button onClick={handleCreate} className="btn btn-primary">
            {t("templates.create")}
          </button>
        </div>
        <div className="row">
          {objectMap(templates, (template, key, index) => (
            <TemplateMiniature key={index} template={template} index={index} />
          ))}
        </div>
      </div>
    );
  }
}
