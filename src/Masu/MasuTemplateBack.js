import { useSelector } from 'react-redux';
import { getMasu } from '../store';
import { configurePositioning, configureFace, getFonts, getTexts, getImages, useMasuMeasurement, loadImageAsync } from './helper';
import Color from 'color';
import { Helmet } from 'react-helmet';
import { useEffect, useRef, useState } from 'react';
import { SvgPaper } from '../Generic/Svg';
import SvgCut from './SvgCut';
import { createFaces } from './faces';

const referenceStyle = {
  fill: 'none',
  strokeWidth: 0.2,
  stroke: 'gray',
  strokeDasharray: [0.4, 0.8],
};

const noneStyle = {
  fill: 'none',
  stroke: 'none',
};

export default function MasuTemplateBack({ detail, print = false, text = null, image = null }) {
  const masu = useSelector(getMasu);
  const pageLength = parseFloat(masu.pageLength);
  const pageWidth = parseFloat(masu.pageWidth);
  const images = getImages(masu, image)
  const texts = getTexts(masu, text);

  const m = useMasuMeasurement(masu);
  const faces = createFaces(m.l_2, m.w_2, m.h_2);

  if (m === null) {
    return (
      <SvgPaper className="template" pageWidth={pageWidth} pageHeight={pageLength}></SvgPaper>
    );
  }

  function Text({ text }) {
    const textRef = useRef(null);
    const [box, setBox] = useState(null);

    const { configuration, style } = configurePositioning(text, m.l_2, m.w_2, m.h_2);
    style.fontSize = text.size;
    style.fill = text.color;
    style.lineHeight = 1;

    if (text.family !== '') {
      style.fontFamily = text.family;
    }

    useEffect(() => setBox(textRef.current?.getBBox()), [textRef, text, text.content, text.family]);

    return (
      <g>
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

  function Image({ image }) {
    if (image.content === null) {
      // Image file not provided
      return null;
    }

    const face = configureFace(image, m.l_2, m.w_2, m.h_2);
    let width = image.size === 'auto' ? null : parseFloat(image.width);
    let height = image.size === 'auto' ? null : parseFloat(image.height);
    let x = face.x;
    let y = face.y;

    if (image.size === 'auto') {
      if (face.width >= face.height) {
        height = face.height - 2 * image.marginVertical;
        width = image.originalWidth * height / image.originalHeight;
      }
      else {
        width = face.width - 2 * image.marginHorizontal;
        height = image.originalHeight * width / image.originalWidth;
      }
    }

    if (width === null || height === null || isNaN(width) || isNaN(height)) {
      // Manual size not provided
      return null;
    }

    switch (image.horizontal) {
      case 'left':
        x -= face.hori - image.marginHorizontal;
        break;
      case 'center':
        x -= width / 2;
        break;
      case 'right':
        x += face.hori - width - image.marginHorizontal;
        break;
    }

    switch (image.vertical) {
      case 'top':
        y -= face.vert - image.marginVertical;
        break;
      case 'middle':
        y -= height / 2;
        break;
      case 'bottom':
        y += face.vert - height - image.marginVertical;
        break;
    }

    return (
      <image href={image.content} x={x} y={y} width={width} height={height} />
    );
  }

  const color = Color(detail.background);
  const style = {
    ...referenceStyle,
    stroke: color.isDark() ? 'white' : 'black',
    display: print ? 'none' : 'inline',
  };
  const styles = {
    line: style,
    cut: style,
    flip: style,
    inverted: style,
    mark: noneStyle
  };

  const fonts = getFonts(masu)
    .map(f => 'family=' + f.replace(' ', '+'))
    .join('&');
  return (
    <SvgPaper className="template" pageWidth={pageWidth} pageHeight={pageLength}>
      <Helmet>
        {text && text.family &&
          <link rel="stylesheet" href={"https://fonts.googleapis.com/css2?family=" + text.family.replace(' ', '+')} />
        }
        {fonts !== '' &&
          <link rel="stylesheet" href={"https://fonts.googleapis.com/css2?" + fonts} />
        }
      </Helmet>
      <defs>
        <clipPath id="max">
          <polygon points={`0,-${m.max_2} ${m.max_2},0 0,${m.max_2} -${m.max_2},0`} />
        </clipPath>
        <clipPath id="front">
          <polygon points={`-${m.w_2},${m.l_2} ${m.w_2},${m.l_2} ${m.w_2},${m.l_2 + m.h} -${m.w_2},${m.l_2 + m.h}`} />
        </clipPath>
        <clipPath id="back">
          <polygon points={`-${m.w_2},-${m.l_2} ${m.w_2},-${m.l_2} ${m.w_2},-${m.l_2 + m.h} -${m.w_2},-${m.l_2 + m.h}`} />
        </clipPath>
        <clipPath id="left">
          <polygon points={`${m.w_2},-${m.l_2} ${m.w_2},${m.l_2} ${m.w_2 + m.h},${m.l_2} ${m.w_2 + m.h},-${m.l_2}`} />
        </clipPath>
        <clipPath id="right">
          <polygon points={`-${m.w_2},-${m.l_2} -${m.w_2},${m.l_2} -${m.w_2 + m.h},${m.l_2} -${m.w_2 + m.h},-${m.l_2}`} />
        </clipPath>
      </defs>

      <g transform="rotate(135)">
        <polygon points={`0,-${m.max_2 + 5} ${m.max_2 + 5},0 0,${m.max_2 + 5} -${m.max_2 + 5},0`} style={{
          fill: detail.background
        }} />

        {Boolean(detail.backgroundImage) &&
          <g transform="rotate(180)">
            <image href={detail.backgroundImage} x={-m.max_2} y={-m.max_2} width={m.max} height={m.max}
              preserveAspectRatio="none" clipPath="url(#max)" />
          </g>
        }

        <SvgCut masu={masu} styles={styles} />

        {Object.keys(faces).map(key => {
          const face = faces[key];
          return (
            <g key={key} clipPath={`url(#${key})`}>
              <g transform={`rotate(${face.rotate} ${face.x} ${face.y})`}>
                {images.filter(image => image.face === key).map(image =>
                  <Image key={image.key} image={image} />
                )}
                {texts.filter(text => text.face === key).map((text) =>
                  <Text key={text.key} text={text} />
                )}
              </g>
            </g>
          );
        })}
      </g>
    </SvgPaper>
  );
}
