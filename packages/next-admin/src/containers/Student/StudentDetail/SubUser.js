/* eslint-disable react/prop-types */
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

const SubUser = ({ subUserData, id }) => {
  const intl = useIntl();
  return (
    <>
      <FlexGroup alignItems="center">
        <FlexItem>
          <Title>
            <h2>
              <FormattedMessage defaultMessage="Sub User" />
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
            label={intl.formatMessage({ defaultMessage: 'Learning Request' })}
            fullWidth
          >
            <FieldText
              value={subUserData?.id}
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
              value={subUserData?.firstName}
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
              value={subUserData?.lastName}
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
              value={subUserData?.phone}
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
              value={subUserData?.email}
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

SubUser.defaultProps = {
  id: undefined,
  salemanData: undefined,
};

SubUser.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salemanData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
  }),
};

export default SubUser;
