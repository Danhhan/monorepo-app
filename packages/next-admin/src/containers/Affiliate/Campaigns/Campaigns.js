import {
  FieldSearch,
  FlexGrid,
  FlexGroup,
  FlexItem,
  InfiniteScroll,
  LoadingSpinner,
  notification,
  PageContent,
  PageContentBody,
  PageContentHeader,
  Text,
} from '@antoree/ant-ui';
import { usePagiantion } from 'hooks';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { StringParam, withDefault } from 'use-query-params';
import { useInfiniteQuery, useMutation } from 'react-query';
import { withDebounce } from 'helpers';
import {
  createCampaign,
  getCampaign,
  GET_CAMPAIGN,
  updateCampaignStatus,
} from 'services/affiliate';
import { CreateCampaignModal } from './components';
import { CampaignInfo } from '../components';

function Campaigns({ isVisible, close }) {
  const { search, onInputChange } = usePagiantion({
    search: withDefault(StringParam, ''),
  });
  const { data, fetchNextPage, hasNextPage, remove } = useInfiniteQuery(
    [GET_CAMPAIGN, { search }],
    context =>
      getCampaign({
        pageIndex: context.pageParam?.page ?? 0,
        search,
      }),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
      getNextPageParam: lastPage =>
        lastPage.pagination.hasMore && {
          hasMore: lastPage.pagination.hasMore,
          page: lastPage.pagination.currentPage,
          total: lastPage.pagination.totalItems,
        },
    },
  );
  const createCampaignMutation = useMutation(createCampaign, {
    onSuccess: () => {
      notification.success({
        title: 'Successfully',
        text: <FormattedMessage defaultMessage="Tạo campaign thành công!" />,
      });
      close();
      remove();
    },
    onError: err => {
      notification.error({
        title: 'Failure',
        text: <FormattedMessage defaultMessage="Tạo campaign thất bại!" />,
      });
    },
  });
  const dataLength = useMemo(
    () =>
      data?.pages.reduce((acc, page) => {
        return acc + page?.data?.length ?? 0;
      }, 0) ?? 0,
    [data],
  );
  const updateCampaignStatusMutate = useMutation(updateCampaignStatus, {
    onSuccess: () => {
      notification.success({
        title: 'Successfully',
        text: <FormattedMessage defaultMessage="Ẩn campaign thành công!" />,
      });
      remove();
    },
    onError: err => {
      notification.error({
        title: 'Failure',
        text: <FormattedMessage defaultMessage="Ẩn campaign thất bại!" />,
      });
    },
  });
  return (
    <PageContent color="transparent" borderRadius="none" hasShadow={false}>
      <CreateCampaignModal
        isVisible={isVisible}
        onCloseModal={close}
        createCampaignMutation={createCampaignMutation}
      />
      <PageContentHeader>
        <FlexGroup>
          <FlexItem grow={false}>
            <FieldSearch
              name="search"
              className="w-80 min-w-full rounded-lg"
              onChange={withDebounce(event => {
                onInputChange('search')(event);
              })}
              placeholder="Search campaign name"
              fullWidth
            />
          </FlexItem>
        </FlexGroup>
      </PageContentHeader>
      <PageContentBody>
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasNextPage ?? true}
          loader={
            <div className="flex flex-col items-center justify-center justify-items-center py-10">
              <LoadingSpinner size="xl" />
              <Text>
                <p>
                  <FormattedMessage defaultMessage="Loading..." />
                </p>
              </Text>
            </div>
          }
          style={{ overflow: 'inherit' }}
          dataLength={dataLength}
        >
          <FlexGrid gutterSize="l" columns="4">
            {data?.pages
              .map(page => page?.data)
              .reduce((a, b) => [...a, ...b], [])
              ?.map(campaign => (
                <CampaignInfo
                  campaign={campaign}
                  isCardComponent
                  updateCampaignStatusMutate={updateCampaignStatusMutate}
                />
              ))}
          </FlexGrid>
        </InfiniteScroll>
      </PageContentBody>
    </PageContent>
  );
}

Campaigns.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Campaigns;
