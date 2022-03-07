import { Page, PageBody, PageSideBar } from '@antoree/ant-ui';
import { Fragment } from 'react';
import { AllCourses, RightASide, TodayCourses } from './components';

const Courses: React.FC<{}> = () => {
  return (
    <Fragment key={0}>
      <Page style={{ backgroundColor: 'white' }} className="pt-0">
        <PageBody>
          <TodayCourses />
          <AllCourses />
        </PageBody>
        <PageSideBar
          paddingSize="l"
          style={{
            minWidth: 346,
            backgroundColor: 'white',
            boxShadow: 'inset 1px 0px 0px #EAEAEA',
          }}
        >
          <RightASide />
        </PageSideBar>
      </Page>
    </Fragment>
  );
};

export default Courses;
