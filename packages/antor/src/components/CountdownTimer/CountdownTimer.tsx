/* eslint-disable react-hooks/exhaustive-deps */
import { FlexGroup, FlexItem, Solid, Text } from '@antoree/ant-ui';
import { useEffect, useState, memo } from 'react';

export type CountdownTimerProps = {
  occurredAt: number;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ occurredAt }) => {
  let isComponentMounted = false;
  const { ClockIcon } = Solid;
  const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  let interval: any;
  const countdownDate = new Date(occurredAt).getTime();
  useEffect(() => {
    isComponentMounted = true;
    return () => {
      isComponentMounted = false;
    };
  }, []);
  const startTimer = () => {
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);
      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        // eslint-disable-next-line no-lonely-if
        if (isComponentMounted) {
          setTimerDays(days);
          setTimerHours(hours);
          setTimerMinutes(minutes);
          setTimerSeconds(seconds);
        }
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <FlexItem grow={false}>
      <FlexGroup gutterSize="xs">
        <FlexItem grow={false}>
          <Text>
            <ClockIcon className="h-5 w-5 text-primary" />
          </Text>
        </FlexItem>
        <FlexItem grow={false}>
          <Text className="text-primary">
            {timerDays > 0 && <span>{timerDays}d </span>}
            {timerHours > 0 && <span>{timerHours}h </span>}
            <span>{timerMinutes}m </span>
            <span>{timerSeconds}s </span>
          </Text>
        </FlexItem>
      </FlexGroup>
    </FlexItem>
  );
};

export default memo(CountdownTimer);
