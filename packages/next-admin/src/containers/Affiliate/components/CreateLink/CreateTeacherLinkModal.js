import {
  Button,
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  Icon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { SelectCityField } from 'components';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import CustomFieldText from '../CustomFieldText';

const CREATE_CAMPAIGN_FORM = 'create-campaign-form-id';
function CreateTeacherLinkModal({ isVisible, onCloseModal }) {
  const intl = useIntl();

  const { control, handleSubmit, setValue, errors } = useForm({
    mode: 'onChange',
    defaultValues: {
      sourceLink: 'https://antoree.com/teahcher-details/',
      utmCampaign: '',
      utmSource: '',
      utmMedium: '',
    },
  });

  return isVisible ? (
    <Modal maxWidth={false} style={{ width: '603px' }} onClose={onCloseModal}>
      <ModalHeader>
        <FlexGroup>
          <FlexItem>
            <Title className="text-left" size="m">
              <p>Create link from teacher URL</p>
            </Title>
          </FlexItem>
        </FlexGroup>
      </ModalHeader>

      <ModalBody>
        <Form>
          <FormRow fullWidth label="Teacher ID/ Email">
            <Controller
              render={({ onChange, value }) => (
                <SelectCityField
                  valueOfSelected={Number(value) || undefined}
                  onSelect={selected => {
                    onChange(selected.value ? selected.value : null);
                  }}
                />
              )}
              name="data.city"
              control={control}
            />
          </FormRow>
          <CustomFieldText
            label="Source Link"
            fieldName="sourceLink"
            control={control}
            isDisabled
          />
          <CustomFieldText
            label="Your campaign name"
            fieldName="utmSource"
            control={control}
          />
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
            <FlexItem>: Chương trình CTV</FlexItem>
          </FlexGroup>
          <FlexGroup>
            <FlexItem style={{ minWidth: 158 }} grow={false}>
              utm_source
            </FlexItem>
            <FlexItem>: Chương trình CTV</FlexItem>
          </FlexGroup>
          <FlexGroup>
            <FlexItem style={{ minWidth: 158 }} grow={false}>
              utm_medium
            </FlexItem>
            <FlexItem>: Chương trình CTV</FlexItem>
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
            <FlexItem>: Joe teacher</FlexItem>
          </FlexGroup>
          <FlexGroup>
            <FlexItem style={{ minWidth: 158 }} grow={false}>
              Email
            </FlexItem>
            <FlexItem>: admmin@antoree.com</FlexItem>
          </FlexGroup>
        </Form>
      </ModalBody>

      <ModalFooter>
        <ButtonEmpty onClick={onCloseModal}>
          <Text size="s" color="primary">
            <FormattedMessage defaultMessage="Close" />
          </Text>
        </ButtonEmpty>
        <Button onClick={() => {}} fill>
          <Text size="s" color="white">
            <FormattedMessage defaultMessage="Finish" />
          </Text>
        </Button>
      </ModalFooter>
    </Modal>
  ) : null;
}

CreateTeacherLinkModal.defaultProps = {
  onCloseModal: () => {},
  isVisible: false,
};

CreateTeacherLinkModal.propTypes = {
  onCloseModal: PropTypes.func,
  isVisible: PropTypes.bool,
};

export default CreateTeacherLinkModal;
