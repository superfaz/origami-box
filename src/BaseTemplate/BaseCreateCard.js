import classNames from "classnames";
import { useTranslation } from "react-i18next";

export default function BaseCreateCard({
  className,
  templateType,
  onCreate = () => {},
  children,
  ...rest
}) {
  if (
    templateType === undefined ||
    templateType === null ||
    templateType === ""
  ) {
    throw Error("Missing templateType parameter");
  }

  const { t } = useTranslation();

  return (
    <div className={classNames("card h-100", className)} {...rest}>
      <div className="row g-0">
        <div className="col-4">{children}</div>
        <div className="col-8">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{t(`${templateType}:create.title`)}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {t(`${templateType}:create.subtitle`)}
            </h6>
            <p className="card-text">
              {t(`${templateType}:create.description`)}
            </p>
            <button
              onClick={onCreate}
              className="btn btn-primary stretched-link mt-auto me-auto"
            >
              {t(`${templateType}:create.button`)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
