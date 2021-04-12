import objectMap from "../objectMap";

const xStyle = { stroke: "white", strokeWidth: 0.4 };
const yStyle = { stroke: "red", strokeWidth: 0.4 };

export function SvgDebugAxis() {
  return (
    <g>
      <line x1={0} y1={0} x2={20} y2={0} style={xStyle} />
      <line x1={15} y1={5} x2={20} y2={0} style={xStyle} />
      <line x1={15} y1={-5} x2={20} y2={0} style={xStyle} />
      <line x1={0} y1={0} x2={0} y2={20} style={yStyle} />
      <line x1={5} y1={15} x2={0} y2={20} style={yStyle} />
      <line x1={-5} y1={15} x2={0} y2={20} style={yStyle} />
    </g>
  );
}

// Palette from: https://coolors.co/03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8
const colors = [
  "#03045e",
  "#023e8a",
  "#0077b6",
  "#0096c7",
  "#00b4d8",
  "#48cae4",
  "#90e0ef",
  "#ade8f4",
  "#caf0f8",
];

export function SvgDebugFaces({ faces }) {
  return objectMap(faces, (face, key) => (
    <rect
      key={key}
      x={face.x - face.width / 2}
      y={face.y - face.height / 2}
      width={face.width}
      height={face.height}
      style={{
        fill: colors[key],
      }}
    />
  ));
}
