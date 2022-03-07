import {
  BasicTable,
  Icon,
  PageContent,
  PageContentBody,
  PageContentHeader,
} from '@antoree/ant-ui';
import sortUnactive from 'assets/icons/Maketing/sort_unactive.svg';
import { usePagiantion } from 'hooks';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getPartner, GET_PARTNER } from 'services/affiliate';
import { StringParam, withDefault } from 'use-query-params';
import { FilterBar } from '../components';

function PartnerReport() {
  const {
    createdAtFrom,
    createdAtTo,
    onInputChange,
    query,
    pageSize,
    pageIndex,
    // eslint-disable-next-line camelcase
    search_query,
    onTableChangeHandler,
    onSelect,
  } = usePagiantion({
    search_query: withDefault(StringParam, ''),
    createdAtFrom: withDefault(StringParam, ''),
    createdAtTo: withDefault(StringParam, ''),
  });
  const { data, error, isFetching } = useQuery(
    [GET_PARTNER, query],
    () =>
      getPartner({
        pageIndex,
        pageSize: 10,
        createdAtFrom,
        createdAtTo,
        term: search_query,
      }),
    {
      retry: 1,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  );
  return (
    <>
      <PageContent
        borderRadius="none"
        hasShadow={false}
        style={{ border: 'none' }}
        color="transparent"
      >
        <PageContentHeader>
          <FilterBar onInputChange={onInputChange} onSelect={onSelect} />
        </PageContentHeader>
        <PageContentBody paddingSize="l" className="bg-white rounded-xl">
          <BasicTable
            tableLayout="fixed"
            loading={isFetching}
            error={error?.toString()}
            items={data?.data ?? []}
            hasActions
            columns={[
              {
                name: (
                  <span>
                    <FormattedMessage defaultMessage="Name" />
                  </span>
                ),
                field: 'shownName',
                render: (shownName, { id }) => (
                  <Link
                    // to={`/affiliate/partner-report/${id}`}
                    to={{
                      pathname: `/affiliate/partner-report/${id}`,
                      state: { shownName },
                    }}
                    className="text-primary"
                  >
                    {shownName}
                  </Link>
                ),
                width: 200,
              },
              {
                name: (
                  <span>
                    <FormattedMessage defaultMessage="Phone" />
                  </span>
                ),
                field: 'phoneNumber',
                render: phoneNumber => <p>{phoneNumber}</p>,
              },
              {
                name: (
                  <div className="cursor-pointer">
                    <span>
                      <FormattedMessage defaultMessage="Contacts" />
                    </span>
                    <span>
                      <Icon
                        style={{ marginLeft: 4, marginBottom: 2 }}
                        size="original"
                        type={sortUnactive}
                      />
                    </span>
                  </div>
                ),
                field: 'contacts',
                render: contacts => <p>{contacts}</p>,
              },
              {
                name: (
                  <div className="cursor-pointer">
                    <span>
                      <FormattedMessage defaultMessage="Contacts Stop" />
                    </span>
                    <span>
                      <Icon
                        style={{ marginLeft: 4, marginBottom: 2 }}
                        size="original"
                        type={sortUnactive}
                      />
                    </span>
                  </div>
                ),
                field: 'contactStops',
                render: contactStops => <p>{contactStops}</p>,
              },
              {
                name: (
                  <div className="cursor-pointer">
                    <span>
                      <FormattedMessage defaultMessage="Tested" />
                    </span>
                    <span>
                      <Icon
                        style={{ marginLeft: 4, marginBottom: 2 }}
                        size="original"
                        type={sortUnactive}
                      />
                    </span>
                  </div>
                ),
                field: 'tested',
                render: tested => <p>{tested}</p>,
              },
              {
                name: (
                  <div className="cursor-pointer">
                    <span>
                      <FormattedMessage defaultMessage="Trial" />
                    </span>
                    <span>
                      <Icon
                        style={{ marginLeft: 4, marginBottom: 2 }}
                        size="original"
                        type={sortUnactive}
                      />
                    </span>
                  </div>
                ),
                field: 'trial',
                render: trial => <p>{trial}</p>,
              },
              {
                name: (
                  <div className="cursor-pointer">
                    <span>
                      <FormattedMessage defaultMessage="Customers" />
                    </span>
                    <span>
                      <Icon
                        style={{ marginLeft: 4, marginBottom: 2 }}
                        size="original"
                        type={sortUnactive}
                      />
                    </span>
                  </div>
                ),
                field: 'customers',
                render: customers => <p>{customers}</p>,
              },
              {
                name: (
                  <div className="cursor-pointer">
                    <span>
                      <FormattedMessage defaultMessage="GMV" />
                    </span>
                    <span>
                      <Icon
                        style={{ marginLeft: 4, marginBottom: 2 }}
                        size="original"
                        type={sortUnactive}
                      />
                    </span>
                  </div>
                ),
                field: 'gmv',
                render: gmv => <p>{gmv}</p>,
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
    </>
  );
}

export default PartnerReport;
