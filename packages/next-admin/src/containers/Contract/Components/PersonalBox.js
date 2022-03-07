/* eslint-disable react/self-closing-comp */
/* eslint-disable no-underscore-dangle */
import {
  DatePicker,
  FieldText,
  FlexGrid,
  FlexGroup,
  FlexItem,
  FormRow,
  Switch,
  Title,
} from '@antoree/ant-ui';
import { CustomComboBox } from 'components';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import {
  getCustomerDistrict,
  getCustomerWard,
  GET_CUSTOMER_DISTRICT,
  GET_CUSTOMER_WARD,
} from 'services/homeTown';
import SelectCityField from './SelectCityField';

// eslint-disable-next-line react/prop-types
function PersonalBox({ control, errors, getValues, setValue, view, edit }) {
  const [loadDistrict, setLoadDistrict] = useState(false);
  const [loadWard, setLoadWard] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedWard, setSelectedWard] = useState([]);
  const [userServicechecked, setUserServicechecked] = useState(false);

  const handleSyncData = e => {
    setUserServicechecked(e.target.checked);
    if (e.target.checked) {
      setValue('full_name_serviece_user', getValues('full_name_contract'));
      setValue('id_no_serviece_user', getValues('id_no'));
      setValue('issued_date_serviece_user', getValues('issued_date'));
      setValue('issued_by_serviece_user', getValues('issued_by'));
      setValue('full_name_serviece_user', getValues('full_name_contract'));
    } else {
      setValue('full_name_serviece_user', '');
      setValue('id_no_serviece_user', '');
      setValue('issued_date_serviece_user', '');
      setValue('issued_by_serviece_user', '');
      setValue('full_name_serviece_user', '');
    }
  };
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
  }, [getValues('city')]);
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
  }, [getValues('district')]);
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
          <Title size="xxxs">
            <h2>
              <FormattedMessage defaultMessage="Thông tin người đại diện" />
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
              isInvalid={!!errors?.full_name_contract}
              error={errors?.full_name_contract?.message}
              label={<FormattedMessage defaultMessage="Họ và tên " />}
              required
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
                  error={errors?.full_name_contract?.message}
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
              labelFontWeight={400}
              fullWidth
              isInvalid={!!errors?.phone}
              error={errors?.phone?.message}
              label={<FormattedMessage defaultMessage="Số điện thoại" />}
              required
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
                  isInvalid={!!errors?.phone}
                  disabled={view}
                  onChange={onChange}
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
                  value={value}
                  onChange={onChange}
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
                  value={value}
                  onChange={onChange}
                  fullWidth
                  disabled={view}
                />
              )}
              name="id_no"
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
          <Controller name="issued_date" control={control} />
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
              name="issued_date"
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
              name="issued_by"
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
              // isInvalid={!!errors?.city}
              // error={errors?.city?.message}
            >
              <span></span>
            </FormRow>
          </FlexItem>
          <FlexItem grow={8}>
            <Controller name="city_serviceuser" control={control} />
            <Controller
              render={({ onChange, value }) => (
                <SelectCityField
                  valueOfSelected={value}
                  onSelect={selected => {
                    onChange(selected.value);
                    setLoadDistrict(true);
                    setValue('city_serviceuser', selected.value);
                  }}
                  isInvalid={!!errors?.city}
                  view={view}
                  edit={edit}
                />
              )}
              name="city"
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
              // isInvalid={!!errors?.district}
              // error={errors?.district?.message}
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
              isInvalid={!!errors?.district}
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
              // isInvalid={!!errors?.ward}
              // error={errors?.ward?.message}
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
              isInvalid={!!errors?.ward}
              data={_data?.customerWards}
              isLoading={_isLoading}
              selectedOptions={selectedWard}
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
            <Controller name="address_serviece_user" control={control} />
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  value={value}
                  onChange={event => {
                    onChange(event.target.value);
                    setValue('address_serviece_user');
                  }}
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
          <FlexItem>
            <Title size="xxxs">
              <h2>
                <FormattedMessage defaultMessage="Thông tin người dùng dịch vụ" />
              </h2>
            </Title>
          </FlexItem>
          <FlexItem>
            <Switch
              label="Giống người đại diện"
              checked={userServicechecked}
              onChange={e => handleSyncData(e)}
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
              isInvalid={!!errors?.full_name_contract}
              error={errors?.full_name_contract?.message}
              label={<FormattedMessage defaultMessage="Họ và tên" />}
              required
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
                  dateFormat="YYYY/MM/DD"
                  popoverPlacement="bottom-end"
                  placeholder="Chọn ngày"
                  selected={value ? moment(value) : null}
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

      {Array.from(Array(5).keys()).map(index => (
        <FlexItem key={index} className="invisible">
          <FlexGroup>
            <FlexItem grow={2}>
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="invisible" />}
              >
                <span></span>
              </FormRow>
            </FlexItem>
            <FlexItem grow={8}></FlexItem>
          </FlexGroup>
        </FlexItem>
      ))}
    </FlexGrid>
  );
}

PersonalBox.defaultProps = {
  control: undefined,
  errors: undefined,
  view: undefined,
  edit: undefined,
  getValues: () => {},
  setValue: () => {},
};

PersonalBox.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  control: PropTypes.object,
  errors: PropTypes.object,
  getValues: PropTypes.func,
  setValue: PropTypes.func,
  view: PropTypes.bool,
  edit: PropTypes.bool,
};

export default PersonalBox;
