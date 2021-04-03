import classNames from "classnames";
import { Trans, useTranslation } from "react-i18next";

export default function DimensionsInfo({
  dimensions,
  blockName = null,
  className = null,
  ...rest
}) {
  const { t } = useTranslation();

  const isInfo = dimensions !== null && dimensions.size <= 200;
  const isWarning =
    dimensions !== null && dimensions.size > 200 && dimensions.size <= 210;
  const isDanger = dimensions !== null && dimensions.size > 210;
  const isHidden = dimensions === null;

  return (
    <div
      className={classNames(
        className,
        "alert",
        { "alert-info": isInfo },
        { "alert-warning": isWarning },
        { "alert-danger": isDanger },
        { "alert-hidden": isHidden }
      )}
    >
      <div>
        {!blockName &&
          t("dimensionsInfo.sizeUnique", {
            blockName,
            width: dimensions?.size,
            height: dimensions?.size,
          })}
        {blockName &&
          t("dimensionsInfo.sizeBlock", {
            blockName,
            width: dimensions?.size,
            height: dimensions?.size,
          })}
      </div>

      {isInfo && <div>{t("dimensionsInfo.info")}</div>}
      {isWarning && <div>{t("dimensionsInfo.warning")}</div>}
      {isDanger && (
        <div>
          <Trans i18nKey="dimensionsInfo.danger" />
        </div>
      )}
    </div>
  );
}
