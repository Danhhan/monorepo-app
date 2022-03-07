import React, { memo } from 'react';
import { useRetrieveCourseById } from 'services/course';
import { ButtonIcon } from '@antoree/ant-ui';
import {
  COURSE_OFFICIAL,
  COURSE_TYPE_TESTING,
  COURSE_TYPE_TRIAL,
  COURSE_STATUS_CANCEL,
  COURSE_STATUS_CLOSE,
  COURSE_STATUS_DELAY,
  COURSE_TYPE_CHANGE_TEACHER,
  COURSE_TYPE_TRANSFER,
  COURSE_STATUS_OPEN,
} from '../../constants';

interface ActionProps {
  toggleChangeCourse: () => void;
  courseId: number;
  item: any;
}

const Action = ({ courseId, toggleChangeCourse, item }: ActionProps) => {
  return (
    <div>
      {(item?.type === COURSE_TYPE_TRIAL &&
        item?.status === COURSE_STATUS_OPEN) ||
      (item?.type === COURSE_TYPE_TESTING &&
        item?.status === COURSE_STATUS_OPEN) ? (
        <div>
          <ButtonIcon
            iconType="documentEdit"
            onClick={(e: any) => {
              toggleChangeCourse();
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default memo(Action);
