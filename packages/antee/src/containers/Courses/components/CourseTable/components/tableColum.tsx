import React from 'react';
import { Avatar, ButtonEmpty, FlexItem, Text, Title } from '@antoree/ant-ui';
import CourseType from '../../CourseCard/CourseType';
import {
  CANCEL_STATUS,
  COMPLETED_STATUS,
  DELAY_STATUS,
  STATUS_OPEN,
} from '../../../../../constants/courses';
import CourseStatus from '../../CourseCard/CourseStatus';
import Action from '../Action';

export type columProps = {
  handleShowModal: () => void;
  toggleChangeCourse: () => void;
};

const tableColum = ({ handleShowModal, toggleChangeCourse }: columProps) => {
  return [
    {
      field: 'id',
      name: (
        <span style={{ fontWeight: 'bold', color: '#69707D' }}>
          ID Khóa học
        </span>
      ),

      render: (id: number) => <p>{id}</p>,
      truncateText: true,
      width: '100',
    },

    {
      field: 'teacher',
      name: (
        <span style={{ fontWeight: 'bold', color: '#69707D' }}>Giáo viên</span>
      ),
      render: (teacher: {
        name: string;
        avatarUrl: string;
        nationality: string;
        avatarUrlThumb: string;
      }) => (
        <div className="flex items-center justify-items-center">
          <FlexItem grow={false} className="m-0">
            <Avatar
              imageUrl={teacher?.avatarUrl}
              name="Phong"
              size="l"
              type="space"
              style={{ margin: '16px 8px 16px 0px' }}
            />
          </FlexItem>
          <FlexItem style={{ width: '130px' }}>
            {/* style={{ width: '156px' }} */}
            <Title size="xxs">
              <h1
                className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                style={{
                  // height: '4rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 2,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {teacher?.name}
              </h1>
            </Title>
            <Text color="subdued" size="xs">
              <p>{teacher?.nationality}</p>
            </Text>
          </FlexItem>
        </div>
      ),
      truncateText: true,

      width: '200',
    },

    {
      field: 'type',
      name: <span style={{ fontWeight: 'bold', color: '#69707D' }}>Loại</span>,
      render: (type: number) => (
        <p>
          {' '}
          <CourseType type={type} />{' '}
        </p>
      ),
      truncateText: true,
      textOnly: true,

      width: '100',
    },

    {
      field: 'scheduleGroupTexts',
      name: (
        <span style={{ fontWeight: 'bold', color: '#69707D' }}>Lịch Học</span>
      ),
      render: (scheduleGroupTexts: Array<string>) => (
        <p>
          {scheduleGroupTexts?.map((item: string) => (
            <p>{item}</p>
          ))}
        </p>
      ),
      truncateText: true,
      textOnly: true,

      width: '100',
    },

    {
      field: 'status',

      name: (
        <span style={{ fontWeight: 'bold', color: '#69707D' }}>Trạng thái</span>
      ),
      render: (status: any, totalPassedDuration: any) => (
        <FlexItem style={{ width: '100px' }} grow={false}>
          {[
            CANCEL_STATUS,
            DELAY_STATUS,
            COMPLETED_STATUS,
            STATUS_OPEN,
          ].includes(status) ? (
            <div>
              <CourseStatus status={status} item={totalPassedDuration} />
            </div>
          ) : (
            <div />
          )}
        </FlexItem>
      ),
      truncateText: true,
      textOnly: true,

      width: '100',
    },

    {
      field: 'test',
      name: (
        <span style={{ fontWeight: 'bold', color: '#69707D' }}>Đánh giá</span>
      ),
      render: (test: { id: string; url: string }) => (
        <FlexItem style={{ width: '100px' }} grow={false}>
          {test ? (
            <>
              {test.url ? (
                <ButtonEmpty
                  style={{
                    marginRight: '45px',
                  }}
                  onClick={() => {
                    handleShowModal();
                  }}
                >
                  Xem
                </ButtonEmpty>
              ) : null}
            </>
          ) : null}
        </FlexItem>
      ),
      truncateText: true,
      textOnly: true,

      width: '100',
    },
    {
      field: 'id',
      name: (
        <span style={{ fontWeight: 'bold', color: '#69707D' }}>Đổi lịch</span>
      ),
      render: (id: number, item: any) => (
        <FlexItem style={{ width: '100px' }} grow={false}>
          <Action
            courseId={id}
            toggleChangeCourse={toggleChangeCourse}
            item={item}
          />
        </FlexItem>
      ),
      truncateText: true,
      textOnly: true,

      width: '100',
    },
  ];
};

export default tableColum;
