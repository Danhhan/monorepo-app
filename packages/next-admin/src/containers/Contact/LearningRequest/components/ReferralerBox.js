import {
  FieldNumber,
  FieldText,
  FlexGroup,
  FlexItem,
  FormRow,
  Spacer,
  Title,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

function ReferralerBox({ control, errors, view }) {
  return (
    <>
      <Spacer />
      <Title size="s">
        <h2>
          <FormattedMessage defaultMessage="4. Người giới thiệu (nếu có)" />
        </h2>
      </Title>
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Số điện thoại " />}
            // required
            // isInvalid={!!errors?.data?.referral_phone}
            // error={errors?.data?.referral_phone?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <FieldNumber
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  // isInvalid={!!errors?.data?.referral_phone}
                  disabled={view}
                />
              )}
              name="data.referral_phone"
              control={control}
            />
          </FormRow>
        </FlexItem>
        <FlexItem>
          <p>&#160;</p>
        </FlexItem>
      </FlexGroup>
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Email" />}
            // required
            // isInvalid={!!errors?.data?.referral_email}
            // error={errors?.data?.referral_email?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <FieldText
                  style={{ border: '1px solid #CDCFD1' }}
                  className="rounded-lg"
                  fullWidth
                  onChange={onChange}
                  value={value}
                  // isInvalid={!!errors?.data?.referral_email}
                  disabled={view}
                />
              )}
              name="data.referral_email"
              control={control}
            />
          </FormRow>
        </FlexItem>
        <FlexItem>
          <p>&#160;</p>
        </FlexItem>
      </FlexGroup>
    </>
  );
}

ReferralerBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.any.isRequired,
  view: PropTypes.bool.isRequired,
};

export default ReferralerBox;
