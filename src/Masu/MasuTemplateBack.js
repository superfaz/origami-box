import { useSelector } from 'react-redux';
import { getMasu } from '../store';
import { configurePositioning, configureFace, getFonts, getTexts, getImages, useMasuMeasurement } from './helper';
import Color from 'color';
import { Helmet } from 'react-helmet';
import { useEffect, useRef, useState } from 'react';
import { SvgPaper } from '../Generic/Svg';
import SvgCut from './SvgCut';

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

  const m = useMasuMeasurement(masu);
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

  function getImage(url) {
    return new Promise((resolve, reject) => {
      let img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  function Image({ image }) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [content, setContent] = useState(null);
    const configuration = configureFace(image, m.l_2, m.w_2, m.h_2);

    if (height > 0) {
      const clientWidth = width * m.h / height;
      switch (image.horizontal) {
        case 'left':
          configuration.x -= configuration.hori;
          break;
        case 'center':
          configuration.x -= clientWidth / 2;
          break;
        case 'right':
          configuration.x += configuration.hori - clientWidth;
          break;
      }
    }

    if (image.content !== null) {
      getImage(image.content)
        .then(img => {
          setWidth(img.width);
          setHeight(img.height);
          setContent(image.content);
        })
        .catch(error => {
          console.error("Can't load the image", error);
        });
    }

    return (
      <g>
        {content !== null &&
          <image href={content} x={configuration.x} y={configuration.y - m.h_2} height={m.h} />
        }
      </g>
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

        {/* Front */}
        <g clipPath="url(#front)">
          <g transform={`rotate(180 0 ${m.l_2 + m.h_2})`}>
            {images.filter(image => image.face === 'front').map(image =>
              <Image key={image.key} image={image} />
            )}
          </g>
        </g>

        {/* Back */}
        <g clipPath="url(#back)">
          <g transform={`rotate(0 0 ${-m.l_2 - m.h_2})`}>
            {images.filter(image => image.face === 'back').map(image =>
              <Image key={image.key} image={image} />
            )}
          </g>
        </g>

        {/* Left */}
        <g clipPath="url(#left)">
          <g transform={`rotate(90 ${m.w_2 + m.h_2} 0)`}>
            {images.filter(image => image.face === 'left').map(image =>
              <Image key={image.key} image={image} />
            )}
          </g>
        </g>

        {/* Right */}
        <g clipPath="url(#right)">
          <g transform={`rotate(-90 ${-m.w_2 - m.h_2} 0)`}>
            {images.filter(image => image.face === 'right').map(image =>
              <Image key={image.key} image={image} />
            )}
          </g>
        </g>

        {getTexts(masu).map((text) =>
          <Text key={text.key} text={text} />
        )}

        {text !== null &&
          <Text key='new' text={text} />
        }
      </g>
    </SvgPaper>
  );
}
