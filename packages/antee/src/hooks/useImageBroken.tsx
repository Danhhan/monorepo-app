/* 
hook để kiểm tra hình ảnh bị lỗi đường dẫn

*/

import { useEffect, useState } from 'react';

const useImageBroken = (url: string) => {
  // ban đầu nếu có hình ảnh, trả về true
  const [isHaveImg, setImg] = useState(true);
  useEffect(() => {
    const s = document.createElement('IMG') as HTMLImageElement;
    s.src = url;
    // eslint-disable-next-line func-names
    s.onerror = function () {
      // đường dẫn ảnh bị lỗi hoặc url hình ảnh ko tìm thấy set false;
      setImg(false);
    };
    // eslint-disable-next-line func-names
    s.onload = function () {
      // load hình ảnh thành công set true
      setImg(true);
    };
  }, [url]);

  return isHaveImg;
};

export default useImageBroken;
