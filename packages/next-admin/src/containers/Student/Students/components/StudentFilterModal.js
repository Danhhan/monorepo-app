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
  ModalHeader,
  ModalHeaderTitle,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import * as yup from 'yup';

export const FILTER_FORM_ID = 'filter-student-form';

function StudentFilterModal({ isVisible, closeModal, source, campaign }) {
  const { control, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      source,
      campaign,
    },

    resolver: yupResolver(
      yup.object().shape({
        source: yup.string(),
        campaign: yup.string(),
      }),
    ),
  });

  const onSubmit = data => closeModal(data.source, data.campaign);

  useEffect(() => {
    reset({
      source,
      campaign,
    });
  }, [source, campaign, reset]);

  return isVisible ? (
    <Modal style={{ width: 500 }} onClose={() => closeModal(source, campaign)}>
      <ModalHeader>
        <ModalHeaderTitle>
          <FormattedMessage defaultMessage="Filter data" />
        </ModalHeaderTitle>
      </ModalHeader>

      <ModalBody>
        <Form
          component="form"
          id={FILTER_FORM_ID}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FlexGroup>
            <FlexItem grow={2}>
              {' '}
              <FormattedMessage defaultMessage="Data source" />
            </FlexItem>
            <FlexItem grow={5}>
              <FormRow>
                <Controller
                  as={<FieldText compressed placeholder="Data source" />}
                  name="source"
                  control={control}
                />
              </FormRow>
            </FlexItem>
          </FlexGroup>
          <FlexGroup>
            <FlexItem grow={2}>
              {' '}
              <FormattedMessage defaultMessage="Campaign name" />
            </FlexItem>
            <FlexItem grow={5}>
              <FormRow>
                <Controller
                  as={<FieldText compressed placeholder="Campaign name" />}
                  name="campaign"
                  control={control}
                />
              </FormRow>
            </FlexItem>
          </FlexGroup>
        </Form>
      </ModalBody>

      <ModalFooter>
        <ButtonEmpty color="black" onClick={() => closeModal('', '')}>
          <FormattedMessage defaultMessage="Cancel filter" />
        </ButtonEmpty>

        <Button form={FILTER_FORM_ID} type="submit" fill color="warning">
          <FormattedMessage defaultMessage="Apply" />
        </Button>
      </ModalFooter>
    </Modal>
  ) : null;
}

StudentFilterModal.defaultProps = {
  closeModal: ({ source, campaign }) => {},
  isVisible: false,
  source: '',
  campaign: '',
};

StudentFilterModal.propTypes = {
  closeModal: PropTypes.func,
  isVisible: PropTypes.bool,
  source: PropTypes.string,
  campaign: PropTypes.string,
};

export default StudentFilterModal;
