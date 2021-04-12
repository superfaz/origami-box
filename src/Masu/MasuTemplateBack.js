import { Helmet } from "react-helmet";
import env from "../env";
import { getFonts, getTexts, getImages } from "../Generic/selectors";
import { buildReferenceStyles, Svg, SvgPaper } from "../Generic/Svg";
import SvgAxis from "../Generic/SvgAxis";
import { useTemplate } from "../hooks";
import { EmptyTemplate } from "../Template/Template";
import { createFaces } from "./faces";
import { useMasuDimensions } from "./helper";
import SvgCut from "./SvgCut";
import SvgImage from "./SvgImage";
import SvgText from "./SvgText";

function SvgRoot({ withPaper, d, children }) {
  if (withPaper) {
    return (
      <SvgPaper
        className="template"
        pageWidth={d.pageWidth}
        pageHeight={d.pageHeight}
      >
        {children}
      </SvgPaper>
    );
  } else {
    return (
      <Svg
        viewBox={`${-d.size_2 - 5} ${-d.size_2 - 5} ${d.size + 10} ${
          d.size + 10
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
  const d = useMasuDimensions(masu, lid);

  if (d === null) {
    return <EmptyTemplate withPaper={withPaper} />;
  }

  const block = lid ? masu.lid : masu.base;
  const images = getImages(block, image);
  const texts = getTexts(block, text);
  const faces = createFaces(d.l_2, d.w_2, d.h_2);
  const styles = buildReferenceStyles(block.background);

  const fonts = getFonts(masu)
    .map((f) => "family=" + f.replace(" ", "+"))
    .join("&");
  return (
    <SvgRoot d={d} withPaper={withPaper}>
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
            points={`0,-${d.max_2} ${d.max_2},0 0,${d.max_2} -${d.max_2},0`}
          />
        </clipPath>
        <clipPath id="face1">
          <rect x={-d.w_2} y={d.l_2} width={d.w} height={d.h} />
        </clipPath>
        <clipPath id="face2">
          <rect x={-d.w_2} y={-d.l_2 - d.h} width={d.w} height={d.h} />
        </clipPath>
        <clipPath id="face3">
          <rect x={d.w_2} y={-d.l_2} width={d.h} height={d.l} />
        </clipPath>
        <clipPath id="face4">
          <rect x={-d.w_2 - d.h} y={-d.l_2} width={d.h} height={d.l} />
        </clipPath>
      </defs>

      <g transform="rotate(135)">
        <polygon
          points={`0,-${d.max_2 + 5} ${d.max_2 + 5},0 0,${d.max_2 + 5} -${
            d.max_2 + 5
          },0`}
          style={{
            fill: block.background,
          }}
        />

        {Boolean(block.backgroundImage) && (
          <g transform="rotate(180)">
            <image
              href={block.backgroundImage}
              x={-d.max_2}
              y={-d.max_2}
              width={d.max}
              height={d.max}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#max)"
            />
          </g>
        )}

        {env.debug.svg && <SvgAxis />}
        {!print && <SvgCut d={d} styles={styles} />}

        {Object.keys(faces).map((key) => {
          const face = faces[key];
          const rotate = lid && key !== "0" ? 180 + face.rotate : face.rotate;
          return (
            <g key={key} clipPath={`url(#face${key})`}>
              <g transform={`rotate(${rotate} ${face.x} ${face.y})`}>
                {images
                  .filter((image) => image.face === key)
                  .map((image) => (
                    <SvgImage key={key + "-" + image.key} image={image} d={d} />
                  ))}
                {texts
                  .filter((text) => text.face === key)
                  .map((text) => (
                    <SvgText key={key + "-" + text.key} text={text} d={d} />
                  ))}
              </g>
            </g>
          );
        })}
      </g>
    </SvgRoot>
  );
}
