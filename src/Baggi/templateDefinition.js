function isPositive(value) {
  return value !== undefined && parseFloat(value) > 0;
}

export const baggiTemplateDefinition = {
  isGeneralValid: function (data) {
    return (
      data !== undefined && isPositive(data.width) && isPositive(data.length)
    );
  },

  blocks: function (data) {
    return [];
  },
};
