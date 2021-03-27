import QRCode from "qrcode.react";
import { SvgPaper } from "../Generic/Svg";
import { useMasuMeasurement } from "./helper";
import SvgCut from "./SvgCut";
import { useTemplate } from "../hooks";
import env from "../env";

const styles = {};
styles.line = {
  fill: "none",
  strokeWidth: 0.2,
};

styles.cut = {
  ...styles.line,
  stroke: "black",
};

styles.valley = {
  ...styles.cut,
  strokeDasharray: [4, 2],
};

styles.mountain = {
  ...styles.cut,
  strokeDasharray: [2, 1, 0.4, 1],
};

styles.mark = {
  ...styles.line,
  stroke: "blue",
};

export default function MasuTemplateFront({ lid = false, print = false }) {
  const { template, data: masu } = useTemplate();
  const m = useMasuMeasurement(masu, lid);

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
        <g
          transform={`translate(${-m.pageWidth / 2 + 10} ${
            -m.pageHeight / 2 + 10
          })`}
        >
          <text
            x="0"
            y="0"
            style={{
              fontFamily: "Open Sans",
              fontSize: 10,
              dominantBaseline: "text-before-edge",
            }}
          >
            {lid ? "Lid" : masu.withLid ? "Base" : "Box"}
            <tspan
              dx="10"
              dy="3"
              style={{
                fontSize: 7,
                fill: "#333",
              }}
            >
              {template.title}
            </tspan>
          </text>
        </g>
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
      {print && (
        <g
          transform={`translate(${m.pageWidth / 2 - 30} ${
            m.pageHeight / 2 - 30
          })`}
        >
          <QRCode renderAs="svg" size={20} value="https://www.corniro.com" />
          <text
            x="-10"
            y="20"
            style={{ fontFamily: "Open Sans", fontSize: 5, textAnchor: "end" }}
          >
            designed with corniro.com
          </text>
        </g>
      )}
    </SvgPaper>
  );
}
