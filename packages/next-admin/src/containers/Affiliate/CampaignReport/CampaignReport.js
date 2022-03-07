/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  BasicTable,
  Icon,
  PageContent,
  PageContentBody,
  PageContentHeader,
} from '@antoree/ant-ui';
import sortAsc from 'assets/icons/Maketing/sort_asc.svg';
import sortUnactive from 'assets/icons/Maketing/sort_unactive.svg';
import { usePagiantion } from 'hooks';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { getCampaignReport, GET_CAMPAIGN_REPORT } from 'services/affiliate';
import { StringParam, withDefault } from 'use-query-params';
import { FilterBar, CampaignInfo } from '../components';

function CampaignReport() {
  const handleSort = () => {
    // addAction();
  };
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
  const { data, error, isFetching, isLoading } = useQuery(
    [GET_CAMPAIGN_REPORT, query],
    () =>
      getCampaignReport({
        pageIndex,
        pageSize: 10,
        createdAtFrom,
        createdAtTo,
        campaign: search_query,
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
            items={data?.data ?? []}
            loading={isLoading || isFetching}
            error={error?.toString()}
            columns={[
              {
                name: (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                  <div className="cursor-pointer" onClick={handleSort}>
                    <span>
                      <FormattedMessage defaultMessage="Campaign" />
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
                field: 'utmCampaign',
                render: (utmCampaign, item) => <CampaignInfo campaign={item} />,
                width: 200,
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
                        type={sortAsc}
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
                        type={sortAsc}
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
              pageSizeOptions: [10, 25, 50, 100, 200],
              totalItemCount: data?.pagination?.totalItems ?? 0,
            }}
          />
        </PageContentBody>
      </PageContent>
    </>
  );
}

export default CampaignReport;
