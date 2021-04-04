import { buildDefaultStyles, SvgPaper } from "../Generic/Svg";
import { useMasuMeasurement } from "./helper";
import { useTemplate } from "../hooks";
import env from "../env";
import SvgCut from "./SvgCut";
import SvgHeader from "../Generic/SvgHeader";
import SvgFooter from "../Generic/SvgFooter";

export default function MasuTemplateFront({ lid = false, print = false }) {
  const { template, data: masu } = useTemplate();
  const m = useMasuMeasurement(masu, lid);
  const styles = buildDefaultStyles();

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
      {/* Header for print */}
      {print && (
        <SvgHeader
          dimensions={m}
          blockName={lid ? "Lid" : masu.withLid ? "Base" : "Box"}
          title={template.title}
        />
      )}

      {env.debug.svg && (
        <g transform={`translate(${-m.pageWidth / 2} ${-m.pageHeight / 2})`}>
          <line
            x1={0}
            y1={5}
            x2={m.pageWidth}
            y2={5}
            style={{ stroke: "gray", strokeWidth: 0.2 }}
          />
          <line
            x1={5}
            y1={0}
            x2={5}
            y2={m.pageHeight}
            style={{ stroke: "gray", strokeWidth: 0.2 }}
          />
          <circle cx={0} cy={5} r={1} style={{ fill: "red" }} />
          <circle cx={210} cy={5} r={1} style={{ fill: "red" }} />
          <circle cx={5} cy={0} r={1} style={{ fill: "red" }} />
          <circle cx={5} cy={297} r={1} style={{ fill: "red" }} />
        </g>
      )}

      <g transform="rotate(45)">
        <SvgCut m={m} styles={styles} />
      </g>

      {/* Footer for print */}
      {print && <SvgFooter dimensions={m} />}
    </SvgPaper>
  );
}
