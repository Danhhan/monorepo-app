/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-closing-tag-location */
import {
  Avatar,
  BetaBadge,
  ButtonEmpty,
  Card,
  FlexGroup,
  FlexItem,
  HorizontalRule,
  Icon,
  Skeleton,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import skype from 'assets/icons/user/skype.svg';
import { SessionCard } from 'components';
import AvatarWithLabel from 'components/AvatarWithLabel';
import { COURSE_TYPES, TESTING_TYPE, TRIAL_TYPE } from 'constants/courses';
import { useRedirect } from 'hooks';
import { Course, ScheduleGroupText } from 'services/course';
import { useRetrieveLatestSession } from 'services/session';
import CourseNote from '../CourseNote';
import styles from './CourseCard.module.scss';
import HeaderCourseCard from './HeaderCourseCard';

export type CourseCardProps = {
  renderSessions: boolean;
  pageSizeSession?: number;
} & Course;

const CourseCard: React.FC<CourseCardProps> = props => {
  const {
    student,
    id,
    type,
    renderSessions,
    // eslint-disable-next-line camelcase
    schedule_group_texts,
    courseNote,
  } = props;
  const { data, isLoading } = useRetrieveLatestSession(
    {
      courseId: id,
    },
    {
      enabled: renderSessions,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  );
  const { redirectTo } = useRedirect();

  const courseType = COURSE_TYPES.find(item => item.value === type);
  const redirectToCourseDetail = () => redirectTo(`/courses/${id}/sessions`);

  return (
    <>
      <Card
        title=""
        image={<div>&nbsp;</div>}
        style={{
          border: 'none',
          boxShadow:
            '0px 0.9px 4px -1px rgba(0, 0, 0, 0.08), 0px 2.6px 8px -1px rgba(0, 0, 0, 0.06), 0px 5.7px 12px -1px rgba(0, 0, 0, 0.05), 0px 15px 15px -1px rgba(0, 0, 0, 0.04)',
          padding: '0 32px 8px 32px',
          paddingTop: 0,
          borderTop: '8px solid transparent',
          borderColor: `${courseType?.backgroundColor}`,
        }}
        marginTop={1}
      >
        <div
          className={renderSessions ? styles.courseCardContent : ''}
          onClick={redirectToCourseDetail}
        >
          <HeaderCourseCard {...props} />
          <HorizontalRule margin="m" />
          <FlexGroup
            responsive={false}
            gutterSize="s"
            justifyContent="spaceBetween"
          >
            <FlexItem grow={false}>
              <FlexGroup responsive={false} gutterSize="s">
                <AvatarWithLabel student={student} />
                <FlexItem grow={false} className="text-left">
                  {courseNote && (
                    <CourseNote id={id} student={student} note={courseNote} />
                  )}
                </FlexItem>
              </FlexGroup>
            </FlexItem>
            <>
              {courseType?.value !== TRIAL_TYPE &&
                courseType?.value !== TESTING_TYPE &&
                Array.isArray(schedule_group_texts) &&
                schedule_group_texts?.length > 0 && (
                  <FlexItem grow={false}>
                    <FlexGroup responsive={false} gutterSize="m">
                      {schedule_group_texts.map(
                        (item: ScheduleGroupText, index) => (
                          <FlexItem
                            key={index}
                            grow={false}
                            className="text-center"
                          >
                            <BetaBadge
                              label={item.dayOfWeeks}
                              size="s"
                              style={{
                                paddingTop: 4,
                                paddingBottom: 4,
                                backgroundColor: 'rgba(52, 55, 65, 0.05)',
                                boxShadow: 'none',
                              }}
                            />
                            <Text
                              color="subdued"
                              style={{
                                paddingTop: 4,
                              }}
                            >
                              <p>{item.groupedTime}</p>
                            </Text>
                          </FlexItem>
                        ),
                      )}
                    </FlexGroup>
                  </FlexItem>
                )}
            </>
          </FlexGroup>
        </div>

        <Spacer />
        {renderSessions && (
          <>
            {isLoading ? (
              <FlexGroup>
                <FlexItem>
                  <Skeleton style={{ height: '73px' }} width="100%" />
                </FlexItem>
              </FlexGroup>
            ) : (
              <FlexGroup direction="column">
                <FlexItem grow={false}>
                  {data?.data?.sessions && (
                    <SessionCard
                      courseType={courseType}
                      session={data?.data?.sessions}
                    />
                  )}
                </FlexItem>
              </FlexGroup>
            )}
          </>
        )}
        <Spacer />
      </Card>
    </>
  );
};

export default CourseCard;
