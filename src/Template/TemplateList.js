import { useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { useConnectedApi, useTemplates } from "../hooks";
import { discard, updateTemplate } from "../store/templates";
import { TemplateMiniature } from "./TemplateMiniature";

export default function TemplateList({ limit, children }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const api = useConnectedApi();
  const { templates, isLoading, isError } = useTemplates(limit);
  const [loading, setLoading] = useState({});

  function handleSave(templateKey, template) {
    setLoading({ ...loading, [templateKey]: true });
    api
      .saveTemplate(template)
      .then((result) => {
        dispatch(updateTemplate(templateKey, "_id", result.insertedId));
        dispatch(updateTemplate(templateKey, "local", false));
      })
      .finally(() => {
        setLoading({ ...loading, [templateKey]: false });
      });
  }

  function handleDiscard(templateKey, template) {
    setLoading({ ...loading, [templateKey]: true });
    dispatch(discard(templateKey));
    if (template.local) {
      // template is local or draft
      setLoading({ ...loading, [templateKey]: false });
    } else {
      // template is remote
      api.removeTemplate(templateKey).finally(() => {
        setLoading({ ...loading, [templateKey]: false });
      });
    }
  }

  return (
    <>
      {templates.length > 0 && children}
      <div className="row">
        {templates.map((template, index) => (
          <TemplateMiniature
            key={index}
            template={template}
            index={index}
            loading={loading[template.key] || false}
            onSave={handleSave}
            onDiscard={handleDiscard}
          />
        ))}
        {isError && (
          <div className="col-xl-3 col-lg-4 col-sm-6 mb-3">
            {t("templates.error")}
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
    </>
  );
}
