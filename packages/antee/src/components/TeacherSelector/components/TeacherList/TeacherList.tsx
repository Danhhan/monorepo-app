import {
  Avatar,
  Card,
  LoadingSpinner,
  Popover,
  Spacer,
  Text,
  Title,
  Button,
  ButtonEmpty,
} from '@antoree/ant-ui';
import NoTeacher from 'assets/images/no-teacher.png';
import { AvailableTimeNew, ModalBooking, RatingCard } from 'components';
import { useToggle } from 'hooks';
import useOnClickOutside from 'hooks/useOnClickOutside';
import moment from 'moment';
import React, { ReactNode, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FormattedMessage } from 'react-intl';
import { Teacher } from 'services/teachers';
import styles from './TeacherList.module.scss';
import ModalTeacherList from './ModalTeacherList';
import AvailableTimeTesting from '../../../AvailableTimeTesting/AvailableTimeTesting';

export type TeacherListProps = {
  successHandle?: () => void;
  handleOpen?: () => void;
  startTimeRange: string;
  endTimeRange: string;
  dateRange: string;
  fetchNextPage: () => {};
  hasNextPage: boolean;
  loader?: ReactNode;
  data?: Array<Teacher>;
  selectHandle?: Function;
  dataLength: number;
  role: 2 | 3;
  isAcceptTrial?: boolean;
  isLoading?: boolean;
};

const TeacherList: React.FC<TeacherListProps> = ({
  successHandle,
  startTimeRange,
  endTimeRange,
  dateRange,
  data,
  fetchNextPage,
  loader,
  hasNextPage,
  selectHandle,
  dataLength,
  role,
  isAcceptTrial,
  isLoading,
  handleOpen,
}) => {
  const [activeTeacherId, setActiveTeacherId] = useState<number | undefined>(
    undefined,
  );

  const handleGetTeacherAvailable = (id: number | undefined) => {
    setActiveTeacherId(activeTeacherId === id ? undefined : id);
  };
  const sliderRef = useRef<any>(null);

  const { isVisiable, close, open } = useToggle();

  // eslint-disable-next-line no-shadow
  const ref = useRef<any>();

  useOnClickOutside(ref, () => close());
  const [isOpenmoda, setIopen] = useState(false);
  const [idteacher, setIdteacher] = useState(0);

  const hanldeOpenmodal = () => {
    setIopen(!isOpenmoda);
  };
  const {
    isVisiable: isVisiableModal,
    toggle: toggleModal,
    close: closeModal,
  } = useToggle();

  const handleToggle = () => {
    toggleModal();
  };
  return !isLoading && (!data || data?.length === 0) ? (
    <div className="text-center">
      <Spacer size="l" />
      <img
        className="w-3/5 h-auto m-auto block"
        src={NoTeacher}
        alt="no-teacher"
      />
      <Spacer />
      <Text>
        <p>
          <FormattedMessage defaultMessage="No teachers have free time" />
        </p>
      </Text>
    </div>
  ) : (
    <>
      <Title size="s">
        <h2 className="font-semibold">Tất cả giáo viên</h2>
      </Title>
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={hasNextPage ?? true}
        loader={
          loader || (
            <div className="flex flex-col items-center justify-center justify-items-center py-10">
              <LoadingSpinner size="xl" />
              <Text>
                <p>
                  <FormattedMessage defaultMessage="Đang tải danh sách giáo viên.. " />
                </p>
              </Text>
            </div>
          )
        }
        style={{ overflow: 'inherit' }}
        dataLength={dataLength}
      >
        {data?.map(teacher => (
          <>
            <Spacer />
            <Popover
              display="block"
              button={
                <Card
                  className={styles.customCard}
                  paddingSize="none"
                  layout="horizontal"
                  // display="subdued"
                  titleSize="xs"
                  style={{
                    border:
                      activeTeacherId === teacher.id
                        ? '2px solid #343741'
                        : 'none',
                    borderRadius: 12,
                    paddingRight: 16,
                  }}
                  icon={
                    <Avatar
                      name={teacher.name || ''}
                      type="space"
                      style={{
                        width: '170px',
                        height: '170px',
                        borderTopLeftRadius: 12,
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 8,
                        borderTopRightRadius: 8,
                        overflow: 'hidden',
                      }}
                      imageUrl={teacher.avatarUrl}
                    />
                  }
                  titleElement="h2"
                  title={
                    <div style={{ paddingTop: 16 }}>
                      <div className="flex flex-row justify-between">
                        <Text color="subdued" size="m">
                          <p>{teacher.nationality}&nbsp;</p>
                        </Text>
                        <div>
                          <RatingCard averageRating={teacher.rating} />
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-center">
                        <span
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '20vw',
                            fontSize: '18px',
                            textDecoration: 'none',
                          }}
                        >
                          {teacher.name}
                        </span>

                        <ModalTeacherList
                          isOpen={isOpenmoda}
                          // eslint-disable-next-line react/no-children-prop

                          ref={ref}
                          handleOpen={hanldeOpenmodal}
                          dateRange={dateRange}
                          teacherId={idteacher}
                          teacherInfo={{
                            avatar: teacher.avatarUrl,
                            name: teacher.name,
                            country: teacher.nationality,
                            rating: teacher.rating,
                            video: teacher.video,
                            description:
                              teacher?.descriptionExperience ||
                              teacher?.description,
                          }}
                          isAcceptTrial={isAcceptTrial}
                          successHandle={successHandle}
                          endTimeRange={endTimeRange}
                          startTimeRange={startTimeRange}
                          role={role}
                        />
                      </div>
                    </div>
                  }
                  description={
                    <div style={{ paddingBottom: 16 }}>
                      <Text className="inline" size="m">
                        <p
                          className="overflow-hidden overflow-ellipsis inline"
                          style={{
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            display: '-webkit-box',
                          }}
                        >
                          {teacher?.descriptionExperience ||
                            teacher?.description}
                        </p>
                      </Text>
                    </div>
                  }
                  onMouseOver={() => {
                    teacher.id !== activeTeacherId &&
                      handleGetTeacherAvailable(teacher.id);
                  }}
                  onMouseLeave={() => {
                    teacher.id !== activeTeacherId &&
                      handleGetTeacherAvailable(undefined);
                  }}
                />
              }
              anchorPosition="rightUp"
              isOpen={teacher.id === activeTeacherId}
              closePopover={() => handleGetTeacherAvailable(undefined)}
              panelPaddingSize="m"
              style={{ borderRadius: 12 }}
            >
              <div style={{ width: 384 }}>
                <AvailableTimeTesting
                  timeBottomselected=""
                  handleSelectime={() => {}}
                  isVisiableModalMobile={isVisiableModal}
                  handleToggle={handleToggle}
                  closeModal={closeModal}
                  onSelect={() => {}}
                  teacherId={teacher?.id}
                  teacherInfo={{
                    avatar: teacher?.avatarUrl,
                    name: teacher?.name,
                    country: teacher?.nationality,
                    rating: teacher?.rating,
                    video: teacher?.video,
                  }}
                  isAcceptTrial={isAcceptTrial}
                  successHandle={successHandle}
                  minutesSpace={20}
                  date={dateRange}
                  role={role}
                  endTimeRange={endTimeRange}
                  startTimeRange={startTimeRange}
                  minHourSelected={moment(startTimeRange).hours()}
                  minMinSelected={moment(startTimeRange).minutes()}
                  maxHourSelected={moment(endTimeRange).hours() + 1}
                  maxMinSelected={moment(endTimeRange).minutes()}
                />
              </div>
            </Popover>
          </>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default TeacherList;
