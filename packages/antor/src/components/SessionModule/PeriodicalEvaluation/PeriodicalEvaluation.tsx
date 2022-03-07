/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import {
  Button,
  ButtonEmpty,
  ButtonIcon,
  FlexGroup,
  FlexItem,
  Flyout,
  FlyoutBody,
  FlyoutFooter,
  FlyoutHeader,
  Form,
  FormRow,
  notification,
  Spacer,
  Text,
  TextArea,
  Title,
  ToolTip,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToggle } from 'hooks';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Session,
  useCreateEValuation,
  useRetrieveSessionEvaluation,
} from 'services';
import * as yup from 'yup';

interface IFormData {
  strong_points: string;
  weak_points: string;
  suggestion: string;
}
export type PeriodicalEvaluationProps = {
  session: Session;
  view: boolean;
  allowSubmit: boolean;
  onReload: (session: Session) => void;
};
export const CONFIRM_SESSION_FORM_ID = 'CONFIRM_SESSION_FORM_ID';

const PeriodicalEvaluation: React.FC<PeriodicalEvaluationProps> = ({
  session,
  view,
  allowSubmit,
  onReload,
}) => {
  const { isVisiable, toggle, close } = useToggle();
  const intl = useIntl();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<IFormData>({
    mode: 'all',
    defaultValues: {
      strong_points: '',
      weak_points: '',
      suggestion: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        strong_points: yup
          .string()
          .required(() => (
            <FormattedMessage defaultMessage="Please input content" />
          )),
        weak_points: yup
          .string()
          .required(() => (
            <FormattedMessage defaultMessage="Please input content" />
          )),
        suggestion: yup
          .string()
          .required(() => (
            <FormattedMessage defaultMessage="Please input content" />
          )),
      }),
    ),
  });
  const { data } = useRetrieveSessionEvaluation(
    { id: session.id },
    {
      enabled: isVisiable && session.evaluation,
      cacheTime: 0,
      refetchOnWindowFocus: false,
    },
  );
  useEffect(() => {
    reset({
      strong_points: data?.data?.evaluation?.ratings?.strong_points,
      weak_points: data?.data?.evaluation?.ratings?.weak_points,
      suggestion: data?.data?.evaluation?.ratings?.suggestion,
    });
  }, [data]);

  const { mutate, isLoading } = useCreateEValuation({
    onSuccess: response => {
      onReload(response?.data?.session);
      notification.success({
        title: (
          <FormattedMessage defaultMessage="Add session evaluation success" />
        ),
      });
    },
    onError: err => {
      const mesError = err?.response?.data?.errors[0]?.message;

      notification.error({
        title: (
          <FormattedMessage defaultMessage="Add session evaluation failed" />
        ),
        text: `${mesError}`,
      });
    },
  });

  const onSubmit = (formData: IFormData) => {
    if (!isDirty) {
      notification.error({
        title: <FormattedMessage defaultMessage="You didn't make any change" />,
      });
      return;
    }
    mutate({
      id: session.id,
      courseId: session.course_id,
      ...formData,
    });
  };

  return (
    <>
      {session.evaluation ? (
        <ToolTip position="top" content="View Evaluation">
          <ButtonIcon
            color="text"
            iconType="visBarVertical"
            aria-label="Evaluation"
            onClick={toggle}
          />
        </ToolTip>
      ) : (
        <ToolTip position="top" content="Add Evaluation">
          <ButtonIcon
            iconType="visBarVertical"
            aria-label="Evaluation"
            onClick={toggle}
            style={{ backgroundColor: 'rgba(0, 192, 129, 0.15)' }}
          />
        </ToolTip>
      )}

      {isVisiable && (
        <Flyout style={{ width: '526px' }} ownFocus onClose={() => close()}>
          <FlyoutHeader>
            <Title size="m">
              <h2>Add periodical evaluation</h2>
            </Title>
            <Text color="subdued" size="s">
              Notice: After submission, an email will be sent automatically to
              your learner and can&apos;t be modified.
            </Text>
          </FlyoutHeader>
          <FlyoutBody>
            <Form
              id={CONFIRM_SESSION_FORM_ID}
              component="form"
              onSubmit={handleSubmit(dataForm => onSubmit(dataForm))}
            >
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    fullWidth
                    label={<FormattedMessage defaultMessage="Strong points" />}
                    isInvalid={!!errors.strong_points}
                    error={errors.strong_points?.message}
                    required
                  >
                    <Controller
                      name="strong_points"
                      control={control}
                      render={({ field: { ref, ...fieldRest } }) => (
                        <TextArea
                          className="rounded-lg"
                          rows={2}
                          inputRef={ref}
                          {...fieldRest}
                          required
                          isInvalid={!!errors.strong_points}
                          fullWidth
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Vocabulary',
                          })}
                          style={{ height: '120px' }}
                          disabled={view}
                        />
                      )}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    required
                    fullWidth
                    isInvalid={!!errors.weak_points}
                    error={errors.weak_points?.message}
                    label={<FormattedMessage defaultMessage="Weak points" />}
                  >
                    <Controller
                      name="weak_points"
                      control={control}
                      render={({ field: { ref, value, ...fieldRest } }) => (
                        <TextArea
                          rows={2}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Grammar',
                          })}
                          required
                          fullWidth
                          inputRef={ref}
                          {...fieldRest}
                          isInvalid={!!errors.weak_points}
                          style={{ height: '120px' }}
                          disabled={view}
                        />
                      )}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <FlexGroup>
                <FlexItem>
                  <FormRow
                    required
                    fullWidth
                    label={<FormattedMessage defaultMessage="Suggestions" />}
                    isInvalid={!!errors.suggestion}
                    error={errors.suggestion?.message}
                  >
                    <Controller
                      name="suggestion"
                      control={control}
                      render={({ field: { ref, value, ...fieldRest } }) => (
                        <TextArea
                          rows={2}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Note for students',
                          })}
                          required
                          inputRef={ref}
                          {...fieldRest}
                          isInvalid={!!errors.suggestion}
                          fullWidth
                          style={{ height: '120px' }}
                          disabled={view}
                        />
                      )}
                    />
                  </FormRow>
                </FlexItem>
              </FlexGroup>
              <Spacer />
            </Form>
          </FlyoutBody>
          <FlyoutFooter style={{ backgroundColor: '#fff' }}>
            {allowSubmit ? (
              <>
                <FlexGroup justifyContent="spaceBetween">
                  <FlexItem grow={false}>
                    <ButtonEmpty onClick={() => close()}>Cancel</ButtonEmpty>
                  </FlexItem>
                  <FlexItem grow={false}>
                    <Button
                      fill
                      type="submit"
                      form={CONFIRM_SESSION_FORM_ID}
                      isLoading={isLoading || false}
                    >
                      Confirm
                    </Button>
                  </FlexItem>
                </FlexGroup>
              </>
            ) : (
              <>
                <FlexGroup justifyContent="flexStart">
                  <FlexItem grow={false}>
                    <ButtonEmpty onClick={() => close()}>Close</ButtonEmpty>
                  </FlexItem>
                </FlexGroup>
              </>
            )}
          </FlyoutFooter>
        </Flyout>
      )}
    </>
  );
};

export default PeriodicalEvaluation;
