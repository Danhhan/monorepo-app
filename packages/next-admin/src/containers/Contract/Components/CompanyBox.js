/* eslint-disable react/self-closing-comp */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  DatePicker,
  FieldText,
  FlexGrid,
  FlexGroup,
  FlexItem,
  FormRow,
  Title,
} from '@antoree/ant-ui';
import { CustomComboBox } from 'components';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import moment from 'moment';
import {
  getCustomerDistrict,
  getCustomerWard,
  GET_CUSTOMER_DISTRICT,
  GET_CUSTOMER_WARD,
} from 'services/homeTown';
import SelectCityField from './SelectCityField';
// eslint-disable-next-line react/prop-types
function CompanyBox({ control, errors, setValue, getValues, view }) {
  const [loadDistrict, setLoadDistrict] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedWard, setSelectedWard] = useState([]);
  const [loadWard, setLoadWard] = useState(false);
  const { data, isLoading } = useQuery(
    [GET_CUSTOMER_DISTRICT(getValues('city'))],
    () => getCustomerDistrict(getValues('city')),
    {
      enabled: loadDistrict,
      refetchOnReconnect: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  );
  const { data: _data, isLoading: _isLoading } = useQuery(
    [GET_CUSTOMER_WARD(getValues('district'))],
    () => getCustomerWard(getValues('district')),
    {
      enabled: loadWard,
      refetchOnReconnect: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  );
  useEffect(() => {
    if (getValues('city')) {
      setLoadDistrict(true);
    }
  }, []);
  useEffect(() => {
    const _district = data?.customerDistricts?.find(
      customerDistrict => customerDistrict?.id === getValues('district'),
    );
    setSelectedDistrict(
      _district
        ? [
            {
              label: _district?.name,
              id: _district?.id,
              key: _district?.id,
            },
          ]
        : [],
    );
  }, [data]);
  // ward
  useEffect(() => {
    if (getValues('district')) {
      setLoadWard(true);
    }
  }, []);
  useEffect(() => {
    const _ward = _data?.customerWards?.find(
      customerWard => customerWard?.id === getValues('ward'),
    );
    setSelectedWard(
      _ward
        ? [
            {
              label: _ward?.name,
              id: _ward?.id,
              key: _ward?.id,
            },
          ]
        : [],
    );
  }, [_data]);
  return (
    <FlexGrid columns={2} direction="column">
      <FlexItem>
        <FlexItem>
          <Title size="xxs">
            <h2>
              <FormattedMessage defaultMessage="Thông tin công ty" />
            </h2>
          </Title>
        </FlexItem>
      </FlexItem>

      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              style={{ width: '108px' }}
              labelFontWeight={400}
              fullWidth
              label={<FormattedMessage defaultMessage="Tên công ty" />}
              required
              isInvalid={!!errors?.full_name_contract}
              error={errors?.full_name_contract?.message}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  isInvalid={!!errors?.full_name_contract}
                  disabled={view}
                />
              )}
              name="full_name_contract"
              control={control}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>

      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              style={{ width: '108px' }}
              labelFontWeight={400}
              fullWidth
              label={<FormattedMessage defaultMessage="Mã số thuế" />}
              required
              isInvalid={!!errors?.tax_code_company}
              error={errors?.tax_code_company?.message}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  isInvalid={!!errors?.tax_code_company}
                  disabled={view}
                />
              )}
              name="tax_code_company"
              control={control}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>

      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              style={{ width: '108px' }}
              labelFontWeight={400}
              fullWidth
              label={
                <p>
                  <FormattedMessage defaultMessage="Địa chỉ đăng ký" />
                </p>
              }
              required
              isInvalid={!!errors?.address}
              error={errors?.address?.message}
              disabled={view}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  onChange={event => {
                    onChange(event.target.value);
                  }}
                  value={value}
                  isInvalid={!!errors?.address}
                  disabled={view}
                />
              )}
              name="address"
              control={control}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>

      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              style={{ width: '108px' }}
              labelFontWeight={400}
              fullWidth
              label={<FormattedMessage defaultMessage="Số điện thoại" />}
              required
              isInvalid={!!errors?.phone}
              error={errors?.phone?.message}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  disabled={view}
                  onChange={onChange}
                  isInvalid={!!errors?.phone}
                  value={value}
                />
              )}
              name="phone"
              control={control}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>

      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              labelFontWeight={400}
              fullWidth
              style={{ width: '108px' }}
              label={<FormattedMessage defaultMessage="Email" />}
              required
              isInvalid={!!errors?.email}
              error={errors?.email?.message}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  isInvalid={!!errors?.email}
                  disabled={view}
                  onChange={onChange}
                  value={value}
                />
              )}
              name="email"
              control={control}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>

      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              labelFontWeight={400}
              fullWidth
              style={{ width: '108px' }}
              label={<FormattedMessage defaultMessage="Người đại diện" />}
              required
              isInvalid={!!errors?.representative}
              error={errors?.representative?.message}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  isInvalid={!!errors?.representative}
                  disabled={view}
                />
              )}
              name="representative"
              control={control}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>
      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              labelFontWeight={400}
              fullWidth
              style={{ width: '108px' }}
              label={<FormattedMessage defaultMessage="Chức vụ" />}
              required
              isInvalid={!!errors?.postion}
              error={errors?.postion?.message}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  isInvalid={!!errors?.postion}
                  disabled={view}
                />
              )}
              name="postion"
              control={control}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>
      {Array.from(Array(3).keys()).map(index => (
        <FlexItem key={index} className="invisible">
          <FlexGroup>
            <FlexItem grow={2}>
              <FormRow
                labelFontWeight={400}
                fullWidth
                label={<FormattedMessage defaultMessage="invisible" />}
              >
                <span></span>
              </FormRow>
            </FlexItem>
            <FlexItem grow={8}>
              <FieldText
                style={{ border: '1px solid #CDCFD1' }}
                className="rounded-lg"
                fullWidth
              />
            </FlexItem>
          </FlexGroup>
        </FlexItem>
      ))}
      {/* End column 1  */}
      <FlexItem>
        <FlexItem>
          <Title size="xxs">
            <h2>
              <FormattedMessage defaultMessage="Thông tin người dùng dịch vụ" />
            </h2>
          </Title>
        </FlexItem>
      </FlexItem>

      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              labelFontWeight={400}
              fullWidth
              label={<FormattedMessage defaultMessage="Họ và tên" />}
              required
              isInvalid={!!errors?.full_name_serviece_user}
              error={errors?.full_name_serviece_user?.message}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  isInvalid={!!errors?.full_name_serviece_user}
                  disabled={view}
                />
              )}
              name="full_name_serviece_user"
              control={control}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>

      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              labelFontWeight={400}
              fullWidth
              label={<FormattedMessage defaultMessage="Ngày sinh" />}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
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
              name="birth_day"
              control={control}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>

      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              labelFontWeight={400}
              fullWidth
              label={<FormattedMessage defaultMessage="CMND" />}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  disabled={view}
                />
              )}
              name="id_no_serviece_user"
              control={control}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>

      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              labelFontWeight={400}
              fullWidth
              label={<FormattedMessage defaultMessage="Ngày cấp" />}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller
              render={({ onChange, value }) => (
                <DatePicker
                  className="rounded-lg border border-gray-300 border-solid"
                  fullWidth
                  dateFormat="DD/MM/YYYY"
                  // minDate={moment()}
                  popoverPlacement="bottom-end"
                  placeholder="Chọn ngày"
                  // showTimeSelect
                  selected={value ? moment(value) : null}
                  onSelect={() => {}}
                  onChange={onChange}
                  disabled={view}
                />
              )}
              name="issued_date_serviece_user"
              control={control}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>

      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              labelFontWeight={400}
              fullWidth
              label={<FormattedMessage defaultMessage="Nơi cấp" />}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  disabled={view}
                />
              )}
              name="issued_by_serviece_user"
              control={control}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>

      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              labelFontWeight={400}
              fullWidth
              label={<FormattedMessage defaultMessage="Thành phố" />}
              // required
              // isInvalid={!!errors?.city_serviceuser}
              // error={errors?.city_serviceuser?.message}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller name="city" control={control} />
            <Controller
              render={({ onChange, value }) => (
                <SelectCityField
                  isInvalid={!!errors?.city_serviceuser}
                  valueOfSelected={value}
                  onSelect={selected => {
                    onChange(selected.value);
                    setLoadDistrict(true);
                    setValue('city', selected.value);
                  }}
                  view={view}
                />
              )}
              name="city_serviceuser"
              control={control}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>

      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              labelFontWeight={400}
              fullWidth
              label={<FormattedMessage defaultMessage="Quận huyện" />}
              // required
              // isInvalid={!!errors?.district_serviceuser}
              // error={errors?.district_serviceuser?.message}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller name="district" control={control} />
            <Controller name="district_serviceuser" control={control} />
            <CustomComboBox
              fullWidth
              className="rounded-lg border border-gray-300 border-solid"
              borderRadius={8}
              isInvalid={!!errors?.district_serviceuser}
              data={data?.customerDistricts}
              isLoading={isLoading}
              selectedOptions={selectedDistrict}
              handleSelected={selectedOptions => {
                setValue('district', selectedOptions?.[0]?.id);
                setValue('district_serviceuser', selectedOptions?.[0]?.id);
                setLoadWard(true);
                setSelectedDistrict(selectedOptions);
              }}
              disabled={view}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>

      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              labelFontWeight={400}
              fullWidth
              label={<FormattedMessage defaultMessage="Phường" />}
              // required
              // isInvalid={!!errors?.ward_serviceuser}
              // error={errors?.ward_serviceuser?.message}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller name="ward" control={control} />
            <Controller name="ward_serviceuser" control={control} />
            <CustomComboBox
              fullWidth
              className="rounded-lg border border-gray-300 border-solid"
              borderRadius={8}
              isInvalid={!!errors?.ward_serviceuser}
              data={_data?.customerWards}
              selectedOptions={selectedWard}
              isLoading={_isLoading}
              handleSelected={selectedOptions => {
                setValue('ward', selectedOptions?.[0]?.id);
                setValue('ward_serviceuser', selectedOptions?.[0]?.id);
                setSelectedWard(selectedOptions);
              }}
              disabled={view}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>
      <FlexItem>
        <FlexGroup>
          <FlexItem grow={2}>
            <FormRow
              labelFontWeight={400}
              fullWidth
              label={<FormattedMessage defaultMessage="Số nhà, đường" />}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            {/* <Controller name="address_serviece_user" control={control} /> */}
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  disabled={view}
                />
              )}
              name="address_serviece_user"
              control={control}
            />
          </FlexItem>
        </FlexGroup>
      </FlexItem>
    </FlexGrid>
  );
}

CompanyBox.defaultProps = {
  control: undefined,
  errors: undefined,
  view: false,
  getValues: () => {},
  setValue: () => {},
};

CompanyBox.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  control: PropTypes.object,
  errors: PropTypes.object,
  getValues: PropTypes.func,
  setValue: PropTypes.func,
  view: PropTypes.bool,
};

export default CompanyBox;
