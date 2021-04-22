import { useTranslation } from "react-i18next";
import BaggiEditPage from "./Baggi/EditPage";
import EditNav from "./Generic/EditNav";
import { useTemplate } from "./hooks";
import MasuEditPage from "./Masu/EditPage";

export default function EditPage() {
  const { t } = useTranslation();
  const { template } = useTemplate();

  return (
    <div className="container">
      {template.title && (
        <h1>
          {template.title}
          <small class="ms-2 badge bg-secondary fs-6">
            {t(template.type + ":title")}
          </small>
        </h1>
      )}
      {!template.title && <h1>{t(template.type + ":title")}</h1>}

      <div className="row">
        <EditNav />
        {template.type === "masu" && <MasuEditPage />}
        {template.type === "baggi" && <BaggiEditPage />}
      </div>
    </div>
  );
}
