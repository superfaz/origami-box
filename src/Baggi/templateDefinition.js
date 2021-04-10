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
    return [];
  },
};
