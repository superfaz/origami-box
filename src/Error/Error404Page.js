import { useTranslation } from "react-i18next";

export default function Error404Page() {
  const { t } = useTranslation();
  return (
    <div className="container">
      <p className="display-1">404</p>
      <p className="lead">{t('error.404')}</p>
    </div>
  );
}
