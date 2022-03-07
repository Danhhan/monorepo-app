/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import {
  Button,
  FieldSearch,
  FlexGrid,
  FlexGroup,
  FlexItem,
  FormRow,
  HorizontalRule,
  Icon,
  InfiniteScroll,
  LoadingSpinner,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import FilterTeacherBox from 'containers/TrialCourse/TrialCourses/components/FilterBar/FilterTeacherBox';
import FilterCertsBox from 'containers/TrialCourse/TrialCourses/components/FilterBar/FilterTopicBox';
import { withDebounce } from 'helpers';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useInfiniteQuery } from 'react-query';
import {
  getTeachersListTrialForm,
  GET_TEACHERS_TRIAL_COURSE,
} from 'services/trialCourse';
import style from './TeachersSelection.module.scss';

const TeachersSelection = ({
  time,
  startTime,
  endTime,
  errors,
  selectedTeacher,
  topic,
  onSelect,
  miniSize,
}) => {
  const intl = useIntl();

  const [search, setSearch] = useState('');
  const [certs, setCerts] = useState(undefined);
  const [gender, setGender] = useState(undefined);
  const [region, setRegion] = useState(undefined);
  const [nation, setNation] = useState(undefined);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
    refetch,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery(
    [
      GET_TEACHERS_TRIAL_COURSE,
      {
        time,
        topics: [topic],
        certs,
        startTime,
        endTime,
        search,
        gender,
        region,
        nation,
      },
    ],
    context =>
      getTeachersListTrialForm({
        testingStart: time,
        topic,
        certificate: certs,
        gender,
        region,
        nation,
        startTime,
        endTime,
        page: context.pageParam?.page ?? 1,
        pageSize: 12,
        search,
      }),
    {
      getNextPageParam: lastPage =>
        lastPage.pagination.hasMore && {
          hasMore: lastPage.pagination.hasMore,
          page: lastPage.pagination.currentPage + 1,
          total: lastPage.pagination.totalItems,
          totalPage: lastPage.pagination.totalPage,
        },
      onSuccess: dataRes => {
        if (!isFetchingNextPage) {
          onSelect(undefined);
        }
      },
      refetchOnWindowFocus: false,
      retry: (count, error) => {
        if (!time || count === 3) {
          return false;
        }
        return true;
      },
    },
  );

  const dataLength = useMemo(
    () =>
      data?.pages.reduce((acc, page) => acc + page.data.length ?? 0, 0) ?? 0,
    [data],
  );

  const numberRecent = data?.pages?.reduce(
    (acc, page) => acc + page?.data?.length,
    0,
  );

  useEffect(() => {
    if (numberRecent < 12 && (hasNextPage || hasNextPage === undefined)) {
      fetchNextPage();
    }
  }, [data, fetchNextPage, hasNextPage, numberRecent]);

  const onFilterTeacherChange = (genderResult, nationResult, regionResult) => {
    setGender(genderResult);
    setRegion(regionResult);
    setNation(nationResult);
  };

  return (
    <>
      <Spacer />
      <FormRow isInvalid={!!errors?.testerId} error={errors?.testerId?.message}>
        <Title size="xs">
          <h4>
            <FormattedMessage defaultMessage="Select a Teacher" />
          </h4>
        </Title>
      </FormRow>

      <HorizontalRule margin="xs" />
      <Spacer size="s" />
      <div>
        <FlexGroup gutterSize="m">
          <FlexItem grow>
            <FieldSearch
              defaultValue={search}
              className="w-full"
              onChange={withDebounce(e => setSearch(e.target.value))}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search by Name or Email',
              })}
              isClearable
              fullWidth
            />
          </FlexItem>
          <FlexItem grow={false}>
            <FilterTeacherBox
              gender={gender}
              region={region}
              nation={nation}
              handleChangeApply={onFilterTeacherChange}
            />
          </FlexItem>
          <FlexItem grow={false}>
            <FilterCertsBox certificates={certs} handleApplyCer={setCerts} />
          </FlexItem>

          <FlexItem grow={false}>
            <Button
              isLoading={isFetching}
              fill
              onClick={refetch}
              size="m"
              iconType="refresh"
            >
              <FormattedMessage defaultMessage="reload" />
            </Button>
          </FlexItem>
        </FlexGroup>
      </div>
      <Spacer />
      {/* <div style={{ maxHeight: '400px', overflow: 'auto' }} className="pt-1"> */}
      <InfiniteScroll
        className="visible-scroll custom-scrollbar"
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        height={400}
        loader={
          <div className="flex flex-col items-center justify-center justify-items-center py-2">
            <LoadingSpinner size="l" />
            <Text size="s" color="subdued">
              <p>Loadding...</p>
            </Text>
          </div>
        }
      >
        <FlexGrid
          justifyContent="flexStart"
          style={{ margin: 'auto' }}
          columns={4}
          wrap
          gutterSize="m"
          responsive={false}
        >
          {data?.pages[0].data.length === 0 || isError ? (
            <Text className="m-auto mt-4 text-center" size="m">
              <p>
                <FormattedMessage defaultMessage="No Teacher Available" />
              </p>
            </Text>
          ) : isLoading ? (
            <FlexItem className="justify-center items-center" grow={1}>
              <LoadingSpinner size="xl" />
            </FlexItem>
          ) : !numberRecent && !hasNextPage ? (
            <Text className="m-auto mt-4 text-center" size="m">
              <p>
                <FormattedMessage defaultMessage="No Teacher Available" />
              </p>
            </Text>
          ) : (
            data?.pages?.map(page =>
              page?.data?.map(({ teacher }) => (
                <FlexItem
                  title={teacher.name}
                  className="justify-center items-center cursor-pointer relative"
                  key={teacher?.id}
                >
                  <div
                    className={style.teacherAnimation}
                    onClick={() => {
                      onSelect(teacher);
                    }}
                    style={{
                      minWidth: '100px',
                      minHeight: '100px',
                    }}
                  >
                    <img
                      width={100}
                      height={100}
                      className="rounded-2xl object-cover object-center border-2"
                      src={teacher.avatarUrl}
                      alt="teacher"
                      style={{
                        border: `3px solid ${
                          selectedTeacher?.id === teacher?.id
                            ? '#00C081'
                            : 'transparent'
                        }`,
                      }}
                    />
                    <Icon
                      type="checkInCircleFilled"
                      size="l"
                      color="primary"
                      className="absolute top-2 right-2 bg-white rounded-full"
                      style={{
                        display:
                          selectedTeacher?.id === teacher?.id
                            ? 'block'
                            : 'none',
                      }}
                    />
                  </div>
                  <a
                    target="_blank"
                    href={`https://antoree.com/teacher/${teacher.id}`}
                    rel="noreferrer"
                  >
                    <Text size="xs">
                      <p className={style.teacherName}>{`${teacher.name}`}</p>
                    </Text>
                  </a>
                  <Text size="xs" className="w-20 sm:w-full lg:w-24 xl:w-28">
                    <div className="flex justify-center items-center">
                      <p
                        className="text-center"
                        style={{
                          maxWidth: '80px',
                          marginBottom: '0px',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {`${teacher.nationalityName}`}
                      </p>
                      &nbsp;|&nbsp;
                      <p
                        className="font-semibold"
                        style={{
                          textAlign: 'center',
                          marginBottom: '-2px',
                        }}
                      >
                        {Math.round(teacher.avgRate * 10) / 10}
                      </p>
                      &nbsp;
                      <Icon className="text-yellow-300" type="starFilled" />
                    </div>
                  </Text>
                </FlexItem>
              )),
            )
          )}
        </FlexGrid>
      </InfiniteScroll>
      {/* </div> */}
    </>
  );
};

TeachersSelection.defaultProps = {
  time: undefined,
  startTime: undefined,
  endTime: undefined,
  errors: undefined,
  topic: undefined,
  onSelect: () => {},
  miniSize: true,
  selectedTeacher: undefined,
};

TeachersSelection.propTypes = {
  time: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  errors: PropTypes.shape({
    testerId: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
  selectedTeacher: PropTypes.shape({ id: PropTypes.string }),
  topic: PropTypes.number,
  onSelect: PropTypes.func,
  miniSize: PropTypes.bool,
};

export default TeachersSelection;
