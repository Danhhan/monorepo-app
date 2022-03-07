import {
  BasicTable,
  Button,
  ButtonEmpty,
  ComboBox,
  FieldSearch,
  FlexGroup,
  FlexItem,
  Icon,
  Link,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  PageContentHeader,
  PageContentHeaderSection,
  PageHeader,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { withDebounce } from '@antoree/helpers';
import {
  useBreadcrumbs,
  useCurrentUser,
  usePagiantion,
  useRemoveParams,
  useToggle,
} from 'hooks';
import moment from 'moment';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { getContracts, GET_CONTRACT } from 'services/contract';
import { getTeamSales, GET_TEAM_SALES } from 'services/team';
import { NumberParam, StringParam, withDefault } from 'use-query-params';
import FilterModal from '../../../components/FilterButtonsGroup/FilterModal';

const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: <FormattedMessage defaultMessage="Contract Management" />,
  },
];

function Contracts() {
  useBreadcrumbs(breadcrumbs);
  const [{ id: currentUserId }] = useCurrentUser();
  const {
    pageIndex,
    pageSize,
    search,
    query,
    createdAtFrom,
    createdAtTo,
    startTimeFrom,
    startTimeTo,
    teamSale,
    onTableChangeHandler,
    onInputChange,
    onSearch,
  } = usePagiantion(
    {
      search: withDefault(StringParam, ''),
      typeSearch: withDefault(NumberParam, 1),
      createdAtFrom: withDefault(StringParam, ''),
      createdAtTo: withDefault(StringParam, ''),
      startTimeFrom: withDefault(StringParam, ''),
      startTimeTo: withDefault(StringParam, ''),
      teamSale: withDefault(StringParam, ''),
    },
    { defaultPageSize: 10 },
  );
  const { onRemove, onRemoveAll } = useRemoveParams();
  const { isVisiable, open, close } = useToggle();
  const {
    isVisiable: isVisiableStartTime,
    open: openStartTime,
    close: closeStartTime,
  } = useToggle();
  const { data, error, isFetching } = useQuery(
    [GET_CONTRACT, query],
    () =>
      getContracts({
        pageIndex,
        pageSize: 10,
        createdAtFrom,
        createdAtTo,
        startTimeFrom,
        startTimeTo,
        teamSale,
        term: search,
      }),
    {
      retry: 1,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  );
  const { data: dataTeamSale } = useQuery(
    [GET_TEAM_SALES, query],
    () => getTeamSales({}),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );
  const teams =
    dataTeamSale?.teams?.length > 0
      ? dataTeamSale?.teams?.map?.(({ name, subTeams }) => ({
          label: name,
          options:
            subTeams?.length > 0
              ? subTeams.map(({ name: subTeamName, id }) => ({
                  label: subTeamName,
                  id,
                  key: id,
                }))
              : [],
        }))
      : [];

  const [selectedOptions, setSelected] = useState([]);
  const onChange = value => {
    setSelected(value);
    if (value.length > 0) {
      const { id } = value[0];
      onSearch('teamSale')(id);
    } else {
      onRemove('teamSale');
    }
  };
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const handleSearchCreateAt = () => {
    if (startDate !== '') {
      onSearch('createdAtFrom')(startDate.format('YYYY-MM-DD 00:00:00'));
    }
    if (startDate !== '') {
      onSearch('createdAtTo')(endDate.format('YYYY-MM-DD 23:59:59'));
    }
    close();
  };
  const handleSearchStartTime = () => {
    if (startDate !== '') {
      onSearch('startTimeFrom')(startDate.format('YYYY-MM-DD 00:00:00'));
    }
    if (startDate !== '') {
      onSearch('startTimeTo')(endDate.format('YYYY-MM-DD 23:59:59'));
    }
    closeStartTime();
  };
  const handleClearAll = () => {
    onRemoveAll(query);
    setSelected([]);
    document.getElementsByName('term-search')[0].value = '';
  };
  return (
    <Page>
      <PageBody component="main">
        <PageHeader
          pageTitle={
            <FlexGroup gutterSize="s" direction="row">
              <FlexItem grow={false}>
                <Title size="l">
                  <h2>
                    <FormattedMessage defaultMessage="Danh sách hợp đồng" />
                  </h2>
                </Title>
              </FlexItem>
            </FlexGroup>
          }
          rightSideItems={[
            <FlexGroup gutterSize="s" direction="row">
              <FlexItem grow={false}>
                <Button fill className="rounded-lg" color="warning">
                  <Text color="black">
                    <p>
                      <Icon style={{ color: 'black' }} type="indexOpen" />
                      &nbsp;
                      <FormattedMessage defaultMessage="Xuất file (excel)" />
                    </p>
                  </Text>
                </Button>
              </FlexItem>
            </FlexGroup>,
            <FlexGroup gutterSize="s" direction="row">
              <FlexItem grow={false}>
                <Link to="contracts/create">
                  <Button fill className="rounded-lg">
                    <Text color="white">
                      <p>
                        <Icon style={{ color: 'white' }} type="indexOpen" />
                        &nbsp;
                        <FormattedMessage defaultMessage="Tạo hợp đồng" />
                      </p>
                    </Text>
                  </Button>
                </Link>
              </FlexItem>
            </FlexGroup>,
          ]}
        />
        {isVisiable && (
          <FilterModal
            setStartDate={setStartDate}
            startDate={startDate}
            setEndDate={setEndDate}
            endDate={endDate}
            closeModal={close}
            handle={handleSearchCreateAt}
          />
        )}
        {isVisiableStartTime && (
          <FilterModal
            setStartDate={setStartDate}
            startDate={startDate}
            setEndDate={setEndDate}
            endDate={endDate}
            closeModal={closeStartTime}
            handle={handleSearchStartTime}
          />
        )}
        <PageContent>
          <PageContentHeader>
            <Spacer />
            <PageContentHeaderSection className="flex-grow">
              <FlexGroup justifyContent="flexEnd" gutterSize="xs">
                <FlexItem grow={false}>
                  <ButtonEmpty
                    style={{ marginTop: '3px', color: 'black' }}
                    size="xs"
                    onClick={handleClearAll}
                  >
                    Xóa bộ lọc
                  </ButtonEmpty>
                </FlexItem>
                <FlexItem grow={false}>
                  <FieldSearch
                    name="term-search"
                    className="w-72 min-w-full rounded-lg"
                    defaultValue={search}
                    onChange={withDebounce(onInputChange('search'))}
                    placeholder="Tìm với SDT, Tên, ID, Email ..."
                    fullWidth
                    compressed
                  />
                </FlexItem>
                <FlexItem grow={false}>
                  <ComboBox
                    className="w-44 min-w-full"
                    placeholder="Team sale"
                    singleSelection={{ asPlainText: true }}
                    options={teams}
                    selectedOptions={selectedOptions}
                    onChange={onChange}
                    compressed
                    borderRadius={8}
                  />
                </FlexItem>
                <FlexItem grow={false}>
                  <Button
                    style={{ borderColor: '#80808038', color: 'black' }}
                    onClick={open}
                    size="s"
                    iconType="calendar"
                  >
                    Thời gian tạo
                  </Button>
                </FlexItem>
                <FlexItem grow={false}>
                  <Button
                    style={{ borderColor: '#80808038', color: 'black' }}
                    onClick={openStartTime}
                    size="s"
                    iconType="calendar"
                  >
                    Thời gian HD bắt đầu
                  </Button>
                </FlexItem>
              </FlexGroup>
              <Spacer />
            </PageContentHeaderSection>
          </PageContentHeader>
          <PageContentBody>
            <BasicTable
              tableLayout="fixed"
              loading={isFetching}
              error={error?.toString()}
              itemId="id"
              items={data?.data ?? []}
              isExpandable
              isSelectable
              hasActions
              enabled
              columns={[
                {
                  field: 'id',
                  name: <FormattedMessage defaultMessage="ID" />,
                  render: id => <p>{id}</p>,
                },
                {
                  field: 'fullNameContract',
                  name: (
                    <FormattedMessage defaultMessage="Tên người đại diện" />
                  ),
                  render: fullNameContract => <p>{fullNameContract}</p>,
                },
                {
                  field: 'price',
                  name: <FormattedMessage defaultMessage="Giá trị" />,
                  render: price => <p>{price}</p>,
                },
                {
                  field: 'duration',
                  name: <FormattedMessage defaultMessage="Giờ học" />,
                  render: duration => <p>{duration}</p>,
                },
                {
                  field: 'createdBy.displayName',
                  name: <FormattedMessage defaultMessage="Tạo bởi" />,
                  render: (displayName, { createdBy }) => (
                    <FlexGroup alignItems="center">
                      <FlexItem className="w-28">
                        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {displayName}({createdBy.email})
                        </p>
                      </FlexItem>
                    </FlexGroup>
                  ),
                },
                {
                  field: 'createdAt',
                  name: <FormattedMessage defaultMessage="Ngày tạo" />,
                  render: createdAt => <p>{createdAt}</p>,
                },
                {
                  field: 'id',
                  name: <FormattedMessage defaultMessage="Thao tác" />,
                  render: (id, { createdBy }) => (
                    <FlexGroup>
                      <FlexItem grow={false}>
                        <Link to={`contracts/${id}/edit`}>
                          <Button
                            style={{
                              backgroundColor: '#343741',
                              border: 'none',
                              visibility:
                                createdBy.id === currentUserId
                                  ? 'visible'
                                  : 'hidden',
                            }}
                            size="s"
                            minWidth={20}
                            fill
                            isDisabled={createdBy.id !== currentUserId || false}
                          >
                            <Text size="s" color="white">
                              <p>
                                <>
                                  <Icon type="documentEdit" />
                                </>
                              </p>
                            </Text>
                          </Button>
                        </Link>
                      </FlexItem>
                      <FlexItem grow={false}>
                        <Link to={`contracts/${id}`}>
                          <Button
                            href="contracts/create"
                            fill
                            className="w-20 rounded-lg"
                          >
                            <FormattedMessage defaultMessage="Xem" />
                          </Button>
                        </Link>
                      </FlexItem>
                    </FlexGroup>
                  ),
                  width: 200,
                },
              ]}
              onChange={onTableChangeHandler}
              pagination={{
                pageIndex,
                pageSize,
                totalItemCount: data?.pagination?.totalItems ?? 0,
              }}
            />
          </PageContentBody>
        </PageContent>
      </PageBody>
    </Page>
  );
}

export default Contracts;
