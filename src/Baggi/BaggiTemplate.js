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
        <rect
          id={ids.unique("rectoColor")}
          x={-d.width / 2}
          y={-d.height / 2}
          width={d.width}
          height={4.0 * d.w}
          fill={blockData.rectoColor}
        />
        <rect
          id={ids.unique("versoColor")}
          x={-d.width / 2}
          y={-d.height / 2}
          width={d.width}
          height={4.0 * d.w}
          fill={blockData.versoColor}
        />
        {Boolean(blockData.rectoImage) && (
          <image
            id={ids.unique("rectoImage")}
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
            id={ids.unique("versoImage")}
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
          <use href={ids.unique(`#${face.side}Image`)} />
        </g>
      ))}

      <defs>
        <polygon
          id={ids.unique("side-0")}
          points={[
            [-d.w_2, 0],
            [0, -d.w_2],
            [0, d.w_2],
          ].join(" ")}
        />
        <polygon
          id={ids.unique("side-1")}
          points={[
            [0, d.w_2],
            [-d.w, d.w_2],
            [-d.w, -d.w_2],
          ].join(" ")}
        />
        <polygon
          id={ids.unique("side-2")}
          points={[
            [-d.w, -d.w_2],
            [0, -d.w_2],
            [-d.w_2, 0],
          ].join(" ")}
        />
        <clipPath id={ids.unique("left-0")}>
          <use
            href={ids.unique("#side-0")}
            transform={`translate(${-d.l_2} 0)`}
          />
        </clipPath>
        <clipPath id={ids.unique("left-1")}>
          <use
            href={ids.unique("#side-1")}
            transform={`translate(${-d.l_2} 0)`}
          />
        </clipPath>
        <clipPath id={ids.unique("left-2")}>
          <use
            href={ids.unique("#side-2")}
            transform={`translate(${-d.l_2} 0)`}
          />
        </clipPath>
        <clipPath id={ids.unique("right-0")}>
          <use
            href={ids.unique("#side-0")}
            transform={`translate(${d.l_2} 0) scale(-1 1)`}
          />
        </clipPath>
        <clipPath id={ids.unique("right-1")}>
          <use
            href={ids.unique("#side-1")}
            transform={`translate(${d.l_2} 0) scale(-1 1)`}
          />
        </clipPath>
        <clipPath id={ids.unique("right-2")}>
          <use
            href={ids.unique("#side-2")}
            transform={`translate(${d.l_2} 0) scale(-1 1)`}
          />
        </clipPath>
      </defs>

      <g clipPath={"url(#" + ids.unique("left-0") + ")"}>
        <use href={ids.unique("#rectoColor")} />
        {blockData.rectoImage && <use href={ids.unique("#rectoImage")} />}
      </g>
      <g clipPath={"url(#" + ids.unique("right-0") + ")"}>
        <use href={ids.unique("#rectoColor")} />
        {blockData.rectoImage && <use href={ids.unique("#rectoImage")} />}
      </g>
      <g clipPath={"url(#" + ids.unique("left-2") + ")"}>
        <use href={ids.unique("#rectoColor")} />
        {blockData.rectoImage && (
          <use
            href={ids.unique("#rectoImage")}
            transform={`rotate(-90 ${-d.l_2} ${-d.w_2})`}
          />
        )}
      </g>

      <g clipPath={"url(#" + ids.unique("right-2") + ")"}>
        <use href={ids.unique("#rectoColor")} />
        {blockData.rectoImage && (
          <use
            href={ids.unique("#rectoImage")}
            transform={`rotate(90 ${d.l_2} ${-d.w_2})`}
          />
        )}
      </g>
      <g clipPath={"url(#" + ids.unique("left-1") + ")"}>
        <use href={ids.unique("#versoColor")} />
        {blockData.rectoImage && (
          <use
            href={ids.unique("#versoImage")}
            transform={`rotate(90 ${-d.l_2} ${d.w_2})`}
          />
        )}
      </g>
      <g clipPath={"url(#" + ids.unique("right-1") + ")"}>
        <use href={ids.unique("#versoColor")} />
        {blockData.rectoImage && (
          <use
            href={ids.unique("#versoImage")}
            transform={`rotate(-90 ${d.l_2} ${d.w_2})`}
          />
        )}
      </g>

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
      <line
        x1={-d.l_2}
        y1={d.w_2}
        x2={-d.l_2 - d.w}
        y2={-d.w_2}
        style={styles.valley}
      />
      <line
        x1={-d.l_2}
        y1={-d.w_2}
        x2={-d.l_2 - d.w_2}
        y2={0}
        style={styles.valley}
      />
      <line
        x1={d.l_2}
        y1={d.w_2}
        x2={d.l_2 + d.w}
        y2={-d.w_2}
        style={styles.valley}
      />
      <line
        x1={d.l_2}
        y1={-d.w_2}
        x2={d.l_2 + d.w_2}
        y2={0}
        style={styles.valley}
      />
    </SvgRoot>
  );
}
