export function getTexts(block, addition = null) {
  const results = Object.keys(block.texts).map(k => block.texts[k]);

  if (addition !== null) {
    addition.key = 'new';
    return results.concat(addition);
  }
  else {
    return results;
  }
}

export function getImages(block, addition = null) {
  const results = Object.keys(block.images).map(k => block.images[k]);

  if (addition !== null) {
    addition.key = 'new';
    return results.concat(addition);
  }
  else {
    return results;
  }
}

export function getFonts(masu) {
  if (masu === undefined) {
    return [];
  }
  else {
    let fonts = getTexts(masu.base)
      .concat(getTexts(masu.lid))
      .map(t => t.family)
      .concat(['Open Sans'])
      .map(t => t === '' ? 'Open Sans' : t)
      .sort();
    return [...new Set(fonts)];
  }
}

