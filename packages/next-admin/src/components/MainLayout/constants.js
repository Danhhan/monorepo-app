import { defineMessage } from 'react-intl';

export const NAVBAR_GROUPS = [
  {
    id: 'userManagement',
    message: defineMessage({ defaultMessage: 'Student Management' }),
    iconType: 'usersRolesApp',
    children: [
      {
        message: defineMessage({ defaultMessage: 'Student List' }),
        path: '/students',
      },
    ],
  },
  {
    id: 'courseManagement',
    message: defineMessage({ defaultMessage: 'Courses Management' }),
    iconType: 'indexRollupApp',
    children: [
      {
        message: defineMessage({ defaultMessage: 'Testing course List' }),
        path: '/testing-courses',
      },
      {
        message: defineMessage({ defaultMessage: 'Trial course List' }),
        path: '/trial-courses',
      },
    ],
  },
  {
    id: 'marketingManagement',
    message: defineMessage({ defaultMessage: 'Marketing Management' }),
    iconType: 'metricsApp',
    children: [
      {
        message: defineMessage({ defaultMessage: 'Affiliate management' }),
        path: '/affiliate/campaign-report',
      },
    ],
  },
  // {
  //   id: 'testingCourseManagement',
  //   message: defineMessage({ defaultMessage: 'Testing Course Management' }),
  //   iconType: 'reportingApp',
  //   children: [
  //     {
  //       message: defineMessage({ defaultMessage: 'Testing Course List' }),
  //       path: '/testing-courses',
  //     },
  //   ],
  // },
  // {
  //   id: 'trialCourseManagement',
  //   message: defineMessage({ defaultMessage: 'Trial Course Management' }),
  //   iconType: 'reportingApp',
  //   children: [
  //     {
  //       message: defineMessage({ defaultMessage: 'Trial Course List' }),
  //       path: '/trial-courses',
  //     },
  //   ],
  // },
  {
    id: 'testerManagement',
    message: defineMessage({ defaultMessage: 'Teachers Management' }),
    iconType: 'metricsApp',
    children: [
      {
        message: defineMessage({ defaultMessage: 'Teachers Test List' }),
        path: '/teachers-test',
      },
      {
        message: defineMessage({ defaultMessage: 'Teachers Trial List' }),
        path: '/teachers-trial',
      },
    ],
  },
  {
    id: 'contactManagement',
    message: defineMessage({ defaultMessage: 'Contact Management' }),
    iconType: 'indexRollupApp',
    children: [
      {
        message: defineMessage({ defaultMessage: 'Contact List' }),
        path: '/contacts',
      },
      {
        message: defineMessage({ defaultMessage: 'My contact list' }),
        path: '/my-contacts',
      },
    ],
  },
  {
    id: 'contractManagement',
    message: defineMessage({ defaultMessage: 'Contract Management' }),
    iconType: 'indexRollupApp',
    children: [
      {
        message: defineMessage({ defaultMessage: 'Contract List' }),
        path: '/contracts',
      },
      {
        message: defineMessage({ defaultMessage: 'Create a contract' }),
        path: '/contracts/create',
      },
    ],
  },
  {
    id: 'priceManagement',
    message: defineMessage({ defaultMessage: 'Prices Management' }),
    iconType: 'metricsApp',
    children: [
      {
        message: defineMessage({ defaultMessage: 'Price calculate' }),
        path: '/prices/calculate',
      },
    ],
  },
];

export const DEFAULT_PINNED_ITEMS = [
  {
    message: defineMessage({ defaultMessage: 'Dashboard' }),
    iconType: 'home',
    pinnable: false,
    isActive: true,
    path: '/',
  },
  {
    message: defineMessage({ defaultMessage: 'Sales Report' }),
    iconType: 'filebeatApp',
    pinnable: false,
    isActive: true,
    path: '/sales-report',
  },
  {
    message: defineMessage({ defaultMessage: 'Sales Report V2' }),
    iconType: 'filebeatApp',
    pinnable: false,
    isActive: true,
    path: '/sales-report-v2',
  },
  {
    message: defineMessage({ defaultMessage: 'Referral Report' }),
    iconType: 'filebeatApp',
    pinnable: false,
    isActive: true,
    path: '/referral-report',
  },
  {
    message: defineMessage({ defaultMessage: 'Self Booked Report' }),
    iconType: 'filebeatApp',
    pinnable: false,
    isActive: true,
    path: '/self-booked-report',
  },
  {
    message: defineMessage({ defaultMessage: 'Tester Report' }),
    iconType: 'indexRollupApp',
    pinnable: false,
    isActive: true,
    path: '/tester-report',
  },
  {
    message: defineMessage({ defaultMessage: 'Trial Report' }),
    iconType: 'indexRollupApp',
    pinnable: false,
    isActive: true,
    path: '/trial-report',
  },
  {
    message: defineMessage({ defaultMessage: 'Marketing Report' }),
    iconType: 'indexRollupApp',
    pinnable: false,
    isActive: true,
    path: '/marketing-report',
  },
];
