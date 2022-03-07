import React from 'react';
import useTimer from '../../hooks/useTimer';

export type CountimeDownProps = {
  time: string; // time of clock
  datestart: string;
  timeend: string;
};
const CountimeDown = ({ time, datestart, timeend }: CountimeDownProps) => {
  // console.log(time);
  const timer = useTimer(time, datestart, timeend);
  return (
    <span style={{ fontSize: '13.9px', float: 'left' }}>
      {timer || 'Đang tải..'}
    </span>
  );
};

export default CountimeDown;
