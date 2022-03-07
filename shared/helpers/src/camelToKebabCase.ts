/**
 * Convert Camel Case to Kebab Case
 * @param  {string} str
 * @returns string
 */
const camelToKebabCase = (str: string): string =>
  str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

export default camelToKebabCase;
