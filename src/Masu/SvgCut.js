export default function SvgCut({ d, styles }) {
  const mark = 2.5;

  return (
    <g>
      <polygon
        style={styles.cut}
        points={`0,-${d.max_2} ${d.max_2},0 0,${d.max_2} -${d.max_2},0`}
      />

      <line
        style={styles.valley}
        x1={-d.w_2 - d.h}
        y1={-d.l_2 - d.h}
        x2={d.w_2 + d.h}
        y2={-d.l_2 - d.h}
      />
      <line
        style={styles.valley}
        x1={-d.w_2 - d.h2}
        y1={-d.l_2}
        x2={d.w_2 + d.h2}
        y2={-d.l_2}
      />
      <line
        style={styles.valley}
        x1={-d.w_2 - d.h2}
        y1={d.l_2}
        x2={d.w_2 + d.h2}
        y2={d.l_2}
      />
      <line
        style={styles.valley}
        x1={-d.w_2 - d.h}
        y1={d.l_2 + d.h}
        x2={d.w_2 + d.h}
        y2={d.l_2 + d.h}
      />
      <line
        style={styles.mountain}
        x1={-d.w_2}
        y1={-d.l_2 - d.h2}
        x2={d.w_2}
        y2={-d.l_2 - d.h2}
      />
      <line
        style={styles.mountain}
        x1={-d.w_2}
        y1={d.l_2 + d.h2}
        x2={d.w_2}
        y2={d.l_2 + d.h2}
      />

      <line
        style={styles.valley}
        x1={-d.w_2 - d.h}
        y1={-d.l_2 - d.h}
        x2={-d.w_2 - d.h}
        y2={d.l_2 + d.h}
      />
      <line
        style={styles.valley}
        x1={-d.w_2}
        y1={-d.l_2 - d.h2}
        x2={-d.w_2}
        y2={d.l_2 + d.h2}
      />
      <line
        style={styles.valley}
        x1={d.w_2}
        y1={-d.l_2 - d.h2}
        x2={d.w_2}
        y2={d.l_2 + d.h2}
      />
      <line
        style={styles.valley}
        x1={d.w_2 + d.h}
        y1={-d.l_2 - d.h}
        x2={d.w_2 + d.h}
        y2={d.l_2 + d.h}
      />
      <line
        style={styles.mountain}
        x1={-d.w_2 - d.h2}
        y1={-d.l_2}
        x2={-d.w_2 - d.h2}
        y2={d.l_2}
      />
      <line
        style={styles.mountain}
        x1={d.w_2 + d.h2}
        y1={-d.l_2}
        x2={d.w_2 + d.h2}
        y2={d.l_2}
      />

      <line
        style={styles.mountain}
        x1={-d.w_2 - d.h}
        y1={-d.l_2 - d.h}
        x2={-d.w_2}
        y2={-d.l_2}
      />
      <line
        style={styles.mountain}
        x1={d.w_2 + d.h}
        y1={-d.l_2 - d.h}
        x2={d.w_2}
        y2={-d.l_2}
      />
      <line
        style={styles.mountain}
        x1={-d.w_2 - d.h}
        y1={d.l_2 + d.h}
        x2={-d.w_2}
        y2={d.l_2}
      />
      <line
        style={styles.mountain}
        x1={d.w_2 + d.h}
        y1={d.l_2 + d.h}
        x2={d.w_2}
        y2={d.l_2}
      />

      <line
        style={styles.mark}
        x1={0}
        y1={d.l_2 - d.h2 - d.w_2}
        x2={-mark}
        y2={d.l_2 - d.h2 - d.w_2 + mark}
      />
      <line
        style={styles.mark}
        x1={0}
        y1={d.l_2 - d.h2 - d.w_2}
        x2={mark}
        y2={d.l_2 - d.h2 - d.w_2 + mark}
      />
      <line
        style={styles.mark}
        x1={0}
        y1={d.l_2 - d.w_2}
        x2={-mark}
        y2={d.l_2 - d.w_2 + mark}
      />
      <line
        style={styles.mark}
        x1={0}
        y1={d.l_2 - d.w_2}
        x2={mark}
        y2={d.l_2 - d.w_2 + mark}
      />

      <line
        style={styles.mark}
        x1={0}
        y1={-d.l_2 + d.h2 + d.w_2}
        x2={-mark}
        y2={-d.l_2 + d.h2 + d.w_2 - mark}
      />
      <line
        style={styles.mark}
        x1={0}
        y1={-d.l_2 + d.h2 + d.w_2}
        x2={mark}
        y2={-d.l_2 + d.h2 + d.w_2 - mark}
      />
      <line
        style={styles.mark}
        x1={0}
        y1={-d.l_2 + d.w_2}
        x2={-mark}
        y2={-d.l_2 + d.w_2 - mark}
      />
      <line
        style={styles.mark}
        x1={0}
        y1={-d.l_2 + d.w_2}
        x2={mark}
        y2={-d.l_2 + d.w_2 - mark}
      />

      <line
        style={styles.mark}
        x1={d.w_2 - d.h2 - d.l_2}
        y1={0}
        x2={d.w_2 - d.h2 - d.l_2 + mark}
        y2={-mark}
      />
      <line
        style={styles.mark}
        x1={d.w_2 - d.h2 - d.l_2}
        y1={0}
        x2={d.w_2 - d.h2 - d.l_2 + mark}
        y2={mark}
      />
      <line
        style={styles.mark}
        x1={d.w_2 - d.l_2}
        y1={0}
        x2={d.w_2 - d.l_2 + mark}
        y2={-mark}
      />
      <line
        style={styles.mark}
        x1={d.w_2 - d.l_2}
        y1={0}
        x2={d.w_2 - d.l_2 + mark}
        y2={mark}
      />

      <line
        style={styles.mark}
        x1={-d.w_2 + d.h2 + d.l_2}
        y1={0}
        x2={-d.w_2 + d.h2 + d.l_2 - mark}
        y2={-mark}
      />
      <line
        style={styles.mark}
        x1={-d.w_2 + d.h2 + d.l_2}
        y1={0}
        x2={-d.w_2 + d.h2 + d.l_2 - mark}
        y2={mark}
      />
      <line
        style={styles.mark}
        x1={-d.w_2 + d.l_2}
        y1={0}
        x2={-d.w_2 + d.l_2 - mark}
        y2={-mark}
      />
      <line
        style={styles.mark}
        x1={-d.w_2 + d.l_2}
        y1={0}
        x2={-d.w_2 + d.l_2 - mark}
        y2={mark}
      />

      {d.l > d.w && (
        <g>
          <line
            style={styles.mark}
            x1={-d.w - d.h2}
            y1={-d.l_2 + d.w_2}
            x2={-d.w - d.h2}
            y2={d.l_2 - d.w_2}
          />
          <line
            style={styles.mark}
            x1={d.w + d.h2}
            y1={-d.l_2 + d.w_2}
            x2={d.w + d.h2}
            y2={d.l_2 - d.w_2}
          />
        </g>
      )}
      {d.l < d.w && (
        <g>
          <line
            style={styles.mark}
            x1={-d.w_2 + d.l_2}
            y1={-d.l - d.h2}
            x2={d.w_2 - d.l_2}
            y2={-d.l - d.h2}
          />
          <line
            style={styles.mark}
            x1={-d.w_2 + d.l_2}
            y1={d.l + d.h2}
            x2={d.w_2 - d.l_2}
            y2={d.l + d.h2}
          />
        </g>
      )}
    </g>
  );
}
