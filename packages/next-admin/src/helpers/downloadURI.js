function downloadURI(uri, name = 'ant-file-download') {
  const link = document.createElement('a');
  // If you don't know the name or want to use
  // the webserver default set name = ''
  link.style.display = 'none';

  link.setAttribute('download', name);
  link.setAttribute('href', 'Download Btn');
  link.setAttribute('target', '_blank');

  link.href = uri;

  document.body.appendChild(link);

  link.click();
  link.remove();
}

export default downloadURI;
