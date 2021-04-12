function isPositive(value) {
  return value !== undefined && parseFloat(value) > 0;
}

export const masuTemplateDefinition = {
  isGeneralValid: function (masu) {
    return (
      masu !== undefined &&
      isPositive(masu.length) &&
      isPositive(masu.width) &&
      isPositive(masu.height)
    );
  },

  facesCount: function () {
    return 5;
  },

  blocks: function (masu) {
    if (!masu.withDesign) {
      return [];
    } else if (masu.withLid) {
      return ["base", "lid"];
    } else {
      return ["base"];
    }
  },

  faces: function (d) {
    return {
      0: {
        side: "verso",
        x: 0,
        y: 0,
        width: d.w,
        height: d.l,
        rotate: 180,
        hori: d.w_2,
        vert: d.l_2,
      },
      1: {
        side: "verso",
        x: 0,
        y: d.l_2 + d.h_2,
        width: d.w,
        height: d.h,
        rotate: 180,
        hori: d.w_2,
        vert: d.h_2,
      },
      2: {
        side: "verso",
        x: 0,
        y: -d.l_2 - d.h_2,
        width: d.w,
        height: d.h,
        rotate: 0,
        hori: d.w_2,
        vert: d.h_2,
      },
      3: {
        side: "verso",
        x: d.w_2 + d.h_2,
        y: 0,
        width: d.h,
        height: d.l,
        rotate: 90,
        hori: d.l_2,
        vert: d.h_2,
      },
      4: {
        side: "verso",
        x: -d.w_2 - d.h_2,
        y: 0,
        width: d.h,
        height: d.l,
        rotate: -90,
        hori: d.l_2,
        vert: d.h_2,
      },
    };
  },
};
