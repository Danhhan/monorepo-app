import { htmlIdGenerator } from '@antoree/ant-ui';
import { lazy } from 'react';

export const ACCECPTED_MODULES = [
  '',
  'students',
  'testing-courses',
  'teacher-detail',
  'trial-courses',
  'sales-report',
  'sales-report-v2',
  'referral-report',
  'self-booked-report',
  'tester-report',
  'trial-report',
  'marketing-report',
  'teachers-test',
  'teachers-trial',
  'contacts',
  'my-contacts',
  'received-contacts',
  'contracts',
  'contracts/create',
  'error-403',
  'contracts',
  'contracts/create',
  'prices/calculate',
  'affiliate/campaigns',
  'affiliate/partner-report',
  'affiliate/campaign-report',
];

export const PRIVATE_ROUTES = [
  {
    id: htmlIdGenerator('route')(),
    path: '/',
    component: lazy(() => import('containers/Home')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/sales-report',
    component: lazy(() => import('containers/SalesReport')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/sales-report-v2',
    component: lazy(() => import('containers/SalesReport/SalesReportV2')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/self-booked-report',
    component: lazy(() => import('containers/SalesReport/SelfBookedReport')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/referral-report',
    component: lazy(() => import('containers/SalesReport/ReferralReport')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/tester-report',
    component: lazy(() => import('containers/TesterReport')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/trial-report',
    component: lazy(() => import('containers/TrialReport')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/marketing-report',
    component: lazy(() => import('containers/MarketingReport')),
    exact: false,
  },
  //* Student routes
  {
    id: htmlIdGenerator('route')(),
    path: '/students',
    component: lazy(() => import('containers/Student/Students')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/students/:id',
    component: lazy(() => import('containers/Student/StudentDetail')),
    exact: true,
  },

  //* Testing course routes
  {
    id: htmlIdGenerator('route')(),
    path: '/testing-courses',
    component: lazy(() => import('containers/TestingCourse/TestingCourses')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/testing-courses/:id',
    component: lazy(() =>
      import('containers/TestingCourse/TestingCourseDetail'),
    ),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/testing-courses/:id/result',
    component: lazy(() =>
      import('containers/TestingCourse/TestingResultDetail'),
    ),
    exact: true,
  },

  //* Trial course routes
  {
    id: htmlIdGenerator('route')(),
    path: '/trial-courses',
    component: lazy(() => import('containers/TrialCourse/TrialCourses')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/trial-courses-v2',
    component: lazy(() => import('containers/TrialCourse/TrialCourses')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/trial-courses/:id',
    component: lazy(() => import('containers/TrialCourse/TrialCourseDetail')),
    exact: true,
  },

  //* Tester routes
  {
    id: htmlIdGenerator('route')(),
    path: '/teachers-test',
    component: lazy(() => import('containers/TeacherTest/TeacherTestList')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/teachers-trial',
    component: lazy(() => import('containers/TeachersTrial/TeacherTrialList')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/teacher-detail/:id',
    component: lazy(() => import('containers/TeacherDetail')),
    exact: true,
  },
  // contacts management
  {
    id: htmlIdGenerator('route')(),
    path: '/contacts',
    component: lazy(() => import('containers/Contact/Contacts')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/my-contacts',
    component: lazy(() => import('containers/Contact/MyContact/MyContacts')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/received-contacts',
    component: lazy(() =>
      import('containers/Contact/MyContact/ContactsReceived'),
    ),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/contacts/learning-requests/:requestId/handover/create',
    component: lazy(() =>
      import('containers/Contact/LearningRequest/CreateHandover'),
    ),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/contacts/learning-requests/:requestId/handover',
    component: lazy(() =>
      import('containers/Contact/LearningRequest/ViewHandover'),
    ),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/contacts/learning-requests/:requestId/handover/edit',
    component: lazy(() =>
      import('containers/Contact/LearningRequest/EditHandover'),
    ),
    exact: true,
  },

  // contracts management
  {
    id: htmlIdGenerator('route')(),
    path: '/contracts',
    component: lazy(() => import('containers/Contract/Contracts')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/contracts/create',
    component: lazy(() => import('containers/Contract/Create')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/contracts/:id',
    component: lazy(() => import('containers/Contract/View')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/contracts/:id/edit',
    component: lazy(() => import('containers/Contract/Update')),
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/prices/calculate',
    component: lazy(() => import('containers/Price/CalculatePrice')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/prices/calculate',
    component: lazy(() => import('containers/Price/CalculatePrice')),
    exact: true,
  },
  // Affiliate management
  {
    id: htmlIdGenerator('route')(),
    path: '/affiliate/campaigns',
    component: lazy(() => import('containers/Affiliate')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/affiliate/partner-report',
    component: lazy(() => import('containers/Affiliate')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/affiliate/partner-report/:id',
    component: lazy(() => import('containers/Affiliate')),
    exact: true,
  },
  {
    id: htmlIdGenerator('route')(),
    path: '/affiliate/campaign-report',
    component: lazy(() => import('containers/Affiliate')),
    exact: true,
  },
];
