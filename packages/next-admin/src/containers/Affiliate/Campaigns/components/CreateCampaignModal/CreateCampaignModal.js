import {
  Button,
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  Title,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
// eslint-disable-next-line import/no-cycle
import CreateCampaignForm from './CreateCampaignForm';

const CREATE_CAMPAIGN_FORM = 'create-campaign-form';
function CreateCampaignModal({
  isVisible,
  onCloseModal,
  createCampaignMutation,
}) {
  const intl = useIntl();

  return isVisible ? (
    <Modal maxWidth={false} style={{ width: '603px' }} onClose={onCloseModal}>
      <ModalHeader>
        <FlexGroup>
          <FlexItem>
            <Title className="text-left" size="xs">
              <p>Create new campaign</p>
            </Title>
          </FlexItem>
        </FlexGroup>
      </ModalHeader>

      <ModalBody>
        <CreateCampaignForm createCampaignMutation={createCampaignMutation} />
      </ModalBody>

      <ModalFooter>
        <ButtonEmpty onClick={onCloseModal}>
          <Text size="s" color="primary">
            <FormattedMessage defaultMessage="Close" />
          </Text>
        </ButtonEmpty>
        <Button
          fill
          type="submit"
          form="create-campaign-form"
          isLoading={createCampaignMutation.isLoading}
        >
          <FormattedMessage defaultMessage="Finish" />
        </Button>
      </ModalFooter>
    </Modal>
  ) : null;
}

CreateCampaignModal.defaultProps = {
  onCloseModal: () => {},
  isVisible: false,
  createCampaignMutation: undefined,
};

CreateCampaignModal.propTypes = {
  onCloseModal: PropTypes.func,
  isVisible: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  createCampaignMutation: PropTypes.any,
};
export { CREATE_CAMPAIGN_FORM };

export default CreateCampaignModal;
