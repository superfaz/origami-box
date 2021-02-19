export function getTexts(masu, addition = null) {
  const results = Object.keys(masu.box.texts).map(k => masu.box.texts[k]);

  if (addition !== null) {
    addition.key = 'new';
    return results.concat(addition);
  }
  else {
    return results;
  }
}

export function getImages(masu, addition = null) {
  const results = Object.keys(masu.box.images).map(k => masu.box.images[k]);

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
    let fonts = getTexts(masu).map(t => t.family).map(t => t === '' ? 'Open Sans' : t).sort();
    return [...new Set(fonts)];
  }
}

