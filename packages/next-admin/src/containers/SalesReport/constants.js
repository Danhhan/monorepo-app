const BIG_TEAM_EXTRACTED = [
  { label: 'TeamOrder', value: 'order' },
  { label: 'TeamName', value: 'team_name' },
  { label: 'Contacts', value: 'total_contacts' },
  { label: 'Tested', value: 'total_tested' },
  { label: 'Trial Booked', value: 'total_trials' },
  { label: 'Customer', value: 'total_customer' },
  {
    label: 'Tested/Contacts',
    value: 'total_div_tested_contacts',
  },
  { label: 'Trial/Tested', value: 'total_div_trial_test' },
  {
    label: 'Customer/Contact',
    value: 'total_div_customer_contract',
  },
  { label: 'Conversion Cost', value: 'total_contact_fee' },
  { label: 'ROI', value: 'total_ROI' },
  { label: 'GMV', value: 'total_gmv_amount' },
];

const SUB_TEAM_EXTRACTED = [
  { label: 'TeamID', value: 'id' },
  { label: 'TeamName', value: 'name' },
  { label: 'Contacts', value: 'total_contacts' },
  { label: 'Tested', value: 'total_tested' },
  { label: 'Trial Booked', value: 'total_trials' },
  { label: 'Customer', value: 'total_customer' },
  {
    label: 'Tested/Contacts',
    value: 'total_div_tested_contacts',
  },
  { label: 'Trial/Tested', value: 'total_div_trial_test' },
  {
    label: 'Customer/Contact',
    value: 'total_div_customer_contract',
  },
  { label: 'Conversion Cost', value: 'total_contact_fee' },
  { label: 'ROI', value: 'total_ROI' },
  { label: 'GMV', value: 'total_gmv_amount' },
];
const UTM_SOURCE_LIST = [
  {
    id: 0,
    name: 'Mobile-Referral',
    checked: 'on',
    value: '[Mobile-Referral][ASR]',
  },
  { id: 1, name: 'Mobile-AS', value: '[Mobile][AS]' },
  { id: 2, name: 'Web-AS', value: '[WEB][AS]' },
  {
    id: 3,
    name: 'CRM-Manual',
    checked: 'on',
    value: [
      'FBAsk',
      'community',
      'Marketing online',
      'Book Test Website',
      'Homepage',
      'LDPKid',
      'LDPWork',
      'HOTLINE',
    ],
  },
  {
    id: 4,
    name: 'Marketing + Mobile',
    value: '[MANUAL-MOBILE-AS]',
  },
  {
    id: 5,
    name: 'Marketing + Web',
    value: '[MANUAL-WEB-AS]',
  },
  { id: 6, name: 'Landing page', value: ['LDPKid', 'LDPWork'] },
  { id: 7, name: 'NEX-AS', value: ['System.Next-Admin', '[Next-Admin][NA]'] },
];

export { BIG_TEAM_EXTRACTED, SUB_TEAM_EXTRACTED, UTM_SOURCE_LIST };
