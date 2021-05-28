import env from "../env";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
const pixelsPerMillimeters = 3.779527559055118110236220472;

/**
 * @typedef {Object} Positioning
 * @property {number} x - The x coordinate to position the text
 * @property {number} y - The y coordinate to position the text
 * @property {number} cx - The x coordinate representing the center of the text area;
 *                         To be used to apply the rotation
 * @property {number} cy - The y coordinate representing the center of the text area;
 *                         To be used to apply the rotation
 * @property {number} width - The width of the text area
 * @property {number} height - The height of the text area
 */

/**
 * Computes different values for the positioning and styling of a text.
 * @param {Object} face The detail about the face on which the text is displayed
 * @param {Object} text The detail about the text to display
 * @returns {Object}
 * @returns {Positioning} configuration Positioning information for this text
 * @returns {Style} style Style to be applied to this text to ensure proper positioning
 */
export function configurePositioning(face, text) {
  const margins = {
    hori: parseFloat(text.marginHorizontal) || 0,
    vert: parseFloat(text.marginVertical) || 0,
  };
  const rotation = parseFloat(text.rotation) || 0;
  const abscos = Math.abs(Math.cos(rotation * (Math.PI / 180.0)));
  const abssin = Math.abs(Math.sin(rotation * (Math.PI / 180.0)));

  let style = {};
  let configuration = { ...face };

  context.font = `${text.size}mm ${text.family || 'Open Sans'}`;
  const measure = context.measureText(text.content);
  configuration.width =
    Math.max(
      ...text.content.split("\n").map((line) => context.measureText(line).width)
    ) / pixelsPerMillimeters;
  configuration.height =
    (text.content.split("\n").length *
      (measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent)) /
    pixelsPerMillimeters;

  var rotatedWidth =
    configuration.width * abscos + configuration.height * abssin;
  var rotatedHeight =
    configuration.width * abssin + configuration.height * abscos;
  var diffWidth = rotatedWidth - configuration.width;
  var diffHeight = rotatedHeight - configuration.height;

  switch (text.horizontal) {
    case "left":
      style.textAnchor = "start";
      configuration.x -= configuration.hori - margins.hori;
      configuration.cx = configuration.x + configuration.width / 2;
      configuration.x += diffWidth / 2;
      configuration.cx += diffWidth / 2;
      break;
    case "center":
      style.textAnchor = "middle";
      configuration.cx = configuration.x;
      break;
    case "right":
      style.textAnchor = "end";
      configuration.x += configuration.hori - margins.hori;
      configuration.cx = configuration.x - configuration.width / 2;
      configuration.x -= diffWidth / 2;
      configuration.cx -= diffWidth / 2;
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
      configuration.y += diffHeight / 2;
      configuration.cy += diffHeight / 2;
      break;
    case "middle":
      style.dominantBaseline = "central";
      configuration.cy = configuration.y;
      break;
    case "bottom":
      style.dominantBaseline = "text-after-edge";
      configuration.y += configuration.vert - margins.vert;
      configuration.cy = configuration.y - configuration.height / 2;
      configuration.y -= diffHeight / 2;
      configuration.cy -= diffHeight / 2;
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
