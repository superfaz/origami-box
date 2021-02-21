import { useSelector } from "react-redux";
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

export default function MasuTemplateFront({ lid = false }) {
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
    </SvgPaper>
  );
}
