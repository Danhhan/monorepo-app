/* eslint-disable camelcase */
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
import { useState } from 'react';
import { PannelFilter } from 'components';
import { CourseModule } from 'components/CourseModule';
import { STATUS } from 'configs/app.constants';
import { useBreadcrumbs, usePagiantion } from 'hooks';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { getTrialCoursesV2, GET_TRIAL_COURSES } from 'services/trialCourse';
import { NumberParam, StringParam, withDefault } from 'use-query-params';
import { CreateTrialCourseModal } from '../components';
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
    text: <FormattedMessage defaultMessage="Trial courses" />,
  },
];

function TrialCourses() {
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

  const { data, error, isLoading, remove, isFetching } = useQuery(
    [GET_TRIAL_COURSES, query],
    () =>
      getTrialCoursesV2({
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
                <FormattedMessage defaultMessage="Trial Course Management" />
              </h2>
            </Title>
          }
          rightSideItems={[
            <CreateTrialCourseModal
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
              URL={GET_TRIAL_COURSES}
              pathName="/trial-courses"
            />
          </PageContentBody>
        </PageContent>
      </PageBody>
    </Page>
  );
}

export default TrialCourses;
