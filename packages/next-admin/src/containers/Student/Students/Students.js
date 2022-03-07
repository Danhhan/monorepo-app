/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import {
  Button,
  ButtonEmpty,
  ButtonIcon,
  ContextMenuItem,
  ContextMenuPanel,
  DatePicker,
  DatePickerRange,
  FieldSearch,
  FlexGroup,
  FlexItem,
  FormRow,
  Health,
  LoadingContent,
  notification,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  PageContentHeader,
  PageContentHeaderSection,
  PageHeader,
  Pagination,
  Popover,
  Spacer,
  SuperSelect,
  Text,
  Title,
} from '@antoree/ant-ui';
import cancelIcon from 'assets/icons/cancel.svg';
import filterIcon from 'assets/icons/filter.svg';
import { SALEMAN_OPTION_VALUE } from 'containers/Student/Students/constants';
import { withDebounce } from 'helpers';
import {
  useBreadcrumbs,
  useCurrentUser,
  useFormModal,
  usePagiantion,
  useToggle,
} from 'hooks';
import moment from 'moment';
import { useState } from 'react';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';
import { useMutation, useQuery } from 'react-query';
import { updateContact } from 'services/contact';
import { getStudents, GET_STUDENTS, updateNote } from 'services/student';
import { NumberParam, StringParam, withDefault } from 'use-query-params';
import {
  CreateStudentForm,
  CreateStudentFormNewFlow,
} from '../CreateStudentForm';
import { StudentsTableRow } from './components';
import StudentFilterModal from './components/StudentFilterModal';
import {
  LRID_OPTION_VALUE,
  SEARCH_OPTIONS,
  STUDENT_STATUS,
  TERM_OPTION_VALUE,
} from './constants';
import styles from './Students.module.scss';

function Students() {
  const intl = useIntl();

  useBreadcrumbs([
    {
      text: <FormattedMessage defaultMessage="Home" />,
      path: '/',
    },
    {
      text: <FormattedMessage defaultMessage="Students" />,
    },
  ]);

  const {
    pageIndex,
    pageSize,
    search,
    type,
    sortType,
    typeSearch,
    query,
    source,
    dateFrom,
    dateTo,
    campaign,
    sortField,
    sortDirection,
    onTableChangeHandler,
    onInputChange,
    onSelect,
  } = usePagiantion(
    {
      search: withDefault(StringParam, ''),
      source: withDefault(StringParam, ''),
      campaign: withDefault(StringParam, ''),
      dateFrom: StringParam,
      dateTo: StringParam,
      type: NumberParam,
      sortType: withDefault(StringParam, 'created_at'),
      typeSearch: withDefault(NumberParam, 1),
    },
    {
      defaultSortField: 'updated_at',
      defaultSortDirection: 'desc',
    },
  );
  const sortOptions = [
    {
      label: defineMessage({ defaultMessage: 'Created At' }),
      value: 'created_at',
    },
    {
      label: defineMessage({ defaultMessage: 'Updated At' }),
      value: 'updated_at',
    },
  ];
  // check perms
  const [{ permissions }] = useCurrentUser();
  const hasGeneralContact =
    permissions?.length > 0
      ? permissions.indexOf('general-contact') !== -1
      : false;
  const { data, error, isLoading, remove } = useQuery(
    [GET_STUDENTS, query],
    () =>
      getStudents({
        pageIndex,
        pageSize,
        sortField: sortType,
        sortDirection,
        type,
        dateFrom,
        dateTo,
        source,
        campaign,
        term:
          typeSearch === TERM_OPTION_VALUE
            ? search.replace(/(^0|^84|^\+84)/g, '')
            : undefined,
        requestId: typeSearch === LRID_OPTION_VALUE ? search : undefined,
        saleName: typeSearch === SALEMAN_OPTION_VALUE ? search : undefined,
      }),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );
  const { isVisible, show, close } = useFormModal();
  const { isVisiable: pageSizeVisible, toggle: pageSizeToggle } = useToggle();

  const {
    isVisible: isVisibleNewFlow,
    show: showNewFlow,
    close: closeNewFlow,
  } = useFormModal();
  const {
    isVisible: isVisibleFilter,
    show: showFilter,
    close: closeFilter,
  } = useFormModal();

  const [toggleSelected, setToggleSelected] = useState();

  const setRowSize = value =>
    onTableChangeHandler({
      page: {
        index: pageIndex,
        size: value,
      },
      sort: {
        field: sortField,
        direction: sortDirection,
      },
    });

  const setPageIndex = value =>
    onTableChangeHandler({
      page: {
        index: value,
        size: pageSize,
      },
      sort: {
        field: sortField,
        direction: sortDirection,
      },
    });

  const itemsPageSize = [10, 20, 50];

  const placeholder = () => {
    switch (typeSearch) {
      case TERM_OPTION_VALUE:
        return intl.formatMessage({
          defaultMessage:
            'Search for Student by Phone Number, Name or Student ID',
        });
      case LRID_OPTION_VALUE:
        return intl.formatMessage({
          defaultMessage: 'Search for Student by Learning Request ID',
        });
      case SALEMAN_OPTION_VALUE:
        return intl.formatMessage({
          defaultMessage: 'Search for Student by Saleman Name or Email',
        });

      default:
        return '';
    }
  };

  const updateNoteMutation = useMutation(mutateData => updateNote(mutateData), {
    onSuccess: () => {
      notification.success({
        title: 'Update note successfully',
      });

      remove();
    },
    onError: err => {
      notification.error({
        title: err?.message ?? 'Update note failure',
      });
    },
  });
  const updateContactMutation = useMutation(
    mutateData => updateContact(mutateData),
    {
      onSuccess: () => {
        notification.success({
          title: 'Reassign successfully',
        });

        remove();
      },
      onError: err => {
        notification.error({
          title: err?.message ?? 'Reassign failure',
        });
      },
    },
  );
  const bulkUpdateContactMutation = useMutation(
    mutateData => bulkUpdate(mutateData),
    {
      onSuccess: () => {
        notification.success({
          title: <FormattedMessage defaultMessage="Successfully" />,
          text: (
            <FormattedMessage defaultMessage="Devide contact successfully!" />
          ),
        });
        remove();
        closeDevide();
      },
      onError: () => {
        notification.error({
          title: <FormattedMessage defaultMessage="Failure" />,
          text: <FormattedMessage defaultMessage="Something went wrong!" />,
        });
      },
    },
  );
  const onCloseFilterModal = (inputtedSource, inputtedCampaign) => {
    closeFilter();
    onSelect('source')(inputtedSource);
    onSelect('campaign')(inputtedCampaign);
  };

  const onSelectDatePicker = inputName => (date, event) =>
    // event is not undefined if user click to the date, not the month navigation
    event && onSelect(inputName)(date.format('YYYY-MM-DD'));
  return (
    <Page>
      <PageBody component="main">
        <PageHeader
          pageTitle={
            <FlexGroup alignItems="center" gutterSize="s" direction="row">
              <FlexItem grow={false}>
                <Title>
                  <h2>
                    <FormattedMessage defaultMessage="Student Management" />
                  </h2>
                </Title>
              </FlexItem>
            </FlexGroup>
          }
          rightSideItems={[
            <Button
              fill
              color="primary"
              iconType="indexOpen"
              onClick={showNewFlow}
            >
              <FormattedMessage defaultMessage="Create New Student With SubUsers" />
            </Button>,
            <Button fill color="primary" iconType="indexOpen" onClick={show}>
              <FormattedMessage defaultMessage="Create New Student" />
            </Button>,
            <FlexGroup alignItems="center" gutterSize="s" direction="row">
              <FlexItem grow={false}>
                <Text>
                  <strong>
                    <FormattedMessage defaultMessage="Quantity" />
                    :&nbsp;
                    {data?.pagination?.totalItems ?? 0}
                  </strong>
                </Text>
              </FlexItem>
            </FlexGroup>,
          ]}
        />
        <CreateStudentForm isVisible={isVisible} closeModal={close} />
        <CreateStudentFormNewFlow
          isVisible={isVisibleNewFlow}
          closeModal={closeNewFlow}
        />
        <StudentFilterModal
          isVisible={isVisibleFilter}
          closeModal={onCloseFilterModal}
          source={source}
          campaign={campaign}
        />
        <PageContent style={{ backgroundColor: '#FAFBFD' }}>
          <PageContentHeader>
            <PageContentHeaderSection className="flex-grow">
              <FlexGroup
                justifyContent="flexEnd"
                alignItems="center"
                gutterSize="s"
                className={styles.flexGroupContainer}
              >
                <FlexItem grow={false}>
                  <FormRow
                    className={styles.customFormRow}
                    style={{ width: '35vw', maxWidth: '20rem' }}
                  >
                    <FieldSearch
                      defaultValue={search}
                      onChange={withDebounce(onInputChange('search'))}
                      placeholder={placeholder()}
                      compressed
                      isClearable
                      fullWidth
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem grow={false}>
                  <FormRow
                    className={styles.customFormRow}
                    style={{ width: '22vw', maxWidth: '13rem' }}
                  >
                    <SuperSelect
                      options={SEARCH_OPTIONS}
                      valueOfSelected={typeSearch}
                      onChange={onSelect('typeSearch')}
                      // fullWidth
                      compressed
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem grow={false}>
                  <FlexGroup
                    className={styles.flexGroupContainer}
                    alignItems="center"
                    gutterSize="none"
                  >
                    <DatePickerRange
                      fullWidth={false}
                      style={{ maxWidth: '18rem' }}
                      startDateControl={
                        <DatePicker
                          selected={dateFrom && moment(dateFrom)}
                          onChange={(date, event) => {
                            onSelectDatePicker('dateFrom')(date, event);
                            !dateTo &&
                              onSelectDatePicker('dateTo')(moment(), event);
                          }}
                          startDate={moment(dateFrom)}
                          endDate={moment(dateTo)}
                          isInvalid={moment(dateFrom) > moment(dateTo)}
                          aria-label="Start date"
                        />
                      }
                      endDateControl={
                        <DatePicker
                          selected={dateTo && moment(dateTo)}
                          onChange={onSelectDatePicker('dateTo')}
                          startDate={moment(dateFrom)}
                          endDate={moment(dateTo)}
                          onClear={() => {
                            onSelect('dateTo')(undefined);
                            onSelect('dateFrom')(undefined);
                          }}
                          isInvalid={
                            moment(dateFrom) > moment(dateTo) ||
                            moment(dateTo) > moment()
                          }
                          aria-label="End date"
                        />
                      }
                    />
                  </FlexGroup>
                </FlexItem>
                <FlexItem grow={false}>
                  <Button
                    size="s"
                    text="Filter"
                    color="#ffffff"
                    fill
                    iconType={filterIcon}
                    onClick={showFilter}
                  >
                    <FormattedMessage defaultMessage="Filter data" />
                  </Button>
                </FlexItem>
              </FlexGroup>
              <FlexGroup
                style={{ marginTop: '20px' }}
                justifyContent="spaceBetween"
                className={styles.flexGroupContainer}
              >
                <FlexGroup justifyContent="flexEnd">
                  <FlexItem grow={false}>
                    <FormRow
                      className={styles.customFormRow}
                      style={{ width: '22vw', maxWidth: '13rem' }}
                      label={intl.formatMessage({
                        defaultMessage: 'Sort Type',
                      })}
                    >
                      <SuperSelect
                        options={sortOptions.map(({ label, value, color }) => ({
                          value,
                          inputDisplay: (
                            <Health
                              color={color}
                              style={{ lineHeight: 'inherit' }}
                            >
                              <FormattedMessage {...label} />
                            </Health>
                          ),
                        }))}
                        valueOfSelected={sortType}
                        onChange={onSelect('sortType')}
                        fullWidth
                        compressed
                      />
                    </FormRow>
                  </FlexItem>
                  <FlexItem grow={false}>
                    <FormRow
                      className={styles.customFormRow}
                      style={{ width: '22vw', maxWidth: '13rem' }}
                      label={intl.formatMessage({
                        defaultMessage: 'Courses Type',
                      })}
                    >
                      <SuperSelect
                        options={[
                          {
                            label: defineMessage({ defaultMessage: 'All' }),
                            value: '',
                            color: 'ghost',
                          },
                          ...STUDENT_STATUS,
                        ].map(({ label, value, color }) => ({
                          value,
                          inputDisplay: (
                            <Health
                              color={color}
                              style={{ lineHeight: 'inherit' }}
                            >
                              <FormattedMessage {...label} />
                            </Health>
                          ),
                        }))}
                        valueOfSelected={type}
                        onChange={onSelect('type')}
                        fullWidth
                        compressed
                      />
                    </FormRow>
                  </FlexItem>
                </FlexGroup>
              </FlexGroup>
              <Spacer />
            </PageContentHeaderSection>
          </PageContentHeader>
          <PageContentBody>
            {isLoading ? (
              <div style={{ minHeight: '60vh' }}>
                <LoadingContent lines={12} />
              </div>
            ) : data && data?.data && data?.data?.length !== 0 ? (
              <div
                className="max-w-full pb-4"
                style={{
                  overflowX: 'auto',
                  overflowY: 'visible',
                }}
              >
                {data?.data?.map(item => (
                  <StudentsTableRow
                    handleSaveNote={updateNoteMutation}
                    handleReassignContact={updateContactMutation}
                    selectHandle={setToggleSelected}
                    isSelected={toggleSelected === item?.id}
                    data={item}
                    id={item?.id}
                  />
                ))}
              </div>
            ) : (
              <div>
                <Text className="text-center">
                  <FormattedMessage defaultMessage="Data Not Found" />
                </Text>
              </div>
            )}
            <Spacer size="l" />
            {data && data?.data && data?.data?.length !== 0 && (
              <FlexGroup justifyContent="spaceBetween" alignItems="center">
                <FlexItem grow={false}>
                  <Popover
                    button={
                      <ButtonEmpty
                        size="s"
                        color="text"
                        iconType="arrowDown"
                        iconSide="right"
                        onClick={pageSizeToggle}
                      >
                        Rows per page: {pageSize}
                      </ButtonEmpty>
                    }
                    isOpen={pageSizeVisible}
                    closePopover={pageSizeToggle}
                    panelPaddingSize="none"
                  >
                    <ContextMenuPanel
                      items={itemsPageSize.map(itemSize => (
                        <ContextMenuItem
                          key={`${itemSize} row`}
                          icon={itemSize === pageSize ? 'check' : 'empty'}
                          onClick={() => {
                            pageSizeToggle();
                            setRowSize(itemSize);
                          }}
                        >
                          {`${itemSize} rows`}
                        </ContextMenuItem>
                      ))}
                    />
                  </Popover>
                </FlexItem>

                <FlexItem grow={false}>
                  <Pagination
                    aria-label="Custom pagination example"
                    pageCount={data?.pagination?.totalPage ?? 0}
                    activePage={pageIndex}
                    onPageClick={setPageIndex}
                  />
                </FlexItem>
              </FlexGroup>
            )}
          </PageContentBody>
        </PageContent>
      </PageBody>
    </Page>
  );
}

export default Students;
