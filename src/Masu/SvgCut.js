import { useMasuMeasurement } from "./helper";

export default function SvgCut({ masu, styles }) {
  const m = useMasuMeasurement(masu);
  const mark = 2.5;

  return (
    <g>
      <polygon style={styles.cut} points={`0,-${m.max_2} ${m.max_2},0 0,${m.max_2} -${m.max_2},0`} />

      <line style={styles.flip} x1={-m.w_2 - m.h} y1={-m.l_2 - m.h} x2={m.w_2 + m.h} y2={-m.l_2 - m.h} />
      <line style={styles.flip} x1={-m.w_2 - m.h2} y1={-m.l_2} x2={m.w_2 + m.h2} y2={-m.l_2} />
      <line style={styles.flip} x1={-m.w_2 - m.h2} y1={m.l_2} x2={m.w_2 + m.h2} y2={m.l_2} />
      <line style={styles.flip} x1={-m.w_2 - m.h} y1={m.l_2 + m.h} x2={m.w_2 + m.h} y2={m.l_2 + m.h} />
      <line style={styles.inverted} x1={-m.w_2} y1={-m.l_2 - m.h2} x2={m.w_2} y2={-m.l_2 - m.h2} />
      <line style={styles.inverted} x1={-m.w_2} y1={m.l_2 + m.h2} x2={m.w_2} y2={m.l_2 + m.h2} />

      <line style={styles.flip} x1={-m.w_2 - m.h} y1={-m.l_2 - m.h} x2={-m.w_2 - m.h} y2={m.l_2 + m.h} />
      <line style={styles.flip} x1={-m.w_2} y1={-m.l_2 - m.h2} x2={-m.w_2} y2={m.l_2 + m.h2} />
      <line style={styles.flip} x1={m.w_2} y1={-m.l_2 - m.h2} x2={m.w_2} y2={m.l_2 + m.h2} />
      <line style={styles.flip} x1={m.w_2 + m.h} y1={-m.l_2 - m.h} x2={m.w_2 + m.h} y2={m.l_2 + m.h} />
      <line style={styles.inverted} x1={-m.w_2 - m.h2} y1={-m.l_2} x2={-m.w_2 - m.h2} y2={m.l_2} />
      <line style={styles.inverted} x1={m.w_2 + m.h2} y1={-m.l_2} x2={m.w_2 + m.h2} y2={m.l_2} />

      <line style={styles.inverted} x1={-m.w_2 - m.h} y1={-m.l_2 - m.h} x2={-m.w_2} y2={-m.l_2} />
      <line style={styles.inverted} x1={m.w_2 + m.h} y1={-m.l_2 - m.h} x2={m.w_2} y2={-m.l_2} />
      <line style={styles.inverted} x1={-m.w_2 - m.h} y1={m.l_2 + m.h} x2={-m.w_2} y2={m.l_2} />
      <line style={styles.inverted} x1={m.w_2 + m.h} y1={m.l_2 + m.h} x2={m.w_2} y2={m.l_2} />

      <line style={styles.mark} x1={0} y1={m.l_2 - m.h2 - m.w_2} x2={-mark} y2={m.l_2 - m.h2 - m.w_2 + mark} />
      <line style={styles.mark} x1={0} y1={m.l_2 - m.h2 - m.w_2} x2={mark} y2={m.l_2 - m.h2 - m.w_2 + mark} />
      <line style={styles.mark} x1={0} y1={m.l_2 - m.w_2} x2={-mark} y2={m.l_2 - m.w_2 + mark} />
      <line style={styles.mark} x1={0} y1={m.l_2 - m.w_2} x2={mark} y2={m.l_2 - m.w_2 + mark} />

      <line style={styles.mark} x1={0} y1={-m.l_2 + m.h2 + m.w_2} x2={-mark} y2={-m.l_2 + m.h2 + m.w_2 - mark} />
      <line style={styles.mark} x1={0} y1={-m.l_2 + m.h2 + m.w_2} x2={mark} y2={-m.l_2 + m.h2 + m.w_2 - mark} />
      <line style={styles.mark} x1={0} y1={-m.l_2 + m.w_2} x2={-mark} y2={-m.l_2 + m.w_2 - mark} />
      <line style={styles.mark} x1={0} y1={-m.l_2 + m.w_2} x2={mark} y2={-m.l_2 + m.w_2 - mark} />

      <line style={styles.mark} x1={m.w_2 - m.h2 - m.l_2} y1={0} x2={m.w_2 - m.h2 - m.l_2 + mark} y2={-mark} />
      <line style={styles.mark} x1={m.w_2 - m.h2 - m.l_2} y1={0} x2={m.w_2 - m.h2 - m.l_2 + mark} y2={mark} />
      <line style={styles.mark} x1={m.w_2 - m.l_2} y1={0} x2={m.w_2 - m.l_2 + mark} y2={-mark} />
      <line style={styles.mark} x1={m.w_2 - m.l_2} y1={0} x2={m.w_2 - m.l_2 + mark} y2={mark} />

      <line style={styles.mark} x1={-m.w_2 + m.h2 + m.l_2} y1={0} x2={-m.w_2 + m.h2 + m.l_2 - mark} y2={-mark} />
      <line style={styles.mark} x1={-m.w_2 + m.h2 + m.l_2} y1={0} x2={-m.w_2 + m.h2 + m.l_2 - mark} y2={mark} />
      <line style={styles.mark} x1={-m.w_2 + m.l_2} y1={0} x2={-m.w_2 + m.l_2 - mark} y2={-mark} />
      <line style={styles.mark} x1={-m.w_2 + m.l_2} y1={0} x2={-m.w_2 + m.l_2 - mark} y2={mark} />
    </g>
  );
}
