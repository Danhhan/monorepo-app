import { Avatar } from '@antoree/ant-ui';
import React from 'react';
import useImageBroken from '../../../../hooks/useImageBroken';

interface ImageTeacherProps {
  item: any;
}

const ImageTeacher = ({ item }: ImageTeacherProps) => {
  const showsimg = useImageBroken(item?.teacher?.avatarUrl);
  return (
    <div>
      {item?.teacher?.avatarUrl === null || showsimg === false ? (
        <Avatar
          style={{
            width: '120px',
            height: '132px',
            marginTop: '3px',
            marginRight: '16px',
            borderRadius: '5px',
          }}
          size="xl"
          type="space"
          name={item?.teacher?.name}
        />
      ) : (
        <img
          alt="Antoree"
          className="img"
          style={{
            width: '120px',
            height: '132px',
            marginTop: '3px',
            marginRight: '16px',
            borderRadius: '5px',
          }}
          src={item?.teacher?.avatarUrl}
        />
      )}
    </div>
  );
};

export default ImageTeacher;
