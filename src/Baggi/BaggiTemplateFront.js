import { buildDefaultStyles, SvgPaper } from "../Generic/Svg";
import { useTemplate } from "../hooks";
import { useBaggiDimensions } from "./helper";
import SvgCut from "./SvgCut";

export default function BaggiTemplateFront() {
  const { data: baggi } = useTemplate();
  const styles = buildDefaultStyles();
  const d = useBaggiDimensions(baggi);

  if (d === null) {
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
      pageWidth={d.pageWidth}
      pageHeight={d.pageHeight}
    >
      <SvgCut d={d} styles={styles} />
    </SvgPaper>
  );
}
