/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import {
  FlexGroup,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  PageContentHeader,
  PageContentHeaderSection,
  PageHeader,
  Title,
} from '@antoree/ant-ui';
import { PannelFilter } from 'components';
import { CourseModule } from 'components/CourseModule';
import { STATUS } from 'configs/app.constants';
import { useBreadcrumbs, usePagiantion } from 'hooks';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import {
  getTestingCoursesV2,
  GET_TESTING_COURSES,
} from 'services/testingCourse';
import { NumberParam, StringParam, withDefault } from 'use-query-params';
import { CreateTestingCourseModal } from '../components';
import {
  LRID_OPTION_VALUE,
  SALEMAN_OPTION_VALUE,
  TERM_OPTION_VALUE,
} from './constants';

const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: <FormattedMessage defaultMessage="Testing courses" />,
  },
];
function TestingCourses() {
  const intl = useIntl();

  useBreadcrumbs(breadcrumbs);

  const {
    pageIndex,
    pageSize,
    search,
    startedAtFrom,
    startedAtTo,
    query,
    onTableChangeHandler,
    onInputChange,
    typeSearch,
    onSelect,
    status,
  } = usePagiantion({
    startedAtFrom: withDefault(StringParam, ''),
    startedAtTo: withDefault(StringParam, ''),
    search: withDefault(StringParam, ''),
    typeSearch: withDefault(NumberParam, 1),
    status: withDefault(StringParam, ''),
  });
  const { data, error, isLoading, isFetching, remove } = useQuery(
    [GET_TESTING_COURSES, query],
    () =>
      getTestingCoursesV2({
        startedAtFrom,
        startedAtTo,
        pageIndex,
        pageSize,
        term:
          typeSearch === TERM_OPTION_VALUE
            ? search.replace(/(^0|^84|^\+84)/g, '')
            : undefined,
        requestId: typeSearch === LRID_OPTION_VALUE ? search : undefined,
        saleName: typeSearch === SALEMAN_OPTION_VALUE ? search : undefined,
        status,
      }),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );
  const [isReload, setReload] = useState(false);

  if (isReload) {
    remove();
    setReload(false);
  }

  return (
    <Page>
      <PageBody component="main">
        <PageHeader
          pageTitle={
            <Title>
              <h2>
                <FormattedMessage defaultMessage="Testing Course Management" />
              </h2>
            </Title>
          }
          rightSideItems={[
            <CreateTestingCourseModal
              onSuccessFallback={() => setReload(true)}
            />,
          ]}
        />
        <PageContent>
          <PageContentHeader>
            <PageContentHeaderSection className="flex-grow">
              <FlexGroup>
                <PannelFilter
                  optionsData={STATUS}
                  onInputChange={onInputChange}
                  keySearch="search"
                  onSelect={onSelect}
                  keyOption="status"
                  keyFromDateTime="startedAtFrom"
                  keyToDateTime="startedAtTo"
                  query={query}
                />
              </FlexGroup>
            </PageContentHeaderSection>
          </PageContentHeader>

          <PageContentBody>
            <CourseModule
              isLoading={isLoading}
              isFetching={isFetching}
              error={error}
              data={data}
              onTableChangeHandler={onTableChangeHandler}
              pageIndex={pageIndex}
              pageSize={pageSize}
              URL={GET_TESTING_COURSES}
              pathName="/testing-courses"
            />
          </PageContentBody>
        </PageContent>
      </PageBody>
    </Page>
  );
}

export default TestingCourses;
