import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { isGeneralValid } from "./helper";
import "./Nav.css";
import { useTemplate } from "../hooks";
import env from "../env";

function BreadcrumbItem({ exact = false, path, title, withLink }) {
  const paths = Array.isArray(path) ? path : [path];
  const location = useLocation();
  const currentPath = location.pathname;

  const active = exact
    ? paths.includes(currentPath)
    : paths.some((p) => currentPath.startsWith(p));
  return (
    <li
      className={classNames(
        "breadcrumb-item d-flex align-bottom",
        { "h4 active": active },
        { "mt-1": !active }
      )}
    >
      {withLink && !active && <Link to={paths[0]}>{title}</Link>}
      {!(withLink && !active) && title}
    </li>
  );
}

export default function Nav() {
  const { t } = useTranslation();
  const { template, data: masu } = useTemplate();
  const path = "/edit/" + template.key;

  return (
    <nav className="nav-steps" aria-label="breadcrumb">
      <ol className="breadcrumb">
        <BreadcrumbItem
          exact
          path={`${path}`}
          title={t("masu.stepAGeneral.title")}
          withLink={isGeneralValid(masu)}
        />
        {!masu.withLid && masu.withDesign && (
          <BreadcrumbItem
            path={`${path}/base`}
            title={t("masu.stepBDesign.box.title")}
            withLink={isGeneralValid(masu)}
          />
        )}
        {masu.withLid && masu.withDesign && (
          <BreadcrumbItem
            path={`${path}/base`}
            title={t("masu.stepBDesign.base.title")}
            withLink={isGeneralValid(masu)}
          />
        )}
        {masu.withLid && masu.withDesign && (
          <BreadcrumbItem
            path={`${path}/lid`}
            title={t("masu.stepBDesign.lid.title")}
            withLink={isGeneralValid(masu)}
          />
        )}
        <BreadcrumbItem
          path={`${path}/generate`}
          title={t("masu.stepZGenerate.title")}
          withLink={isGeneralValid(masu)}
        />
        {env.debug.template && (
          <BreadcrumbItem
            path={`${path}/debug`}
            title={t("masu.stepYDebug.title")}
            withLink={true}
          />
        )}
      </ol>
    </nav>
  );
}
