import { useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useTemplates } from "../hooks";
import { create } from "../store/templates";
import { TemplateMiniature } from "./TemplateMiniature";

export default function TemplateList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(null);
  const { templates, isLoading, isError } = useTemplates();

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
          {templates.map((template, index) => (
            <TemplateMiniature key={index} template={template} index={index} />
          ))}
          {isError && (
            <div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
              An error occurs while loading remote data.
            </div>
          )}
          {isLoading && (
            <div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
              <Loader
                className="mt-2"
                type="Bars"
                color="#666"
                height="1.5rem"
                timeout={0}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
