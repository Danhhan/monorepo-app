/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
/* eslint-disable react/prop-types */
import {
  FlexGroup,
  FlexItem,
  Form,
  Spacer,
  FieldText,
  TabbedContent,
  Title,
  Text,
  BetaBadge,
} from '@antoree/ant-ui';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage, useIntl } from 'react-intl';
import TestResultPart from './TestResultPart';
import TestResultInformation from './TestResultInformation';
import {
  FORM_DEFAULT_VALUES,
  totalScoreCount,
  kidConfGrade,
  SCHEMA,
  adultConfGrade,
} from './constant';
import TestResultFormTeenagers from './TestResultFormTeenagers';

export type TestResultFormProps = {
  title: string;
  sessionId: number | string;
  studentName: string;
  isAdult: boolean;
  avatarUrl?: string;
  mutate: Function;
};

interface IFormData {
  fluency1: string;
  fluency1Score: string | number;
  fluency2: string;
  fluency2Score: string | number;
  fluency3: string;
  fluency3Score: string | number;
  lexical1: string;
  lexical1Score: string | number;
  lexical2: string;
  lexical2Score: string | number;
  lexical3: string;
  lexical3Score: string | number;
  grammatical1: string;
  grammatical1Score: string | number;
  grammatical2: string;
  grammatical2Score: string | number;
  grammatical3: string;
  grammatical3Score: string | number;
  pronunciation1: string;
  pronunciation1Score: string | number;
  pronunciation2: string;
  pronunciation2Score: string | number;
  pronunciation3: string;
  pronunciation3Score: string | number;
  personalCriteria1: string;
  personalCriteria2: string;
  comment1: string;
  comment2: string;
  comment3: string;
  sumScore: string;
  testType: string;
}

const TestResultForm: React.FC<TestResultFormProps> = ({
  title,
  sessionId,
  studentName,
  isAdult,
  avatarUrl,
  mutate,
}) => {
  const intl = useIntl();

  const {
    control,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm<IFormData>({
    mode: 'all',
    resolver: yupResolver(SCHEMA(isAdult)),
    defaultValues: FORM_DEFAULT_VALUES(isAdult),
  });
  const scorePlaceHolder = isAdult
    ? intl.formatMessage({
        defaultMessage: 'Score Here (from 0 to 9)',
      })
    : intl.formatMessage({
        defaultMessage: 'Score Here (from 0 to 3)',
      });
  const generateCer = () => {
    // eslint-disable-next-line radix
    const score = parseInt(watch('sumScore')) || 0;

    const arr = isAdult ? adultConfGrade : kidConfGrade;

    return arr.find(item => score <= item.maxPoint)?.label || '';
  };

  const sumScoreCal = totalScoreCount(isAdult, [
    watch('fluency1Score'),
    watch('fluency2Score'),
    watch('fluency3Score'),
    watch('lexical1Score'),
    watch('lexical2Score'),
    watch('lexical3Score'),
    watch('grammatical1Score'),
    watch('grammatical2Score'),
    watch('grammatical3Score'),
    watch('pronunciation1Score'),
    watch('pronunciation2Score'),
    watch('pronunciation3Score'),
  ]);

  useEffect(() => {
    setValue('sumScore', sumScoreCal);
  }, [setValue, sumScoreCal]);

  const onFormSubmit = (data: IFormData) => {
    mutate({
      id: sessionId,
      ...data,
    });
  };

  return (
    <>
      <TestResultInformation
        title={title}
        avatarUrl={avatarUrl}
        sessionId={sessionId}
        studentName={studentName}
      />
      <div className="mt-6">
        <TabbedContent
          tabs={[
            {
              id: 'young-leaners',
              name: <FormattedMessage defaultMessage="Young leaners" />,
              content: (
                <section>
                  <Title size="s" className="pt-5">
                    <h1>Learners under 13 years old</h1>
                  </Title>
                  <FlexGroup className="flex items-end justify-between">
                    <FlexItem className="w-full">
                      <Text color="#343741">
                        <p>
                          <FormattedMessage defaultMessage="Not Applicable" />
                        </p>
                      </Text>
                      <Text color="#343741">
                        <p>
                          <FormattedMessage defaultMessage="Basic" />
                        </p>
                      </Text>
                      <Text color="#343741">
                        <p>
                          <FormattedMessage defaultMessage="Adaptable" />
                        </p>
                      </Text>
                      <Text color="#343741">
                        <p>
                          <FormattedMessage defaultMessage="Perfect" />
                        </p>
                      </Text>
                    </FlexItem>
                    <FlexItem className="w-full flex items-end">
                      <BetaBadge
                        size="m"
                        label="0"
                        style={{
                          backgroundColor: 'rgba(52, 55, 65, 0.05)',
                          boxShadow: 'none',
                        }}
                      />
                      <BetaBadge
                        size="m"
                        label="1"
                        style={{
                          background: 'rgba(255, 199, 0, 0.15)',
                          color: '#E2B100',
                          boxShadow: 'none',
                        }}
                      />
                      <BetaBadge
                        size="m"
                        label="2"
                        style={{
                          background: 'rgba(244, 96, 54, 0.2)',
                          boxShadow: 'none',
                          color: '#FF6700',
                        }}
                      />
                      <BetaBadge
                        size="m"
                        label="3"
                        style={{
                          backgroundColor: 'rgba(20, 178, 76, 0.15)',
                          boxShadow: 'none',
                          color: '#14B24C',
                        }}
                      />
                    </FlexItem>
                  </FlexGroup>
                  <Form
                    id="test-result-form"
                    component="form"
                    onSubmit={handleSubmit(onFormSubmit)}
                  >
                    <TestResultPart
                      control={control}
                      errors={errors}
                      title="1.Fluency and Coherence"
                      collections={[
                        {
                          label: 'Avoid silence or hesitation',
                          properties: [
                            {
                              name: 'fluency1Score',
                              isTextArea: false,
                              placeholder: scorePlaceHolder,
                            },
                            {
                              name: 'fluency1',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                        {
                          label: isAdult
                            ? intl.formatMessage({
                                defaultMessage: 'Speak at length on each topic',
                              })
                            : intl.formatMessage({
                                defaultMessage: 'Use English Only ?',
                              }),
                          properties: [
                            {
                              name: 'fluency2Score',
                              isTextArea: false,
                              placeholder: scorePlaceHolder,
                            },
                            {
                              name: 'fluency2',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                        {
                          label: 'Use correct words to express ideas',
                          properties: [
                            {
                              name: 'fluency3Score',
                              isTextArea: false,
                              placeholder: scorePlaceHolder,
                            },
                            {
                              name: 'fluency3',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                    <TestResultPart
                      control={control}
                      errors={errors}
                      title="2.Lexical Resources"
                      collections={[
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'Use a wide range of vocabulary',
                          }),
                          properties: [
                            {
                              name: 'lexical1Score',
                              isTextArea: false,
                              placeholder: scorePlaceHolder,
                            },
                            {
                              name: 'lexical1',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                        {
                          label: !isAdult
                            ? intl.formatMessage({
                                defaultMessage:
                                  'Use phrasal verbs and collocation',
                              })
                            : intl.formatMessage({
                                defaultMessage: 'Paraphrase',
                              }),
                          properties: [
                            {
                              name: 'lexical2Score',
                              isTextArea: false,
                              placeholder: scorePlaceHolder,
                            },
                            {
                              name: 'lexical2',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'Paraphrase',
                          }),
                          isHidding: isAdult,
                          properties: [
                            {
                              name: 'lexical3Score',
                              isTextArea: false,
                              placeholder: scorePlaceHolder,
                            },
                            {
                              name: 'lexical3',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                    <TestResultPart
                      errors={errors}
                      control={control}
                      title="3.Grammatical Range and Accuracy"
                      collections={[
                        {
                          label: intl.formatMessage({
                            // defaultMessage: 'Speak in complex sentences',
                            defaultMessage: 'Speak in full sentences',
                          }),
                          properties: [
                            {
                              name: 'grammatical1Score',
                              isTextArea: false,
                              placeholder: scorePlaceHolder,
                            },
                            {
                              name: 'grammatical1',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                        {
                          label: isAdult
                            ? intl.formatMessage({
                                defaultMessage:
                                  'Use a variety of grammatical forms',
                              })
                            : intl.formatMessage({
                                // defaultMessage: 'Speak in full sentences',
                                defaultMessage: 'Speak in complex sentences',
                              }),
                          properties: [
                            {
                              name: 'grammatical2Score',
                              isTextArea: false,
                              placeholder: scorePlaceHolder,
                            },
                            {
                              name: 'grammatical2',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                        {
                          label: isAdult
                            ? intl.formatMessage({
                                defaultMessage: 'Avoid grammatical mistakes',
                              })
                            : intl.formatMessage({
                                defaultMessage:
                                  'Use correct tense with correct form of verbs',
                              }),
                          properties: [
                            {
                              name: 'grammatical3Score',
                              isTextArea: false,
                              placeholder: scorePlaceHolder,
                            },
                            {
                              name: 'grammatical3',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                    <TestResultPart
                      errors={errors}
                      control={control}
                      title="4.Pronunciation"
                      collections={[
                        {
                          label: isAdult
                            ? intl.formatMessage({
                                defaultMessage: 'Pronounce words accurately',
                              })
                            : intl.formatMessage({
                                defaultMessage: 'Pronounce clearly',
                              }),
                          properties: [
                            {
                              name: 'pronunciation1Score',
                              isTextArea: false,
                              placeholder: scorePlaceHolder,
                            },
                            {
                              name: 'pronunciation1',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                        {
                          label: isAdult
                            ? intl.formatMessage({
                                defaultMessage: 'Join sounds together',
                              })
                            : intl.formatMessage({
                                defaultMessage:
                                  'Pronounce with ending sounds, stresses and intonations',
                              }),
                          properties: [
                            {
                              name: 'pronunciation2Score',
                              isTextArea: false,
                              placeholder: scorePlaceHolder,
                            },
                            {
                              name: 'pronunciation2',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'Vary intonation',
                          }),
                          isHidding: !isAdult,
                          properties: [
                            {
                              name: 'pronunciation3Score',
                              isTextArea: false,
                              placeholder: scorePlaceHolder,
                            },
                            {
                              name: 'pronunciation3',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                    <TestResultPart
                      errors={errors}
                      control={control}
                      title="5.Personal Criteria"
                      collections={[
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'Attitude towards English learning',
                          }),
                          properties: [
                            {
                              name: 'personalCriteria1',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'Second Language Acquisition',
                          }),
                          properties: [
                            {
                              name: 'personalCriteria2',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                    <TestResultPart
                      errors={errors}
                      control={control}
                      // title="Additional Notes & Recommendations"
                      title="6. Comment"
                      collections={[
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'Strengths',
                          }),
                          properties: [
                            {
                              name: 'comment1',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'Weakness',
                          }),
                          properties: [
                            {
                              name: 'comment2',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'Recommendation',
                          }),
                          properties: [
                            {
                              name: 'comment3',
                              isTextArea: true,
                              placeholder: intl.formatMessage({
                                // defaultMessage: 'note',
                                defaultMessage: 'Details',
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                    <Spacer size="m" />
                    <FlexGroup
                      gutterSize="none"
                      style={{ maxWidth: '250px' }}
                      responsive={false}
                      className="flex items-center justify-start"
                    >
                      <FlexItem>
                        <Text color="#343741">
                          <p>
                            <FormattedMessage defaultMessage="Total Score" />
                          </p>
                        </Text>
                      </FlexItem>
                      <FlexItem>
                        <Controller
                          name="sumScore"
                          control={control}
                          render={({ field: { ref, ...fieldRest } }) => (
                            <FieldText
                              inputRef={ref}
                              {...fieldRest}
                              readOnly
                              className="text-red-600 w-32"
                            />
                          )}
                        />
                      </FlexItem>
                    </FlexGroup>
                    <FlexGroup
                      gutterSize="none"
                      style={{ maxWidth: '360px', marginTop: '10px' }}
                      responsive={false}
                      className="flex items-center justify-start"
                    >
                      <FlexItem>
                        <Text color="#343741">
                          <p>
                            <FormattedMessage defaultMessage="Level" />
                          </p>
                        </Text>
                      </FlexItem>
                      <FlexItem grow={2}>
                        <FieldText
                          className="text-red-600 w-32"
                          readOnly
                          value={generateCer()}
                        />
                      </FlexItem>
                    </FlexGroup>
                  </Form>
                </section>
              ),
            },
            {
              id: 'teenagers-adult',
              name: <FormattedMessage defaultMessage="Teenagers &amp; Adult" />,
              content: (
                <>
                  <TestResultFormTeenagers
                    isAdult={isAdult}
                    sessionId={sessionId}
                    mutate={mutate}
                  />
                </>
              ),
            },
          ]}
          expand
        />
      </div>
    </>
  );
};

export default TestResultForm;
