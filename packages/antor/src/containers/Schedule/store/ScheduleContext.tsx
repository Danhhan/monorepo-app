import { createContext, useContext, useReducer, useMemo } from 'react';
import { scheduleReducer } from './ScheduleReducer';
import { ContextType } from './constants';

export const initState = {
  daysOfWeek: [],
  durationList: [],
  startOfWeek: '',
  endOfWeek: '',
  seletedDayOfYear: '',
  role: 0,
};

export const ScheduleContext = createContext<ContextType>({
  state: initState,
  dispatch: () => undefined,
});

export const ScheduleProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(scheduleReducer, initState);
  const store = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <ScheduleContext.Provider value={store}>
      {children}
    </ScheduleContext.Provider>
  );
};
export const useScheduleContext = () => useContext(ScheduleContext);
