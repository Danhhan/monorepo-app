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
  Spacer,
  Text,
  TextArea,
  Title,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToggle } from 'hooks';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import * as yup from 'yup';

const NoteModal = ({ note, lrId, handleSaveNote, referencePrice }) => {
  const intl = useIntl();

  const { control, errors, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      note,
    },
    resolver: yupResolver(
      yup.object().shape({
        note: yup.string(),
      }),
    ),
  });

  useEffect(() => {
    reset({ note });
  }, [note]);

  const handleUpdateNote = formData => {
    handleSaveNote.mutate({
      ...formData,
      lrId,
    });
  };

  const { isVisiable, toggle, close } = useToggle();

  return (
    <>
      <Button
        color={note ? 'primary' : 'text'}
        size="s"
        minWidth={80}
        fill
        onClick={toggle}
      >
        <Text size="s">
          <p>
            {note ? (
              <>
                <Icon type="eye" className="mr-2" />
                <FormattedMessage defaultMessage="View Note" />
              </>
            ) : (
              <>
                <Icon type="plusInCircle" className="mr-2" />
                <FormattedMessage defaultMessage="Add Note" />
              </>
            )}
          </p>
        </Text>
      </Button>
      {isVisiable && (
        <Modal onClose={close}>
          <ModalBody>
            <Form
              component="form"
              id="update-note-form"
              onSubmit={handleSubmit(handleUpdateNote)}
            >
              <Title size="s" className="text-center">
                <p>
                  <FormattedMessage defaultMessage="Add note" />
                </p>
              </Title>
              <Spacer />
              <FormRow
                fullWidth
                isInvalid={!!errors?.note}
                error={errors?.note?.message}
              >
                <Controller
                  render={({ onChange, value }) => (
                    <TextArea
                      aria-label="Note"
                      value={value}
                      onChange={onChange}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Note',
                      })}
                      resize="none"
                      fullWidth
                      rows={5}
                    />
                  )}
                  name="note"
                  control={control}
                />
              </FormRow>
              <Spacer />
              <FormRow
                fullWidth
                label={<FormattedMessage defaultMessage="Reference Price" />}
              >
                <TextArea
                  aria-label="Reference Price"
                  value={
                    referencePrice
                      ? referencePrice?.specific ||
                        `From: ${referencePrice?.from} - To: ${referencePrice?.to}`
                      : 'No data'
                  }
                  // onChange={onChange}
                  readOnly
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Reference Price',
                  })}
                  disabled
                  resize="none"
                  fullWidth
                  rows={2}
                />
              </FormRow>
              <Spacer />
              <FlexGroup justifyContent="flexEnd">
                <FlexItem grow={false}>
                  <ButtonEmpty
                    isLoading={handleSaveNote.isLoading}
                    onClick={close}
                  >
                    <p>
                      <FormattedMessage defaultMessage="Cancel" />
                    </p>
                  </ButtonEmpty>
                </FlexItem>
                <FlexItem grow={false}>
                  <Button
                    isLoading={handleSaveNote.isLoading}
                    fill
                    type="submit"
                  >
                    <p>
                      <FormattedMessage defaultMessage="Save" />
                    </p>
                  </Button>
                </FlexItem>
              </FlexGroup>
            </Form>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

NoteModal.defaultProps = {
  note: null,
  lrId: null,
  handleSaveNote: () => {},
  referencePrice: {},
};

NoteModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  note: PropTypes.any,
  lrId: PropTypes.number,
  handleSaveNote: PropTypes.func,
  referencePrice: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
    specific: PropTypes.string,
  }),
};

export default NoteModal;
