import styles from './MasuTemplate.css';

export default function MasuTemplate(props) {
    const pageLength = parseFloat(props.pageLength);
    const pageWidth = parseFloat(props.pageWidth);

    const l = parseFloat(props.length);
    const w = parseFloat(props.width);
    const h = parseFloat(props.height);

    const side = props.side ?? 'recto';

    const max = l + 0.0 + w + 4.0 * h;

    const l_2 = l / 2.0;
    const w_2 = w / 2.0;
    const max_2 = max / 2.0;

    const h2 = h * 2.0;

    if (side === 'recto') {
        return (
            <svg viewBox={`${-pageWidth / 2} ${-pageLength / 2} ${pageWidth} ${pageLength}`} style={styles}>
                <g transform="rotate(0)">
                    <polygon className="cut" points={`0,-${max_2} ${max_2},0 0,${max_2} -${max_2},0`} />

                    <line className="flip" x1={-w_2 - h} y1={-l_2 - h} x2={w_2 + h} y2={-l_2 - h} />
                    <line className="flip" x1={-w_2 - h2} y1={-l_2} x2={w_2 + h2} y2={-l_2} />
                    <line className="flip" x1={-w_2 - h2} y1={l_2} x2={w_2 + h2} y2={l_2} />
                    <line className="flip" x1={-w_2 - h} y1={l_2 + h} x2={w_2 + h} y2={l_2 + h} />
                    <line className="inverted" x1={-w_2} y1={-l_2 - h2} x2={w_2} y2={-l_2 - h2} />
                    <line className="inverted" x1={-w_2} y1={l_2 + h2} x2={w_2} y2={l_2 + h2} />

                    <line className="flip" x1={-w_2 - h} y1={-l_2 - h} x2={-w_2 - h} y2={l_2 + h} />
                    <line className="flip" x1={-w_2} y1={-l_2 - h2} x2={-w_2} y2={l_2 + h2} />
                    <line className="flip" x1={w_2} y1={-l_2 - h2} x2={w_2} y2={l_2 + h2} />
                    <line className="flip" x1={w_2 + h} y1={-l_2 - h} x2={w_2 + h} y2={l_2 + h} />
                    <line className="inverted" x1={-w_2 - h2} y1={-l_2} x2={-w_2 - h2} y2={l_2} />
                    <line className="inverted" x1={w_2 + h2} y1={-l_2} x2={w_2 + h2} y2={l_2} />

                    <line className="inverted" x1={-w_2 - h} y1={-l_2 - h} x2={-w_2} y2={-l_2} />
                    <line className="inverted" x1={w_2 + h} y1={-l_2 - h} x2={w_2} y2={-l_2} />
                    <line className="inverted" x1={-w_2 - h} y1={l_2 + h} x2={-w_2} y2={l_2} />
                    <line className="inverted" x1={w_2 + h} y1={l_2 + h} x2={w_2} y2={l_2} />
                </g>
            </svg>
        );
    }
    else {
        return (
            <svg viewBox={`${-pageWidth / 2} ${-pageLength / 2} ${pageWidth} ${pageLength}`} style={styles}>
                <g transform="rotate(0)">
                    <polygon points={`0,-${max_2 + 5} ${max_2 + 5},0 0,${max_2 + 5} -${max_2 + 5},0`} style={{
                        fill: props.background
                    }} />

                    <polygon className="reference" points={`0,-${max_2} ${max_2},0 0,${max_2} -${max_2},0`} />

                    <line className="reference" x1={-w_2 - h} y1={-l_2 - h} x2={w_2 + h} y2={-l_2 - h} />
                    <line className="reference" x1={-w_2 - h2} y1={-l_2} x2={w_2 + h2} y2={-l_2} />
                    <line className="reference" x1={-w_2 - h2} y1={l_2} x2={w_2 + h2} y2={l_2} />
                    <line className="reference" x1={-w_2 - h} y1={l_2 + h} x2={w_2 + h} y2={l_2 + h} />
                    <line className="reference" x1={-w_2} y1={-l_2 - h2} x2={w_2} y2={-l_2 - h2} />
                    <line className="reference" x1={-w_2} y1={l_2 + h2} x2={w_2} y2={l_2 + h2} />

                    <line className="reference" x1={-w_2 - h} y1={-l_2 - h} x2={-w_2 - h} y2={l_2 + h} />
                    <line className="reference" x1={-w_2} y1={-l_2 - h2} x2={-w_2} y2={l_2 + h2} />
                    <line className="reference" x1={w_2} y1={-l_2 - h2} x2={w_2} y2={l_2 + h2} />
                    <line className="reference" x1={w_2 + h} y1={-l_2 - h} x2={w_2 + h} y2={l_2 + h} />
                    <line className="reference" x1={-w_2 - h2} y1={-l_2} x2={-w_2 - h2} y2={l_2} />
                    <line className="reference" x1={w_2 + h2} y1={-l_2} x2={w_2 + h2} y2={l_2} />

                    <line className="reference" x1={-w_2 - h} y1={-l_2 - h} x2={-w_2} y2={-l_2} />
                    <line className="reference" x1={w_2 + h} y1={-l_2 - h} x2={w_2} y2={-l_2} />
                    <line className="reference" x1={-w_2 - h} y1={l_2 + h} x2={-w_2} y2={l_2} />
                    <line className="reference" x1={w_2 + h} y1={l_2 + h} x2={w_2} y2={l_2} />

                    <text textAnchor="middle" dominantBaseline="middle" x={0} y={l_2 + h / 2} style={{ fontSize: 8 }}>
                        {props.frontText}
                    </text>
                </g>
            </svg>
        );
    }
}
