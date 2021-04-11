export default function SvgCut({ m, styles }) {
  const mark = 2.5;
  return (
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
      <line style={styles.mountain} x1={m.l_2} x2={m.l_2} y1={-m.w2} y2={m.w} />
      <line style={styles.valley} x1={-m.l_2} x2={-m.l_2} y1={m.w} y2={m.w2} />
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
      <line style={styles.valley} x1={m.w + m.l_2} x2={m.l_2} y1={m.w} y2={0} />

      {m.l < m.w_2 && (
        <>
          <line
            style={styles.mark}
            x1={m.l_2 - m.w}
            x2={m.l_2 - m.w}
            y1={-m.w2 + mark}
            y2={m.w2 - mark}
          />
          <path
            style={styles.mark}
            d={`M ${m.l_2 - m.w} ${-m.w}
              m ${mark} ${mark}
              l ${-mark} ${-mark}
              l ${mark} ${-mark}`}
          />
          <path
            style={styles.mark}
            d={`M ${m.l_2 - m.w} ${m.w}
              m ${mark} ${mark}
              l ${-mark} ${-mark}
              l ${mark} ${-mark}`}
          />
          <line
            style={styles.mark}
            x1={-m.l_2 + m.w}
            x2={-m.l_2 + m.w}
            y1={-m.w2 + mark}
            y2={m.w2 - mark}
          />
          <path
            style={styles.mark}
            d={`M ${-m.l_2 + m.w} ${-m.w}
              m ${-mark} ${mark}
              l ${mark} ${-mark}
              l ${-mark} ${-mark}`}
          />
          <path
            style={styles.mark}
            d={`M ${-m.l_2 + m.w} ${m.w}
              m ${-mark} ${mark}
              l ${mark} ${-mark}
              l ${-mark} ${-mark}`}
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
          <path
            style={styles.mark}
            d={`M ${m.l_2 - m.w} ${m.w}
              m ${mark} ${mark}
              l ${-mark} ${-mark}
              l ${mark} ${-mark}`}
          />
          <line
            style={styles.mark}
            x1={-m.l_2 + m.w}
            x2={-m.l_2 + m.w}
            y1={mark}
            y2={m.w2 - mark}
          />
          <path
            style={styles.mark}
            d={`M ${-m.l_2 + m.w} ${m.w}
              m ${-mark} ${mark}
              l ${mark} ${-mark}
              l ${-mark} ${-mark}`}
          />
        </>
      )}
    </g>
  );
}
