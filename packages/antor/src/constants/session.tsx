import { defineMessage } from 'react-intl';
import testResultIcon from 'assets/icons/course/testResult.svg';
import docFile from 'assets/icons/course/docFile.svg';
import pptFile from 'assets/icons/course/ppt.svg';

export const UNDEFINED = -1;
export const UPCOMING = 1;
export const HAPPENING = 2;
export const HAPPENED = 3; // Completed
export const UNHAPPENED = 4;
export const JOINED = 11;

export const ABSENT_BY_TEACHER = 1;
export const ABSENT_BY_STUDENT = 0;

export const TYPE_TEST = 4;

export const SESSION_STATUS = [
  {
    label: defineMessage({ defaultMessage: 'Upcoming' }),
    value: UPCOMING,
    color: '#FFC700',
  },
  {
    label: defineMessage({ defaultMessage: 'Happening' }),
    value: HAPPENING,
    color: '#064CFF',
  },
  {
    label: defineMessage({ defaultMessage: 'Completed' }),
    value: HAPPENED,
    color: '#00C081',
  },
  {
    label: defineMessage({ defaultMessage: 'Not Happened' }),
    value: UNHAPPENED,
    color: '#ED0000',
  },
  {
    label: defineMessage({ defaultMessage: 'Session Status' }),
    value: UNDEFINED,
  },
];
export const PNG_VALUE = 1;
export const PDF_VALUE = 2;
export const WORD_VALUE = 3;
export const JPEG_VALUE = 4;

export type fileType = {
  name: string;
  type: string;
  value?: number;
  suffixType: string;
  icon?: string;
};

export const HOME_WORK_FILES: fileType[] = [
  {
    name: 'HomeWork',
    type: 'image/png',
    value: PNG_VALUE,
    suffixType: 'png',
  },
  {
    name: 'HomeWork',
    type: 'application/pdf',
    value: PDF_VALUE,
    suffixType: 'pdf',
    icon: testResultIcon,
  },
  {
    name: 'HomeWork',
    type:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    value: WORD_VALUE,
    suffixType: 'doc',
    icon: docFile,
  },
  {
    name: 'HomeWork',
    type: 'image/jpeg',
    value: JPEG_VALUE,
    suffixType: 'jpeg',
  },
  {
    name: 'HomeWork',
    type: 'application/vnd.ms-powerpoint',
    // value: JPEG_VALUE,
    suffixType: 'ppt',
    icon: pptFile,
  },
];
