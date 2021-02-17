import { useSelector } from 'react-redux';
import { getMasu } from '../store';
import { configurePositioning, configurePositioningSimple, getFonts, getTexts, getImages } from './helper';
import Color from 'color';
import { Helmet } from 'react-helmet';
import { useEffect, useRef, useState } from 'react';
import { SvgPaper } from '../Generic/Svg';

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
  strokeDasharray: [4, 2],
};

const invertedStyle = {
  ...cutStyle,
  strokeDasharray: [2, 4],
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

export default function MasuTemplate(props) {
  const masu = useSelector(getMasu);
  const pageLength = parseFloat(masu.pageLength);
  const pageWidth = parseFloat(masu.pageWidth);

  const l = parseFloat(masu.length);
  const w = parseFloat(masu.width);
  const h = parseFloat(masu.height);

  if (isNaN(l + w + h) || l <= 0 || w <= 0 || h <= 0) {
    return (
      <SvgPaper className="template" pageWidth={pageWidth} pageHeight={pageLength}></SvgPaper>
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
    const text = props.text;
    const textRef = useRef(null);
    const [box, setBox] = useState(null);

    const { configuration, style } = configurePositioning(text, l_2, w_2, h_2);
    style.fontSize = text.size;
    style.fill = text.color;
    style.lineHeight = 1;

    if (text.family !== '') {
      style.fontFamily = text.family;
    }

    useEffect(() => setBox(textRef.current?.getBBox()), [textRef, text, text.content, text.family]);

    return (
      <g transform={`rotate(${configuration.rotate} ${configuration.x} ${configuration.y})`}>
        {box && process.env.REACT_APP_SVG_DEBUG &&
          <rect x={box.x} y={box.y} width={box.width} height={box.height} style={{ strokeWidth: 0.2 }}
            stroke="black" fill="yellow" />
        }
        <text ref={textRef} style={style} x={configuration.x} y={configuration.y}>
          {text.content}
        </text>
      </g>
    );
  }

  function Image(props) {
    const { image } = props;
    const configuration = configurePositioningSimple(image, l_2, w_2, h_2);

    return (
      <g transform={`rotate(${configuration.rotate} ${configuration.x} ${configuration.y})`}>
        <image href={image.content} x={configuration.x - h_2} y={configuration.y - h_2} height={h} />
      </g>
    );
  }

  if (side === 'front') {
    return (
      <SvgPaper className="template" pageWidth={pageWidth} pageHeight={pageLength}>
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
      </SvgPaper>
    );
  }
  else {
    const color = Color(props.detail.background);
    const withoutReference = props.print ?? false;
    const style = {
      ...referenceStyle,
      stroke: color.isDark() ? 'white' : 'black',
      display: withoutReference ? 'none' : 'inline',
    };

    const fonts = getFonts(masu)
      .map(f => 'family=' + f.replace(' ', '+'))
      .join('&');
    const fontHref = `https://fonts.googleapis.com/css2?${fonts}&display=block`;
    return (
      <SvgPaper className="template" pageWidth={pageWidth} pageHeight={pageLength}>
        <Helmet>
          {props.text && props.text.family &&
            <link rel="stylesheet" href={"https://fonts.googleapis.com/css2?family=" + props.text.family.replace(' ', '+')} />
          }
          {fonts !== '' &&
            <link rel="stylesheet" href={"https://fonts.googleapis.com/css2?" + fonts} />
          }
        </Helmet>
        <defs>
          <clipPath id="cut-off-background">
            <polygon points={`0,-${max_2} ${max_2},0 0,${max_2} -${max_2},0`} />
          </clipPath>
        </defs>

        <g transform="rotate(135)">
          <polygon points={`0,-${max_2 + 5} ${max_2 + 5},0 0,${max_2 + 5} -${max_2 + 5},0`} style={{
            fill: props.detail.background
          }} />

          {Boolean(props.detail.backgroundImage) &&
            <g transform="rotate(180)">
              <image href={props.detail.backgroundImage} x={-max_2} y={-max_2} width={max} height={max}
                preserveAspectRatio="none" clipPath="url(#cut-off-background)" />
            </g>
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

          {getTexts(masu).map((text) =>
            <Text key={text.key} text={text} />
          )}

          {props.text !== undefined &&
            <Text key='new' text={props.text} />
          }

          {getImages(masu).map((image) =>
            <Image key={image.key} image={image} />
          )}

          {props.image !== undefined &&
            <Image key='new' image={props.image} />
          }
        </g>
      </SvgPaper>
    );
  }
}
