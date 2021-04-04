import { buildDefaultStyles, SvgPaper } from "../Generic/Svg";
import { useTemplate } from "../hooks";
import { useBaggiDimensions } from "./helper";

export default function BaggiTemplateFront() {
  const { data: baggi } = useTemplate();
  const styles = buildDefaultStyles();
  const m = useBaggiDimensions(baggi);
  const mark = 2.5;

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
      <g>
        <rect
          style={styles.cut}
          x={-m.width / 2}
          y={-m.height / 2}
          width={m.width}
          height={m.height}
        />

        <line
          style={styles.mountain}
          x1={-m.w - m.l_2}
          x2={m.w + m.l_2}
          y1={0}
          y2={0}
        />
        <line
          style={styles.valley}
          x1={-m.w - m.l_2}
          x2={m.w + m.l_2}
          y1={m.w}
          y2={m.w}
        />
        <line
          style={styles.valley}
          x1={-m.w - m.l_2}
          x2={m.w + m.l_2}
          y1={-m.w}
          y2={-m.w}
        />

        <line
          style={styles.mountain}
          x1={-m.l_2}
          x2={-m.l_2}
          y1={-m.w2}
          y2={m.w}
        />
        <line
          style={styles.mountain}
          x1={m.l_2}
          x2={m.l_2}
          y1={-m.w2}
          y2={m.w}
        />
        <line
          style={styles.valley}
          x1={-m.l_2}
          x2={-m.l_2}
          y1={m.w}
          y2={m.w2}
        />
        <line style={styles.valley} x1={m.l_2} x2={m.l_2} y1={m.w} y2={m.w2} />

        <line
          style={styles.valley}
          x1={-m.w - m.l_2}
          x2={-m.l_2}
          y1={m.w}
          y2={m.w2}
        />
        <line
          style={styles.valley}
          x1={m.w + m.l_2}
          x2={m.l_2}
          y1={m.w}
          y2={m.w2}
        />

        <line
          style={styles.mountain}
          x1={-m.w - m.l_2}
          x2={-m.l_2}
          y1={-m.w2}
          y2={-m.w}
        />
        <line
          style={styles.mountain}
          x1={m.w + m.l_2}
          x2={m.l_2}
          y1={-m.w2}
          y2={-m.w}
        />

        <line
          style={styles.mountain}
          x1={-m.w - m.l_2}
          x2={-m.l_2}
          y1={-m.w}
          y2={0}
        />
        <line
          style={styles.mountain}
          x1={m.w + m.l_2}
          x2={m.l_2}
          y1={-m.w}
          y2={0}
        />

        <line
          style={styles.valley}
          x1={-m.w - m.l_2}
          x2={-m.l_2}
          y1={m.w}
          y2={0}
        />
        <line
          style={styles.valley}
          x1={m.w + m.l_2}
          x2={m.l_2}
          y1={m.w}
          y2={0}
        />

        {m.l < m.w_2 && (
          <>
            <line
              style={styles.mark}
              x1={m.l_2 - m.w}
              x2={m.l_2 - m.w}
              y1={-m.w2 + mark}
              y2={m.w2 - mark}
            />
            <line
              style={styles.mark}
              x1={-m.l_2 + m.w}
              x2={-m.l_2 + m.w}
              y1={-m.w2 + mark}
              y2={m.w2 - mark}
            />
          </>
        )}

        {!(m.l < m.w_2) && (
          <>
            <line
              style={styles.mark}
              x1={m.l_2 - m.w}
              x2={m.l_2 - m.w}
              y1={mark}
              y2={m.w2 - mark}
            />
            <line
              style={styles.mark}
              x1={-m.l_2 + m.w}
              x2={-m.l_2 + m.w}
              y1={mark}
              y2={m.w2 - mark}
            />
          </>
        )}
      </g>
    </SvgPaper>
  );
}
