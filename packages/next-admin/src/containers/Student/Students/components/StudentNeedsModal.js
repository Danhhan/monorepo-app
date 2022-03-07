import {
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  LoadingSpinner,
  Modal,
  ModalBody,
  notification,
  Spacer,
  Text,
  TextArea,
  Title,
} from '@antoree/ant-ui';
import { useToggle } from 'hooks';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { getStudyGoals, GET_STUDY_GOALS } from 'services/student';
import { STUDENT_TYPE_KID } from '../constants';

const StudentNeedsModal = ({ type, id }) => {
  const intl = useIntl();
  const { isVisiable, toggle, close } = useToggle();

  const {
    data,
    error,
    isFetching,
    // refetch,
  } = useQuery([GET_STUDY_GOALS(id)], () => getStudyGoals(id), {
    enabled: isVisiable,
    onSuccess: dataRes => {},
    onError: err => {
      const errCode = err?.response?.status;
      const mesError = err?.response?.data?.errors[0]?.message;

      notification.error({
        title: 'Get goals Failure!',
        text: mesError || (
          <FormattedMessage
            defaultMessage="Get goals failure please contact tech for help! Error: {code}"
            values={{ code: errCode }}
          />
        ),
      });
    },
  });

  const childGoals = data?.find(item => item.type === 2);
  const adultGoals = data?.find(item => item.type === 3);

  const goalsList =
    type === STUDENT_TYPE_KID ? childGoals?.data : adultGoals?.data;

  return (
    <>
      {/* <Button color="primary" size="s" minWidth={80} fill onClick={toggle}>
        <Text size="s">
          <p>
            <>
              <Icon type="bullseye" className="mr-2" />
              <FormattedMessage defaultMessage="Goals" />
            </>
          </p>
        </Text>
      </Button> */}
      <Text
        size="s"
        textAlign="center"
        className="cursor-pointer"
        color="#008F60"
        onClick={toggle}
      >
        <p style={{ marginBottom: '0px' }}>
          <FormattedMessage defaultMessage="View" />
        </p>
      </Text>
      {isVisiable && (
        <Modal onClose={close}>
          <ModalBody>
            {isFetching ? (
              <div className="flex justify-items-center items-center p-4 flex-col ">
                <LoadingSpinner size="xl" />
                <Spacer size="m" />
                <Text size="l">
                  <p>
                    <FormattedMessage defaultMessage="Loading" />
                  </p>
                </Text>
              </div>
            ) : (
              <Form
                component="form"
                id="update-goals-form"
                // onSubmit={handleSubmit(handleUpdateNote)}
              >
                <Title size="s" className="text-center">
                  <p>
                    <FormattedMessage defaultMessage="Study Goals" />
                  </p>
                </Title>
                <Spacer />
                <FormRow fullWidth>
                  <TextArea
                    aria-label="Note"
                    value={goalsList?.map(goal => goal?.name).join('\n') || ''}
                    // onChange={onChange}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Goals',
                    })}
                    resize="none"
                    fullWidth
                    rows={5}
                    readOnly
                  />
                </FormRow>

                <Spacer />
                <FlexGroup justifyContent="flexEnd">
                  <FlexItem grow={false}>
                    <ButtonEmpty onClick={close}>
                      <p>
                        <FormattedMessage defaultMessage="Close" />
                      </p>
                    </ButtonEmpty>
                  </FlexItem>
                </FlexGroup>
              </Form>
            )}
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

StudentNeedsModal.defaultProps = {
  type: null,
  id: null,
};

StudentNeedsModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  type: PropTypes.any,
  id: PropTypes.number,
};

export default StudentNeedsModal;
