/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  FlexGroup,
  FlexItem,
  Title,
  Button,
  HorizontalRule,
  Form,
  FormRow,
  TextArea,
  DescribedFormGroup,
  notification,
  Stat,
  Spacer,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DevTool } from '@hookform/devtools';
import { useMutation, useQueryClient } from 'react-query';
import {
  updateTestingResult,
  GET_TESTING_RESULT_BY_COURSE_ID,
} from 'services/testingCourse';
import { totalScoreCount } from './constants';

import ResultFormRow from './ResultFormRow';

export const RESULT_FORM_ID = 'testing-result-form';

function ResultForm({ data, courseId }) {
  const isAdult = data?.data?.student?.type === 2;

  const scoreShema = () =>
    yup
      .number()
      .transform(value => (Number.isNaN(value) ? -1 : value))
      .integer()
      .min(0)
      .max(isAdult ? 9 : 3);

  const {
    control,
    handleSubmit,
    reset,
    formState,
    errors,
    watch,
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      testFluency1Score: data?.data?.test_result_meta?.testFluency1Score ?? '',
      testFluency1: data?.data?.test_result_meta?.testFluency1 ?? '',
      testFluency2Score: data?.data?.test_result_meta?.testFluency2Score ?? '',
      testFluency2: data?.data?.test_result_meta?.testFluency2 ?? '',
      testFluency3Score: data?.data?.test_result_meta?.testFluency3Score ?? '',
      testFluency3: data?.data?.test_result_meta?.testFluency3 ?? '',
      //
      testLexical1Score: data?.data?.test_result_meta?.testLexical1Score ?? '',
      testLexical1: data?.data?.test_result_meta?.testLexical1 ?? '',
      testLexical2Score: data?.data?.test_result_meta?.testLexical2Score ?? '',
      testLexical2: data?.data?.test_result_meta?.testLexical2 ?? '',
      testLexical3Score: data?.data?.test_result_meta?.testLexical3Score ?? '',
      testLexical3: data?.data?.test_result_meta?.testLexical3 ?? '',
      //
      testGrammatical1Score:
        data?.data?.test_result_meta?.testGrammatical1Score ?? '',
      testGrammatical1: data?.data?.test_result_meta?.testGrammatical1 ?? '',
      testGrammatical2Score:
        data?.data?.test_result_meta?.testGrammatical2Score ?? '',
      testGrammatical2: data?.data?.test_result_meta?.testGrammatical2 ?? '',
      testGrammatical3Score:
        data?.data?.test_result_meta?.testGrammatical3Score ?? '',
      testGrammatical3: data?.data?.test_result_meta?.testGrammatical3 ?? '',
      //
      testPronunciation1Score:
        data?.data?.test_result_meta?.testPronunciation1Score ?? '',
      testPronunciation1:
        data?.data?.test_result_meta?.testPronunciation1 ?? '',
      testPronunciation2Score:
        data?.data?.test_result_meta?.testPronunciation2Score ?? '',
      testPronunciation2:
        data?.data?.test_result_meta?.testPronunciation2 ?? '',
      testPronunciation3Score:
        data?.data?.test_result_meta?.testPronunciation3Score ?? '',
      testPronunciation3:
        data?.data?.test_result_meta?.testPronunciation3 ?? '',
      //
      testPersonalCriteria1:
        data?.data?.test_result_meta?.testPersonalCriteria1 ?? '',
      testPersonalCriteria2:
        data?.data?.test_result_meta?.testPersonalCriteria2 ?? '',
      //
      testComment1: data?.data?.test_result_meta?.testComment1 ?? '',
      testComment2: data?.data?.test_result_meta?.testComment2 ?? '',
      testComment3: data?.data?.test_result_meta?.testComment3 ?? '',
      sumScore: data?.data?.test_result_meta?.sumScore ?? 0,
    },
    resolver: yupResolver(
      yup.object().shape({
        testFluency1Score: scoreShema(),
        testFluency1: yup.string().optional(),
        testFluency2Score: scoreShema(),
        testFluency2: yup.string().optional(),
        testFluency3Score: scoreShema(),
        testFluency3: yup.string().optional(),
        //
        testLexical1Score: scoreShema(),
        testLexical1: yup.string().optional(),
        testLexical2Score: scoreShema(),
        testLexical2: yup.string().optional(),
        testLexical3Score: scoreShema(),
        testLexical3: yup.string().optional(),
        //
        testGrammatical1Score: scoreShema(),
        testGrammatical1: yup.string().optional(),
        testGrammatical2Score: scoreShema(),
        testGrammatical2: yup.string().optional(),
        testGrammatical3Score: scoreShema(),
        testGrammatical3: yup.string().optional(),
        //
        testPronunciation1Score: scoreShema(),
        testPronunciation1: yup.string().optional(),
        testPronunciation2Score: scoreShema(),
        testPronunciation2: yup.string().optional(),
        testPronunciation3Score: scoreShema(),
        testPronunciation3: yup.string().optional(),
        //
        testPersonalCriteria1: yup.string().optional(),
        testPersonalCriteria2: yup.string().optional(),
        //
        testComment1: yup.string().optional(),
        testComment2: yup.string().optional(),
        testComment3: yup.string().optional(),
      }),
    ),
  });

  const queryClient = useQueryClient();

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditModeHandler = () => {
    setIsEditMode(prevState => !prevState);
  };

  const updateTestingResultMutation = useMutation(
    params => updateTestingResult(courseId, params.data),
    {
      onSuccess: () => {
        toggleEditModeHandler();

        queryClient.invalidateQueries(
          GET_TESTING_RESULT_BY_COURSE_ID(courseId),
        );

        notification.success({
          title: 'Successfully',
          text: 'Update testing result successfully!',
        });

        queryClient.invalidateQueries(
          GET_TESTING_RESULT_BY_COURSE_ID(courseId),
        );
      },
      onError: () => {
        reset();

        notification.error({
          title: 'Failure',
          text: 'Update testing result failure!',
        });
      },
    },
  );

  const onSubmit = formData => {
    if (formState.isDirty) {
      updateTestingResultMutation.mutate({
        data: { ...formData },
      });
    }
  };

  const sumScoreCal = totalScoreCount(isAdult, [
    watch('testFluency1Score'),
    watch('testFluency2Score'),
    watch('testFluency3Score'),
    watch('testLexical1Score'),
    watch('testLexical2Score'),
    watch('testLexical3Score'),
    watch('testGrammatical1Score'),
    watch('testGrammatical2Score'),
    watch('testGrammatical3Score'),
    watch('testPronunciation1Score'),
    watch('testPronunciation2Score'),
    watch('testPronunciation3Scor'),
  ]);

  useEffect(() => {
    setValue('sumScore', sumScoreCal);
  }, [setValue, sumScoreCal]);

  const onReset = () => {
    reset();
    toggleEditModeHandler();
  };

  return (
    <Form
      id={RESULT_FORM_ID}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FlexGroup alignItems="center" responsive={false}>
        <FlexItem>
          <Title>
            <h2>
              <FormattedMessage defaultMessage="Detail Score" />
            </h2>
          </Title>
        </FlexItem>

        {isEditMode ? (
          <>
            <FlexItem grow={false}>
              <Button
                fill
                color="danger"
                iconType="cross"
                size="s"
                onClick={onReset}
              >
                <FormattedMessage defaultMessage="Discard Changes" />
              </Button>
            </FlexItem>

            <FlexItem grow={false}>
              <Button
                type="submit"
                form={RESULT_FORM_ID}
                fill
                color="secondary"
                iconType="save"
                isDisabled={!formState.isDirty}
                size="s"
                isLoading={updateTestingResultMutation.isLoading}
              >
                <FormattedMessage defaultMessage="Save Changes" />
              </Button>
            </FlexItem>
          </>
        ) : (
          <FlexItem grow={false}>
            <Button
              type="button"
              fill
              color="primary"
              iconType="documentEdit"
              size="s"
              onClick={toggleEditModeHandler}
            >
              <FormattedMessage defaultMessage="Edit Result" />
            </Button>
          </FlexItem>
        )}
      </FlexGroup>

      <HorizontalRule />

      <DescribedFormGroup fullWidth title={<h3>Fluency and Coherence</h3>}>
        <ResultFormRow
          isAdult={isAdult}
          control={control}
          error={
            errors?.testFluency1Score?.message || errors?.testFluency1?.message
          }
          fieldName="testFluency1"
          label="Avoid silence or hesitation/ Tránh được sự im lặng và do dự khi nói"
          isEditMode={isEditMode}
        />

        <ResultFormRow
          isAdult={isAdult}
          control={control}
          error={
            errors?.testFluency2Score?.message || errors?.testFluency2?.message
          }
          fieldName="testFluency2"
          label={
            isAdult
              ? 'Speak at length on each topic/ Nói được một đoạn dài trong mỗi chủ đề'
              : 'Use English only/ Chỉ sử dụng tiếng Anh'
          }
          isEditMode={isEditMode}
        />

        <ResultFormRow
          isAdult={isAdult}
          control={control}
          error={
            errors?.testFluency3Score?.message || errors?.testFluency3?.message
          }
          fieldName="testFluency3"
          label="Use correct words to express ideas/ Sử dụng từ hợp lý để diễn đạt ý tưởng"
          isEditMode={isEditMode}
        />
      </DescribedFormGroup>

      <DescribedFormGroup fullWidth title={<h3>Lexical Resources</h3>}>
        <ResultFormRow
          isAdult={isAdult}
          control={control}
          error={
            errors?.testLexical1Score?.message || errors?.testLexical1?.message
          }
          fieldName="testLexical1"
          label="Use a wide range of vocabulary/ Sử dụng từ vựng đa dạng"
          isEditMode={isEditMode}
        />

        <ResultFormRow
          isAdult={isAdult}
          control={control}
          error={
            errors?.testLexical2Score?.message || errors?.testLexical2?.message
          }
          fieldName="testLexical2"
          label={
            isAdult
              ? 'Use phrasal verbs and collocation/ Sử dụng cụm động từ và kết hợp từ'
              : 'Paraphrase/ Diễn đạt ý theo một cách khác'
          }
          isEditMode={isEditMode}
        />

        {isAdult ? (
          <ResultFormRow
            isAdult={isAdult}
            control={control}
            error={
              errors?.testLexical3Score?.message ||
              errors?.testLexical3?.message
            }
            fieldName="testLexical3"
            label="Paraphrase/ Diễn đạt ý theo một cách khác"
            isEditMode={isEditMode}
          />
        ) : null}
      </DescribedFormGroup>

      <DescribedFormGroup
        fullWidth
        title={<h3>Grammatical Range and Accuracy</h3>}
      >
        <ResultFormRow
          isAdult={isAdult}
          control={control}
          error={
            errors?.testGrammatical1Score?.message ||
            errors?.testGrammatical1?.message
          }
          fieldName="testGrammatical1"
          label="Speak in complex sentences/ Sử dụng các mẫu câu phức tạp khi nói"
          isEditMode={isEditMode}
        />

        <ResultFormRow
          isAdult={isAdult}
          control={control}
          error={
            errors?.testGrammatical2Score?.message ||
            errors?.testGrammatical2?.message
          }
          fieldName="testGrammatical2"
          label={
            isAdult
              ? 'Use a variety of grammatical forms/ Sử dụng đa dạng các loại ngữ pháp'
              : 'Speak in full sentences/ Sử dụng nguyên câu khi nói'
          }
          isEditMode={isEditMode}
        />

        <ResultFormRow
          isAdult={isAdult}
          control={control}
          error={
            errors?.testGrammatical3Score?.message ||
            errors?.testGrammatical3?.message
          }
          fieldName="testGrammatical3"
          label={
            isAdult
              ? 'Avoid grammatical mistakes/ Tránh được lỗi sai'
              : 'Use correct tenses with correct forms of verbs/ Sử dụng đúng thì với dạng chia của động từ'
          }
          isEditMode={isEditMode}
        />
      </DescribedFormGroup>

      <DescribedFormGroup fullWidth title={<h3>Pronunciation</h3>}>
        <ResultFormRow
          isAdult={isAdult}
          control={control}
          error={
            errors?.testPronunciation1Score?.message ||
            errors?.testPronunciation1?.message
          }
          fieldName="testPronunciation1"
          label={
            isAdult
              ? 'Pronounce words accurately/ Phát âm chính xác các từ khi nói'
              : 'Pronounce clearly/ Phát âm rõ ràng'
          }
          isEditMode={isEditMode}
        />

        <ResultFormRow
          isAdult={isAdult}
          control={control}
          error={
            errors?.testPronunciation2Score?.message ||
            errors?.testPronunciation2?.message
          }
          fieldName="testPronunciation2"
          label={
            isAdult
              ? 'Join sounds together/ Biết nối âm'
              : 'Pronounce with ending sounds, stress and intonation/ Phát âm có âm cuối, nhấn và ngữ âm'
          }
          isEditMode={isEditMode}
        />

        {isAdult ? (
          <ResultFormRow
            isAdult={isAdult}
            control={control}
            error={
              errors?.testPronunciation3Score?.message ||
              errors?.testPronunciation3?.message
            }
            fieldName="testPronunciation3"
            label="Vary intonation/ Có ngữ điệu rõ ràng"
            isEditMode={isEditMode}
          />
        ) : null}
      </DescribedFormGroup>

      <DescribedFormGroup fullWidth title={<h3>Personal criteria</h3>}>
        {[
          {
            label:
              'Attitude towards English learning/ Thái độ đối với tiếng Anh',
            name: 'testPersonalCriteria1',
          },
          {
            label: 'Second Language Acquisition/ Khả năng hấp thụ ngôn ngữ',
            name: 'testPersonalCriteria2',
          },
        ].map(({ label, name }) => (
          <FormRow id={name} fullWidth label={label}>
            <Controller
              as={
                <TextArea
                  fullWidth
                  rows={2}
                  readOnly={!isEditMode}
                  placeholder="Type something..."
                />
              }
              name={name}
              control={control}
            />
          </FormRow>
        ))}
      </DescribedFormGroup>

      <DescribedFormGroup
        fullWidth
        title={<h3>Additional Notes & Recommendation</h3>}
      >
        {[
          {
            label: 'Strengths/ Thế mạnh',
            name: 'testComment1',
          },
          {
            label: 'Weakness/ Điểm yếu',
            name: 'testComment2',
          },
          {
            label: 'Recommendation/ Đề xuất',
            name: 'testComment3',
          },
        ].map(({ label, name }) => (
          <FormRow id={name} fullWidth label={label}>
            <Controller
              as={
                <TextArea
                  readOnly={!isEditMode}
                  fullWidth
                  rows={2}
                  placeholder="Type something..."
                />
              }
              name={name}
              control={control}
            />
          </FormRow>
        ))}
      </DescribedFormGroup>
      <DevTool control={control} />
      <Spacer size="xxl" />

      <Title>
        <h2>
          <FormattedMessage defaultMessage="Final Results" />
        </h2>
      </Title>

      <HorizontalRule />

      <FlexGroup>
        <FlexItem>
          <Controller
            name="sumScore"
            control={control}
            render={({ value }) => (
              <Stat
                title={value}
                description="Total Score"
                titleColor="primary"
              />
            )}
          />
        </FlexItem>
      </FlexGroup>
    </Form>
  );
}

export default ResultForm;
