export function getTexts(block, addition = null) {
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

export function getFonts(masu) {
  if (masu === undefined) {
    return [];
  } else {
    let fonts = getTexts(masu.base)
      .concat(getTexts(masu.lid))
      .map((t) => t.family)
      .concat(["Open Sans"])
      .map((t) => (t === "" ? "Open Sans" : t))
      .sort();
    return [...new Set(fonts)];
  }
}
