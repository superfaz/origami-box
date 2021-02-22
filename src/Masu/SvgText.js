import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getMasu } from "../store";
import { configurePositioning, useMasuMeasurement } from "./helper";

export default function Text({ text }) {
  const masu = useSelector(getMasu);
  const m = useMasuMeasurement(masu);
  const textRef = useRef(null);
  const [box, setBox] = useState(null);

  const { configuration, style } = configurePositioning(text, m.l_2, m.w_2, m.h_2);
  style.fontSize = text.size;
  style.fill = text.color;
  style.lineHeight = 1;

  if (text.family !== '') {
    style.fontFamily = text.family;
  }

  useEffect(() => setBox(textRef.current?.getBBox()), [textRef, text, text.content, text.family]);

  return (
    <g>
      {box && process.env.REACT_APP_SVG_DEBUG &&
        <rect x={box.x} y={box.y} width={box.width} height={box.height} style={{ strokeWidth: 0.2 }}
          stroke="black" fill="yellow" />
      }
      <text ref={textRef} style={style} x={configuration.x} y={configuration.y}>
        {text.content.split('\n').map((line, index) => {
          return <tspan key={index} x={0} y={1.15 * index * text.size}>{line}</tspan>
        })}
      </text>
    </g>
  );
}

