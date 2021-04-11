export function getTexts(block, addition = null) {
  if (block === undefined || block === null) {
    return [];
  }

  let texts = {
    ...block.texts,
  };

  if (addition !== null) {
    texts[addition.key ?? "new"] = addition;
  }

  return Object.keys(texts).map((k) => texts[k]);
}

export function getImages(block, addition = null) {
  let images = {
    ...block.images,
  };

  if (addition !== null) {
    images[addition.key ?? "new"] = addition;
  }

  return Object.keys(images).map((k) => images[k]);
}

export function getFonts(templateData) {
  if (templateData === undefined) {
    return [];
  } else {
    let fonts = getTexts(templateData.base)
      .concat(getTexts(templateData.lid))
      .map((t) => t.family)
      .concat(["Open Sans"])
      .map((t) => (t === "" ? "Open Sans" : t))
      .sort();
    return [...new Set(fonts)];
  }
}
