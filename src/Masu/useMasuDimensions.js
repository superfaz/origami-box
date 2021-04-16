export function useMasuDimensions(masu, lid = false) {
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
    width: size,
    height: size,
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
