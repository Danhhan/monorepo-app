/* 
Count down time hook
Copyright (c) 2021  Antoree . All rights reserved
Author : thind9x

*/

import { useState, useEffect } from 'react';
import moment from 'moment';
import { useRetrieveToDaySession } from 'services/session';

const useToday = (datateacher: any, date: {}) => {
  const [timeteststart, setTimetest] = useState('');
  const [timetestend, setTimeend] = useState('');
  const { data } = useRetrieveToDaySession();

  return timetestend || timeteststart;
};

export default useToday;
