import { useTranslation } from "react-i18next";
import { useTemplate } from "./hooks";
import MasuEditPage from "./Masu/EditPage";
import BaggiEditPage from "./Baggi/EditPage";

export default function EditPage() {
  const { t } = useTranslation();
  const { template } = useTemplate();

  return (
    <div className="container">
      <h1>{t(template.type + ":title")}</h1>
      {template.type === "masu" && <MasuEditPage />}
      {template.type === "baggi" && <BaggiEditPage />}
    </div>
  );
}
