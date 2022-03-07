/* eslint-disable react/self-closing-comp */
/* eslint-disable no-underscore-dangle */
import {
  AntoreeCustomizeLoading,
  Button,
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  Form,
  Icon,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  PageHeader,
  PageSideBar,
  Popover,
  Text,
  Title,
} from '@antoree/ant-ui';
import { useBreadcrumbs, useCurrentUser, useErrorModal } from 'hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getContractDetail, GET_CONTRACT_DETAIL } from 'services/contract';
import { SideBar } from '../Components';
import ContractBox from '../Components/ContractBox';
import { FORM_DEFAULT_VALUES } from '../constant';

const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: (
      <p>
        <FormattedMessage defaultMessage="Contract Management" />
      </p>
    ),
    path: '/contracts',
  },
  {
    text: <FormattedMessage defaultMessage="view" />,
  },
];

function View() {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [contract, setContract] = useState({});
  const [, dispatch] = useErrorModal();
  useBreadcrumbs(breadcrumbs);
  const { data, isLoading, isFetching } = useQuery(
    [GET_CONTRACT_DETAIL(id)],
    () => getContractDetail(id),
    {
      retry: 1,
      refetchOnReconnect: true,
      cacheTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      onError: err => {
        if (err?.response?.status === 403) {
          history.push('/error-403');
        } else {
          const payload = {
            type: 'SHOW_ERROR_MODAL',
            err,
          };
          dispatch(payload);
        }
      },
    },
  );
  const [topicPrice, setTopicPrice] = useState({});
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const CREATE_CONTRACT_FORM_ID = 'create-contract-form';
  const { control, errors, setValue, getValues, reset, watch } = useForm({
    mode: 'onChange',
    defaultValues: FORM_DEFAULT_VALUES,
  });
  const defaultValue = () => {
    const localContract = data?._data?.contract;
    const _defaultValue = {
      ...localContract,
      request_id: localContract?.learning_request?.id,
      city: localContract?.city_id,
      district: localContract?.district_id,
      ward: localContract?.ward_id,
      city_serviceuser: localContract?.city_serviceuser_id,
      district_serviceuser: localContract?.district_serviceuser_id,
      ward_serviceuser: localContract?.ward_serviceuser_id,
      special_price: localContract?.special_price,
    };
    return _defaultValue;
  };

  useEffect(() => {
    reset(defaultValue());
    setTopicPrice(data?._data?.contract?.topicPrice);
    setContract(data?._data?.contract);
  }, [data]);
  const watchField = watch('full_name_contract');
  return (
    <Page style={{ scrollBehavior: 'smooth' }}>
      {isLoading || isFetching ? (
        <div className="flex flex-col items-center justify-center justify-items-center fixed top-0 left-0 h-screen w-screen">
          <AntoreeCustomizeLoading />
        </div>
      ) : (
        <>
          <PageSideBar className="w-64 min-w-full mr-12" sticky>
            <SideBar location={location} />
          </PageSideBar>

          <PageBody component="main">
            <PageHeader
              pageTitle={
                <FlexGroup gutterSize="s" direction="row">
                  <FlexItem grow={false}>
                    <Title>
                      <h2>
                        <FormattedMessage defaultMessage="Thông tin hợp đồng" />
                      </h2>
                    </Title>
                  </FlexItem>
                </FlexGroup>
              }
              rightSideItems={[
                <Link to={`/contracts/${id}/edit`}>
                  <Button
                    style={{
                      backgroundColor: '#343741',
                      border: 'none',
                    }}
                    minWidth={20}
                    fill
                  >
                    <Text size="s" color="white">
                      <p>
                        <>
                          <Icon type="documentEdit" className="mr-2" />
                          <FormattedMessage defaultMessage="Chỉnh sửa" />
                        </>
                      </p>
                    </Text>
                  </Button>
                </Link>,

                <Popover
                  button={
                    <Button
                      fill
                      color="warning"
                      // isLoading={isFetchingLink}
                      onClick={() =>
                        // eslint-disable-next-line no-shadow
                        setIsPopoverOpen(isPopoverOpen => !isPopoverOpen)
                      }
                    >
                      <Text size="s" color="black">
                        <p>
                          <>
                            <Icon type="share" className="mr-2" />
                            <FormattedMessage defaultMessage="Xuất hợp đồng" />
                          </>
                        </p>
                      </Text>
                    </Button>
                  }
                  isOpen={isPopoverOpen}
                  closePopover={() => setIsPopoverOpen(false)}
                >
                  <FlexGroup
                    responsive={false}
                    gutterSize="s"
                    alignItems="center"
                  >
                    <FlexItem grow={false}>
                      <ButtonEmpty
                        size="s"
                        onClick={e => {
                          e.preventDefault();
                          window.open(
                            data?._data?.contract?.link_contract_sale,
                            '_blank',
                          );
                        }}
                      >
                        <Text size="s" color="black">
                          <p>
                            <>
                              <Icon type="share" className="mr-2" />
                              <FormattedMessage defaultMessage="Xuất hợp đồng (FULL)" />
                            </>
                          </p>
                        </Text>
                      </ButtonEmpty>
                    </FlexItem>
                  </FlexGroup>
                  <FlexGroup
                    responsive={false}
                    gutterSize="s"
                    alignItems="center"
                  >
                    <FlexItem grow={false}>
                      <ButtonEmpty
                        size="s"
                        onClick={e => {
                          e.preventDefault();
                          window.open(
                            data?._data?.contract?.link_contract,
                            '_blank',
                          );
                        }}
                      >
                        <Text size="s" color="black">
                          <p>
                            <>
                              <Icon type="share" className="mr-2" />
                              <FormattedMessage defaultMessage="Xuất hợp đồng" />
                            </>
                          </p>
                        </Text>
                      </ButtonEmpty>
                    </FlexItem>
                  </FlexGroup>
                  <FlexGroup
                    responsive={false}
                    gutterSize="s"
                    alignItems="center"
                  >
                    <FlexItem grow={false}>
                      <ButtonEmpty
                        size="s"
                        onClick={e => {
                          e.preventDefault();
                          window.open(
                            data?._data?.contract?.link_contract,
                            '_blank',
                          );
                        }}
                      >
                        <Text size="s" color="black">
                          <p>
                            <>
                              <Icon type="share" className="mr-2" />
                              <FormattedMessage defaultMessage="Xuất hợp đồng (Kèm con dấu)" />
                            </>
                          </p>
                        </Text>
                      </ButtonEmpty>
                    </FlexItem>
                  </FlexGroup>
                </Popover>,
              ]}
            />
            <PageContent>
              <PageContentBody>
                {watchField && (
                  <Form component="form" id={CREATE_CONTRACT_FORM_ID}>
                    <ContractBox
                      control={control}
                      errors={errors}
                      setValue={setValue}
                      getValues={getValues}
                      reset={reset}
                      defaultValue={defaultValue}
                      topicPrice={topicPrice}
                      view
                      contract={contract}
                    />
                  </Form>
                )}
              </PageContentBody>
            </PageContent>
          </PageBody>
        </>
      )}
    </Page>
  );
}
export default View;
