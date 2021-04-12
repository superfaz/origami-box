import { Helmet } from "react-helmet";
import env from "../env";
import { getFonts, getImages, getTexts } from "../Generic/selectors";
import { buildDefaultStyles, SvgPaper } from "../Generic/Svg";
import { SvgDebugAxis } from "../Generic/SvgDebug";
import { useTemplate } from "../hooks";
import { useBaggiDimensions } from "./helper";
import SvgCut from "./SvgCut";

export default function BaggiTemplateRecto({ text = null, image = null }) {
  const { data: baggi, blockData } = useTemplate();
  const styles = buildDefaultStyles(blockData.rectoColor);
  const d = useBaggiDimensions(baggi);

  if (d === null) {
    return <SvgPaper className="template" pageWidth={210} pageHeight={297} />;
  }

  const images = getImages(blockData, image);
  const texts = getTexts(blockData, text);

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
        />
      )}

      {/* <g>
        {images
          .filter((image) => image.face === "0")
          .map((image) => (
            <SvgImage key={image.key} image={image} d={d} />
          ))}
        {texts
          .filter((text) => text.face === "0")
          .map((text) => (
            <SvgText key={text.key} text={text} d={d} />
          ))}
      </g> */}

      {env.debug.svg && <SvgDebugAxis />}
      <SvgCut d={d} styles={styles} />
    </SvgPaper>
  );
}
