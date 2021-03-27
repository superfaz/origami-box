import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TemplateList from "./TemplateList";

export function TemplatePage() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <h1>{t("templates.title")}</h1>
      <div className="mb-3 d-flex">
        <Link className="btn btn-primary" to="/create">
          {t("templates.create")}
        </Link>
      </div>
      <TemplateList />
    </div>
  );
}
