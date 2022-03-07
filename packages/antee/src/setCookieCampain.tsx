export const setCookieCampain = (
  cname: any,
  cookievalue: string,
  exdays: any,
  utm: any,
) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  utm ? (document.cookie = `${cname}=${cookievalue};${expires};path=/`) : null;
};

export const getCookie = (cname: any) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const getCookieCampain = (cname: any) => {
  const name = `${cname}=`;
  // console.log(name);
  const decodedCookie = decodeURIComponent(document.cookie);

  const ca = decodedCookie.split(';');

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
export const setCookie = (cname: any, cvalue: boolean, exdays: any) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};
