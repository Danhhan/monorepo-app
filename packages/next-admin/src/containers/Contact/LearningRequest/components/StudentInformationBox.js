import { FieldText, FlexGroup, FlexItem, Spacer, Title } from '@antoree/ant-ui';
import {
  FormControl,
  SelectCityField,
  SelectCustomField,
  SelectDistrictField,
  SelectWardField,
} from 'components';
import {
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_OTHER,
} from 'configs/app.constants';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

function StudentInformationBox({ control, errors, getValues, view }) {
  const [loadWard, setLoadWard] = useState(false);
  return (
    <>
      <Spacer />
      <Title size="s">
        <h2>
          <FormattedMessage defaultMessage="2. Thông tin học viên" />
        </h2>
      </Title>
      <Spacer />
      <FlexGroup columns={2} direction="row">
        <FlexItem>
          <FormControl
            label="Họ tên"
            required
            isInvalid={!!errors?.data?.student_name}
            error={errors?.data?.student_name?.message}
          >
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
                  isInvalid={!!errors?.data?.address}
                  disabled={view}
                />
              )}
              name="data.student_name"
              control={control}
            />
          </FormControl>
        </FlexItem>
        <FlexItem>
          <FormControl label="Thành phố">
            <Controller
              render={({ onChange, value }) => (
                <SelectCityField
                  valueOfSelected={Number(value) || undefined}
                  onSelect={selected => {
                    onChange(selected.value ? selected.value : null);
                  }}
                  view={view}
                />
              )}
              name="data.city"
              control={control}
            />
          </FormControl>
        </FlexItem>
      </FlexGroup>
      <FlexGroup columns={2} direction="row">
        <FlexItem>
          <FormControl
            label="Số điện thoại"
            required
            isInvalid={!!errors?.data?.phone}
            error={errors?.data?.phone?.message}
          >
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
                  isInvalid={!!errors?.data?.address}
                  disabled={view}
                />
              )}
              name="data.phone"
              control={control}
            />
          </FormControl>
        </FlexItem>
        <FlexItem>
          <FormControl label="Quận huyện">
            <Controller
              render={({ onChange, value }) => (
                <SelectDistrictField
                  cityId={getValues('data.city')}
                  valueOfSelected={Number(value) || undefined}
                  handleSelected={selectedOptions => {
                    onChange(selectedOptions[0]?.id);
                    setLoadWard(true);
                  }}
                  disabled={view}
                />
              )}
              name="data.district"
              control={control}
            />
          </FormControl>
        </FlexItem>
      </FlexGroup>
      <FlexGroup columns={2} direction="row">
        <FlexItem>
          <FormControl
            label="Email"
            required
            isInvalid={!!errors?.data?.email}
            error={errors?.data?.email?.message}
          >
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
                  isInvalid={!!errors?.data?.address}
                  disabled={view}
                />
              )}
              name="data.email"
              control={control}
            />
          </FormControl>
        </FlexItem>
        <FlexItem>
          <FormControl label="Phường">
            <Controller
              render={({ onChange, value }) => (
                <SelectWardField
                  loadWard={loadWard}
                  districtId={getValues('data.district')}
                  valueOfSelected={Number(value) || undefined}
                  handleSelected={selectedOptions => {
                    onChange(selectedOptions[0]?.id);
                  }}
                  disabled={view}
                />
              )}
              name="data.ward"
              control={control}
            />
          </FormControl>
        </FlexItem>
      </FlexGroup>
      <FlexGroup columns={2} direction="row">
        <FlexItem>
          <FormControl label="Skype">
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
                  isInvalid={!!errors?.data?.address}
                  disabled={view}
                />
              )}
              name="data.skype"
              control={control}
            />
          </FormControl>
        </FlexItem>
        <FlexItem>
          <FormControl label="Số nhà, đường">
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
                  isInvalid={!!errors?.data?.address}
                  disabled={view}
                />
              )}
              name="data.address"
              control={control}
            />
          </FormControl>
        </FlexItem>
      </FlexGroup>

      <FlexGroup>
        <FlexItem>
          <FormControl
            label="Giới tính"
            required
            isInvalid={!!errors?.data?.gender}
            error={errors?.data?.gender?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <SelectCustomField
                  style={{ border: '1px solid #CDCFD1' }}
                  valueOfSelected={Number(value) || undefined}
                  onSelect={selected => {
                    onChange(selected?.value);
                  }}
                  placeholder="Chọn"
                  options={[
                    {
                      value: GENDER_MALE,
                      label: 'Nam',
                    },
                    {
                      value: GENDER_FEMALE,
                      label: 'Nữ',
                    },
                    {
                      value: GENDER_OTHER,
                      label: 'Khác',
                    },
                  ]}
                  borderRadius={8}
                  isInvalid={!!errors?.data?.gender}
                  disabled={view}
                />
              )}
              name="data.gender"
              control={control}
            />
          </FormControl>
        </FlexItem>
        <FlexItem>
          <p>&#160;</p>
        </FlexItem>
      </FlexGroup>
    </>
  );
}

StudentInformationBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  getValues: PropTypes.any.isRequired,
  view: PropTypes.bool.isRequired,
};

export default StudentInformationBox;
