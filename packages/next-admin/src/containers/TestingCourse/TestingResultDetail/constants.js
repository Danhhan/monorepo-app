/* eslint-disable radix */

import { defineMessage } from 'react-intl';

export const TYPE_KID = 2;
export const TYPE_ADULT = 1;

export const TYPES = [
  {
    label: defineMessage({ defaultMessage: 'Young learner' }),
    value: TYPE_KID,
  },
  {
    label: defineMessage({ defaultMessage: 'Teenager/Adult' }),
    value: TYPE_ADULT,
  },
];

export const GENDER_MALE = 1;
export const GENDER_FEMALE = 2;
export const GENDER_OTHER = 3;

export const GENDER = [
  {
    value: GENDER_MALE,
    label: defineMessage({ defaultMessage: 'Male' }),
  },
  {
    value: GENDER_FEMALE,
    label: defineMessage({ defaultMessage: 'Female' }),
  },
  {
    value: GENDER_OTHER,
    label: defineMessage({ defaultMessage: 'Other' }),
  },
];

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
