import classNames from "classnames/dedupe";
import { createFaces } from "./faces";

export function getRotationMatrix(angle) {
  const radian = (angle * Math.PI) / 180;
  const cos = Math.cos(radian).toFixed(5);
  const sin = Math.sin(radian).toFixed(5);
  return `${cos} ${sin} ${-sin} ${cos} 0 0`;
}

function isPositive(value) {
  return value !== undefined && parseFloat(value) > 0;
}

export function isGeneralValid(masu) {
  return (
    masu !== undefined &&
    isPositive(masu.length) &&
    isPositive(masu.width) &&
    isPositive(masu.height)
  );
}

export function checkValidity(target) {
  if (target.checkValidity()) {
    target.className = classNames(target.className, "is-valid", {
      "is-invalid": false,
    });
  } else {
    target.className = classNames(target.className, "is-invalid", {
      "is-valid": false,
    });
  }

  if (target.value === "" || target.value === null) {
    return target.value;
  }

  if (target.type === "number") {
    const number = Number(target.value);
    if (!isNaN(number)) {
      return number;
    }
  }

  return target.value;
}

export function useMasuMeasurement(masu, lid = false) {
  let pageWidth = 210;
  let pageHeight = 297;

  let l = parseFloat(masu.length);
  let w = parseFloat(masu.width);
  let h = parseFloat(masu.height);

  if (isNaN(l + w + h) || l <= 0 || w <= 0 || h <= 0) {
    return null;
  }

  // Adjust for lid, if needed
  if (lid) {
    l += masu.lid.delta;
    w += masu.lid.delta;
    h = masu.lid.height === "" ? h - 0.5 * masu.lid.delta : masu.lid.height;
  }

  const max = l + w + 4.0 * h;
  const size = max / Math.SQRT2;

  return {
    pageWidth,
    pageHeight,
    l,
    w,
    h,
    max,
    size,
    l_2: l / 2.0,
    w_2: w / 2.0,
    h_2: h / 2.0,
    max_2: max / 2.0,
    size_2: size / 2.0,
    h2: h * 2.0,
  };
}

export function configureFace(element, l_2, w_2, h_2) {
  const faces = createFaces(l_2, w_2, h_2);
  const face = faces[element.face];
  if (face === undefined) {
    console.log(`face '${element.face}' not supported`);
    return null;
  }

  return face;
}

export function configurePositioning(text, l_2, w_2, h_2) {
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
  let configuration = configureFace(text, l_2, w_2, h_2);

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

export function loadImageAsync(url) {
  return new Promise((resolve, reject) => {
    let img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
