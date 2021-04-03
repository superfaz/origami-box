import { Svg, SvgPaper } from "../Generic/Svg";
import { MasuTemplate } from "../Masu/MasuTemplateBack";

export function EmptyTemplate({ withPaper = true }) {
  if (withPaper) {
    return (
      <SvgPaper
        className="template"
        pageWidth={210}
        pageHeight={297}
      ></SvgPaper>
    );
  } else {
    return (
      <Svg viewBox="0 0 100 100" width="100%" height="100%">
        <rect x={0} y={0} width={100} height={100} style={{ fill: "white" }} />
      </Svg>
    );
  }
}

export default function Template({ template, lid = false, withPaper = true }) {
  const type = template?.type;
  switch (type) {
    case "masu":
      return (
        <MasuTemplate masu={template.data} lid={lid} withPaper={withPaper} />
      );
    default:
      return <EmptyTemplate withPaper={withPaper} />;
  }
}
