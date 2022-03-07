import {
  FlexGroup,
  FlexItem,
  Title,
  HorizontalRule,
  FormRow,
  FieldText,
  Spacer,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import UpdateSalemanPopover from './UpdateSalemanPopover';

const UpdateSalemanModule = ({ salemanData, id }) => {
  const intl = useIntl();
  return (
    <>
      <FlexGroup alignItems="center">
        <FlexItem>
          <Title>
            <h2>
              <FormattedMessage defaultMessage="Sales Information" />
            </h2>
          </Title>
        </FlexItem>

        <FlexItem grow={false}>
          <UpdateSalemanPopover studentId={id} />
        </FlexItem>
      </FlexGroup>

      <HorizontalRule />

      <FlexGroup>
        <FlexItem>
          <FormRow
            label={intl.formatMessage({ defaultMessage: 'Sales ID' })}
            fullWidth
          >
            <FieldText
              value={salemanData?.id}
              readOnly
              placeholder={intl.formatMessage({ defaultMessage: "User's ID" })}
              fullWidth
            />
          </FormRow>
        </FlexItem>

        <FlexItem>
          <FormRow
            label={intl.formatMessage({ defaultMessage: 'First Name' })}
            fullWidth
          >
            <FieldText
              value={salemanData?.firstName}
              placeholder={intl.formatMessage({ defaultMessage: 'First name' })}
              readOnly
              fullWidth
            />
          </FormRow>
        </FlexItem>

        <FlexItem>
          <FormRow
            label={intl.formatMessage({ defaultMessage: 'Last Name' })}
            fullWidth
          >
            <FieldText
              value={salemanData?.lastName}
              placeholder={intl.formatMessage({ defaultMessage: 'Last Name' })}
              readOnly
              fullWidth
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
      <Spacer />
      <FlexGroup>
        <FlexItem>
          <FormRow
            label={intl.formatMessage({ defaultMessage: 'Phone Number' })}
            fullWidth
          >
            <FieldText
              value={salemanData?.phone}
              placeholder={intl.formatMessage({
                defaultMessage: 'Phone Number',
              })}
              readOnly
              fullWidth
            />
          </FormRow>
        </FlexItem>

        <FlexItem>
          <FormRow
            label={intl.formatMessage({ defaultMessage: 'Email Address' })}
            fullWidth
          >
            <FieldText
              value={salemanData?.email}
              placeholder={intl.formatMessage({
                defaultMessage: 'Email Address',
              })}
              readOnly
              fullWidth
            />
          </FormRow>
        </FlexItem>
        <FlexItem />
      </FlexGroup>
    </>
  );
};

UpdateSalemanModule.defaultProps = {
  id: undefined,
  salemanData: undefined,
};

UpdateSalemanModule.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salemanData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
  }),
};

export default UpdateSalemanModule;
