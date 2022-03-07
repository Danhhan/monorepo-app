function uniq(arr: string[]) {
  return arr.filter((el, index, self) => self.indexOf(el) === index);
}

function normalizeLocales(arr: string[]) {
  return arr.map(el => {
    if (!el || el.indexOf('-') === -1 || el.toLowerCase() !== el) {
      return el;
    }
    const splitEl = el.split('-');
    return `${splitEl[0]}-${splitEl[1].toUpperCase()}`;
  });
}

function getUserLocale(): string | 'en-US' {
  let languageList: string[] = [];

  const { navigator } = window;

  if (navigator.languages) {
    languageList = languageList.concat(navigator.languages);
  }
  if (navigator.language) {
    languageList.push(navigator.language);
  }

  languageList.push('en-US'); // Fallback

  return normalizeLocales(uniq(languageList))[0];
}

export default getUserLocale;
