import { buildDefaultStyles, SvgPaper } from "../Generic/Svg";
import { useTemplate } from "../hooks";
import { useBaggiDimensions } from "./helper";
import SvgCut from "./SvgCut";

export default function BaggiTemplateFront() {
  const { data: baggi } = useTemplate();
  const styles = buildDefaultStyles();
  const m = useBaggiDimensions(baggi);

  if (m === null) {
    return (
      <SvgPaper
        className="template"
        pageWidth={210}
        pageHeight={297}
      ></SvgPaper>
    );
  }

  return (
    <SvgPaper
      className="template"
      pageWidth={m.pageWidth}
      pageHeight={m.pageHeight}
    >
      <SvgCut m={m} styles={styles} />
    </SvgPaper>
  );
}
