const mainStyle = {
  fontFamily: "Open Sans",
  fontSize: 10,
  dominantBaseline: "text-before-edge",
};

const secondaryStyle = {
  fontSize: 7,
  fill: "#333",
};

export default function SvgHeader({ dimensions, blockName, title }) {
  const w = dimensions.pageWidth;
  const h = dimensions.pageHeight;

  return (
    <g transform={`translate(${-w / 2 + 10} ${-h / 2 + 10})`}>
      <text x="0" y="0" style={mainStyle}>
        {blockName}
        <tspan dx="10" dy="3" style={secondaryStyle}>
          {title}
        </tspan>
      </text>
    </g>
  );
}
