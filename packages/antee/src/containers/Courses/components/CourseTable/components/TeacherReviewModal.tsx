import React, { FunctionComponent, useState } from 'react';
import {
  Modal,
  ModalBody,
  Tab,
  Tabs,
  ModalHeader,
  ModalFooter,
  Button,
} from '@antoree/ant-ui';
import TeacherItem from './TeacherItem';
import ReviewItem from './ReviewItem';

interface TeacherReviewModalProps {
  isShowModal: boolean;
  onClose: () => void;
}

const TeacherReviewModal: FunctionComponent<TeacherReviewModalProps> = ({
  isShowModal,
  onClose,
}) => {
  const [idselected, setIdselected] = useState('result-id');

  const tabs = [
    {
      id: 'result-id',
      name: 'Kết quả kiểm tra',
    },
    {
      id: 'review-id',
      name: 'Đánh giá định kì ',
    },
  ];

  const dataTeacherreview = [
    {
      id: 1,
      name: 'Nguyen Huy Doan',
      country: 'VIET NAM',
      avatarurl:
        'https://static.antoree.com/user_4/profile_pictures/img_1530178261_5b34aad5ed94e1.32967150.png',
      videoUrl:
        'https://static.antoree.com/user_192567/demo_video/file_1588560458_5eaf824af32019.25974390.mp4',
    },
    {
      id: 2,
      name: 'Nguyen Thi',
      country: 'USA',
      avatarurl:
        'https://static.antoree.com/user_4/profile_pictures/img_1530178261_5b34aad5ed94e1.32967150.png',

      videoUrl:
        'https://static.antoree.com/user_192567/demo_video/file_1588560458_5eaf824af32019.25974390.mp4',
    },
    {
      id: 3,
      name: 'Nguyen Thi',
      country: 'USA',
      avatarurl:
        'https://static.antoree.com/user_4/profile_pictures/img_1530178261_5b34aad5ed94e1.32967150.png',
    },
    {
      id: 4,
      name: 'Nguyen Thi',
      country: 'USA',
      avatarurl:
        'https://static.antoree.com/user_4/profile_pictures/img_1530178261_5b34aad5ed94e1.32967150.png',
    },
    {
      id: 5,
      name: 'Nguyen Thi',
      country: 'USA',
      avatarurl:
        'https://static.antoree.com/user_4/profile_pictures/img_1530178261_5b34aad5ed94e1.32967150.png',
    },
    {
      id: 6,
      name: 'Nguyen Thi',
      country: 'USA',
      avatarurl:
        'https://static.antoree.com/user_4/profile_pictures/img_1530178261_5b34aad5ed94e1.32967150.png',
    },
    {
      id: 7,
      name: 'Nguyen Thi',
      country: 'USA',
      avatarurl:
        'https://static.antoree.com/user_4/profile_pictures/img_1530178261_5b34aad5ed94e1.32967150.png',

      videoUrl:
        'https://static.antoree.com/user_192567/demo_video/file_1588560458_5eaf824af32019.25974390.mp4',
    },
    {
      id: 8,
      name: 'Nguyen Thi',
      country: 'USA',
      avatarurl:
        'https://static.antoree.com/user_4/profile_pictures/img_1530178261_5b34aad5ed94e1.32967150.png',
    },
  ];
  return (
    <>
      {isShowModal ? (
        <Modal onClose={onClose}>
          <ModalHeader>
            <h3
              style={{
                fontSize: '22px',
                fontWeight: 600,
              }}
            >
              Đánh giá của giáo viên
            </h3>
          </ModalHeader>
          <ModalBody>
            <Tabs display="default" style={{ color: 'black' }}>
              {tabs?.map((tab, index) => (
                <Tab
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  // href={tab.href}
                  style={{ color: 'black' }}
                  onClick={() => {
                    setIdselected(tab?.id);
                  }}
                  isSelected={idselected === tab.id}
                  // disabled={tab?.disabled}
                >
                  <p style={{ color: 'black' }}> {tab.name}</p>
                </Tab>
              ))}
            </Tabs>
            {idselected === 'result-id' ? (
              <TeacherItem dataTeacherreview={dataTeacherreview} />
            ) : (
              <ReviewItem />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              style={{
                backgroundColor: 'black',
                border: 'none',
                color: 'white',
              }}
              onClick={onClose}
            >
              Đóng
            </Button>
          </ModalFooter>
        </Modal>
      ) : null}
    </>
  );
};

export default TeacherReviewModal;
