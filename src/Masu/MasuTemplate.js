import { connect } from 'react-redux';
import { getMasu } from '../store';
import { configureFace } from './helper';
import Color from 'color';

const lineStyle = {
    fill: 'none',
    strokeWidth: 0.2,
};

const cutStyle = {
    ...lineStyle,
    stroke: 'black',
};

const flipStyle = {
    ...cutStyle,
    strokeDasharray: [4,2], 
};

const invertedStyle = {
    ...cutStyle,
    strokeDasharray: [2,4], 
};

const markStyle = {
    ...lineStyle,
    stroke: 'blue',
};

const referenceStyle = {
    ...lineStyle,
    stroke: 'gray',
    strokeDasharray: [0.4, 0.8], 
};

const Svg = ({...rest}) =>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" {...rest} />

function MasuTemplate(props) {
    const pageLength = parseFloat(props.pageLength);
    const pageWidth = parseFloat(props.pageWidth);

    const l = parseFloat(props.length);
    const w = parseFloat(props.width);
    const h = parseFloat(props.height);

    if (isNaN(l + w + h) || l <= 0 || w <= 0 || h <= 0) {
        return (
            <Svg className="template" viewBox={`${-pageWidth / 2} ${-pageLength / 2} ${pageWidth} ${pageLength}`}></Svg>
        );
    }

    const side = props.side ?? 'front';

    const max = l + 0.0 + w + 4.0 * h;

    const l_2 = l / 2.0;
    const w_2 = w / 2.0;
    const h_2 = h / 2.0;
    const max_2 = max / 2.0;

    const h2 = h * 2.0;
    const mark = 2.5;

    function Text(props) {
        let configuration = { textAnchor: "middle", dominantBaseline: "middle", x: null, y: null, rotate: null };
        const text = props.text;
        configureFace(configuration, text.face, l_2, w_2, h_2);

        return (
            <text textAnchor={configuration.textAnchor} dominantBaseline={configuration.dominantBaseline}
                x={configuration.x} y={configuration.y}
                transform={`rotate(${configuration.rotate} ${configuration.x} ${configuration.y})`}
                style={{ fontSize: 8 }}>
                {text.content}
            </text>
        );
    }

    if (side === 'front') {
        return (
            <Svg className="template" viewBox={`${-pageWidth / 2} ${-pageLength / 2} ${pageWidth} ${pageLength}`}
                width={`${pageWidth}mm`} height={`${pageLength}mm`}>
                <g transform="rotate(45)">
                    <polygon style={cutStyle} points={`0,-${max_2} ${max_2},0 0,${max_2} -${max_2},0`} />

                    <line style={flipStyle} x1={-w_2 - h} y1={-l_2 - h} x2={w_2 + h} y2={-l_2 - h} />
                    <line style={flipStyle} x1={-w_2 - h2} y1={-l_2} x2={w_2 + h2} y2={-l_2} />
                    <line style={flipStyle} x1={-w_2 - h2} y1={l_2} x2={w_2 + h2} y2={l_2} />
                    <line style={flipStyle} x1={-w_2 - h} y1={l_2 + h} x2={w_2 + h} y2={l_2 + h} />
                    <line style={invertedStyle} x1={-w_2} y1={-l_2 - h2} x2={w_2} y2={-l_2 - h2} />
                    <line style={invertedStyle} x1={-w_2} y1={l_2 + h2} x2={w_2} y2={l_2 + h2} />

                    <line style={flipStyle} x1={-w_2 - h} y1={-l_2 - h} x2={-w_2 - h} y2={l_2 + h} />
                    <line style={flipStyle} x1={-w_2} y1={-l_2 - h2} x2={-w_2} y2={l_2 + h2} />
                    <line style={flipStyle} x1={w_2} y1={-l_2 - h2} x2={w_2} y2={l_2 + h2} />
                    <line style={flipStyle} x1={w_2 + h} y1={-l_2 - h} x2={w_2 + h} y2={l_2 + h} />
                    <line style={invertedStyle} x1={-w_2 - h2} y1={-l_2} x2={-w_2 - h2} y2={l_2} />
                    <line style={invertedStyle} x1={w_2 + h2} y1={-l_2} x2={w_2 + h2} y2={l_2} />

                    <line style={invertedStyle} x1={-w_2 - h} y1={-l_2 - h} x2={-w_2} y2={-l_2} />
                    <line style={invertedStyle} x1={w_2 + h} y1={-l_2 - h} x2={w_2} y2={-l_2} />
                    <line style={invertedStyle} x1={-w_2 - h} y1={l_2 + h} x2={-w_2} y2={l_2} />
                    <line style={invertedStyle} x1={w_2 + h} y1={l_2 + h} x2={w_2} y2={l_2} />

                    <line style={markStyle} x1={0} y1={l_2 - h2 - w_2} x2={-mark} y2={l_2 - h2 - w_2 + mark} />
                    <line style={markStyle} x1={0} y1={l_2 - h2 - w_2} x2={mark} y2={l_2 - h2 - w_2 + mark} />
                    <line style={markStyle} x1={0} y1={l_2 - w_2} x2={-mark} y2={l_2 - w_2 + mark} />
                    <line style={markStyle} x1={0} y1={l_2 - w_2} x2={mark} y2={l_2 - w_2 + mark} />

                    <line style={markStyle} x1={0} y1={-l_2 + h2 + w_2} x2={-mark} y2={-l_2 + h2 + w_2 - mark} />
                    <line style={markStyle} x1={0} y1={-l_2 + h2 + w_2} x2={mark} y2={-l_2 + h2 + w_2 - mark} />
                    <line style={markStyle} x1={0} y1={-l_2 + w_2} x2={-mark} y2={-l_2 + w_2 - mark} />
                    <line style={markStyle} x1={0} y1={-l_2 + w_2} x2={mark} y2={-l_2 + w_2 - mark} />

                    <line style={markStyle} x1={w_2 - h2 - l_2} y1={0} x2={w_2 - h2 - l_2 + mark} y2={-mark} />
                    <line style={markStyle} x1={w_2 - h2 - l_2} y1={0} x2={w_2 - h2 - l_2 + mark} y2={mark} />
                    <line style={markStyle} x1={w_2 - l_2} y1={0} x2={w_2 - l_2 + mark} y2={-mark} />
                    <line style={markStyle} x1={w_2 - l_2} y1={0} x2={w_2 - l_2 + mark} y2={mark} />

                    <line style={markStyle} x1={-w_2 + h2 + l_2} y1={0} x2={-w_2 + h2 + l_2 - mark} y2={-mark} />
                    <line style={markStyle} x1={-w_2 + h2 + l_2} y1={0} x2={-w_2 + h2 + l_2 - mark} y2={mark} />
                    <line style={markStyle} x1={-w_2 + l_2} y1={0} x2={-w_2 + l_2 - mark} y2={-mark} />
                    <line style={markStyle} x1={-w_2 + l_2} y1={0} x2={-w_2 + l_2 - mark} y2={mark} />
                </g>
            </Svg>
        );
    }
    else {
        const color = Color(props.detail.background);
        const style = { ...referenceStyle, stroke: color.isDark() ? 'white' : 'black' };
        return (
            <svg className="template" viewBox={`${-pageWidth / 2} ${-pageLength / 2} ${pageWidth} ${pageLength}`}
                width={`${pageWidth}mm`} height={`${pageLength}mm`}>
                <defs>
                    <clipPath id="cut-off-background">
                        <polygon points={`0,-${max_2} ${max_2},0 0,${max_2} -${max_2},0`} />
                    </clipPath>
                </defs>

                <g transform="rotate(-45)">
                    <polygon points={`0,-${max_2 + 5} ${max_2 + 5},0 0,${max_2 + 5} -${max_2 + 5},0`} style={{
                        fill: props.detail.background
                    }} />

                    {Boolean(props.detail.backgroundImage) &&
                        <image href={props.detail.backgroundImage} x={-max_2} y={-max_2} width={max} height={max}
                            preserveAspectRatio="none" clipPath="url(#cut-off-background)" />
                    }

                    <polygon style={style} points={`0,-${max_2} ${max_2},0 0,${max_2} -${max_2},0`} />

                    <line style={style} x1={-w_2 - h} y1={-l_2 - h} x2={w_2 + h} y2={-l_2 - h} />
                    <line style={style} x1={-w_2 - h2} y1={-l_2} x2={w_2 + h2} y2={-l_2} />
                    <line style={style} x1={-w_2 - h2} y1={l_2} x2={w_2 + h2} y2={l_2} />
                    <line style={style} x1={-w_2 - h} y1={l_2 + h} x2={w_2 + h} y2={l_2 + h} />
                    <line style={style} x1={-w_2} y1={-l_2 - h2} x2={w_2} y2={-l_2 - h2} />
                    <line style={style} x1={-w_2} y1={l_2 + h2} x2={w_2} y2={l_2 + h2} />

                    <line style={style} x1={-w_2 - h} y1={-l_2 - h} x2={-w_2 - h} y2={l_2 + h} />
                    <line style={style} x1={-w_2} y1={-l_2 - h2} x2={-w_2} y2={l_2 + h2} />
                    <line style={style} x1={w_2} y1={-l_2 - h2} x2={w_2} y2={l_2 + h2} />
                    <line style={style} x1={w_2 + h} y1={-l_2 - h} x2={w_2 + h} y2={l_2 + h} />
                    <line style={style} x1={-w_2 - h2} y1={-l_2} x2={-w_2 - h2} y2={l_2} />
                    <line style={style} x1={w_2 + h2} y1={-l_2} x2={w_2 + h2} y2={l_2} />

                    <line style={style} x1={-w_2 - h} y1={-l_2 - h} x2={-w_2} y2={-l_2} />
                    <line style={style} x1={w_2 + h} y1={-l_2 - h} x2={w_2} y2={-l_2} />
                    <line style={style} x1={-w_2 - h} y1={l_2 + h} x2={-w_2} y2={l_2} />
                    <line style={style} x1={w_2 + h} y1={l_2 + h} x2={w_2} y2={l_2} />

                    {props.detail.texts.map((text, i) =>
                        <Text key={i} text={text} />
                    )}

                    {props.text !== undefined &&
                        <Text key='new' text={props.text} />
                    }
                </g>
            </svg>
        );
    }
}

export default connect(state => getMasu(state))(MasuTemplate);
