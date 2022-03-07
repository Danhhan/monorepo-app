/* eslint-disable react/self-closing-comp */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  BasicTable,
  FieldNumber,
  FieldText,
  FlexGroup,
  FlexItem,
  FormRow,
  HorizontalRule,
  LoadingSpinner,
  notification,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { SelectCustomField } from 'components';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { formatMoney } from 'utils';
import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { getUnitSpecialPrice, GET_UNIT_SPECIAL_PRICE } from 'services/price';
import {
  MANY_TIME_PAYMENT_AUTO,
  PROGRESS_PAYMENT_FEE_INFORMATION,
} from '../constant';

const AutoPayManyTimes = ({
  control,
  view,
  edit,
  setValue,
  getValues,
  premiumType,
  coursePrice,
  enableManyTimePayment,
  contract,
}) => {
  const [timesDevidedFee, setTimesDevidedFee] = useState(0);
  const [isError, setError] = useState(false);
  const { data, isFetching } = useQuery(
    [GET_UNIT_SPECIAL_PRICE, { coursePrice, premiumType }],
    () => getUnitSpecialPrice({ coursePrice, premiumType }),
    {
      onError: err => {
        notification.error({
          title: <FormattedMessage defaultMessage="Some things went wrong" />,
          text: <p>{err?.response?.data?._messages[0]}</p>,
        });
        setError(true);
      },
      onSuccess: () => {
        setError(false);
      },
      enabled: enableManyTimePayment,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );
  const [formatPayment, setFormatPayment] = useState({
    totalServicesProvided: 0,
    installmentFee: 0,
    totalPayment: 0,
  });
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    if (
      (edit || view) &&
      contract?.numberPayment_id === MANY_TIME_PAYMENT_AUTO
    ) {
      const localPayments = getValues('payment')
        ? [...getValues('payment')]
        : [];
      let order = 0;
      const _payments = localPayments?.map(payment => {
        order += 1;
        return {
          ...payment,
          order,
          formatAmount: formatMoney(payment?.amount),
        };
      });
      setTimesDevidedFee(_payments?.length);
      setPayments(_payments);
    }
  }, []);
  useEffect(() => {
    const fee = getValues('fee') ? getValues('fee') : contract?.fee || 0;
    const calculateFee = (getValues('price') * fee) / 100;
    setFormatPayment({
      totalServicesProvided: formatMoney(getValues('price')),
      installmentFee: formatMoney(calculateFee),
      totalPayment: formatMoney(calculateFee + getValues('price')),
    });
  }, [getValues('price')]);
  const handleChangeFee = value => {
    updateFeePayment(value);
    const calculateFee = (getValues('price') * value) / 100;
    const totalPayment = calculateFee + getValues('price');
    const localPayments = [...payments];
    const paymentAmount = totalPayment / localPayments.length;
    handleUpdatePayment(localPayments, paymentAmount);
    setValue('total_payment', totalPayment);
  };
  const updateFeePayment = fee => {
    const calculateFee = (getValues('price') * fee) / 100;
    setValue('fee', fee);
    const totalPayment = calculateFee + getValues('price');
    setFormatPayment({
      totalServicesProvided: formatMoney(getValues('price')),
      installmentFee: formatMoney(calculateFee),
      totalPayment: formatMoney(totalPayment),
    });
  };
  const handleUpdatePayment = (localPayments, paymentAmount) => {
    const unitSpecialPrice = data?._data?.unitSpecialPrice;
    let paymentHours = 0;

    if (localPayments.length === 1) {
      paymentHours = coursePrice?.lastDuration;
    }
    if (localPayments.length > 1) {
      paymentHours = paymentAmount / unitSpecialPrice;
    }
    const _payments = localPayments.map(payment => {
      return {
        order: payment.order,
        hours: Math.floor(paymentHours),
        amount: paymentAmount,
        formatAmount: formatMoney(paymentAmount),
        month: 0,
      };
    });
    let totalHour = 0;
    for (let index = 0; index < _payments.length - 1; index += 1) {
      const payment = _payments[index];
      totalHour += payment.hours;
    }
    if (_payments.length > 1) {
      _payments[_payments.length - 1].hours =
        coursePrice?.lastDuration - totalHour > 0
          ? coursePrice?.lastDuration - totalHour
          : 0;
    }
    setPayments(_payments);
    if (edit) {
      setValue('payment_new', _payments);
    } else {
      setValue('payment', _payments);
    }
  };
  const handleAddPayments = value => {
    if (isError) {
      notification.error({
        title: <FormattedMessage defaultMessage="Some things went wrong" />,
        text: <p>Chưa chọn type premium</p>,
      });
      return;
    }
    const calculateFee = (getValues('price') * value) / 100;
    const totalPayment = calculateFee + getValues('price');
    const localPayments = [];
    let order = 0;
    for (let index = 0; index < value; index += 1) {
      localPayments.push({
        order: (order += 1),
        hours: 0,
        amount: 0,
      });
    }
    const paymentAmount = totalPayment / localPayments.length;
    handleUpdatePayment(localPayments, paymentAmount);
    updateFeePayment(value);
    setValue('total_payment', totalPayment);
  };
  const handleOnChangeMonth = (index, event) => {
    const _payments = [...payments];
    _payments[index].month = event.target.value;
    setPayments(_payments);
    if (edit) {
      setValue('payment_new', _payments);
    } else {
      setValue('payment', _payments);
    }
  };
  return (
    <>
      {isFetching ? (
        <div className="flex justify-items-center items-center p-4 flex-col ">
          <LoadingSpinner size="xl" />
          <Spacer size="m" />
          <Text size="xs">
            <p>
              <FormattedMessage defaultMessage="Loading" />
            </p>
          </Text>
        </div>
      ) : (
        <>
          <FlexGroup>
            <FlexItem>
              <Title size="xxs">
                <FormRow
                  fullWidth
                  label={
                    <FormattedMessage defaultMessage="Phụ phí đóng nhiều lần" />
                  }
                >
                  <span></span>
                </FormRow>
              </Title>
            </FlexItem>
          </FlexGroup>
          <BasicTable
            items={PROGRESS_PAYMENT_FEE_INFORMATION}
            columns={[
              {
                field: 'text',
                render: text => <FormattedMessage {...text} />,
                width: 200,
              },
              {
                field: 'twoMonth',
                render: twoMonth => <FormattedMessage {...twoMonth} />,
              },
              {
                field: 'threeMonth',
                render: threeMonth => <FormattedMessage {...threeMonth} />,
              },
              {
                field: 'fourMonth',
                render: fourMonth => <FormattedMessage {...fourMonth} />,
              },
              {
                field: 'fiveMonth',
                render: fiveMonth => <FormattedMessage {...fiveMonth} />,
              },
              {
                field: 'sixMonth',
                render: sixMonth => <FormattedMessage {...sixMonth} />,
              },
              {
                field: 'sevenMonth',
                render: sevenMonth => <FormattedMessage {...sevenMonth} />,
              },
              {
                field: 'eightMonth',
                render: eightMonth => <FormattedMessage {...eightMonth} />,
              },
              {
                field: 'nineMonth',
                render: nineMonth => <FormattedMessage {...nineMonth} />,
              },
              {
                field: 'tenMonth',
                render: tenMonth => <FormattedMessage {...tenMonth} />,
              },
              {
                field: 'elevenMonth',
                render: elevenMonth => <FormattedMessage {...elevenMonth} />,
              },
              {
                field: 'twelveMonth',
                render: twelveMonth => <FormattedMessage {...twelveMonth} />,
              },
            ]}
          />
          <Spacer size="xl" />
          <FlexGroup>
            <FlexItem>
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    fullWidth
                    label={<FormattedMessage defaultMessage="Phí phụ thu" />}
                  >
                    <Controller
                      render={({ onChange, value }) => (
                        <SelectCustomField
                          style={{ border: '1px solid #CDCFD1' }}
                          valueOfSelected={value}
                          value={value}
                          onSelect={selected => {
                            onChange(selected.value);
                            handleChangeFee(selected.value);
                            // setOnChangedPayment(true);
                          }}
                          placeholder="Chọn mức phí"
                          options={Array.from(Array(13).keys()).map(index => ({
                            value: index,
                            label: `${index} %`,
                          }))}
                          borderRadius={8}
                          disabled={view}
                        />
                      )}
                      name="fee"
                      control={control}
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem>
                  <FormRow
                    fullWidth
                    label={
                      <FormattedMessage defaultMessage="Tổng giá trị dịch vụ cung cấp" />
                    }
                  >
                    <FieldText
                      style={{ border: '1px solid #CDCFD1' }}
                      className="rounded-lg"
                      value={formatPayment.totalServicesProvided}
                      fullWidth
                      disabled
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
            </FlexItem>
            <FlexItem>
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    fullWidth
                    label={<FormattedMessage defaultMessage="Phí phụ thu" />}
                  >
                    <FieldText
                      style={{ border: '1px solid #CDCFD1' }}
                      className="rounded-lg"
                      value={formatPayment.installmentFee}
                      fullWidth
                      disabled
                    />
                  </FormRow>
                </FlexItem>
                <FlexItem>
                  <Controller name="total_payment" control={control} />
                  <FormRow
                    fullWidth
                    label={
                      <span style={{ color: 'red' }}>
                        <FormattedMessage defaultMessage="Tổng giá trị phải thanh toán" />
                      </span>
                    }
                  >
                    <FieldText
                      style={{ border: '1px solid #CDCFD1' }}
                      className="rounded-lg"
                      value={formatPayment.totalPayment}
                      fullWidth
                      disabled
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
            </FlexItem>
          </FlexGroup>
          <Spacer />
          <HorizontalRule margin="s" />
          <Spacer />
          <FlexGroup className="w-1/4">
            <FlexItem>
              <FormRow
                fullWidth
                label={
                  <span style={{ color: 'black' }}>
                    <FormattedMessage defaultMessage="Số lần chia học phí" />
                  </span>
                }
              >
                <SelectCustomField
                  style={{ border: '1px solid #CDCFD1' }}
                  valueOfSelected={timesDevidedFee}
                  onSelect={selected => {
                    setTimesDevidedFee(selected.value);
                    handleAddPayments(selected.value);
                    // setOnChangedPayment(true);
                  }}
                  placeholder="Chọn số lần chia"
                  options={Array.from(Array(13).keys())
                    .filter(index => index !== 0)
                    .map(index => ({
                      value: index,
                      label: index,
                    }))}
                  borderRadius={8}
                  disabled={view}
                />
              </FormRow>
            </FlexItem>
          </FlexGroup>
          {payments?.length > 0 && (
            <>
              <FlexGroup style={{ width: '570px' }}>
                <FlexItem grow={false}>
                  <Title className="w-12" size="xxs">
                    <p>LẦN</p>
                  </Title>
                </FlexItem>
                <FlexItem grow={false}>
                  <Title size="xxs" className="w-56">
                    <p>GIÁ TRỊ THANH TOÁN</p>
                  </Title>
                </FlexItem>
                <FlexItem grow={false}>
                  <Title size="xxs" className="w-28">
                    <p>SỐ GIỜ HỌC</p>
                  </Title>
                </FlexItem>
                <FlexItem grow={false}>
                  <Title size="xxs" className="w-28">
                    <p>SỐ NGÀY/LẦN</p>
                  </Title>
                </FlexItem>
              </FlexGroup>

              {payments.map((payment, index) => (
                <FlexGroup key={payment.order} style={{ width: '570px' }}>
                  <FlexItem grow={false}>
                    <Text className="w-12" size="xs">
                      <p>{payment.order}</p>
                    </Text>
                  </FlexItem>
                  <FlexItem grow={false}>
                    <FieldText
                      style={{ border: '1px solid #CDCFD1' }}
                      className="rounded-lg w-56"
                      fullWidth
                      value={payment?.formatAmount}
                      disabled
                    />
                  </FlexItem>
                  <FlexItem grow={false}>
                    <FieldText
                      style={{ border: '1px solid #CDCFD1' }}
                      className="rounded-lg w-28"
                      fullWidth
                      value={payment?.hours}
                      disabled
                    />
                  </FlexItem>
                  <FlexItem grow={false}>
                    <FieldNumber
                      style={{ border: '1px solid #CDCFD1' }}
                      className="rounded-lg w-28"
                      fullWidth
                      placeholder="0"
                      value={payment?.month}
                      onChange={event => handleOnChangeMonth(index, event)}
                      disabled={view || index === 0}
                    />
                  </FlexItem>
                </FlexGroup>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

AutoPayManyTimes.defaultProps = {
  control: undefined,
  premiumType: undefined,
  coursePrice: undefined,
  view: false,
  edit: false,
  enableManyTimePayment: false,
  getValues: () => {},
  setValue: () => {},
  contract: undefined,
};

AutoPayManyTimes.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  view: PropTypes.bool,
  edit: PropTypes.bool,
  enableManyTimePayment: PropTypes.bool,
  control: PropTypes.any,
  premiumType: PropTypes.number,
  getValues: PropTypes.func,
  setValue: PropTypes.func,
  coursePrice: PropTypes.object,
  contract: PropTypes.object,
};

export default AutoPayManyTimes;
