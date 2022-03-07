import {
  Button,
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  Title,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useEffect } from 'react';
import CustomFieldText from '../CustomFieldText';

function CampaignInfoModal({
  onCloseModal,
  campaign,
  onUpdateCampaignStatus,
  isCardComponent,
}) {
  const { control, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      sourceLink: '',
      utmCampaign: '',
      utmSource: '',
      utmMedium: '',
    },
  });
  useEffect(() => {
    reset({
      ...campaign,
    });
  }, [campaign]);
  return (
    <Modal maxWidth={false} style={{ width: '603px' }} onClose={onCloseModal}>
      <ModalHeader>
        <FlexGroup>
          <FlexItem>
            <Title className="text-left" size="m">
              <p>Campaign info</p>
            </Title>
          </FlexItem>
        </FlexGroup>
      </ModalHeader>
      <ModalBody>
        <Form>
          <CustomFieldText
            label="Source Link"
            fieldName="sourceLink"
            control={control}
            isDisabled
          />
          <CustomFieldText
            label="UTM Campaign"
            fieldName="utmCampaign"
            control={control}
            isDisabled
          />
          <CustomFieldText
            label="UTM Source"
            fieldName="utmSource"
            control={control}
            isDisabled
          />
          <CustomFieldText
            label="UTM Medium"
            fieldName="utmMedium"
            control={control}
            isDisabled
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        {isCardComponent && (
          <ButtonEmpty
            onClick={onUpdateCampaignStatus}
            iconType="trash"
            color="danger"
          >
            <Text size="s">
              <FormattedMessage defaultMessage="Archive campaign" />
            </Text>
          </ButtonEmpty>
        )}
        <Button
          onClick={onCloseModal}
          style={{ backgroundColor: '#343741', border: 'none' }}
        >
          <Text size="s" color="white">
            <FormattedMessage defaultMessage="Close" />
          </Text>
        </Button>
      </ModalFooter>
    </Modal>
  );
}

CampaignInfoModal.defaultProps = {
  onCloseModal: () => {},
  isCardComponent: false,
  campaign: {},
  onUpdateCampaignStatus: () => {},
};

CampaignInfoModal.propTypes = {
  onCloseModal: PropTypes.func,
  isCardComponent: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  campaign: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  onUpdateCampaignStatus: PropTypes.func,
};

export default CampaignInfoModal;
