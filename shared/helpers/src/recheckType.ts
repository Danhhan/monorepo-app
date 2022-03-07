async function recheckType(uri: string) {
  const recheck = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(uri);

  return recheck;
}

export default recheckType;
