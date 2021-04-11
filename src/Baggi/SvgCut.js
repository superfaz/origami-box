export default function SvgCut({ d, styles }) {
  const mark = 2.5;
  return (
    <g>
      <rect
        style={styles.cut}
        x={-d.width / 2}
        y={-d.height / 2}
        width={d.width}
        height={d.height}
      />

      <line
        style={styles.mountain}
        x1={-d.w - d.l_2}
        x2={d.w + d.l_2}
        y1={0}
        y2={0}
      />
      <line
        style={styles.valley}
        x1={-d.w - d.l_2}
        x2={d.w + d.l_2}
        y1={d.w}
        y2={d.w}
      />
      <line
        style={styles.valley}
        x1={-d.w - d.l_2}
        x2={d.w + d.l_2}
        y1={-d.w}
        y2={-d.w}
      />

      <line
        style={styles.mountain}
        x1={-d.l_2}
        x2={-d.l_2}
        y1={-d.w2}
        y2={d.w}
      />
      <line style={styles.mountain} x1={d.l_2} x2={d.l_2} y1={-d.w2} y2={d.w} />
      <line style={styles.valley} x1={-d.l_2} x2={-d.l_2} y1={d.w} y2={d.w2} />
      <line style={styles.valley} x1={d.l_2} x2={d.l_2} y1={d.w} y2={d.w2} />

      <line
        style={styles.valley}
        x1={-d.w - d.l_2}
        x2={-d.l_2}
        y1={d.w}
        y2={d.w2}
      />
      <line
        style={styles.valley}
        x1={d.w + d.l_2}
        x2={d.l_2}
        y1={d.w}
        y2={d.w2}
      />

      <line
        style={styles.mountain}
        x1={-d.w - d.l_2}
        x2={-d.l_2}
        y1={-d.w2}
        y2={-d.w}
      />
      <line
        style={styles.mountain}
        x1={d.w + d.l_2}
        x2={d.l_2}
        y1={-d.w2}
        y2={-d.w}
      />

      <line
        style={styles.mountain}
        x1={-d.w - d.l_2}
        x2={-d.l_2}
        y1={-d.w}
        y2={0}
      />
      <line
        style={styles.mountain}
        x1={d.w + d.l_2}
        x2={d.l_2}
        y1={-d.w}
        y2={0}
      />

      <line
        style={styles.valley}
        x1={-d.w - d.l_2}
        x2={-d.l_2}
        y1={d.w}
        y2={0}
      />
      <line style={styles.valley} x1={d.w + d.l_2} x2={d.l_2} y1={d.w} y2={0} />

      {d.l < d.w_2 && (
        <>
          <line
            style={styles.mark}
            x1={d.l_2 - d.w}
            x2={d.l_2 - d.w}
            y1={-d.w2 + mark}
            y2={d.w2 - mark}
          />
          <path
            style={styles.mark}
            d={`M ${d.l_2 - d.w} ${-d.w}
              m ${mark} ${mark}
              l ${-mark} ${-mark}
              l ${mark} ${-mark}`}
          />
          <path
            style={styles.mark}
            d={`M ${d.l_2 - d.w} ${d.w}
              m ${mark} ${mark}
              l ${-mark} ${-mark}
              l ${mark} ${-mark}`}
          />
          <line
            style={styles.mark}
            x1={-d.l_2 + d.w}
            x2={-d.l_2 + d.w}
            y1={-d.w2 + mark}
            y2={d.w2 - mark}
          />
          <path
            style={styles.mark}
            d={`M ${-d.l_2 + d.w} ${-d.w}
              m ${-mark} ${mark}
              l ${mark} ${-mark}
              l ${-mark} ${-mark}`}
          />
          <path
            style={styles.mark}
            d={`M ${-d.l_2 + d.w} ${d.w}
              m ${-mark} ${mark}
              l ${mark} ${-mark}
              l ${-mark} ${-mark}`}
          />
        </>
      )}

      {!(d.l < d.w_2) && (
        <>
          <line
            style={styles.mark}
            x1={d.l_2 - d.w}
            x2={d.l_2 - d.w}
            y1={mark}
            y2={d.w2 - mark}
          />
          <path
            style={styles.mark}
            d={`M ${d.l_2 - d.w} ${d.w}
              m ${mark} ${mark}
              l ${-mark} ${-mark}
              l ${mark} ${-mark}`}
          />
          <line
            style={styles.mark}
            x1={-d.l_2 + d.w}
            x2={-d.l_2 + d.w}
            y1={mark}
            y2={d.w2 - mark}
          />
          <path
            style={styles.mark}
            d={`M ${-d.l_2 + d.w} ${d.w}
              m ${-mark} ${mark}
              l ${mark} ${-mark}
              l ${-mark} ${-mark}`}
          />
        </>
      )}
    </g>
  );
}
