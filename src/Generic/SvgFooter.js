import QRCode from "qrcode.react";

const style = { fontFamily: "Open Sans", fontSize: 5, textAnchor: "end" };

export default function SvgFooter({ dimensions }) {
  const w = dimensions.pageWidth;
  const h = dimensions.pageHeight;

  return (
    <g transform={`translate(${w / 2 - 30} ${h / 2 - 30})`}>
      <QRCode renderAs="svg" size={20} value="https://www.corniro.com" />
      <text x="-10" y="20" style={style}>
        designed with corniro.com
      </text>
    </g>
  );
}
