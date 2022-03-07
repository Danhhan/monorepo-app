function uniq(arr) {
  return arr.filter((el, index, self) => self.indexOf(el) === index);
}

function normalizeLocales(arr) {
  return arr.map(el => {
    if (!el || el.indexOf('-') === -1 || el.toLowerCase() !== el) {
      return el;
    }
    const splitEl = el.split('-');
    return `${splitEl[0]}-${splitEl[1].toUpperCase()}`;
  });
}

function getUserLocale() {
  let languageList = [];

  const { navigator } = window;

  if (navigator.languages) {
    languageList = languageList.concat(navigator.languages);
  }
  if (navigator.language) {
    languageList.push(navigator.language);
  }

  languageList.push('vi-VN'); // Fallback

  return normalizeLocales(uniq(languageList))[0];
}

export default getUserLocale;
