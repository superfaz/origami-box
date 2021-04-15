import { Helmet } from "react-helmet";
import env from "../env";
import { getFonts, getImages } from "../Generic/selectors";
import { buildDefaultStyles, SvgPaper } from "../Generic/Svg";
import SvgClipPaths from "../Generic/SvgClipPaths";
import { SvgDebugAxis, SvgDebugFaces } from "../Generic/SvgDebug";
import SvgFacesContent from "../Generic/SvgFacesContent";
import { useIds, useTemplate, useTemplateDefinition } from "../hooks";
import { useBaggiDimensions } from "./helper";
import SvgCut from "./SvgCut";

export default function BaggiTemplateRecto({ text = null, image = null }) {
  const { data: baggi, blockData } = useTemplate();
  const definition = useTemplateDefinition("baggi");
  const styles = buildDefaultStyles(blockData.rectoColor);
  const d = useBaggiDimensions(baggi);
  const ids = useIds();

  if (d === null) {
    return <SvgPaper className="template" pageWidth={210} pageHeight={297} />;
  }

  const images = getImages(blockData, image);
  const faces = definition.faces(d);
  const fonts = getFonts(baggi)
    .map((f) => "family=" + f.replace(" ", "+"))
    .join("&");

  return (
    <SvgPaper
      className="template"
      pageWidth={d.pageWidth}
      pageHeight={d.pageHeight}
    >
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
        <clipPath id={ids.unique("max")}>
          <rect
            x={-d.width / 2}
            y={-d.height / 2}
            width={d.width}
            height={d.height}
          />
        </clipPath>
        <SvgClipPaths ids={ids} faces={faces} side="recto" />
      </defs>

      <rect
        x={-d.width / 2 - 5}
        y={-d.height / 2 - 5}
        width={d.width + 10}
        height={d.height + 10}
        style={{
          fill: blockData.rectoColor,
        }}
      />

      {Boolean(blockData.rectoImage) && (
        <image
          href={blockData.rectoImage}
          x={-d.width / 2}
          y={-d.height / 2}
          width={d.width}
          height={d.height}
          preserveAspectRatio="xMidYMid slice"
          clipPath={"url(#" + ids.unique("max") + ")"}
        />
      )}

      <SvgFacesContent ids={ids} faces={faces} side="recto" images={images} />

      {env.debug.svg && <SvgDebugFaces side="recto" faces={faces} />}
      {env.debug.svg && <SvgDebugAxis />}
      <SvgCut d={d} styles={styles} />
    </SvgPaper>
  );
}
