export function Svg({ ...rest }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...rest} />
  );
}

export function SvgPaper({ pageWidth, pageHeight, ...rest }) {
  return (
    <Svg
      viewBox={`${-pageWidth / 2} ${-pageHeight / 2} ${pageWidth} ${pageHeight}`}
      width={`${pageWidth}mm`}
      height={`${pageHeight}mm`}
      {...rest} />
  );
}
