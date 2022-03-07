import {
  FieldText,
  FlexGroup,
  FlexItem,
  FormRow,
  Spacer,
  TextArea,
  Title,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

function OtherInformationBox({ control, errors, view }) {
  return (
    <>
      <Spacer />
      <Title size="s">
        <h2>
          <FormattedMessage defaultMessage="3. Thông tin khác" />
        </h2>
      </Title>
      <Spacer />
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={
              <FormattedMessage defaultMessage="Thông tin người giám hộ" />
            }
            required
            isInvalid={!!errors?.data?.guardian}
            error={errors?.data?.guardian?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  isInvalid={!!errors?.data?.full_name_contract}
                  disabled={view}
                />
              )}
              name="data.guardian"
              control={control}
            />
          </FormRow>
        </FlexItem>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Skype ID của sale" />}
            required
            isInvalid={!!errors?.data?.sale_skype}
            error={errors?.data?.sale_skype?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  isInvalid={!!errors?.data?.sale_skype}
                  disabled={view}
                />
              )}
              name="data.sale_skype"
              control={control}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={
              <FormattedMessage defaultMessage="Ghi chú (Thời gian đóng, số tiền đóng theo từng đợt, Số giờ mở theo từng đợt...)" />
            }
            required
            isInvalid={!!errors?.data?.paid_note}
            error={errors?.data?.paid_note?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <TextArea
                  className="rounded-lg border border-gray-300 border-solid"
                  placeholder="Chi tiết"
                  value={value || ''}
                  onChange={onChange}
                  fullWidth
                  compressed
                  disabled={view}
                />
              )}
              name="data.paid_note"
              control={control}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
    </>
  );
}

OtherInformationBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.any.isRequired,
  view: PropTypes.bool.isRequired,
};

export default OtherInformationBox;
