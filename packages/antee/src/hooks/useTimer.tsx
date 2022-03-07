/*
Count down time hook
Copyright (c) 2021  Antoree . All rights reserved
Author : thind9x

*/

import { useEffect, useState } from 'react';

const useTimer = (timeclock: string, datestart: string, timeend: string) => {
  const [timeteststart, setTimetest] = useState('');
  const [timetestend, setTimeend] = useState('');

  useEffect(() => {
    const countTime = new Date(`${datestart} ${timeclock}`).getTime();
    const countTimeEnd = new Date(`${datestart} ${timeend}`).getTime();

    const countDownStart = new Date(countTime).getTime();
    const countDownEnd = new Date(countTimeEnd).getTime();

    const x = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownStart - now;
      const distancetimeend = countDownEnd - now;

      // Time calculations for days, hours, minutes and seconds
      //
      // 1 phút =  1000 * 60,
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance > 1) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setTimetest(
          ` ${
            days > 0 ? `${days.toString()}d` : ''
          } ${hours.toString()}h ${minutes
            .toString()
            .padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`,
        );
      }
      if (distance < 0 && distancetimeend > 0) {
        clearInterval(x);
        setTimetest(`Đã đến giờ học`);
        setTimeend(``);
      }
      if (distance < 0 && distancetimeend < 0) {
        clearInterval(x);
        setTimetest(``);
        setTimeend(`Đã kết thúc`);
      }
    }, 1000);

    return () => {
      setTimetest(``);
      setTimeend(``);

      clearInterval(x);
    };
  }, [datestart, timeclock, timeend]);
  return timetestend || timeteststart;
};

export default useTimer;
