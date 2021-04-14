export function useIds() {
  const uniqueId = Math.floor((1 + Math.random()) * 0x1000000)
    .toString(16)
    .substring(1);

  return {
    uniqueId,
    unique: function (prefix) {
      return `${prefix}-${uniqueId}`;
    },
  };
}
