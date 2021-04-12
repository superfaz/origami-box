import { buildDefaultStyles, SvgPaper } from "../Generic/Svg";
import { useMasuDimensions } from "./helper";
import { useTemplate } from "../hooks";
import SvgCut from "./SvgCut";
import SvgHeader from "../Generic/SvgHeader";
import SvgFooter from "../Generic/SvgFooter";

export default function MasuTemplateFront({ lid = false, print = false }) {
  const { template, data: masu } = useTemplate();
  const d = useMasuDimensions(masu, lid);
  const styles = buildDefaultStyles();

  if (d === null) {
    return <SvgPaper className="template" pageWidth={210} pageHeight={297} />;
  }

  return (
    <SvgPaper
      className="template"
      pageWidth={d.pageWidth}
      pageHeight={d.pageHeight}
    >
      {/* Header for print */}
      {print && (
        <SvgHeader
          dimensions={d}
          blockName={lid ? "Lid" : masu.withLid ? "Base" : "Box"}
          title={template.title}
        />
      )}

      <g transform="rotate(45)">
        <SvgCut d={d} styles={styles} />
      </g>

      {/* Footer for print */}
      {print && <SvgFooter dimensions={d} />}
    </SvgPaper>
  );
}
