import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonEmpty,
  FieldText,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  Modal,
  ModalBody,
  ModalFooter,
  Spacer,
  Text,
  TextArea,
  Title,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';

function EditUTMForm({
  isVisible,
  closeModal,
  itemUTM,
  updateLearningRequestUTMMutation,
}) {
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    setValue(itemUTM?.value);
  }, [itemUTM]);
  const onChangeValue = event => setValue(event.target.value);
  const onSubmit = () => {
    const key = itemUTM?.key.replace(/_/gi, () => '-');
    const body = {
      [key]: value,
      _get_utm: 1,
    };
    updateLearningRequestUTMMutation.mutate({
      body,
      id: itemUTM.id,
    });
  };
  return (
    <>
      {isVisible && (
        <Modal
          maxWidth={false}
          style={{ width: '768px' }}
          onClose={() => {
            closeModal();
            setValue(itemUTM?.value);
          }}
        >
          <ModalBody>
            <div>
              <Spacer />
              <Title className="text-left">
                <p>
                  <FormattedMessage defaultMessage="Cập nhật learning request UTM" />
                </p>
              </Title>
              <Spacer />
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    fullWidth
                    label={<FormattedMessage defaultMessage="Từ khoá" />}
                  >
                    <FieldText
                      style={{ border: '1px solid #CDCFD1' }}
                      className="rounded-lg"
                      fullWidth
                      disabled
                      compressed
                      value={itemUTM?.key}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    fullWidth
                    label={<FormattedMessage defaultMessage="Giá trị" />}
                  >
                    <TextArea
                      className="rounded-lg border border-gray-300 border-solid"
                      // placeholder="Placeholder text"
                      value={value}
                      onChange={onChangeValue}
                      fullWidth
                      compressed
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <Spacer />
            </div>
          </ModalBody>
          <ModalFooter>
            <ButtonEmpty
              onClick={() => {
                closeModal();
                setValue(itemUTM?.value);
              }}
            >
              <Text size="s" color="#00C081">
                <FormattedMessage defaultMessage="Đóng" />
              </Text>
            </ButtonEmpty>
            <Button
              fill
              onClick={onSubmit}
              isLoading={updateLearningRequestUTMMutation.isLoading}
            >
              <Text size="s" color="white">
                <FormattedMessage defaultMessage="Cập nhật" />
              </Text>
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}
EditUTMForm.defaultProps = {
  closeModal: () => {},
  isVisible: false,
  itemUTM: undefined,
  updateLearningRequestUTMMutation: undefined,
};

EditUTMForm.propTypes = {
  closeModal: PropTypes.func,
  isVisible: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  itemUTM: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  updateLearningRequestUTMMutation: PropTypes.any,
};

export default EditUTMForm;
