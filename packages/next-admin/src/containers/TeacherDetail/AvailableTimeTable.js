/* eslint-disable react/prop-types */
import moment from 'moment';
import { memo } from 'react';
import { FormattedDate } from 'react-intl';
import { useQuery } from 'react-query';
import {
  getAvailableTimeByTesterId,
  GET_AVAILABLE_TIME_BY_TESTER_ID,
} from 'services/tester';
import styles from './AvailableTimeTable.module.scss';

function Availabletime({ dayOfWeeks, testerId }) {
  const { data } = useQuery(
    [GET_AVAILABLE_TIME_BY_TESTER_ID(testerId), dayOfWeeks],
    () => getAvailableTimeByTesterId({ dayOfWeeks, testerId }),
    {
      retry: 1,
    },
  );

  return (
    <div className="flex flex-wrap mt-3  border-0 border-solid border-gray-200">
      {data?.data.map(item => {
        return (
          <div
            className={styles.element}
            style={item.booked === 1 ? { backgroundColor: '#FFB800' } : null}
          >
            <div>
              <FormattedDate
                value={moment(item.time_from, 'YYYY-MM-DD HH:mm:ss').toDate()}
                hour="2-digit"
                minute="2-digit"
                hourCycle="h23"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(Availabletime);
