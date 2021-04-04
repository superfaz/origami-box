import classNames from "classnames";
import { Trans, useTranslation } from "react-i18next";

const margin = 10;

function defineLevel(dimensions) {
  if (!dimensions) {
    return "hidden";
  } else if (
    dimensions.width > dimensions.pageWidth ||
    dimensions.height > dimensions.pageHeight
  ) {
    return "danger";
  } else if (
    dimensions.width > dimensions.pageWidth - margin ||
    dimensions.height > dimensions.pageHeight - margin
  ) {
    return "warning";
  } else {
    return "info";
  }
}

export default function DimensionsInfo({
  dimensions,
  blockName = null,
  className = null,
  ...rest
}) {
  const { t } = useTranslation();

  const level = defineLevel(dimensions);

  return (
    <div
      className={classNames(
        className,
        "alert",
        { "alert-info": level === "info" },
        { "alert-warning": level === "warning" },
        { "alert-danger": level === "danger" },
        { "alert-hidden": level === "hidden" }
      )}
    >
      <div>
        {!blockName &&
          t("dimensionsInfo.sizeUnique", {
            blockName,
            width: dimensions?.width,
            height: dimensions?.height,
          })}
        {blockName &&
          t("dimensionsInfo.sizeBlock", {
            blockName,
            width: dimensions?.width,
            height: dimensions?.height,
          })}
      </div>

      {level === "info" && <div>{t("dimensionsInfo.info")}</div>}
      {level === "warning" && <div>{t("dimensionsInfo.warning")}</div>}
      {level === "danger" && (
        <div>
          <Trans i18nKey="dimensionsInfo.danger" />
        </div>
      )}
    </div>
  );
}
