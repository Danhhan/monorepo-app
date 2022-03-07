import { Page, PageBody, PageContent, Spacer } from '@antoree/ant-ui';
import { useParams } from 'react-router-dom';

import { useRetrieveCourseById } from 'services/course';

import { memo } from 'react';
import { TodaySessions, AllSessions, Header } from './components';

const Sessions: React.FC<{}> = () => {
  const { id: courseId } = useParams<{ id: string }>();

  // const { data } = useRetrieveCourseById(
  //   {
  //     courseId: parseInt(courseId, 10),
  //   },
  //   {
  //     enabled: !!courseId,
  //     refetchOnMount: false,
  //     refetchOnWindowFocus: false,
  //     refetchOnReconnect: false,
  //   },
  // );

  return (
    <Page paddingSize="none">
      {/* <PageBody> */}
      {/*  <Header */}
      {/*    teacherName={data?.data.course.teacher.name} */}
      {/*    teacherAvatar={data?.data.course.teacher.avatarUrl} */}
      {/*    courseTitle={data?.data.course.title} */}
      {/*  /> */}
      {/*  <PageContent color="transparent" borderRadius="none" hasShadow={false}> */}
      {/*    <TodaySessions courseType={data?.data.course.type ?? -1} /> */}
      {/*    <Spacer /> */}
      {/*    <AllSessions courseType={data?.data.course.type ?? -1} /> */}
      {/*  </PageContent> */}
      {/* </PageBody> */}
    </Page>
  );
};

export default memo(Sessions);
