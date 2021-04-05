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

  blocks: function (masu) {
    if (masu.withLid) {
      return ["base", "lid"];
    } else {
      return ["box"];
    }
  },
};
