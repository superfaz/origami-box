import { useEffect, useRef, useState } from "react";
import { useTemplate } from "../hooks";
import { configurePositioning, useMasuMeasurement } from "./helper";

export default function Text({ text, lid = false }) {
  const { data: masu } = useTemplate();
  const m = useMasuMeasurement(masu, lid);
  const textRef = useRef(null);
  const [box, setBox] = useState(null);

  let { configuration, style } = configurePositioning(text, m.l_2, m.w_2, m.h_2);
  style.fontSize = text.size;
  style.fill = text.color;

  if (text.family !== '') {
    style.fontFamily = text.family;
  }

  // Used for debugging only - see REACT_APP_SVG_DEBUG
  useEffect(() => setBox(textRef.current?.getBBox()), [textRef, text, text.content, text.family]);

  // Multiline management - required as SVG doesn't support it and only align the baseline.
  const lines = text.content.split('\n');
  const lineHeight = text.lineSpacing * text.size;
  switch (text.vertical) {
    case 'top':
      // All good
      break;
    case 'middle':
      configuration.y -= (lines.length - 1) * lineHeight / 2;
      break;
    case 'bottom':
      configuration.y -= (lines.length - 1) * lineHeight;
      break;
    default:
      throw new Error(`The vertical value '${text.vertical}' is not managed`);
  }

  return (
    <g>
      {box && process.env.REACT_APP_SVG_DEBUG &&
        <rect x={box.x} y={box.y} width={box.width} height={box.height} style={{ strokeWidth: 0.2 }}
          stroke="black" fill="yellow" />
      }
      <text ref={textRef} style={style} x={configuration.x} y={configuration.y}>
        {lines.map((line, index) => {
          return <tspan key={index} x={configuration.x} y={configuration.y + index * lineHeight}>{line}</tspan>
        })}
      </text>
    </g>
  );
}

