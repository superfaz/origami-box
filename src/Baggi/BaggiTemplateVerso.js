import env from "../env";
import { buildReferenceStyles, SvgPaper } from "../Generic/Svg";
import { SvgDebugAxis, SvgDebugFaces } from "../Generic/SvgDebug";
import { useTemplate, useTemplateDefinition } from "../hooks";
import { useBaggiDimensions } from "./helper";
import SvgCut from "./SvgCut";

export default function BaggiTemplateVerso({ text, image }) {
  const { data: baggi, blockData } = useTemplate();
  const definition = useTemplateDefinition("baggi");
  const styles = buildReferenceStyles(blockData.versoColor);
  const d = useBaggiDimensions(baggi);

  if (d === null) {
    return <SvgPaper className="template" pageWidth={210} pageHeight={297} />;
  }

  const faces = definition.faces(d);

  return (
    <SvgPaper
      className="template"
      pageWidth={d.pageWidth}
      pageHeight={d.pageHeight}
    >
      <rect
        x={-d.width / 2 - 5}
        y={-d.height / 2 - 5}
        width={d.width + 10}
        height={d.height + 10}
        style={{
          fill: blockData.versoColor,
        }}
      />

      {Boolean(blockData.versoImage) && (
        <image
          href={blockData.versoImage}
          x={-d.width / 2}
          y={-d.height / 2}
          width={d.width}
          height={d.height}
          preserveAspectRatio="xMidYMid slice"
        />
      )}

      {env.debug.svg && <SvgDebugFaces side="verso" faces={faces} />}
      {env.debug.svg && <SvgDebugAxis />}
      <SvgCut d={d} styles={styles} />
    </SvgPaper>
  );
}
