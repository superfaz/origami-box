import { buildReferenceStyles, SvgPaper } from "../Generic/Svg";
import { useTemplate } from "../hooks";
import { useBaggiDimensions } from "./helper";
import SvgCut from "./SvgCut";

export default function BaggiTemplateVerso() {
  const { data: baggi, blockData } = useTemplate();
  const styles = buildReferenceStyles(blockData.versoColor);
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
      <rect
        x={-d.width / 2 - 5}
        y={-d.height / 2 - 5}
        width={d.width + 10}
        height={d.height + 10}
        style={{
          fill: blockData.versoColor,
        }}
      />

      <SvgCut d={d} styles={styles} />
    </SvgPaper>
  );
}
