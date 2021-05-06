import { Helmet } from "react-helmet";
import { getFonts, getImages, getTexts } from "../Generic/selectors";
import { SvgRoot } from "../Generic/Svg";
import SvgClipPaths from "../Generic/SvgClipPaths";
import SvgFacesContent from "../Generic/SvgFacesContent";
import { useIds, useTemplateDefinition } from "../hooks";
import { EmptyTemplate } from "../Template/Template";
import { useBaggiDimensions } from "./useBaggiDimensions";

export default function BaggiTemplate({
  baggi,
  text = null,
  image = null,
  withPaper = true,
}) {
  const blockData = baggi.base;
  const definition = useTemplateDefinition("baggi");
  const d = useBaggiDimensions(baggi);
  const ids = useIds();

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

      <SvgClipPaths ids={ids} faces={faces} side="simple" />

      <SvgFacesContent
        ids={ids}
        faces={faces}
        side="simple"
        images={images}
        texts={texts}
      />
    </SvgRoot>
  );
}
