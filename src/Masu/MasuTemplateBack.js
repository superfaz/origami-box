import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import Color from 'color';
import { getMasu } from '../store';
import { SvgPaper } from '../Generic/Svg';
import { useMasuMeasurement } from './helper';
import { getFonts, getTexts, getImages } from './selectors';
import { createFaces } from './faces';
import SvgCut from './SvgCut';
import SvgImage from './SvgImage';
import SvgText from './SvgText';

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

export default function MasuTemplateBack({ lid = false, print = false, text = null, image = null }) {
  const masu = useSelector(getMasu);
  const block = lid ? masu.lid : masu.base;
  const pageLength = parseFloat(masu.pageLength);
  const pageWidth = parseFloat(masu.pageWidth);
  const images = getImages(block, image);
  const texts = getTexts(block, text);

  const m = useMasuMeasurement(masu, lid);
  const faces = createFaces(m.l_2, m.w_2, m.h_2);

  if (m === null) {
    return (
      <SvgPaper className="template" pageWidth={pageWidth} pageHeight={pageLength}></SvgPaper>
    );
  }

  const color = Color(block.background);
  const style = {
    ...referenceStyle,
    stroke: color.isDark() ? 'white' : 'black',
    display: print ? 'none' : 'inline',
  };
  const styles = {
    line: style,
    cut: style,
    valley: style,
    mountain: style,
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
          fill: block.background
        }} />

        {Boolean(block.backgroundImage) &&
          <g transform="rotate(180)">
            <image href={block.backgroundImage} x={-m.max_2} y={-m.max_2} width={m.max} height={m.max}
              preserveAspectRatio="xMidYMid slice" clipPath="url(#max)" />
          </g>
        }

        <SvgCut m={m} styles={styles} />

        {Object.keys(faces).map(key => {
          const face = faces[key];
          const rotate = lid && key != 'top' ? 180 - face.rotate : face.rotate;
          return (
            <g key={key} clipPath={`url(#${key})`}>
              <g transform={`rotate(${rotate} ${face.x} ${face.y})`}>
                {images.filter(image => image.face === key).map(image =>
                  <SvgImage key={image.key} image={image} lid={lid} />
                )}
                {texts.filter(text => text.face === key).map((text) =>
                  <SvgText key={text.key} text={text} lid={lid} />
                )}
              </g>
            </g>
          );
        })}
      </g>
    </SvgPaper>
  );
}
