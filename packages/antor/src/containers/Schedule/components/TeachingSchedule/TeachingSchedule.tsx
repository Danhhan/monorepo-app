import {
  DayGridPlugin,
  FlexGroup,
  FlexItem,
  FullCalendar,
  InteractionPlugin,
  LoadingSpinner,
  notification,
  Spacer,
  Text,
  TimeGridPlugin,
  ToolTip,
} from '@antoree/ant-ui';
import styled from '@emotion/styled';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRetrieveTeachingSchedule } from 'services/schedule';

export const StyleWrapper = styled.div`
  .fc .fc-button {
    background: white;
    color: black;
    border-color: #cdcfd1;
  }
  .fc .fc-button-primary:not(:disabled):active,
  .fc .fc-button-primary:not(:disabled).fc-button-active {
    background: #f5f5f5;
    color: #1a1c21;
    font-weight: bold;
    border-color: #cdcfd1;
  }
`;
const TeachingSchedule: React.FC<{}> = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isEnabled, setEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleGetCalendar = (dateInfo: any) => {
    setStartTime(moment(dateInfo?.startStr).format('YYYY-MM-DD hh:mm:ss'));
    setEndTime(moment(dateInfo?.endStr).format('YYYY-MM-DD hh:mm:ss'));
  };
  const { data: teachingSchedule } = useRetrieveTeachingSchedule(
    {
      start_calendar_day_time: startTime,
      end_calendar_day_time: endTime,
    },
    {
      enabled: isEnabled,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  );
  useEffect(() => {
    setEnabled(true);
  }, [startTime, endTime]);
  const handleEventClick = (clickInfo: any) => {
    const duration = teachingSchedule?.data?.schedules.find(
      item => item.id === clickInfo?.event?.id,
    );
    if (!duration) {
      notification.error({
        title: <FormattedMessage defaultMessage="Not found course id" />,
      });
      return;
    }
    window.open(
      `${window.location.origin}/courses/${duration.course_id}/sessions`,
      '_blank',
    );
  };

  const renderEventContent = (info: any) => {
    if (info.view.type === 'dayGridMonth') {
      return (
        <>
          <ToolTip position="top" content={info.event.title}>
            <FlexGroup>
              <FlexItem
                style={{
                  backgroundColor: `${info.event.backgroundColor}`,
                  color: 'white',
                  width: 130,
                  borderRadius: 8,
                }}
                grow={false}
              >
                <i className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {info.event.title}
                </i>
              </FlexItem>
            </FlexGroup>
          </ToolTip>
        </>
      );
    }
    return (
      <>
        <FlexGroup>
          <FlexItem>
            <i>{info.event.title}</i>
          </FlexItem>
        </FlexGroup>
      </>
    );
  };
  return (
    <>
      <StyleWrapper style={{ position: 'relative' }}>
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              background: 'rgba(255, 255, 255, 0.7)',
              width: '100%',
              height: '100%',
              zIndex: 50,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                textAlign: 'center',
              }}
            >
              <LoadingSpinner size="xl" />
              <Spacer size="m" />
              <Text size="s">
                <FormattedMessage defaultMessage="Loading..." />
              </Text>
            </div>
          </div>
        )}

        <FullCalendar
          plugins={[DayGridPlugin, TimeGridPlugin, InteractionPlugin]}
          headerToolbar={{
            left: 'today prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable
          selectable
          selectMirror
          dayMaxEvents
          weekends
          events={teachingSchedule?.data?.schedules}
          datesSet={(dateInfo: any) => handleGetCalendar(dateInfo)}
          eventContent={renderEventContent} // custom render function
          eventClassNames="calendar"
          eventClick={handleEventClick}
        />
      </StyleWrapper>
    </>
  );
};

export default TeachingSchedule;
