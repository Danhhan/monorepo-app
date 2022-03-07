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
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { SelectCustomField } from 'components';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { formatMoney } from 'utils';
import {
  MANY_TIME_PAYMENT_MANUAL,
  PAYMENT_AMOUNT,
  PAYMENT_HOUR,
  PAYMENT_MONTH,
  PROGRESS_PAYMENT_FEE_INFORMATION,
} from '../constant';

const ManualPayManyTimes = ({
  control,
  view,
  edit,
  setValue,
  getValues,
  contract,
}) => {
  const [timesDevidedFee, setTimesDevidedFee] = useState(0);

  const [formatPayment, setFormatPayment] = useState({
    totalServicesProvided: 0,
    installmentFee: 0,
    totalPayment: 0,
  });
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    if (
      (edit || view) &&
      contract?.numberPayment_id === MANY_TIME_PAYMENT_MANUAL
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
    if (getValues('numberPayment_id') !== contract?.numberPayment_id) {
      handleChangeFee(0);
    }
  }, [getValues('numberPayment_id')]);
  useEffect(() => {
    if (getValues('numberPayment_id') === contract?.numberPayment_id) {
      const fee = getValues('fee') ? getValues('fee') : contract?.fee;
      const calculateFee = (getValues('price') * fee) / 100;
      setFormatPayment({
        totalServicesProvided: formatMoney(getValues('price')),
        installmentFee: formatMoney(calculateFee),
        totalPayment: formatMoney(calculateFee + getValues('price')),
      });
    }
  }, [getValues('price')]);
  const handleChangeFee = value => {
    updateFeePayment(value);
    const calculateFee = (getValues('price') * value) / 100;
    const totalPayment = calculateFee + getValues('price');
    setValue('total_payment', totalPayment);
    if (payments.length > 0) {
      const localPayments = updateValueLastItem(payments);
      setPayments(localPayments);
    }
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
  const hanldeAddPayments = value => {
    const calculateFee = (getValues('price') * value) / 100;
    const totalPayment = calculateFee + getValues('price');
    setValue('total_payment', totalPayment);
    let _payments = [];
    if (payments.length <= 0) {
      const localPayments = [];
      let order = 0;
      for (let index = 0; index < value; index += 1) {
        localPayments.push({
          order: (order += 1),
          amount: 0,
          hours: 0,
          month: 0,
        });
      }
      localPayments[localPayments.length - 1].amount = totalPayment;
      localPayments[localPayments.length - 1].hours = getValues(
        'last_duration',
      );
      localPayments[localPayments.length - 1].formatAmount = formatMoney(
        totalPayment,
      );
      _payments = [...localPayments];
    }
    if (payments?.length < value) {
      const localPayments = [];
      const length = value - payments.length;
      for (let index = 0; index < length; index += 1) {
        localPayments.push({
          amount: 0,
          hours: 0,
          month: 0,
        });
      }
      _payments = updateOrder([...localPayments, ...payments]);
    }
    if (payments?.length > value) {
      const deleteCount = payments.length - value;
      const deleteItem = [...payments];
      deleteItem.splice(0, deleteCount);
      _payments = updateOrder(deleteItem);
    }
    const localPayments = updateValueLastItem(_payments);
    setPayments(localPayments);
    updateFeePayment(value);
  };
  const updateOrder = paymentsInput => {
    const _payments = [...paymentsInput];
    let order = 0;
    for (let i = 0; i < _payments.length; i += 1) {
      order += 1;
      _payments[i].order = order;
    }
    return _payments;
  };
  // const handleUpdatePayments = () => {};
  const handleOnChangePayment = (index, event, number) => {
    const _payments = [...payments];
    const value = isNaN(Number(event.target.value)) ? 0 : event.target.value;

    if (number === PAYMENT_AMOUNT) {
      _payments[index].amount = value;
    }
    if (number === PAYMENT_HOUR) {
      _payments[index].hours = value;
    }
    if (number === PAYMENT_MONTH) {
      _payments[index].month = value;
    }
    const localPayments = updateValueLastItem(_payments);
    setPayments(localPayments);
    if (edit) {
      setValue('payment_new', _payments);
    } else {
      setValue('payment', _payments);
    }
  };
  const updateValueLastItem = paymentsInput => {
    const _payments = paymentsInput;
    // calculate last item amount
    let totalAmount = 0;
    for (let i = 0; i < _payments.length - 1; i += 1) {
      const element = _payments[i];
      totalAmount += Number(element.amount);
    }
    const totalPayment = getValues('total_payment');
    const lastItemAmount =
      totalPayment - totalAmount <= 0 ? 0 : totalPayment - totalAmount;
    _payments[_payments.length - 1].amount = lastItemAmount;
    _payments[_payments.length - 1].formatAmount = formatMoney(lastItemAmount);
    // calculate last item hour
    const totalHour = getValues('last_duration');
    let subTotalHour = 0;
    for (let i = 0; i < _payments.length - 1; i += 1) {
      const element = _payments[i];
      subTotalHour += Number(element.hours);
    }
    _payments[_payments.length - 1].hours =
      totalHour - subTotalHour <= 0 ? 0 : totalHour - subTotalHour;
    return _payments;
  };
  const onBlurPaymentAmount = (index, event) => {
    const _payments = [...payments];
    _payments[index].formatAmount = formatMoney(Number(event.target.value));
    setPayments(_payments);
  };
  const onFocuPaymentAmount = (index, event) => {
    const _payments = [...payments];
    _payments[index].formatAmount = null;
    setPayments(_payments);
  };
  return (
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
                      onSelect={selected => {
                        onChange(selected.value);
                        handleChangeFee(selected.value);
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
                hanldeAddPayments(selected.value);
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
      <FlexGroup>
        <FlexItem>
          <Text>
            <p style={{ fontSize: '14px' }}>
              <u>Lưu ý: </u>
              <span>Số giờ học mở mỗi lần ít nhất phải bằng</span>
              <strong> 12 </strong>
              <span>để bộ phận ACS hỗ trợ quản lý khóa học.</span>
            </p>
          </Text>
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
                  placeholder="0"
                  value={
                    payment?.formatAmount
                      ? payment.formatAmount
                      : payment.amount
                  }
                  disabled={view || index === payments?.length - 1}
                  onChange={event =>
                    handleOnChangePayment(index, event, PAYMENT_AMOUNT)
                  }
                  onBlur={event => onBlurPaymentAmount(index, event)}
                  onFocus={event => onFocuPaymentAmount(index, event)}
                />
              </FlexItem>
              <FlexItem grow={false}>
                <FormRow
                  isInvalid={
                    payment?.hours < 12 &&
                    payment !== payments[payments.length - 1]
                  }
                  error={['Số giờ >= 12']}
                >
                  <FieldText
                    style={{
                      border:
                        payment?.hours < 12 &&
                        payment !== payments[payments.length - 1]
                          ? '2px solid #BD271E'
                          : '1px solid #CDCFD1',
                    }}
                    className="rounded-lg w-28"
                    fullWidth
                    placeholder="0"
                    value={payment?.hours}
                    disabled={view || index === payments?.length - 1}
                    onChange={event =>
                      handleOnChangePayment(index, event, PAYMENT_HOUR)
                    }
                  />
                </FormRow>
              </FlexItem>
              <FlexItem grow={false}>
                <FieldNumber
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg w-28"
                  fullWidth
                  placeholder="0"
                  value={payment?.month}
                  // eslint-disable-next-line no-undef
                  onChange={event =>
                    handleOnChangePayment(index, event, PAYMENT_MONTH)
                  }
                  disabled={view || index === 0}
                />
              </FlexItem>
            </FlexGroup>
          ))}
        </>
      )}
    </>
  );
};

ManualPayManyTimes.defaultProps = {
  control: undefined,
  contract: undefined,
  view: false,
  edit: false,
  getValues: () => {},
  setValue: () => {},
};

ManualPayManyTimes.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  view: PropTypes.bool,
  edit: PropTypes.bool,
  control: PropTypes.any,
  getValues: PropTypes.func,
  setValue: PropTypes.func,
  contract: PropTypes.object,
};

export default ManualPayManyTimes;
