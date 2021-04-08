import { useTranslation } from "react-i18next";

export default function Error500Page({ error, errorInfo }) {
  const { t } = useTranslation();
  return (
    <div className="container">
      <p className="display-1">500</p>
      <p className="lead">{t("error.500")}</p>
      <pre>
        {error?.toString()}
        {errorInfo?.componentStack}
      </pre>
    </div>
  );
}
