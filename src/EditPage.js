import { useTranslation } from "react-i18next";
import BaggiEditPage from "./Baggi/EditPage";
import EditNav from "./Generic/EditNav";
import { useTemplate } from "./hooks";
import MasuEditPage from "./Masu/EditPage";

export default function EditPage() {
  const { t } = useTranslation();
  const { template } = useTemplate();

  return (
    <>
      <div className="sticky-top position-md-static edit-nav pt-3 pb-1 mb-3">
        <div className="container">
          {template.title && (
            <h1>
              {template.title}
              <small className="ms-2 badge bg-secondary fs-6">
                {t(template.type + ":title")}
              </small>
            </h1>
          )}
          {!template.title && <h1>{t(template.type + ":title")}</h1>}
          <EditNav />
        </div>
      </div>

      <div className="container">
        <div className="row">
          {template.type === "masu" && <MasuEditPage />}
          {template.type === "baggi" && <BaggiEditPage />}
        </div>
      </div>
    </>
  );
}
