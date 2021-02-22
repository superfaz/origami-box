import { useSelector } from "react-redux";
import QRCode from "qrcode.react";
import { SvgPaper } from "../Generic/Svg";
import { getMasu } from "../store";
import { useMasuMeasurement } from "./helper";
import SvgCut from "./SvgCut";

const styles = {};
styles.line = {
  fill: 'none',
  strokeWidth: 0.2,
};

styles.cut = {
  ...styles.line,
  stroke: 'black',
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
  stroke: 'blue',
};

export default function MasuTemplateFront({ lid = false, print = false }) {
  const masu = useSelector(getMasu);
  const pageLength = parseFloat(masu.pageLength);
  const pageWidth = parseFloat(masu.pageWidth);

  const m = useMasuMeasurement(masu, lid);
  if (m === null) {
    return (
      <SvgPaper className="template" pageWidth={pageWidth} pageHeight={pageLength}></SvgPaper>
    );
  }

  return (
    <SvgPaper className="template" pageWidth={pageWidth} pageHeight={pageLength}>
      <g transform="rotate(45)">
        <SvgCut m={m} styles={styles} />
      </g>

      {/* Footer for print */}
      {print &&
        <g transform={`translate(${pageWidth / 2 - 30} ${pageLength / 2 - 30})`}>
          <QRCode renderAs="svg" size={20} value="https://www.corniro.com" />
          <text x="-10" y="20" style={{ fontFamily: 'Open Sans', fontSize: 5, textAnchor: "end" }}>designed with corniro.com</text>
        </g>
      }

    </SvgPaper>
  );
}
