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
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { useToggle } from 'hooks';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

// eslint-disable-next-line react/prop-types
const UtmFilterModal = ({ sourceValue, campaign, onSearch }) => {
  const intl = useIntl();
  const [utmSource, setUtmSource] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');

  const onSubmit = () => {
    if (utmSource !== '') {
      onSearch('source')(utmSource);
    }
    if (utmCampaign !== '') {
      onSearch('campaign')(utmCampaign);
    }
    close();
  };
  const reset = () => {
    setUtmSource('');
    setUtmCampaign('');
    onSearch('source')();
    onSearch('campaign')();
  };
  const { isVisiable, open, close } = useToggle();

  return (
    <>
      <FlexItem grow={false}>
        <Button
          className="rounded-lg"
          style={{ borderColor: '#80808038', color: 'black' }}
          iconType="filter"
          onClick={open}
          size="s"
        >
          Lọc dữ liệu
        </Button>
      </FlexItem>
      {isVisiable && (
        <Modal style={{ width: '464px' }} onClose={close}>
          <ModalBody>
            <Spacer />
            <Title className="text-left">
              <p>
                <FormattedMessage defaultMessage="Lọc dữ liệu" />
              </p>
            </Title>
            <Spacer />
            <Spacer />
            <FlexGroup>
              <FlexItem grow={3}>
                <FormRow fullWidth>
                  <Title size="xs">
                    <p>
                      <FormattedMessage defaultMessage="Nguồn dữ liệu" />
                    </p>
                  </Title>
                </FormRow>
              </FlexItem>
              <FlexItem grow={7}>
                <FormRow fullWidth>
                  <FieldText
                    placeholder="Tên nguồn"
                    value={utmSource}
                    onChange={event => setUtmSource(event.target.value)}
                  />
                </FormRow>
              </FlexItem>
            </FlexGroup>
            <FlexGroup>
              <FlexItem grow={3}>
                <FormRow fullWidth>
                  <Title size="xs">
                    <p>
                      <FormattedMessage defaultMessage="Tên campaign" />
                    </p>
                  </Title>
                </FormRow>
              </FlexItem>
              <FlexItem grow={7}>
                <FormRow fullWidth>
                  <FieldText
                    placeholder="Tên campaign"
                    value={utmCampaign}
                    onChange={event => setUtmCampaign(event.target.value)}
                  />
                </FormRow>
              </FlexItem>
            </FlexGroup>
            <Spacer />
          </ModalBody>
          <ModalFooter>
            <ButtonEmpty
              onClick={() => {
                close();
                reset();
              }}
            >
              <Text size="s" color="black">
                <FormattedMessage defaultMessage="Xóa bộ lọc" />
              </Text>
            </ButtonEmpty>
            <Button fill color="warning" onClick={onSubmit}>
              <Text size="s" color="black">
                <FormattedMessage defaultMessage="Áp dụng" />
              </Text>
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

UtmFilterModal.defaultProps = {
  onSearch: () => {},
  sourceValue: undefined,
  campaign: undefined,
};

UtmFilterModal.propTypes = {
  onSearch: PropTypes.func,
  sourceValue: PropTypes.string,
  campaign: PropTypes.string,
};

export default UtmFilterModal;
