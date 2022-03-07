/* eslint-disable react/self-closing-comp */
/* eslint-disable no-underscore-dangle */
import {
  AntoreeCustomizeLoading,
  Button,
  FlexGroup,
  FlexItem,
  Form,
  notification,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  PageHeader,
  PageSideBar,
  Text,
  Title,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBreadcrumbs, useErrorModal } from 'hooks';
import * as moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router';
import {
  getContractDetail,
  GET_CONTRACT_DETAIL,
  updateContract,
} from 'services/contract';
import { SideBar } from '../Components';
import ContractBox from '../Components/ContractBox';
import {
  FORM_DEFAULT_VALUES,
  MANY_TIME_PAYMENT_MANUAL,
  VALIDATION_SCHEMA,
} from '../constant';

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
    text: <FormattedMessage defaultMessage="Update" />,
  },
];
function Update() {
  useBreadcrumbs(breadcrumbs);
  const { id } = useParams();
  const location = useLocation();
  const [topicPrice, setTopicPrice] = useState({});
  const [contract, setContract] = useState({});
  const history = useHistory();
  const [, dispatch] = useErrorModal();
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
  const UPDATE_CONTRACT_FORM_ID = 'update-contract-form';
  const {
    control,
    handleSubmit,
    errors,
    setValue,
    getValues,
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(VALIDATION_SCHEMA),
  });
  const defaultValue = () => {
    const localContract = data?._data?.contract;
    const calculateFee = (localContract?.price * localContract?.fee) / 100;
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
      payment_new: localContract?.payment,
      total_payment: calculateFee + localContract?.price,
    };
    return _defaultValue;
  };

  useEffect(() => {
    reset(defaultValue());
    setTopicPrice(data?._data?.contract?.topicPrice);
    setContract(data?._data?.contract);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const updateContractMutation = useMutation(updateContract, {
    onSuccess: () => {
      notification.success({
        title: 'Successfully',
        text: <FormattedMessage defaultMessage="Cập nhật đồng thành công!" />,
      });
      history.push(`/contracts/${id}`);
    },
    onError: err => {
      notification.error({
        title: 'Failure',
        text: <FormattedMessage defaultMessage="Cập nhật hợp đồng thất bại!" />,
      });
    },
  });

  const handleUpdate = formData => {
    const payments = formData?.payment_new;
    const isInvalidHour = payments?.some(
      payment =>
        payment?.hours < 12 &&
        payment !== payments[payments.length - 1] &&
        formData?.numberPayment_id === MANY_TIME_PAYMENT_MANUAL,
    );
    if (isInvalidHour) {
      notification.error({
        title: 'Số giờ học không hợp lệ',
      });
      return;
    }
    const totalHour = payments?.reduce(
      (total, payment) => Number(total) + Number(payment.hours),
      0,
    );
    if (totalHour > formData?.last_duration) {
      notification.error({
        title:
          'Tổng số giờ học của các lần chia không được lớn hơn tổng giờ của khoá học',
      });
      return;
    }
    updateContractMutation.mutate({
      formData,
      issuedDate: formData.issued_date
        ? moment(formData.issued_date).format('YYYY-MM-DD')
        : null,
      issuedDateServieceUser: formData.issued_date_serviece_user
        ? moment(formData.issued_date_serviece_user).format('YYYY-MM-DD')
        : null,
      paymentDate: formData.payment_date
        ? moment(formData.payment_date).format('YYYY-MM-DD')
        : null,
      timeStart: formData.time_start
        ? moment(formData.time_start).format('YYYY-MM-DD')
        : null,
      birthDay: formData.birth_day
        ? moment(formData.birth_day).format('YYYY-MM-DD')
        : null,
      id,
    });
  };
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
                        <FormattedMessage defaultMessage="Cập nhật hợp đồng" />
                      </h2>
                    </Title>
                  </FlexItem>
                </FlexGroup>
              }
            />
            <PageContent>
              <PageContentBody>
                {watchField && (
                  <Form
                    component="form"
                    id={UPDATE_CONTRACT_FORM_ID}
                    onSubmit={handleSubmit(handleUpdate)}
                  >
                    <ContractBox
                      control={control}
                      errors={errors}
                      setValue={setValue}
                      getValues={getValues}
                      defaultValue={defaultValue}
                      topicPrice={topicPrice}
                      edit
                      contract={contract}
                    />
                  </Form>
                )}
                <FlexGroup justifyContent="flexEnd" gutterSize="xs">
                  <FlexItem grow={false}>
                    <Button
                      fill
                      type="submit"
                      form={UPDATE_CONTRACT_FORM_ID}
                      isLoading={updateContractMutation.isLoading}
                    >
                      <Text size="s" color="white">
                        <FormattedMessage defaultMessage="Cập nhật hợp đồng" />
                      </Text>
                    </Button>
                  </FlexItem>
                </FlexGroup>
              </PageContentBody>
            </PageContent>
          </PageBody>
        </>
      )}
    </Page>
  );
}

export default Update;
