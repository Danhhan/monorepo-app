/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
/* eslint-disable react/prop-types */
import * as yup from 'yup';
import { FormattedMessage } from 'react-intl';

export const adultType = '1';
export const childType = '2';

export const totalScoreCount = (isAdult, scoresArr) => {
  const totalScore = scoresArr.reduce((acc, val) => {
    const a = acc ? parseInt(acc) : 0;
    const b = val ? parseInt(val) : 0;
    return a + b;
  }, 0);

  if (isAdult) {
    // round .5
    // 1.7 -> 2, 1.2 -> 1, 1.3 -> 1.5
    const realScore = totalScore / 12;
    const integralPart = realScore.toFixed(1);
    // console.log(totalScore, 'adult');
    return Math.round(integralPart * 2) / 2;
  }

  //   else if (studentType === childType)
  // console.log(totalScore, 'kid');
  return totalScore;
};

export const kidConfGrade = [
  {
    maxPoint: 5,
    label: 'Pre-A1',
  },
  {
    maxPoint: 10,
    label: 'Upper Pre-A1',
  },
  {
    maxPoint: 15,
    label: 'A1',
  },
  {
    maxPoint: 20,
    label: 'Upper A1',
  },
  {
    maxPoint: 25,
    label: 'Pre-A2',
  },
  {
    maxPoint: 30,
    label: 'A1',
  },
];

export const adultConfGrade = [
  {
    maxPoint: 1,
    label: 'A0 (Starter)',
  },
  {
    maxPoint: 2.5,
    label: 'A1 (Beginner)',
  },
  {
    maxPoint: 3.5,
    label: 'A2 (Elementary)',
  },
  {
    maxPoint: 5,
    label: 'B1 (Intermediate)',
  },
  {
    maxPoint: 6.5,
    label: 'B2 (Upper Intermediate)',
  },
  {
    maxPoint: 8,
    label: 'C1 (Advanced)',
  },
  {
    maxPoint: 9,
    label: 'C2 (Profiency)',
  },
];

export const FORM_DEFAULT_VALUES = isAdult => ({
  fluency1: undefined,
  fluency1Score: undefined,
  fluency2: undefined,
  fluency2Score: undefined,
  fluency3: undefined,
  fluency3Score: undefined,
  lexical1: undefined,
  lexical1Score: undefined,
  lexical2: undefined,
  lexical2Score: undefined,
  lexical3: isAdult ? undefined : '',
  lexical3Score: isAdult ? undefined : 0,
  grammatical1: undefined,
  grammatical1Score: undefined,
  grammatical2: undefined,
  grammatical2Score: undefined,
  grammatical3: undefined,
  grammatical3Score: undefined,
  pronunciation1: undefined,
  pronunciation1Score: undefined,
  pronunciation2: undefined,
  pronunciation2Score: undefined,
  pronunciation3: isAdult ? undefined : '',
  pronunciation3Score: isAdult ? undefined : 0,
  personalCriteria1: undefined,
  personalCriteria2: undefined,
  comment1: undefined,
  comment2: undefined,
  comment3: undefined,
  sumScore: undefined,
  testType: isAdult ? adultType : childType,
});
export const FORM_DEFAULT_VALUES_TEENAGERS = isAdult => ({
  fluency1: undefined,
  fluency1Score: undefined,
  fluency2: undefined,
  fluency2Score: undefined,
  fluency3: undefined,
  fluency3Score: undefined,
  lexical1: undefined,
  lexical1Score: undefined,
  lexical2: undefined,
  lexical2Score: undefined,
  lexical3: isAdult ? undefined : '',
  lexical3Score: isAdult ? undefined : 0,
  grammatical1: undefined,
  grammatical1Score: undefined,
  grammatical2: undefined,
  grammatical2Score: undefined,
  grammatical3: undefined,
  grammatical3Score: undefined,
  pronunciation1: undefined,
  pronunciation1Score: undefined,
  pronunciation2: undefined,
  pronunciation2Score: undefined,
  pronunciation3: isAdult ? undefined : '',
  pronunciation3Score: isAdult ? undefined : 0,
  personalCriteria1: undefined,
  personalCriteria2: undefined,
  comment1: undefined,
  comment2: undefined,
  comment3: undefined,
  sumScore: undefined,
  testType: isAdult ? adultType : childType,
});
export const SCHEMA = isAdult => {
  const maxValue = isAdult ? 9 : 3;
  return yup.object().shape({
    fluency1: yup.string(),
    fluency1Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    fluency2: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    fluency2Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    fluency3: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    fluency3Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    lexical1: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    lexical1Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    lexical2: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    lexical2Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    lexical3: yup.string().when('testType', {
      is: adultType,
      then: yup
        .string()
        .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    }),
    lexical3Score: yup
      .number()
      .max(maxValue)
      .when('testType', {
        is: adultType,
        then: yup
          .number()
          .required(
            <FormattedMessage defaultMessage="This Field Is Require" />,
          ),
      }),
    grammatical1: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    grammatical1Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    grammatical2: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    grammatical2Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    grammatical3: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    grammatical3Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    pronunciation1: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    pronunciation1Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    pronunciation2: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    pronunciation2Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    pronunciation3: yup.string().when('testType', {
      is: adultType,
      then: yup
        .string()
        .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    }),
    pronunciation3Score: yup
      .number()
      .max(maxValue)
      .when('testType', {
        is: adultType,
        then: yup
          .number()
          .required(
            <FormattedMessage defaultMessage="This Field Is Require" />,
          ),
      }),
    personalCriteria1: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    personalCriteria2: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    comment1: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    comment2: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    comment3: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
  });
};
export const SCHEMATEENAGERS = isAdult => {
  const maxValue = !isAdult ? 9 : 3;
  return yup.object().shape({
    fluency1: yup.string(),
    fluency1Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    fluency2: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    fluency2Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    fluency3: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    fluency3Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    lexical1: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    lexical1Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    lexical2: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    lexical2Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    lexical3: yup.string().when('testType', {
      is: adultType,
      then: yup
        .string()
        .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    }),
    lexical3Score: yup
      .number()
      .max(maxValue)
      .when('testType', {
        is: adultType,
        then: yup
          .number()
          .required(
            <FormattedMessage defaultMessage="This Field Is Require" />,
          ),
      }),
    grammatical1: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    grammatical1Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    grammatical2: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    grammatical2Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    grammatical3: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    grammatical3Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    pronunciation1: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    pronunciation1Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    pronunciation2: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    pronunciation2Score: yup
      .number()
      .max(maxValue)
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    pronunciation3: yup.string().when('testType', {
      is: adultType,
      then: yup
        .string()
        .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    }),
    pronunciation3Score: yup
      .number()
      .max(maxValue)
      .when('testType', {
        is: adultType,
        then: yup
          .number()
          .required(
            <FormattedMessage defaultMessage="This Field Is Require" />,
          ),
      }),
    personalCriteria1: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    personalCriteria2: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    comment1: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    comment2: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
    comment3: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
  });
};
