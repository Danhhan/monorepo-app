import React, { FunctionComponent } from 'react';
import { ButtonEmpty, FlexItem, Text } from '@antoree/ant-ui';

import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import styles from './TodaySession.module.scss';
import CourseType from '../Courses/components/CourseCard/CourseType';
import CountimeDown from '../../components/CountTimeDown';
import ButtonToday from './ButtonToday';
import { UNHAPPENED } from './TodayStatus';
import { HAPPENED } from '../../constants/session';
import SessionType from './components/SessionType';
import {
  CHANGE_TOPIC_TYPE,
  CHANGE_TRANSFER_TYPE,
  NEW_TYPE,
  CHANGE_TEACHER_TYPE,
} from '../../constants/courses';

export type TodayCardProps = {
  item: {
    // eslint-disable-next-line camelcase
    course_id: string;
    id: string;
    courseType: number;
    // eslint-disable-next-line camelcase
    shortDateOccurred_at: string;
    shortTimeStartedAt: string;
    shortTimeEndedAt: string;
    happenedStatus: number;
    teacher: {
      name: string;
      avatarUrl: string;
    };
  };
  joinbySessionId?: any;
  joinbyCourceid?: any;
};

const TodayCard: FunctionComponent<TodayCardProps> = ({
  item,
  joinbySessionId,
  joinbyCourceid,
}) => {
  return (
    <>
      <div className={styles.SesionTodayItem}>
        <div className={styles.card}>
          <Text
            color="subdued"
            size="m"
            style={{
              textAlign: 'center',
            }}
          >
            <span>
              <SessionType type={item?.courseType} />
            </span>
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginTop: '8px',
              color: 'black',
            }}
            color="subdued"
            size="m"
          >
            <p
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              ID : {item?.course_id}
            </p>
          </Text>
          <div
            // className="flex items-center justify-items-center"
            className={styles.cardContent}
          >
            <FlexItem>
              <img
                alt="sksk"
                className={styles.img}
                src={item?.teacher?.avatarUrl}
              />
            </FlexItem>

            <FlexItem>
              <Text color="subdued" size="xs">
                {/* eslint-disable-next-line no-nested-ternary */}
                {item?.happenedStatus === UNHAPPENED ? (
                  <span
                    style={{
                      fontSize: '14px',
                      color: 'red',
                    }}
                  >
                    <ButtonEmpty
                      type="button"
                      onClick={(e: any) => {}}
                      style={{
                        fontSize: '14px',
                        cursor: 'text',
                        color: 'red',
                        textDecoration: 'none',
                      }}
                      iconType={() => (
                        <AccessTimeFilledIcon
                          style={{ fontSize: '16px' }}
                          className="h-6 w-6"
                        />
                      )}
                    >
                      <div>Đã hủy</div>
                    </ButtonEmpty>
                  </span>
                ) : item?.happenedStatus === HAPPENED ? (
                  <span
                    style={{
                      fontSize: '14px',
                      color: 'red',
                    }}
                  >
                    <ButtonEmpty
                      type="button"
                      onClick={(e: any) => {}}
                      style={{
                        fontSize: '14px',
                        cursor: 'text',
                        color: '#0AA263',
                        textDecoration: 'none',
                      }}
                      iconType={() => (
                        <AccessTimeFilledIcon
                          style={{ fontSize: '16px' }}
                          className="h-6 w-6"
                        />
                      )}
                    >
                      <div>Hoàn thành</div>
                    </ButtonEmpty>
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#00C081',
                    }}
                  >
                    <ButtonEmpty
                      type="button"
                      onClick={(e: any) => {}}
                      style={{
                        fontSize: '14px',
                        cursor: 'text',
                        color: '#00C081',
                        float: 'left',
                        textDecoration: 'none',
                      }}
                      iconType={() => (
                        <AccessTimeFilledIcon
                          style={{ fontSize: '16px' }}
                          className="h-6 w-6"
                        />
                      )}
                    >
                      <CountimeDown
                        timeend={item?.shortTimeEndedAt}
                        time={item?.shortTimeStartedAt}
                        datestart={item?.shortDateOccurred_at}
                      />
                    </ButtonEmpty>
                  </span>
                )}
              </Text>
              <Text color="subdued" size="m">
                <p style={{ fontSize: '14px' }}> Viet Nam</p>
              </Text>
              <p
                style={{
                  // height: '4rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 2,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  marginTop: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                {item.teacher.name}
              </p>

              <div className={styles.icontext}>
                <span className={styles.icon}>
                  <AccessTimeOutlinedIcon
                    style={{ fontSize: '16px', marginTop: '2px' }}
                  />
                </span>
                <Text className={styles.timecard}>
                  {item?.shortDateOccurred_at}| {item?.shortTimeStartedAt} -{' '}
                  {item?.shortTimeEndedAt}
                </Text>
              </div>
            </FlexItem>
          </div>
          <ButtonToday
            courseid={
              item?.courseType === NEW_TYPE ||
              item?.courseType === CHANGE_TEACHER_TYPE ||
              item?.courseType === CHANGE_TRANSFER_TYPE ||
              item?.courseType === CHANGE_TOPIC_TYPE
                ? item?.id
                : item?.course_id
            }
            item={item}
            mutate={
              item?.courseType === NEW_TYPE ||
              item?.courseType === CHANGE_TEACHER_TYPE ||
              item?.courseType === CHANGE_TRANSFER_TYPE ||
              item?.courseType === CHANGE_TOPIC_TYPE
                ? joinbySessionId
                : joinbyCourceid
            }
            styles={styles}
          />
        </div>
      </div>
    </>
  );
};

export default TodayCard;
