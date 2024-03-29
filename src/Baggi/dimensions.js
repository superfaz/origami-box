const pageWidth = 210;
const pageHeight = 297;

export function getPageDimensions(baggi) {
  if (!baggi) {
    return null;
  }

  const w = parseFloat(baggi.width);
  const l = parseFloat(baggi.length);

  if (isNaN(l + w) || l <= 0 || w <= 0) {
    return null;
  }

  const width = 2.0 * w + l;
  const height = 4.0 * w;

  return {
    pageWidth,
    pageHeight,
    width,
    height,
    l,
    w,
    l_2: l / 2.0,
    w_2: w / 2.0,
    w2: w * 2.0,
  };
}

export function getSimpleDimensions(baggi) {
  if (!baggi) {
    return null;
  }

  const w = parseFloat(baggi.width);
  const l = parseFloat(baggi.length);

  if (isNaN(l + w) || l <= 0 || w <= 0) {
    return null;
  }

  const width = 2.0 * w + l;
  const height = 3.0 * w;

  return {
    pageWidth,
    pageHeight,
    width,
    height,
    l,
    w,
    l_2: l / 2.0,
    w_2: w / 2.0,
    w2: w * 2.0,
  };
}
