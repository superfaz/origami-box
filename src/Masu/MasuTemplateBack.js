import { Helmet } from "react-helmet";
import { getFonts, getTexts, getImages } from "../Generic/selectors";
import { buildReferenceStyles, Svg, SvgPaper } from "../Generic/Svg";
import { useTemplate } from "../hooks";
import { createFaces } from "./faces";
import { useMasuMeasurement } from "./helper";
import SvgCut from "./SvgCut";
import SvgImage from "./SvgImage";
import SvgText from "./SvgText";
import { EmptyTemplate } from "../Template/Template";

function SvgRoot({ withPaper, m, children }) {
  if (withPaper) {
    return (
      <SvgPaper
        className="template"
        pageWidth={m.pageWidth}
        pageHeight={m.pageHeight}
      >
        {children}
      </SvgPaper>
    );
  } else {
    return (
      <Svg
        viewBox={`${-m.size_2 - 5} ${-m.size_2 - 5} ${m.size + 10} ${
          m.size + 10
        }`}
      >
        {children}
      </Svg>
    );
  }
}

export default function MasuTemplateBack({
  lid = false,
  print = false,
  text = null,
  image = null,
  withPaper = true,
}) {
  const { data: masu } = useTemplate();
  return (
    <MasuTemplate
      masu={masu}
      lid={lid}
      print={print}
      text={text}
      image={image}
      withPaper={withPaper}
    />
  );
}

export function MasuTemplate({
  masu,
  lid = false,
  print = false,
  text = null,
  image = null,
  withPaper = true,
}) {
  const m = useMasuMeasurement(masu, lid);

  if (m === null) {
    return <EmptyTemplate withPaper={withPaper} />;
  }

  const block = lid ? masu.lid : masu.base;
  const images = getImages(block, image);
  const texts = getTexts(block, text);
  const faces = createFaces(m.l_2, m.w_2, m.h_2);
  const styles = buildReferenceStyles(block.background);

  const fonts = getFonts(masu)
    .map((f) => "family=" + f.replace(" ", "+"))
    .join("&");
  return (
    <SvgRoot m={m} withPaper={withPaper}>
      <Helmet>
        {text && text.family && (
          <link
            rel="stylesheet"
            href={
              "https://fonts.googleapis.com/css2?family=" +
              text.family.replace(" ", "+")
            }
          />
        )}
        {fonts !== "" && (
          <link
            rel="stylesheet"
            href={"https://fonts.googleapis.com/css2?" + fonts}
          />
        )}
      </Helmet>
      <defs>
        <clipPath id="max">
          <polygon
            points={`0,-${m.max_2} ${m.max_2},0 0,${m.max_2} -${m.max_2},0`}
          />
        </clipPath>
        <clipPath id="front">
          <polygon
            points={`-${m.w_2},${m.l_2} ${m.w_2},${m.l_2} ${m.w_2},${
              m.l_2 + m.h
            } -${m.w_2},${m.l_2 + m.h}`}
          />
        </clipPath>
        <clipPath id="back">
          <polygon
            points={`-${m.w_2},-${m.l_2} ${m.w_2},-${m.l_2} ${m.w_2},-${
              m.l_2 + m.h
            } -${m.w_2},-${m.l_2 + m.h}`}
          />
        </clipPath>
        <clipPath id="left">
          <polygon
            points={`${m.w_2},-${m.l_2} ${m.w_2},${m.l_2} ${m.w_2 + m.h},${
              m.l_2
            } ${m.w_2 + m.h},-${m.l_2}`}
          />
        </clipPath>
        <clipPath id="right">
          <polygon
            points={`-${m.w_2},-${m.l_2} -${m.w_2},${m.l_2} -${m.w_2 + m.h},${
              m.l_2
            } -${m.w_2 + m.h},-${m.l_2}`}
          />
        </clipPath>
      </defs>

      <g transform="rotate(135)">
        <polygon
          points={`0,-${m.max_2 + 5} ${m.max_2 + 5},0 0,${m.max_2 + 5} -${
            m.max_2 + 5
          },0`}
          style={{
            fill: block.background,
          }}
        />

        {Boolean(block.backgroundImage) && (
          <g transform="rotate(180)">
            <image
              href={block.backgroundImage}
              x={-m.max_2}
              y={-m.max_2}
              width={m.max}
              height={m.max}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#max)"
            />
          </g>
        )}

        {!print && <SvgCut m={m} styles={styles} />}

        {Object.keys(faces).map((key) => {
          const face = faces[key];
          const rotate = lid && key !== "0" ? 180 + face.rotate : face.rotate;
          return (
            <g key={key} clipPath={`url(#${key})`}>
              <g transform={`rotate(${rotate} ${face.x} ${face.y})`}>
                {images
                  .filter((image) => image.face === key)
                  .map((image) => (
                    <SvgImage key={key + "-" + image.key} image={image} m={m} />
                  ))}
                {texts
                  .filter((text) => text.face === key)
                  .map((text) => (
                    <SvgText key={key + "-" + text.key} text={text} m={m} />
                  ))}
              </g>
            </g>
          );
        })}
      </g>
    </SvgRoot>
  );
}
