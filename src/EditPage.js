import { useTranslation } from "react-i18next";
import { useTemplate } from "./hooks";
import EditMasu from "./Masu";

export default function EditPage() {
  const { t } = useTranslation();
  const { template } = useTemplate();

  return (
    <div className="container">
      <h1>{t(template.type + ":title")}</h1>
      {template.type === "masu" && <EditMasu />}
    </div>
  );
}
