import { Helmet } from "react-helmet";
import { getFonts, getImages, getTexts } from "../Generic/selectors";
import { buildReferenceStyles, SvgRoot } from "../Generic/Svg";
import SvgClipPaths from "../Generic/SvgClipPaths";
import SvgFacesContent from "../Generic/SvgFacesContent";
import { useIds, useTemplateDefinition } from "../hooks";
import objectMap from "../objectMap";
import { EmptyTemplate } from "../Template/Template";
import { getSimpleDimensions } from "./dimensions";
import SvgSimpleCut from "./SvgSimpleCut";

export default function BaggiTemplate({
  baggi,
  text = null,
  image = null,
  withPaper = true,
}) {
  const blockData = baggi.base;
  const definition = useTemplateDefinition("baggi");
  const ids = useIds();

  const styles = buildReferenceStyles("#ffffff");
  const d = getSimpleDimensions(baggi);
  if (d === null) {
    return <EmptyTemplate withPaper={withPaper} />;
  }

  const images = getImages(blockData, image);
  const texts = getTexts(blockData, text);
  const faces = definition.simpleFaces(d);
  const fonts = getFonts(baggi)
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

      <SvgClipPaths ids={ids} faces={faces} side="recto" />
      <SvgClipPaths ids={ids} faces={faces} side="verso" />

      <defs>
        {Boolean(blockData.rectoImage) && (
          <image
            id="rectoImage"
            href={blockData.rectoImage}
            x={-d.width / 2}
            y={-d.height / 2}
            width={d.width}
            height={4.0 * d.w}
            preserveAspectRatio="xMidYMid slice"
          />
        )}
        {Boolean(blockData.versoImage) && (
          <image
            id="versoImage"
            href={blockData.versoImage}
            x={-d.width / 2}
            y={-d.height / 2 - d.w}
            width={d.width}
            height={4.0 * d.w}
            preserveAspectRatio="xMidYMid slice"
          />
        )}
      </defs>

      {objectMap(faces, (face, key) => (
        <g key={key} clipPath={"url(#" + ids.unique(`face-${key}`) + ")"}>
          <rect
            x={face.x - face.width / 2}
            y={face.y - face.height / 2}
            width={face.width}
            height={face.height}
            fill={
              face.side === "recto"
                ? blockData.rectoColor
                : blockData.versoColor
            }
          />
          <use href={`#${face.side}Image`} />
        </g>
      ))}

      <SvgFacesContent
        ids={ids}
        faces={faces}
        side="recto"
        images={images}
        texts={texts}
      />
      <SvgFacesContent
        ids={ids}
        faces={faces}
        side="verso"
        images={images}
        texts={texts}
      />

      <SvgSimpleCut d={d} styles={styles} />
    </SvgRoot>
  );
}
