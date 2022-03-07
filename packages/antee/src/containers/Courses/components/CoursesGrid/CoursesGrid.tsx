import {
  Avatar,
  BasicTable,
  ButtonIcon,
  FlexItem,
  LoadingSpinner,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import {
  CANCEL_STATUS,
  COMPLETED_STATUS,
  DELAY_STATUS,
} from 'constants/courses';
import { FormattedMessage } from 'react-intl';
import { memo } from 'react';
import { CourseCardProps } from '../CourseCard/CourseCard';
import CourseStatus from '../CourseCard/CourseStatus';
import CourseType from '../CourseCard/CourseType';

export type CoursesGridProps = {
  isLoading?: boolean;
  fetchNextPage?: any;
  courses?: CourseCardProps[];
  idSelected: number;
  courseType: number;
  onSelectCourse: (id: number, type: number) => void;
};

const CoursesGrid: React.FC<CoursesGridProps> = ({
  isLoading = false,
  courses = [],
  idSelected,
  courseType,
  fetchNextPage,
  onSelectCourse,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center justify-items-center py-10">
        <LoadingSpinner size="xl" />
        <Text>
          <p>
            <FormattedMessage defaultMessage="Loading courses..." />
          </p>
        </Text>
      </div>
    );
  }

  const pageNation = () => {};
  return (
    <div>
      {courses.length !== 0 ? (
        <BasicTable
          responsive
          translate="yes"
          tableLayout="fixed"
          loading={isLoading}
          items={courses}
          hasActions
          columns={[
            {
              field: 'id',
              name: <FormattedMessage defaultMessage="ID Khóa Học" />,

              render: (id: CoursesGridProps) => <p>{id}</p>,
              truncateText: true,
              textOnly: true,

              width: '100',
            },
            {
              field: 'teacher',
              name: <FormattedMessage defaultMessage="Giáo Viên" />,
              render: (teacher: {
                name: string;
                avatarUrl: string;
                nationality: string;
                avatarUrlThumb: string;
              }) => (
                <div className="flex items-center justify-items-center">
                  <FlexItem grow={false} className="m-0">
                    <Avatar
                      imageUrl={teacher.avatarUrl}
                      name="Phong"
                      size="l"
                      type="space"
                    />
                  </FlexItem>
                  <FlexItem style={{ width: '100px' }}>
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
                        {teacher.name}
                      </h1>
                    </Title>
                    <Text color="subdued" size="xs">
                      <p>{teacher.nationality}</p>
                    </Text>
                  </FlexItem>
                </div>
              ),
              truncateText: true,
              textOnly: true,

              width: '120',
            },

            {
              field: 'type',
              name: <FormattedMessage defaultMessage="Type" />,
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
              field: 'formattedStartedAt',
              name: <FormattedMessage defaultMessage="Lịch học" />,
              render: (formattedStartedAt: CoursesGridProps) => (
                <p>{formattedStartedAt}</p>
              ),
              truncateText: true,
              textOnly: true,

              width: '100',
            },

            {
              field: 'status',

              name: <FormattedMessage defaultMessage="Trạng thái" />,
              render: (status: any, totalPassedDuration: CoursesGridProps) => (
                <FlexItem style={{ width: '100px' }} grow={false}>
                  {[CANCEL_STATUS, DELAY_STATUS, COMPLETED_STATUS].includes(
                    status,
                  ) ? (
                    <>
                      <div
                        style={{
                          minHeight: '40px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                      >
                        <CourseStatus status={status} item={null} />
                      </div>
                    </>
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
              field: 'action',
              name: <FormattedMessage defaultMessage="Action" />,
              render: (status: number) => (
                <FlexItem grow={false}>
                  <Spacer size="s" />
                  <div
                    style={{
                      minHeight: '40px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <ButtonIcon
                      iconType="documentEdit"
                      // onClick={toggleModal}
                      isDisabled={[
                        CANCEL_STATUS,
                        DELAY_STATUS,
                        COMPLETED_STATUS,
                      ].includes(status)}
                      style={{
                        color: [
                          CANCEL_STATUS,
                          DELAY_STATUS,
                          COMPLETED_STATUS,
                        ].includes(status)
                          ? '#ABB4C4'
                          : '#5A606B',
                      }}
                    />
                  </div>
                  {/* <ChangeCourse
              isVisiable={isVisiableModal}
              onClose={closeModal}
              onChangeCourse={onChangeCourse}
              isLoading={isLoadingCancel}
            /> */}
                </FlexItem>
              ),
              truncateText: true,
              textOnly: true,

              width: '100',
            },
          ]}
          onChange={() => {}}
          pagination={{
            pageIndex: 1,
            pageSize: courses.length,
            totalItemCount: courses.length,
            pageSizeOptions: [5, 10, 15, 20],
            // hidePerPageOptions: true,
          }}
        />
      ) : //  courses.map(course => (
      //     <FlexItem key={course.id} style={{ margin: '8px 12px' }}>
      //       <CourseCard
      //         {...course}
      //         idSelected={idSelected}
      //         courseType={courseType}
      //         onSelectCourse={onSelectCourse}
      //       />
      //     </FlexItem>
      //   ))
      null}
    </div>
  );
};

export default memo(CoursesGrid);
