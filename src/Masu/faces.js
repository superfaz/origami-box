export function createFaces(l_2, w_2, h_2) {
  const faces = {
    0: {
      x: 0,
      y: 0,
      width: 2 * w_2,
      height: 2 * l_2,
      rotate: 180,
      hori: w_2,
      vert: l_2,
    },
    1: {
      x: 0,
      y: l_2 + h_2,
      width: 2 * w_2,
      height: 2 * h_2,
      rotate: 180,
      hori: w_2,
      vert: h_2,
    },
    2: {
      x: 0,
      y: -l_2 - h_2,
      width: 2 * w_2,
      height: 2 * h_2,
      rotate: 0,
      hori: w_2,
      vert: h_2,
    },
    3: {
      x: w_2 + h_2,
      y: 0,
      width: 2 * l_2,
      height: 2 * h_2,
      rotate: 90,
      hori: l_2,
      vert: h_2,
    },
    4: {
      x: -w_2 - h_2,
      y: 0,
      width: 2 * l_2,
      height: 2 * h_2,
      rotate: -90,
      hori: l_2,
      vert: h_2,
    },
  };

  return faces;
}
