import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import env from "../env";
import { useTemplate, useTemplateDefinition } from "../hooks";
import "./EditNav.css";

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

export default function EditNav() {
  const { t } = useTranslation();
  const { template, data } = useTemplate();
  const type = template.type;
  const definition = useTemplateDefinition(type);

  const blocks = definition.blocks(data);
  const path = "/edit/" + template.key;

  function RenderBlocks() {
    if (blocks.length === 1 && blocks[0] === "base") {
      return (
        <BreadcrumbItem
          key="base"
          path={`${path}/base`}
          title={t(`stepDesign.box.title`)}
          withLink={definition.isGeneralValid(data)}
        />
      );
    } else {
      return blocks.map((block) => (
        <BreadcrumbItem
          key={block}
          path={`${path}/${block}`}
          title={t(`stepDesign.${block}.title`)}
          withLink={definition.isGeneralValid(data)}
        />
      ));
    }
  }

  return (
    <nav className="nav-steps" aria-label="breadcrumb">
      <ol className="breadcrumb">
        <BreadcrumbItem
          exact
          path={`${path}`}
          title={t([`${type}:stepGeneral.title`, "stepGeneral.title"])}
          withLink={definition.isGeneralValid(data)}
        />
        <RenderBlocks />
        <BreadcrumbItem
          path={`${path}/generate`}
          title={t([`${type}:stepGenerate.title`, "stepGenerate.title"])}
          withLink={definition.isGeneralValid(data)}
        />
        {env.debug.template && (
          <BreadcrumbItem
            path={`${path}/debug`}
            title={t("stepDebug.title")}
            withLink={true}
          />
        )}
      </ol>
    </nav>
  );
}
