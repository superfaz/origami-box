import { Helmet } from "react-helmet";
import env from "../env";
import { getFonts, getTexts, getImages } from "../Generic/selectors";
import { buildReferenceStyles, Svg, SvgPaper } from "../Generic/Svg";
import SvgClipPaths from "../Generic/SvgClipPaths";
import { SvgDebugAxis, SvgDebugFaces } from "../Generic/SvgDebug";
import SvgFacesContent from "../Generic/SvgFacesContent";
import SvgText from "../Generic/SvgText";
import { useTemplate, useTemplateDefinition, useIds } from "../hooks";
import { EmptyTemplate } from "../Template/Template";
import objectMap from "../objectMap";
import { useMasuDimensions } from "./helper";
import SvgCut from "./SvgCut";

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
  const definition = useTemplateDefinition("masu");
  const ids = useIds();

  if (d === null) {
    return <EmptyTemplate withPaper={withPaper} />;
  }

  const block = lid ? masu.lid : masu.base;
  const images = getImages(block, image);
  const texts = getTexts(block, text);
  const faces = definition.faces(d);
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

      <g transform="rotate(135)">
        <defs>
          <clipPath id={ids.unique("max")}>
            <polygon
              points={`0,-${d.max_2} ${d.max_2},0 0,${d.max_2} -${d.max_2},0`}
            />
          </clipPath>
          <SvgClipPaths ids={ids} faces={faces} side="verso" />
        </defs>

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
              clipPath={"url(#" + ids.unique("max") + ")"}
            />
          </g>
        )}

        {env.debug.svg && <SvgDebugFaces side="verso" faces={faces} />}
        {env.debug.svg && <SvgDebugAxis />}

        {!print && <SvgCut d={d} styles={styles} />}

        <SvgFacesContent
          ids={ids}
          faces={faces}
          side="verso"
          images={images}
          inverted={lid}
        />

        {objectMap(faces, (face, key) => {
          const rotate = lid && key !== "0" ? 180 + face.rotate : face.rotate;
          return (
            <g key={key} clipPath={"url(#" + ids.unique(`face-${key}`) + ")"}>
              <g transform={`rotate(${rotate} ${face.x} ${face.y})`}>
                {texts
                  .filter((text) => text.face === key)
                  .map((text) => (
                    <SvgText
                      key={key + "-" + text.key}
                      face={face}
                      text={text}
                    />
                  ))}
              </g>
            </g>
          );
        })}
      </g>
    </SvgRoot>
  );
}
