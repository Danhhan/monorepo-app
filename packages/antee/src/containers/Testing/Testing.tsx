import {
  AntoreeCustomizeLoading,
  FlexGroup,
  Page,
  PageBody,
  Spacer,
} from '@antoree/ant-ui';
import { Header } from 'components';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useRetrieveCurrentCourse } from 'services/course';
import Overview from './components/Overview';
import TestingCourse from './components/TestingCourse';
import TestingSteps from './components/TestingSteps';
import styles from './Testing.module.scss';
import SimpleBottomNavigation from '../../components/BottomNav/SimpleBottomNavigation';

const Testing: React.FC<{}> = () => {
  const { path, url } = useRouteMatch();

  return (
    <Page className="min-h-screen" paddingSize="none">
      <PageBody className={styles.pageBody}>
        <Header />
        <Switch>
          <Route exact path={path}>
            <TestingWrapper />
          </Route>
          <Route path={`${path}/booking`}>
            <TestingSteps />
          </Route>
        </Switch>
      </PageBody>
      <SimpleBottomNavigation hanleOpen={() => {}} timeSelected={null} />
    </Page>
  );
};

const TestingWrapper = () => {
  const { data: recentCourseData, isLoading } = useRetrieveCurrentCourse({
    refetchOnWindowFocus: false,
  });

  const courses = recentCourseData?.data?.courses;

  if (isLoading) {
    return (
      <FlexGroup>
        <div className="w-full h-full flex justify-center items-center flex-col">
          <AntoreeCustomizeLoading />
        </div>
      </FlexGroup>
    );
  }
  if (courses) {
    return <TestingCourse course={courses[0]} />;
  }
  return <Overview />;
};

export default Testing;
