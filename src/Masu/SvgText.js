import { useEffect, useRef, useState } from "react";
import env from "../env";

export function configurePositioning(face, text) {
  const margins = {
    hori: parseFloat(text.marginHorizontal),
    vert: parseFloat(text.marginVertical),
  };
  if (isNaN(margins.hori)) {
    margins.hori = 0;
  }
  if (isNaN(margins.vert)) {
    margins.vert = 0;
  }

  let style = {};
  let configuration = { ...face };

  switch (text.horizontal) {
    case "left":
      style.textAnchor = "start";
      configuration.x -= configuration.hori - margins.hori;
      break;
    case "center":
      style.textAnchor = "middle";
      break;
    case "right":
      style.textAnchor = "end";
      configuration.x += configuration.hori - margins.hori;
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
      break;
    case "middle":
      style.dominantBaseline = "central";
      break;
    case "bottom":
      style.dominantBaseline = "text-after-edge";
      configuration.y += configuration.vert - margins.vert;
      break;
    default:
      throw new Error(`The vertical value '${text.vertical}' is not managed`);
  }

  return { configuration, style };
}

export default function SvgText({ face, text }) {
  const textRef = useRef(null);
  const [box, setBox] = useState(null);

  let { configuration, style } = configurePositioning(face, text);
  style.fontSize = text.size;
  style.fill = text.color;

  if (text.family !== "") {
    style.fontFamily = text.family;
  }

  // Used for debugging only - see REACT_APP_SVG_DEBUG
  useEffect(() => setBox(textRef.current?.getBBox()), [
    textRef,
    text,
    text.content,
    text.family,
  ]);

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
    <g>
      {box && env.debug.svg && (
        <rect
          x={box.x}
          y={box.y}
          width={box.width}
          height={box.height}
          style={{ strokeWidth: 0.2 }}
          stroke="black"
          fill="yellow"
        />
      )}
      <text ref={textRef} style={style} x={configuration.x} y={configuration.y}>
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
