import {
  FlexGroup,
  FlexItem,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  PageSideBar,
  Spacer,
  Tab,
  Text,
} from '@antoree/ant-ui';
import { useCurrentUser } from 'contexts';
import { useRedirect } from 'hooks';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import {
  AvailableTimeTest,
  AvailableTimeTrial,
  RightAside,
  TeachingSchedule,
} from './components';
import { TabId } from './constants';
import { ScheduleProvider } from './store';

export type tab = {
  id: string;
  name: string;
  content: ReactNode;
  append?: string;
  colorAppend?: string;
  to: string;
  color: string;
};
const Calendar: React.FC<{}> = () => {
  const [selectedTabId, setSelectedTabId] = useState('teaching-schedule--id');
  const { redirectTo } = useRedirect();
  const onSelectedTabChanged = (id: string) => {
    setSelectedTabId(id);
  };
  const {
    TEACHING_SCHEDULE_ID,
    AVAILABLE_TIME_TETS_ID,
    AVAILABLE_TIME_TRIAL_ID,
  } = TabId;

  const initTabs = [
    {
      id: TEACHING_SCHEDULE_ID,
      name: 'Teaching schedules',
      content: <TeachingSchedule />,
      to: '/schedule/teaching-schedule',
      color: '#69707D',
    },
    {
      id: AVAILABLE_TIME_TRIAL_ID,
      name: `Available time`,
      colorAppend: '#F46036',
      append: '- Trial',
      content: (
        <>
          <Spacer />
          <AvailableTimeTrial />
        </>
      ),
      to: '/schedule/available-time-trial',
      color: '#69707D',
    },
    {
      id: AVAILABLE_TIME_TETS_ID,
      name: 'Available time',
      append: '- English Test',
      colorAppend: '#E2B100',
      content: (
        <>
          <Spacer />
          <AvailableTimeTest />
        </>
      ),
      to: '/schedule/available-time-test',
      color: '#69707D',
    },
  ];
  const [tabs, setTabs] = useState<tab[]>(initTabs);
  const location = useLocation();
  const { permissions } = useCurrentUser();

  useEffect(() => {
    const localTabs = [...tabs];
    if (permissions.length > 0) {
      if (
        permissions.findIndex((item: string) => item === 'mobile-trial') === -1
      ) {
        const index = localTabs.findIndex(
          (item: tab) => item.id === AVAILABLE_TIME_TRIAL_ID,
        );
        localTabs.splice(index, 1);
      }
      if (
        permissions.findIndex((item: string) => item === 'mobile-tester') === -1
      ) {
        const index = localTabs.findIndex(
          (item: tab) => item.id === AVAILABLE_TIME_TETS_ID,
        );
        localTabs.splice(index, 1);
      }
      // if (
      //   permissions.findIndex((item: string) => item === 'be-teacher') === -1
      // ) {
      //   const index = localTabs.findIndex(
      //     (item: tab) => item.id === TEACHING_SCHEDULE_ID,
      //   );
      //   localTabs.splice(index, 1);
      // }
      setTabs(localTabs);
    }
  }, [permissions]);

  useEffect(() => {
    const currentTab = tabs.find((item: tab) => item.to === location.pathname);
    if (currentTab?.id) {
      onSelectedTabChanged(currentTab?.id);
    }
  }, []);

  const selectedTabContent = useMemo(() => {
    return tabs.find(obj => obj.id === selectedTabId)?.content;
  }, [selectedTabId]);
  return (
    <ScheduleProvider>
      <Page className="pt-0" paddingSize="s">
        <PageBody>
          <PageContent
            borderRadius="none"
            hasShadow={false}
            style={{ border: 'none' }}
          >
            <Spacer />
            <PageContentBody>
              <FlexGroup gutterSize="none">
                {tabs.map((item: tab, index) => (
                  <FlexItem key={index} grow={false}>
                    <Tab
                      onClick={() => {
                        redirectTo(item.to);
                        onSelectedTabChanged(item.id);
                      }}
                      isSelected={item.id === selectedTabId}
                      append={
                        <span
                          style={{
                            color:
                              selectedTabId === item.id
                                ? '#00C081'
                                : item.colorAppend,
                          }}
                        >
                          {item?.append}
                        </span>
                      }
                    >
                      <Link to={item.to}>
                        <Text
                          style={{
                            color:
                              selectedTabId === item.id
                                ? '#00C081'
                                : item.color,
                          }}
                        >
                          <span>{item.name}</span>
                        </Text>
                      </Link>
                    </Tab>
                  </FlexItem>
                ))}
              </FlexGroup>
              <Spacer />
              {selectedTabContent}
            </PageContentBody>
          </PageContent>
        </PageBody>
        <PageSideBar
          paddingSize="none"
          style={{
            minWidth: 362,
            backgroundColor: 'white',
            boxShadow: 'inset 1px 0px 0px #EAEAEA',
          }}
        >
          <RightAside />
        </PageSideBar>
      </Page>
    </ScheduleProvider>
  );
};

export default Calendar;
