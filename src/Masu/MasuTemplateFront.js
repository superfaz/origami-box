import { buildDefaultStyles, SvgPaper } from "../Generic/Svg";
import { useMasuDimensions } from "./helper";
import { useTemplate } from "../hooks";
import env from "../env";
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

      {env.debug.svg && (
        <g transform={`translate(${-d.pageWidth / 2} ${-d.pageHeight / 2})`}>
          <line
            x1={0}
            y1={5}
            x2={d.pageWidth}
            y2={5}
            style={{ stroke: "gray", strokeWidth: 0.2 }}
          />
          <line
            x1={5}
            y1={0}
            x2={5}
            y2={d.pageHeight}
            style={{ stroke: "gray", strokeWidth: 0.2 }}
          />
          <circle cx={0} cy={5} r={1} style={{ fill: "red" }} />
          <circle cx={210} cy={5} r={1} style={{ fill: "red" }} />
          <circle cx={5} cy={0} r={1} style={{ fill: "red" }} />
          <circle cx={5} cy={297} r={1} style={{ fill: "red" }} />
        </g>
      )}

      <g transform="rotate(45)">
        <SvgCut d={d} styles={styles} />
      </g>

      {/* Footer for print */}
      {print && <SvgFooter dimensions={d} />}
    </SvgPaper>
  );
}
