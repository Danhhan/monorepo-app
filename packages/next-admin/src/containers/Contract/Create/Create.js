/* eslint-disable react/self-closing-comp */
/* eslint-disable no-underscore-dangle */
import {
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
import { useBreadcrumbs } from 'hooks';
import * as moment from 'moment';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useMutation } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { createContract } from 'services/contract';
import { SideBar } from '../Components';
import ContractBox from '../Components/ContractBox';
import {
  VALIDATION_SCHEMA,
  FORM_DEFAULT_VALUES,
  MANY_TIME_PAYMENT_MANUAL,
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
    text: <FormattedMessage defaultMessage="Create" />,
  },
];

function Create() {
  useBreadcrumbs(breadcrumbs);
  const CREATE_CONTRACT_FORM_ID = 'create-contract-form';
  const { control, handleSubmit, errors, setValue, getValues } = useForm({
    mode: 'onChange',
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(VALIDATION_SCHEMA),
  });
  const history = useHistory();
  const createContractMutation = useMutation(createContract, {
    onSuccess: () => {
      notification.success({
        title: 'Successfully',
        text: <FormattedMessage defaultMessage="Tạo hợp đồng thành công!" />,
      });
      history.push('/contracts');
    },
    onError: err => {
      notification.error({
        title: 'Failure',
        text: <FormattedMessage defaultMessage="Tạo hợp đồng thất bại!" />,
      });
    },
  });

  const handleCreate = formData => {
    const payments = formData?.payment;
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
    createContractMutation.mutate({
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
    });
  };
  const location = useLocation();
  return (
    <Page style={{ scrollBehavior: 'smooth' }}>
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
                    <FormattedMessage defaultMessage="Tạo hợp đồng" />
                  </h2>
                </Title>
              </FlexItem>
            </FlexGroup>
          }
        />
        <PageContent>
          <PageContentBody>
            <Form
              component="form"
              id={CREATE_CONTRACT_FORM_ID}
              onSubmit={handleSubmit(handleCreate)}
            >
              <ContractBox
                control={control}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
              />
            </Form>
            <FlexGroup justifyContent="flexEnd" gutterSize="xs">
              <FlexItem grow={false}>
                <Button
                  fill
                  type="submit"
                  form={CREATE_CONTRACT_FORM_ID}
                  isLoading={createContractMutation.isLoading}
                >
                  <Text size="s" color="white">
                    <FormattedMessage defaultMessage="Tạo hợp đồng" />
                  </Text>
                </Button>
              </FlexItem>
            </FlexGroup>
          </PageContentBody>
        </PageContent>
      </PageBody>
    </Page>
  );
}

export default Create;
