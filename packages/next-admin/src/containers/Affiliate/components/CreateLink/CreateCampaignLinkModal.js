import {
  Button,
  ButtonEmpty,
  FieldText,
  FlexGroup,
  FlexItem,
  FormRow,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  notification,
  Spacer,
  Text,
  Title,
  Icon,
  Copy,
} from '@antoree/ant-ui';
import { useCurrentUser, useToggle } from 'hooks';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import { createCampaignLink } from 'services/affiliate';
import SelectCampaignField from '../SelectCampaignField';

function CreateCampaignLinkModal({ isVisible, onCloseModal }) {
  const intl = useIntl();
  const { isVisiable: isVisibleCopyModal, toggle, close } = useToggle();
  const [campaign, setCampaign] = useState();
  const [campaignName, setCampaignName] = useState();
  const [shortLink, setShortLink] = useState();

  const [{ displayName, email }] = useCurrentUser();
  const createCampaignLinkMutate = useMutation(createCampaignLink, {
    onSuccess: data => {
      notification.success({
        title: 'Success',
        text: <FormattedMessage defaultMessage="Generate link success" />,
      });
      setCampaignName();
      setCampaign();
      onCloseModal();
      toggle();
      setShortLink(data?.campaignLink?.shortLink);
    },
    onError: err => {
      notification.error({
        title: 'Failure',
        text: <FormattedMessage defaultMessage="Generate link fail" />,
      });
    },
  });
  const handleSubmit = () => {
    if (!campaign) {
      notification.error({
        text: (
          <FormattedMessage defaultMessage="Opps! Please choose one campaign" />
        ),
      });
      return;
    }
    const params = {
      'source-link': campaign?.sourceLink,
      'campaign-id': campaign?.id,
      'campaign-name': campaignName,
    };
    createCampaignLinkMutate.mutate({ params });
  };

  return (
    <>
      {isVisibleCopyModal && (
        <Modal maxWidth={false} style={{ width: '472px' }} onClose={close}>
          <ModalHeader>
            <FlexGroup justifyContent="center">
              <FlexItem grow={false}>
                <Icon type="checkInCircleFilled" color="#14B24C" size="xxl" />
              </FlexItem>
            </FlexGroup>
          </ModalHeader>
          <ModalBody>
            <FlexGroup>
              <FlexItem grow={false}>
                <Title size="xs">
                  <p>Link share</p>
                </Title>
              </FlexItem>
            </FlexGroup>
            <FlexGroup>
              <FlexItem grow={8}>
                <FieldText
                  // style={{ border: '1px solid #CDCFD1' }}
                  // className="rounded-lg"
                  readOnly
                  value={shortLink}
                  fullWidth
                  onChange={event => setCampaignName(event.target.value)}
                />
              </FlexItem>
              <FlexItem grow={2}>
                <Copy textToCopy={shortLink}>
                  {copy => (
                    <Button
                      onClick={copy}
                      style={{
                        backgroundColor: '#183059',
                        borderColor: 'transparent',
                      }}
                    >
                      <Text size="s" color="white">
                        <FormattedMessage defaultMessage="Copy link" />
                      </Text>
                    </Button>
                  )}
                </Copy>
              </FlexItem>
            </FlexGroup>
          </ModalBody>
        </Modal>
      )}
      {isVisible && (
        <Modal
          maxWidth={false}
          style={{ width: '603px' }}
          onClose={onCloseModal}
        >
          <ModalHeader>
            <FlexGroup>
              <FlexItem>
                <Title className="text-left" size="m">
                  <p>Create campaign link</p>
                </Title>
              </FlexItem>
            </FlexGroup>
          </ModalHeader>

          <ModalBody>
            <FlexGroup>
              <FlexItem>
                <FormRow fullWidth label="Choose Campaign">
                  <SelectCampaignField
                    valueOfSelected={Number(campaign?.id) || undefined}
                    onSelect={selected => {
                      setCampaign(selected);
                    }}
                  />
                </FormRow>
              </FlexItem>
            </FlexGroup>
            <FlexGroup>
              <FlexItem>
                <FormRow fullWidth label="Your campaign name">
                  <FieldText
                    // style={{ border: '1px solid #CDCFD1' }}
                    // className="rounded-lg"
                    // value={campaignName}
                    fullWidth
                    onChange={event => setCampaignName(event.target.value)}
                  />
                </FormRow>
              </FlexItem>
            </FlexGroup>
            <Spacer size="s" />
            <FlexGroup gutterSize="s">
              <FlexItem grow={false}>
                <Title className="text-left" size="xs">
                  <p>Source link:</p>
                </Title>
              </FlexItem>
              <FlexItem grow={false}>
                <Text>{campaign?.sourceLink}</Text>
              </FlexItem>
            </FlexGroup>
            <Spacer size="s" />
            <FlexGroup gutterSize="m">
              <FlexItem grow={false}>
                <Title className="text-left" size="xs">
                  <p>UTM info:</p>
                </Title>
              </FlexItem>
            </FlexGroup>
            <Spacer size="s" />
            <FlexGroup>
              <FlexItem style={{ minWidth: 158 }} grow={false}>
                utm_campaign
              </FlexItem>
              <FlexItem>: {campaign?.utmCampaign}</FlexItem>
            </FlexGroup>
            <FlexGroup>
              <FlexItem style={{ minWidth: 158 }} grow={false}>
                utm_source
              </FlexItem>
              <FlexItem>: {campaign?.utmSource}</FlexItem>
            </FlexGroup>
            <FlexGroup>
              <FlexItem style={{ minWidth: 158 }} grow={false}>
                utm_medium
              </FlexItem>
              <FlexItem>: {campaign?.utmMedium}</FlexItem>
            </FlexGroup>
            <Spacer size="s" />
            <FlexGroup gutterSize="m">
              <FlexItem grow={false}>
                <Title className="text-left" size="xs">
                  <p>Creating by:</p>
                </Title>
              </FlexItem>
            </FlexGroup>
            <Spacer size="s" />
            <FlexGroup>
              <FlexItem style={{ minWidth: 158 }} grow={false}>
                Name
              </FlexItem>
              <FlexItem>: {displayName}</FlexItem>
            </FlexGroup>
            <FlexGroup>
              <FlexItem style={{ minWidth: 158 }} grow={false}>
                Email
              </FlexItem>
              <FlexItem>: {email}</FlexItem>
            </FlexGroup>
          </ModalBody>

          <ModalFooter>
            <ButtonEmpty onClick={onCloseModal}>
              <Text size="s" color="primary">
                <FormattedMessage defaultMessage="Close" />
              </Text>
            </ButtonEmpty>
            <Button
              onClick={handleSubmit}
              fill
              isLoading={createCampaignLinkMutate?.isLoading}
            >
              <Text size="s" color="white">
                <FormattedMessage defaultMessage="Finish" />
              </Text>
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}

CreateCampaignLinkModal.defaultProps = {
  onCloseModal: () => {},
  isVisible: false,
};

CreateCampaignLinkModal.propTypes = {
  onCloseModal: PropTypes.func,
  isVisible: PropTypes.bool,
};

export default CreateCampaignLinkModal;
