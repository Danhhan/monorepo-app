async function downloadURI(uri: string, name = 'ant-file-download') {
  const dataUri = await fetch(uri).then(res => {
    if (res.ok) {
      return res.blob();
    }
    throw new Error('download file failed');
  });

  const uriCooked = window.URL.createObjectURL(dataUri);

  const link = document.createElement('a');
  link.style.display = 'none';
  link.setAttribute('download', name);
  link.setAttribute('href', 'Download Btn');
  link.setAttribute('target', '_blank');

  link.href = uriCooked;

  document.body.appendChild(link);

  link.click();
  link.remove();
}

export default downloadURI;
