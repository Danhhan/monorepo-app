import {
  Badge,
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  Health,
  Icon,
  Text,
} from '@antoree/ant-ui';
import {
  COURSE_STATUSES,
  COURSE_TYPES,
  TESTING_TYPE,
  TRIAL_TYPE,
} from 'constants/courses';
import { useRedirect } from 'hooks';
import { FormattedMessage } from 'react-intl';
import { Course } from 'services/course';
import styles from './CourseCard.module.scss';

export type HeaderCourseCardProps = {
  renderSessions: boolean;
  pageSizeSession?: number;
} & Course;

const HeaderCourseCard: React.FC<HeaderCourseCardProps> = props => {
  const {
    totalDuration,
    totalPassedDuration,
    id,
    title,
    type,
    status,
    renderSessions,
    refId,
    requestId,
  } = props;
  const { redirectTo } = useRedirect();

  const courseType = COURSE_TYPES.find(item => item.value === type);
  const courseStatus = COURSE_STATUSES.find(item => item.value === status);

  const renderCourseTitle = () => {
    if (
      courseType?.value === TRIAL_TYPE ||
      courseType?.value === TESTING_TYPE
    ) {
      return <FormattedMessage {...courseType?.label} />;
    }
    return title;
  };

  const redirectToCourseDetail = () => redirectTo(`/courses/${id}/sessions`);

  const renderCourseDuration = () => {
    if (
      courseType?.value === TRIAL_TYPE ||
      courseType?.value === TESTING_TYPE
    ) {
      return (
        <FlexItem grow={false} className={styles.duration}>
          <Text style={{ color: `${courseType?.color}` }}>
            <span>{courseType?.duration} MINUTES</span>
          </Text>
        </FlexItem>
      );
    }
    return (
      <FlexItem grow={false} className={styles.duration}>
        <Text style={{ color: `${courseType?.color}` }}>
          <span>{Number(totalPassedDuration.toFixed(1))} / </span>
          <span>{Number(totalDuration.toFixed(1))}H</span>
        </Text>
      </FlexItem>
    );
  };

  return (
    <>
      <FlexGroup>
        <FlexItem grow={7}>
          <FlexGroup>
            <FlexItem grow={false}>
              {courseStatus ? (
                <Health
                  color={courseStatus.color}
                  style={{ lineHeight: 'inherit' }}
                >
                  <FormattedMessage {...courseStatus.label} />
                </Health>
              ) : (
                <FormattedMessage defaultMessage="Unknown" />
              )}
            </FlexItem>
            <FlexItem grow={false}>
              <Text>
                <p style={{ color: courseType ? courseType?.color : '' }}>
                  ID {id}
                </p>
              </Text>
            </FlexItem>
            {requestId && (
              <FlexItem grow={false}>
                <Text color="subdued">
                  <p>LR {requestId}</p>
                </Text>
              </FlexItem>
            )}
            {refId && (
              <FlexItem grow={false}>
                <Text color="subdued">
                  <p>ACS {refId}</p>
                </Text>
              </FlexItem>
            )}
            <FlexItem grow={false}>
              <Text
                style={{ color: `${courseType?.color}` }}
                className="font-bold"
              >
                {renderCourseTitle()}
              </Text>
            </FlexItem>
          </FlexGroup>
        </FlexItem>
        <FlexItem grow={3}>
          <FlexGroup justifyContent="flexEnd">
            {renderCourseDuration()}
            {renderSessions && (
              <FlexItem grow={false} className={styles.viewDetail}>
                <ButtonEmpty className="h-6">
                  <Text size="s" color="black">
                    <>
                      View Details
                      <Icon className="ml-2" type="arrowRight" />
                    </>
                  </Text>
                </ButtonEmpty>
              </FlexItem>
            )}
          </FlexGroup>
        </FlexItem>
      </FlexGroup>
    </>
  );
};

export default HeaderCourseCard;
