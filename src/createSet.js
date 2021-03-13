export default function createSet(selector, mainArray, secondaryArray) {
  const mainKeys = mainArray.map(selector);
  const results = [].concat(mainArray);

  secondaryArray.forEach((item) => {
    const key = selector(item);
    if (!mainKeys.includes(key)) {
      results.push(item);
    }
  });

  return results;
}
