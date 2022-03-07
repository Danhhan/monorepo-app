import {
  BasicTable,
  ButtonEmpty,
  Icon,
  PageContent,
  PageContentBody,
  PageContentHeader,
  Title,
} from '@antoree/ant-ui';
import sortUnactive from 'assets/icons/Maketing/sort_unactive.svg';
import { usePagiantion, useRedirect } from 'hooks';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getPartnerById, GET_PARTNER_BY_ID } from 'services/affiliate';

function PartnerReportDetail() {
  const { id } = useParams();
  const { pageSize, pageIndex, onTableChangeHandler, query } = usePagiantion(
    {},
  );
  const { data, error, isFetching, isLoading } = useQuery(
    [GET_PARTNER_BY_ID(id), query],
    () =>
      getPartnerById({
        pageIndex,
        pageSize: 10,
        id,
      }),
    {
      retry: 1,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  );
  const { redirectTo } = useRedirect();
  const location = useLocation();
  return (
    <>
      <PageContent
        borderRadius="none"
        hasShadow={false}
        style={{ border: 'none' }}
        color="transparent"
      >
        <PageContentHeader>
          <ButtonEmpty
            onClick={() => redirectTo('/affiliate/partner-report')}
            iconType="arrowLeft"
            color="text"
          >
            <Title size="s">
              <span>{location?.state?.shownName}</span>
            </Title>
          </ButtonEmpty>
        </PageContentHeader>
        <PageContentBody paddingSize="l" className="bg-white rounded-xl">
          <BasicTable
            items={data?.data ?? []}
            loading={isLoading || isFetching}
            error={error?.toString()}
            columns={[
              {
                name: (
                  <span>
                    <FormattedMessage defaultMessage="Campaign" />
                  </span>
                ),
                field: 'campaign',
                render: campaign => (
                  <Link to="/" className="text-primary">
                    {campaign}
                  </Link>
                ),
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

export default PartnerReportDetail;
