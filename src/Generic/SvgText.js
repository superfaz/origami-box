import env from "../env";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
const pixelsPerMillimeters = 3.779527559055118110236220472;

export function configurePositioning(face, text) {
  const margins = {
    hori: parseFloat(text.marginHorizontal) || 0,
    vert: parseFloat(text.marginVertical) || 0,
  };

  let style = {};
  let configuration = { ...face };

  context.font = `${text.size}mm ${text.family}`;
  const measure = context.measureText(text.content);
  configuration.width =
    Math.max(
      ...text.content.split("\n").map((line) => context.measureText(line).width)
    ) / pixelsPerMillimeters;
  configuration.height =
    (text.content.split("\n").length *
      (measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent)) /
    pixelsPerMillimeters;

  switch (text.horizontal) {
    case "left":
      style.textAnchor = "start";
      configuration.x -= configuration.hori - margins.hori;
      configuration.cx = configuration.x + configuration.width / 2;
      break;
    case "center":
      style.textAnchor = "middle";
      configuration.cx = configuration.x;
      break;
    case "right":
      style.textAnchor = "end";
      configuration.x += configuration.hori - margins.hori;
      configuration.cx = configuration.x - configuration.width / 2;
      break;
    default:
      throw new Error(
        `The horizontal value '${text.horizontal}' is not managed`
      );
  }

  switch (text.vertical) {
    case "top":
      style.dominantBaseline = "text-before-edge";
      configuration.y -= configuration.vert - margins.vert;
      configuration.cy = configuration.y + configuration.height / 2;
      break;
    case "middle":
      style.dominantBaseline = "central";
      configuration.cy = configuration.y;
      break;
    case "bottom":
      style.dominantBaseline = "text-after-edge";
      configuration.y += configuration.vert - margins.vert;
      configuration.cy = configuration.y - configuration.height / 2;
      break;
    default:
      throw new Error(`The vertical value '${text.vertical}' is not managed`);
  }

  return { configuration, style };
}

export default function SvgText({ face, text }) {
  let { configuration, style } = configurePositioning(face, text);
  style.fontSize = text.size;
  style.fill = text.color;

  if (text.family !== "") {
    style.fontFamily = text.family;
  }

  // Multiline management - required as SVG doesn't support it and only align the baseline.
  const lines = text.content.split("\n");
  const lineHeight = text.lineSpacing * text.size;
  switch (text.vertical) {
    case "top":
      // All good
      break;
    case "middle":
      configuration.y -= ((lines.length - 1) * lineHeight) / 2;
      break;
    case "bottom":
      configuration.y -= (lines.length - 1) * lineHeight;
      break;
    default:
      throw new Error(`The vertical value '${text.vertical}' is not managed`);
  }

  return (
    <g
      transform={`rotate(${text.rotation || 0} ${configuration.cx},${
        configuration.cy
      })`}
    >
      {env.debug.svg && (
        <rect
          x={configuration.cx - configuration.width / 2}
          y={configuration.cy - configuration.height / 2}
          width={configuration.width}
          height={configuration.height}
          style={{ strokeWidth: 0.2 }}
          stroke="black"
          fill="yellow"
        />
      )}
      <text style={style}>
        {lines.map((line, index) => {
          return (
            <tspan
              key={index}
              x={configuration.x}
              y={configuration.y + index * lineHeight}
            >
              {line}
            </tspan>
          );
        })}
      </text>
    </g>
  );
}
