function getPathName(): string | 'en-US' {
  const urlString = window.location.href; // window.location.href
  const url = new URL(urlString);
  const pathName = url?.pathname.split('/');
  return pathName[1];
}

export default getPathName;
