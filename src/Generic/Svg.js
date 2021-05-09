import Color from "color";

export function Svg({ ...rest }) {
  return <svg version="1.1" xmlns="http://www.w3.org/2000/svg" {...rest} />;
}

export function SvgPaper({ pageWidth, pageHeight, ...rest }) {
  return (
    <Svg
      viewBox={`${-pageWidth / 2} ${
        -pageHeight / 2
      } ${pageWidth} ${pageHeight}`}
      width={`${pageWidth}mm`}
      height={`${pageHeight}mm`}
      {...rest}
    />
  );
}

export function SvgRoot({ withPaper, d, children }) {
  if (withPaper) {
    return (
      <SvgPaper
        className="template"
        pageWidth={d.pageWidth}
        pageHeight={d.pageHeight}
      >
        {children}
      </SvgPaper>
    );
  } else {
    const max = Math.max(d.width, d.height) + 10;
    const max_2 = max / 2.0;
    return <Svg viewBox={`${-max_2} ${-max_2} ${max} ${max}`}>{children}</Svg>;
  }
}

const defaultLine = {
  fill: "none",
  strokeWidth: 0.2,
};

export function buildDefaultStyles(backgroundColor = "white") {
  const color = Color(backgroundColor);

  const cut = {
    ...defaultLine,
    stroke: color.isDark() ? "white" : "black",
  };

  return {
    cut,
    valley: {
      ...cut,
      strokeDasharray: [4, 2],
    },
    mountain: {
      ...cut,
      strokeDasharray: [2, 1, 0.4, 1],
    },
    mark: {
      ...defaultLine,
      stroke: "blue",
    },
  };
}

export function buildReferenceStyles(backgroundColor = "white") {
  const color = Color(backgroundColor);

  const style = {
    ...defaultLine,
    strokeDasharray: [0.4, 0.8],
    stroke: color.isDark() ? "white" : "black",
  };
  const noneStyle = {
    fill: "none",
    stroke: "none",
  };

  return {
    cut: style,
    valley: style,
    mountain: style,
    mark: noneStyle,
  };
}

export function buildTransparentStyles() {
  const noneStyle = {
    fill: "none",
    stroke: "none",
  };

  return {
    cut: noneStyle,
    valley: noneStyle,
    mountain: noneStyle,
    mark: { ...defaultLine, stroke: "blue" },
  };
}
