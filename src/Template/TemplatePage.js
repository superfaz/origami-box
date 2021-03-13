import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { create } from "../store/templates";
import TemplateList from "./TemplateList";

export function TemplatePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(null);

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
        <TemplateList />
      </div>
    );
  }
}
