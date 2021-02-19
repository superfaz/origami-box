export function createFaces(l_2, w_2, h_2) {
  const faces = {
    front: {
      x: 0,
      y: l_2 + h_2,
      rotate: 180,
      hori: w_2,
      vert: h_2,
    },
    back: {
      x: 0,
      y: -l_2 - h_2,
      rotate: 0,
      hori: w_2,
      vert: h_2,
    },
    left: {
      x: w_2 + h_2,
      y: 0,
      rotate: 90,
      hori: l_2,
      vert: h_2,
    },
    right: {
      x: -w_2 - h_2,
      y: 0,
      rotate: -90,
      hori: l_2,
      vert: h_2,
    },
  }

  return faces;
}
