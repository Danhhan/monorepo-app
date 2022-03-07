/* eslint-disable camelcase */
import { ButtonEmpty } from '@antoree/ant-ui';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { FunctionComponent } from 'react';
import CountimeDown from '../../../../components/CountTimeDown/CountimeDown';
import {
  HAPPENING,
  SESSION_STATUS,
  UPCOMING,
} from '../../../../constants/session';

interface SessionStatusByCourseProps {
  happenedStatus: string;
  shortTimeEndedAt: string;
  shortTimeStartedAt: string;
  shortDateOccurred_at: string;
}

const SessionStatusByCourse: FunctionComponent<SessionStatusByCourseProps> = ({
  happenedStatus,
  shortTimeEndedAt,
  shortTimeStartedAt,
  shortDateOccurred_at,
}) => {
  const status = SESSION_STATUS.filter(
    (item: any) => item?.value === happenedStatus,
  );
  return (
    <div>
      {status.map((item: any) => (
        <div>
          {item.label === UPCOMING || item.label === HAPPENING ? (
            <CountimeDown
              timeend={shortTimeEndedAt}
              time={shortTimeStartedAt}
              datestart={shortDateOccurred_at}
            />
          ) : (
            <>
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
                    color: item.color,
                    textDecoration: 'none',
                  }}
                  iconType={() => (
                    <AccessTimeFilledIcon
                      style={{ fontSize: '16px' }}
                      className="h-6 w-6"
                    />
                  )}
                >
                  <div>{item?.label}</div>
                </ButtonEmpty>
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SessionStatusByCourse;
