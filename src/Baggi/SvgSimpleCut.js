export default function SvgSimpleCut({ d, styles }) {
  return (
    <g>
      <line
        style={styles.valley}
        x1={-d.l_2}
        x2={d.l_2}
        y1={-3.0 * d.w_2}
        y2={-3.0 * d.w_2}
      />
      <line
        style={styles.valley}
        x1={-d.l_2 - d.w}
        x2={d.l_2 + d.w}
        y1={-d.w_2}
        y2={-d.w_2}
      />
      <line
        style={styles.valley}
        x1={-d.l_2 - d.w}
        x2={d.l_2 + d.w}
        y1={d.w_2}
        y2={d.w_2}
      />
      <line
        style={styles.valley}
        x1={-d.l_2}
        x2={d.l_2}
        y1={3.0 * d.w_2}
        y2={3.0 * d.w_2}
      />

      <line
        style={styles.valley}
        x1={-d.l_2 - d.w}
        x2={-d.l_2 - d.w}
        y1={-d.w_2}
        y2={d.w_2}
      />
      <line
        style={styles.valley}
        x1={-d.l_2}
        x2={-d.l_2}
        y1={-3.0 * d.w_2}
        y2={3.0 * d.w_2}
      />
      <line
        style={styles.valley}
        x1={d.l_2}
        x2={d.l_2}
        y1={-3.0 * d.w_2}
        y2={3.0 * d.w_2}
      />
      <line
        style={styles.valley}
        x1={d.l_2 + d.w}
        x2={d.l_2 + d.w}
        y1={-d.w_2}
        y2={d.w_2}
      />
    </g>
  );
}
