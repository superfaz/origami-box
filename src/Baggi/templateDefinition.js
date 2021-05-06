function isPositive(value) {
  return value !== undefined && parseFloat(value) > 0;
}

export const baggiTemplateDefinition = {
  isGeneralValid: function (data) {
    return (
      data !== undefined && isPositive(data.width) && isPositive(data.length)
    );
  },

  facesCount: function () {
    return 3;
  },

  blocks: function (data) {
    if (!data.withDesign) {
      return [];
    } else {
      return ["base"];
    }
  },

  faces: function (d) {
    return {
      0: {
        side: "recto",
        x: 0,
        y: -d.w_2,
        width: d.l,
        height: d.w,
        rotate: 0,
        hori: d.l_2,
        vert: d.w_2,
      },
      1: {
        side: "verso",
        x: 0,
        y: 3.0 * d.w_2,
        width: d.l,
        height: d.w,
        rotate: 180,
        hori: d.l_2,
        vert: d.w_2,
      },
      2: {
        side: "recto",
        x: 0,
        y: -3.0 * d.w_2,
        width: d.l,
        height: d.w,
        rotate: 0,
        hori: d.l_2,
        vert: d.w_2,
      },
    };
  },

  simpleFaces: function (d) {
    return {
      0: {
        side: "simple",
        x: 0,
        y: 0,
        width: d.l,
        height: d.w,
        rotate: 0,
        hori: d.l_2,
        vert: d.w_2,
      },
      1: {
        side: "simple",
        x: 0,
        y: d.w,
        width: d.l,
        height: d.w,
        rotate: 180,
        hori: d.l_2,
        vert: d.w_2,
      },
      2: {
        side: "simple",
        x: 0,
        y: -d.w,
        width: d.l,
        height: d.w,
        rotate: 0,
        hori: d.l_2,
        vert: d.w_2,
      },
    };
  },
};
