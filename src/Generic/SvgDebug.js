const xStyle = { stroke: "black", strokeWidth: 0.4 };
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
