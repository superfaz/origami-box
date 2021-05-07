import { Helmet } from "react-helmet";
import env from "../env";
import { getFonts, getTexts, getImages } from "../Generic/selectors";
import { buildReferenceStyles, SvgRoot } from "../Generic/Svg";
import SvgClipPaths from "../Generic/SvgClipPaths";
import { SvgDebugAxis, SvgDebugFaces } from "../Generic/SvgDebug";
import SvgFacesContent from "../Generic/SvgFacesContent";
import { useTemplate, useTemplateDefinition, useIds } from "../hooks";
import { EmptyTemplate } from "../Template/Template";
import { useMasuDimensions } from "./useMasuDimensions";
import SvgCut from "./SvgCut";

export default function MasuTemplateVerso({
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
        </defs>

        <SvgClipPaths ids={ids} faces={faces} side="verso" />

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

        <SvgFacesContent
          ids={ids}
          faces={faces}
          side="verso"
          inverted={lid}
          images={images}
          texts={texts}
        />

        {!print && <SvgCut d={d} styles={styles} />}
      </g>
    </SvgRoot>
  );
}
