/* eslint-disable react/self-closing-comp */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  DatePicker,
  FieldNumber,
  FieldText,
  FlexGrid,
  FlexGroup,
  FlexItem,
  FormRow,
  HorizontalRule,
  htmlIdGenerator,
  Radio,
  Spacer,
  TextArea,
  Title,
} from '@antoree/ant-ui';
import { SelectCustomField } from 'components';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { formatMoney } from 'utils';
import {
  CONTACT_TYPE_COMPANY,
  CONTACT_TYPE_PERSONAL,
  DEPARTMENT_WORK,
  LIST_CONSULTING_BRANCHES,
  LIST_CONTRACT_PAYMENT_TYPES,
  LIST_PAID,
  LIST_SESSIONS,
  MANY_TIME_PAYMENT_AUTO,
  MANY_TIME_PAYMENT_MANUAL,
  TEACHER_GROUPS,
  ONE_TIME_PAYMENT,
} from '../constant';
import {
  AutoPayManyTimes,
  CompanyBox,
  ManualPayManyTimes,
  PersonalBox,
  SelectLearningRequest,
  SelectPriceField,
} from './index';

function ContractBox({
  control,
  errors,
  setValue,
  getValues,
  topicPrice,
  view,
  edit,
  contract,
}) {
  const [enablePersonal, setEnablePerson] = useState(true);
  const [enableCompany, setEnableCompany] = useState(false);
  const [contractPaymentTypes, setContractPaymentTypes] = useState([
    ...LIST_CONTRACT_PAYMENT_TYPES,
  ]);
  const [coursePrice, setCoursePrice] = useState(null);
  const [isDisabledPrice, setDisabledPrice] = useState(false);
  const [isChangedMethodPayment, setChangeMethodPayment] = useState(false);
  const [premiumType, setPremiumType] = useState(0);
  const [isOnChangedPrice, setOnChangedPrice] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);
  useEffect(() => {
    if (!isChangedMethodPayment) {
      if (getValues('contract_type_id') === CONTACT_TYPE_PERSONAL) {
        setEnablePerson(true);
        setEnableCompany(false);
      } else {
        setEnablePerson(false);
        setEnableCompany(true);
      }
    }
  }, [getValues('contract_type_id')]);
  useEffect(() => {
    const index = contractPaymentTypes.findIndex(
      type => type.value === getValues('numberPayment_id'),
    );
    const localPaymentTypes = [...contractPaymentTypes];
    for (let i = 0; i < localPaymentTypes.length; i += 1) {
      const element = localPaymentTypes[i];
      element.checked = false;
    }
    localPaymentTypes[index].checked = true;
    setContractPaymentTypes(localPaymentTypes);
  }, [getValues('numberPayment_id')]);
  useEffect(() => {
    if ((view || edit) && !isOnChangedPrice) {
      setCoursePrice({
        formatRootPrice: formatMoney(topicPrice?.price),
        formatLastPrice: formatMoney(
          topicPrice?.special_price - getValues('discount'),
        ),
        specialPrice: topicPrice?.special_price,
        formatSpecialPrice: formatMoney(topicPrice?.special_price),
        lastDuration: getValues('last_duration'),
        rootDuration: getValues('duration'),
        id: getValues('price_id'),
        tagId: topicPrice?.tagId,
        teacherGroupId: topicPrice?.teacherGroupId,
      });
      if (getValues('price_id')) {
        setDisabledPrice(true);
      }
    }
  }, [getValues('price'), getValues('price_id'), getValues('fee')]);
  const handleChangePersonal = event => {
    setChangeMethodPayment(true);
    setEnablePerson(event.target.checked);
    setEnableCompany(!event.target.checked);
    setValue('contract_type_id', CONTACT_TYPE_PERSONAL);
  };
  const handleChangeCompany = event => {
    setEnableCompany(event.target.checked);
    setEnablePerson(!event.target.checked);
    setValue('contract_type_id', CONTACT_TYPE_COMPANY);
  };
  const hanldeFillData = value => {
    // get special price do root price
    const lastPrice = value?.specialPrice;
    setCoursePrice({
      id: value.id,
      formatRootPrice: formatMoney(value?.price),
      formatLastPrice: formatMoney(lastPrice),
      formatSpecialPrice: formatMoney(lastPrice),
      specialPrice: lastPrice,
      tagId: value?.tagId,
      teacherGroupId: value?.teacherGroupId,
      lastDuration: value?.duration,
      rootDuration: value?.duration,
    });
    setValue('duration', value?.duration);
    setValue('price', lastPrice);
    setValue('last_duration', value?.duration);
  };

  const onChangeDiscount = e => {
    const lastPrice =
      Number(coursePrice?.specialPrice) - Number(e.target.value);
    setCoursePrice(prevCoursePrice => {
      const localCoursePrice = { ...prevCoursePrice };
      localCoursePrice.formatLastPrice = formatMoney(lastPrice);
      return localCoursePrice;
    });
    setValue('discount', e.target.value);
    setValue('price', lastPrice);
  };
  const onChangeDuration = e => {
    const lastDuration =
      Number(e.target.value) + Number(coursePrice?.rootDuration);
    setCoursePrice(prevCoursePrice => {
      const localCoursePrice = { ...prevCoursePrice };
      localCoursePrice.lastDuration = lastDuration;
      return localCoursePrice;
    });
    setValue('add_duration', e.target.value);
    setValue('last_duration', lastDuration);
  };
  const handleChangePaymentType = value => {
    const localPaymentTypes = [...contractPaymentTypes];
    const index = localPaymentTypes.findIndex(
      paymentType => paymentType.value === value,
    );
    for (let i = 0; i < localPaymentTypes.length; i += 1) {
      const element = localPaymentTypes[i];
      element.checked = false;
    }
    localPaymentTypes[index].checked = true;
    setValue('numberPayment_id', localPaymentTypes[index].value);
    setContractPaymentTypes(localPaymentTypes);
  };
  return (
    <>
      <div id="/section-customer-info">
        <Title size="s">
          <h2>
            <FormattedMessage defaultMessage="1. Thông tin khách hàng" />
          </h2>
        </Title>
        <Spacer size="xl" />
        <FlexGroup>
          <FlexItem>
            <Title size="xxs">
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="Loại hợp đồng" />}
                required
              >
                <span></span>
              </FormRow>
            </Title>
          </FlexItem>
        </FlexGroup>
        <Controller name="contract_type_id" control={control} />
        <FlexGroup className="w-1/2">
          <FlexItem>
            <Radio
              id={htmlIdGenerator()()}
              label="Cá nhân"
              checked={enablePersonal}
              onChange={e => handleChangePersonal(e)}
              disabled={view}
            />
          </FlexItem>
          <FlexItem>
            <Radio
              id={htmlIdGenerator()()}
              label="Công ty"
              checked={enableCompany}
              onChange={e => handleChangeCompany(e)}
              disabled={view}
            />
          </FlexItem>
        </FlexGroup>
        <FlexGroup className="w-1/2">
          <FlexItem className="mr-0">
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="LR ID" />}
              required
              isInvalid={!!errors?.request_id}
              error={errors?.request_id?.message}
            >
              <Controller
                render={({ onChange, value }) => (
                  <SelectLearningRequest
                    isInvalid={!!errors?.request_id}
                    valueOfSelected={value}
                    onSelect={selected => {
                      onChange(selected?.value);
                    }}
                    view={view}
                    edit={edit}
                  />
                )}
                name="request_id"
                control={control}
              />
            </FormRow>
          </FlexItem>
        </FlexGroup>
        {enablePersonal ? (
          <>
            <PersonalBox
              control={control}
              errors={errors}
              getValues={getValues}
              setValue={setValue}
              view={view}
              edit={edit}
            />
            <Spacer size="xl" />
          </>
        ) : (
          <CompanyBox
            style={{ display: enablePersonal ? 'block' : 'none' }}
            control={control}
            errors={errors}
            getValues={getValues}
            setValue={setValue}
            view={view}
            edit={edit}
          />
        )}
      </div>
      <div id="/section-registration-course">
        <Title size="s">
          <h2>
            <FormattedMessage defaultMessage="2. Khóa học đăng ký" />
          </h2>
        </Title>
        <Spacer size="xl" />
        <FlexGroup>
          <FlexItem grow={6}>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Chương trình học" />}
              required
              isInvalid={!!errors?.price_id}
              error={errors?.price_id?.message}
            >
              <Controller
                render={({ onChange, value }) => (
                  <SelectPriceField
                    isInvalid={!!errors?.price_id}
                    valueOfSelected={value}
                    onSelect={selected => {
                      onChange(selected?.value);
                      hanldeFillData(selected);
                      setDisabledPrice(true);
                      setOnChangedPrice(true);
                      handleChangePaymentType(ONE_TIME_PAYMENT);
                    }}
                    view={view}
                    edit={edit}
                  />
                )}
                name="price_id"
                control={control}
              />
            </FormRow>
          </FlexItem>
          <FlexItem grow={3}>
            <FormRow
              fullWidth
              label={
                <FormattedMessage defaultMessage="Loại premium (Hãy chọn một type nếu có)" />
              }
            >
              <SelectCustomField
                style={{ border: '1px solid #CDCFD1' }}
                isInvalid={!!errors?.level}
                valueOfSelected={premiumType}
                onSelect={selected => {
                  setPremiumType(selected?.value);
                }}
                placeholder="Chọn loại"
                options={[
                  {
                    value: 3,
                    label: 'Premium',
                  },
                  {
                    value: 4,
                    label: 'Premium 5$',
                  },
                ]}
                borderRadius={8}
                disabled={view}
              />
            </FormRow>
          </FlexItem>
        </FlexGroup>
        <Spacer />
        <FlexGrid columns={3}>
          <FlexItem>
            <FlexItem>
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="Giá gốc" />}
              >
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  value={coursePrice?.formatRootPrice || ''}
                  fullWidth
                  disabled
                />
              </FormRow>
            </FlexItem>
          </FlexItem>
          <FlexItem>
            <FlexItem>
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="Giá khuyến mãi" />}
              >
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  value={coursePrice?.formatSpecialPrice || ''}
                  fullWidth
                  disabled
                />
              </FormRow>
            </FlexItem>
          </FlexItem>
          <FlexItem>
            <Controller name="duration" control={control} />
            <FlexItem>
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="Tổng giờ học" />}
              >
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  value={coursePrice?.rootDuration || ''}
                  fullWidth
                  // onChange={onChange}
                  disabled
                />
              </FormRow>
            </FlexItem>
          </FlexItem>
        </FlexGrid>
        <FlexGroup>
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Giảm giá (VND)" />}
            >
              <Controller
                render={({ onChange, value }) => (
                  <FieldNumber
                    style={{ border: '1px solid #CDCFD1' }}
                    className="rounded-lg"
                    fullWidth
                    value={value}
                    onChange={e => {
                      onChangeDiscount(e);
                      onChange(e);
                    }}
                    disabled={!isDisabledPrice || view}
                    placeholder="0"
                  />
                )}
                name="discount"
                control={control}
              />
            </FormRow>
          </FlexItem>
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Giờ học cộng thêm" />}
            >
              <Controller
                render={({ onChange, value }) => (
                  <FieldNumber
                    style={{ border: '1px solid #CDCFD1' }}
                    className="rounded-lg"
                    fullWidth
                    value={value}
                    onChange={e => {
                      onChangeDuration(e);
                      onChange(e);
                    }}
                    disabled={!isDisabledPrice || view}
                    placeholder="0"
                  />
                )}
                name="add_duration"
                control={control}
              />
            </FormRow>
          </FlexItem>
        </FlexGroup>
        <Spacer />
        <HorizontalRule margin="s" />
        <FlexGroup>
          <Controller name="price" control={control} />
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Giá cuối cùng" />}
            >
              <FieldText
                style={{ border: '1px solid #CDCFD1' }}
                className="rounded-lg"
                value={coursePrice?.formatLastPrice || ''}
                fullWidth
                disabled
              />
            </FormRow>
          </FlexItem>
          <Controller name="last_duration" control={control} />
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Tổng giờ học thực tế" />}
            >
              <FieldNumber
                style={{ border: '1px solid #CDCFD1' }}
                className="rounded-lg"
                fullWidth
                value={coursePrice?.lastDuration || ''}
                disabled
              />
            </FormRow>
          </FlexItem>
        </FlexGroup>
        <FlexGroup>
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Ngày thanh toán" />}
              required
              isInvalid={!!errors?.payment_date}
              error={errors?.payment_date?.message}
            >
              <Controller
                render={({ onChange, value }) => (
                  <DatePicker
                    className="rounded-lg border border-gray-300 border-solid"
                    fullWidth
                    dateFormat="YYYY/MM/DD"
                    popoverPlacement="bottom-end"
                    placeholder="Chọn ngày"
                    selected={value ? moment(value) : null}
                    onChange={onChange}
                    disabled={view}
                  />
                )}
                name="payment_date"
                control={control}
                isInvalid={!!errors?.payment_date}
              />
            </FormRow>
          </FlexItem>
          <FlexItem>
            <FormRow
              fullWidth
              label={
                <FormattedMessage defaultMessage="Số buổi học trong tuần" />
              }
              required
              isInvalid={!!errors?.sessions}
              error={errors?.sessions?.message}
            >
              <Controller
                render={({ onChange, value }) => (
                  <SelectCustomField
                    style={{ border: '1px solid #CDCFD1' }}
                    valueOfSelected={value ? Number(value) : null}
                    onSelect={selected => {
                      onChange(selected?.value);
                    }}
                    placeholder="Chọn số buổi học trong tuần"
                    options={LIST_SESSIONS}
                    borderRadius={8}
                    isInvalid={!!errors?.sessions}
                    disabled={view}
                  />
                )}
                name="sessions"
                control={control}
              />
            </FormRow>
          </FlexItem>
        </FlexGroup>
        <FlexGroup>
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Chi tiết(Tiếng việt)" />}
            >
              <Controller
                render={({ onChange, value }) => (
                  <TextArea
                    className="rounded-lg border border-gray-300 border-solid"
                    // placeholder="Placeholder text"
                    value={value || ''}
                    onChange={onChange}
                    fullWidth
                    compressed
                    disabled={view}
                  />
                )}
                name="detail_vi"
                control={control}
              />
            </FormRow>
          </FlexItem>
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Chi tiết(Tiếng anh)" />}
            >
              <Controller
                render={({ onChange, value }) => (
                  <TextArea
                    className="rounded-lg border border-gray-300 border-solid"
                    // placeholder="Placeholder text"
                    value={value || ''}
                    onChange={onChange}
                    fullWidth
                    compressed
                    disabled={view}
                  />
                )}
                name="detail_en"
                control={control}
              />
            </FormRow>
          </FlexItem>
        </FlexGroup>
      </div>
      <Spacer size="xl" />
      <div id="/section-admin">
        <Title size="s">
          <h2>
            <FormattedMessage defaultMessage="3. Admin" />
          </h2>
        </Title>
        <Spacer size="xl" />
        <FlexGroup>
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Nhóm giáo viên" />}
              required
              isInvalid={!!errors?.type_teacher}
              error={errors?.type_teacher?.message}
            >
              <Controller
                render={({ onChange, value }) => (
                  <SelectCustomField
                    style={{ border: '1px solid #CDCFD1' }}
                    isInvalid={!!errors?.type_teacher}
                    valueOfSelected={value ? Number(value) : null}
                    onSelect={selected => {
                      onChange(selected.value);
                    }}
                    placeholder="Chọn nhóm giáo viên"
                    options={TEACHER_GROUPS}
                    borderRadius={8}
                    disabled={view}
                  />
                )}
                name="type_teacher"
                control={control}
              />
            </FormRow>
          </FlexItem>
          <FlexItem>
            <FormRow
              fullWidth
              label={
                <FormattedMessage defaultMessage="Trạng thái thanh toán" />
              }
              required
              isInvalid={!!errors?.paid}
              error={errors?.paid?.message}
            >
              <Controller
                render={({ onChange, value }) => (
                  <SelectCustomField
                    style={{ border: '1px solid #CDCFD1' }}
                    isInvalid={!!errors?.paid}
                    valueOfSelected={value ? Number(value) : null}
                    onSelect={selected => {
                      onChange(selected.value);
                    }}
                    placeholder="Chọn trạng thái"
                    options={LIST_PAID}
                    borderRadius={8}
                    disabled={view}
                  />
                )}
                name="paid"
                control={control}
              />
            </FormRow>
          </FlexItem>
        </FlexGroup>
        <FlexGroup>
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Ghi chú" />}
            >
              <Controller
                render={({ onChange, value }) => (
                  <TextArea
                    className="rounded-lg border border-gray-300 border-solid"
                    // placeholder="Placeholder text"
                    value={value || ''}
                    onChange={onChange}
                    fullWidth
                    compressed
                    disabled={view}
                  />
                )}
                name="info_paid"
                control={control}
              />
            </FormRow>
          </FlexItem>
        </FlexGroup>
      </div>
      <Spacer size="xl" />
      <div id="/section-payment-methods">
        <Title size="s">
          <h2>
            <FormattedMessage defaultMessage="4. Phương thức thanh toán" />
          </h2>
        </Title>
        <Spacer size="xl" />
        <FlexGroup>
          <FlexItem>
            <Title size="xxs">
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="Số lần thanh toán" />}
                required
              >
                <span></span>
              </FormRow>
            </Title>
          </FlexItem>
        </FlexGroup>
        <Controller name="numberPayment_id" control={control} />
        <FlexGroup className="w-2/3">
          {contractPaymentTypes.map(type => (
            <FlexItem key={type.id}>
              <Radio
                id={type.id}
                label={type.label}
                checked={type.checked}
                onChange={() => handleChangePaymentType(type.value)}
                disabled={!isDisabledPrice || view}
              />
            </FlexItem>
          ))}
        </FlexGroup>
        <Controller name="payment" control={control} />
        <Controller
          render={({ value }) => (
            <FieldText
              style={{ visibility: 'hidden' }}
              className=""
              value={value}
            />
          )}
          name="payment"
          control={control}
        />
        {edit && <Controller name="payment_new" control={control} />}
        {contractPaymentTypes
          .filter(type => type.checked && type.value === MANY_TIME_PAYMENT_AUTO)
          .map(() => (
            <AutoPayManyTimes
              control={control}
              view={view}
              edit={edit}
              setValue={setValue}
              getValues={getValues}
              premiumType={premiumType}
              coursePrice={coursePrice}
              enableManyTimePayment
              contract={contract}
            />
          ))}
        {contractPaymentTypes
          .filter(
            type => type.checked && type.value === MANY_TIME_PAYMENT_MANUAL,
          )
          .map(() => (
            <ManualPayManyTimes
              control={control}
              view={view}
              edit={edit}
              setValue={setValue}
              getValues={getValues}
              enableManyTimePayment
              contract={contract}
            />
          ))}
      </div>

      <Spacer />
      <div id="/section-other-info">
        <Title size="s">
          <h2>
            <FormattedMessage defaultMessage="5. Thông tin khác" />
          </h2>
        </Title>
        <Spacer size="xl" />
        <FlexGroup className="w-1/2">
          <FlexItem>
            <FormRow
              fullWidth
              label={
                <FormattedMessage defaultMessage="Ngày bắt đầu cung cấp dịch vụ" />
              }
              required
              isInvalid={!!errors?.time_start}
              error={errors?.time_start?.message}
            >
              <Controller
                render={({ onChange, value }) => (
                  <DatePicker
                    className="rounded-lg border border-gray-300 border-solid"
                    fullWidth
                    dateFormat="YYYY/MM/DD"
                    popoverPlacement="bottom-end"
                    placeholder="Chọn ngày"
                    selected={value ? moment(value) : null}
                    onChange={onChange}
                    isInvalid={!!errors?.time_start}
                    disabled={view}
                  />
                )}
                name="time_start"
                control={control}
              />
            </FormRow>
          </FlexItem>
        </FlexGroup>
        <Spacer />
        <FlexGroup>
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Bộ phận làm việc" />}
              required
              isInvalid={!!errors?.implementation_department}
              error={errors?.implementation_department?.message}
            >
              <Controller
                render={({ onChange, value }) => (
                  <SelectCustomField
                    style={{ border: '1px solid #CDCFD1' }}
                    isInvalid={!!errors?.implementation_department}
                    valueOfSelected={value}
                    onSelect={selected => {
                      onChange(selected.value);
                    }}
                    placeholder="Chọn bộ phận làm việc"
                    options={DEPARTMENT_WORK}
                    borderRadius={8}
                    disabled={view}
                  />
                )}
                name="implementation_department"
                control={control}
              />
            </FormRow>
          </FlexItem>
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Chi nhánh làm việc" />}
              required
              isInvalid={!!errors?.consulting_branch}
              error={errors?.consulting_branch?.message}
            >
              <Controller
                render={({ onChange, value }) => (
                  <SelectCustomField
                    style={{ border: '1px solid #CDCFD1' }}
                    isInvalid={!!errors?.consulting_branch}
                    valueOfSelected={value}
                    onSelect={selected => {
                      onChange(selected.value);
                    }}
                    placeholder="Chọn chi nhánh làm việc"
                    options={LIST_CONSULTING_BRANCHES}
                    borderRadius={8}
                    disabled={view}
                  />
                )}
                name="consulting_branch"
                control={control}
              />
            </FormRow>
          </FlexItem>
        </FlexGroup>
        <Spacer />
        <FlexGroup>
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Phụ lục tiếng Việt" />}
            >
              <Controller
                render={({ onChange, value }) => (
                  <TextArea
                    className="rounded-lg border border-gray-300 border-solid"
                    // placeholder="Placeholder text"
                    value={value || ''}
                    onChange={onChange}
                    fullWidth
                    compressed
                    disabled={view}
                  />
                )}
                name="appendix_vi"
                control={control}
              />
            </FormRow>
          </FlexItem>
          <FlexItem>
            <FormRow
              fullWidth
              label={<FormattedMessage defaultMessage="Phụ lục tiếng Anh" />}
            >
              <Controller
                render={({ onChange, value }) => (
                  <TextArea
                    className="rounded-lg border border-gray-300 border-solid"
                    // placeholder="Placeholder text"
                    value={value || ''}
                    onChange={onChange}
                    fullWidth
                    compressed
                    disabled={view}
                  />
                )}
                name="appendix_en"
                control={control}
              />
            </FormRow>
          </FlexItem>
        </FlexGroup>
        <Spacer size="xl" />
      </div>
    </>
  );
}
ContractBox.defaultProps = {
  control: undefined,
  errors: undefined,
  topicPrice: undefined,
  view: false,
  edit: false,
  contract: undefined,
  getValues: () => {},
  setValue: () => {},
};

ContractBox.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  control: PropTypes.object,
  errors: PropTypes.object,
  topicPrice: PropTypes.object,
  contract: PropTypes.object,
  getValues: PropTypes.func,
  setValue: PropTypes.func,
  view: PropTypes.bool,
  edit: PropTypes.bool,
};

export default ContractBox;
