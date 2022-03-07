/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  FlexGroup,
  FlexItem,
  notification,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  PageContentHeader,
  PageContentHeaderSection,
  PageHeader,
  Spacer,
  Title,
} from '@antoree/ant-ui';
import { FilterBar } from 'components';
import { useBreadcrumbs, useFormModal, usePagiantion } from 'hooks';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import {
  bulkUpdate,
  getContacts,
  GET_CONTACT,
  updateContact,
} from 'services/contact';
import { updateLearningRequestNote } from 'services/learningRequest';
import { NumberParam, StringParam, withDefault } from 'use-query-params';
import {
  AutoDevideModal,
  ContactTable,
  ReAssignModal,
  UtmFilterModal,
} from '../components';
import FilterButtonGroups from '../components/FilterButtonGroups';
import {
  CONTACT_STATUS,
  LRID_OPTION_VALUE,
  TERM_OPTION_VALUE,
} from '../constant';

const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: <FormattedMessage defaultMessage="Contact List" />,
  },
];

function Contacts() {
  const intl = useIntl();
  const history = useHistory();
  useBreadcrumbs(breadcrumbs);
  const [contacts, setContacts] = useState([]);
  const [isMultiSelected, setIsMultiSelected] = useState(false);
  const [isOpenAutoDevide, setIsOpenAutoDevide] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const {
    pageIndex,
    pageSize,
    search,
    status,
    typeSearch,
    query,
    createdAtFrom,
    createdAtTo,
    source,
    campaign,
    caredBy,
    leaderTab,
    ctvTab,
    onTableChangeHandler,
    onInputChange,
    onSelect,
    onSearch,
  } = usePagiantion({
    search: withDefault(StringParam, ''),
    source: withDefault(StringParam, ''),
    campaign: withDefault(StringParam, ''),
    status: withDefault(NumberParam, ''),
    caredBy: withDefault(NumberParam, ''),
    typeSearch: withDefault(NumberParam, 1),
    createdAtFrom: withDefault(StringParam, ''),
    createdAtTo: withDefault(StringParam, ''),
    leaderTab: withDefault(StringParam, ''),
    ctvTab: withDefault(StringParam, ''),
  });
  const { data, error, isLoading, isFetching } = useQuery(
    [GET_CONTACT, query],
    () =>
      getContacts({
        pageIndex,
        pageSize,
        status,
        requestId: typeSearch === LRID_OPTION_VALUE ? search : undefined,
        term:
          typeSearch === TERM_OPTION_VALUE
            ? search.replace(/(^0|^84|^\+84)/g, '')
            : undefined,
        createdAtFrom,
        createdAtTo,
        source,
        campaign,
        caredBy,
        leaderTab,
        ctvTab,
      }),
    {
      onError: err => {
        if (err?.response?.status === 403) {
          history.push('/error-403');
        }
      },
      retry: 1,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  );
  // console.log('leaderTab', leaderTab);
  useEffect(() => {
    const localContacts = data?.data?.map(contact => {
      const localContact = contact;
      localContact.checked = false;
      localContact.opened = false;
      return localContact;
    });
    setContacts(localContacts);
  }, [data]);
  const onChangeSwitch = e => {
    e.preventDefault();
    setIsMultiSelected(e.target.checked);
    // eslint-disable-next-line no-unused-vars
    const localContacts = data?.data.map(contact => {
      const localContact = contact;
      localContact.checked = false;
      return localContact;
    });
  };
  const updateContactChecked = id => {
    const index = contacts.findIndex(contact => contact.id === id);
    if (!contacts[index]) {
      return;
    }
    const contactsNew = [...contacts];
    const contactSelectedIds = [];
    switch (contactsNew[index].checked) {
      case true:
        contactsNew[index].checked = false;
        break;
      case false:
        contactSelectedIds.push(id);
        contactsNew[index].checked = true;
        break;
      default:
    }
    setContacts(contactsNew);
  };
  const {
    isVisible: isVisibleReassign,
    show: showReassign,
    close: closeReassign,
  } = useFormModal();

  const queryClient = useQueryClient();
  const bulkUpdateContactMutation = useMutation(
    mutateData => bulkUpdate(mutateData),
    {
      onSuccess: () => {
        notification.success({
          title: <FormattedMessage defaultMessage="Successfully" />,
          text: (
            <FormattedMessage defaultMessage="Devide contact successfully!" />
          ),
        });
        queryClient.invalidateQueries(GET_CONTACT);
      },
      onError: err => {
        notification.error({
          title: <FormattedMessage defaultMessage="Failure" />,
          text: <FormattedMessage defaultMessage="Not enough contact" />,
        });
      },
    },
  );
  const bulkUpdateContact1Mutation = useMutation(
    mutateData => bulkUpdate(mutateData),
    {
      onSuccess: () => {
        notification.success({
          title: <FormattedMessage defaultMessage="Successfully" />,
          text: (
            <FormattedMessage defaultMessage="Reassign contact successfully!" />
          ),
        });
        queryClient.invalidateQueries(GET_CONTACT);
        closeReassign();
      },
      onError: () => {
        notification.error({
          title: <FormattedMessage defaultMessage="Failure" />,
          text: <FormattedMessage defaultMessage="Something went wrong!" />,
        });
      },
    },
  );
  const updateContactMutation = useMutation(
    mutateData => updateContact(mutateData),
    {
      onSuccess: () => {
        notification.success({
          title: 'Update contact successfully',
        });
        queryClient.invalidateQueries(GET_CONTACT);
        closeReassign();
      },
      onError: err => {
        notification.error({
          title: err?.message ?? 'Reassign failure',
        });
      },
    },
  );
  const updateLearningRequestNoteMutation = useMutation(
    mutateData => updateLearningRequestNote(mutateData),
    {
      onSuccess: () => {
        notification.success({
          title: 'Create note successfully',
        });
        queryClient.invalidateQueries(GET_CONTACT);
      },
      onError: err => {
        notification.error({
          title: err?.message ?? 'Create note failure',
        });
      },
    },
  );

  const [currentFilterBtn, setCurrentUserFilterBtn] = useState();
  useEffect(() => {
    if (currentFilterBtn?.paramName && data?.pagination?.totalItems > 0) {
      setIsOpenAutoDevide(true);
    } else {
      setIsOpenAutoDevide(false);
    }
  }, [data?.pagination?.totalItems, currentFilterBtn]);

  const updateContactAllChecked = () => {
    setIsCheckedAll(prev => {
      const newContacts = [...contacts].map(item => {
        return {
          ...item,
          checked: !prev,
        };
      });
      setContacts(newContacts);
      return !prev;
    });
  };
  useEffect(() => {
    const checkedAll = contacts?.every(contact => contact.checked);
    setIsCheckedAll(checkedAll);
  }, [contacts]);

  return (
    <Page>
      <PageBody component="main">
        <PageHeader
          pageTitle={
            <FlexGroup gutterSize="s" direction="row">
              <FlexItem grow={false}>
                <Title className="w-52">
                  <h2>
                    <FormattedMessage defaultMessage="Contact List" />
                  </h2>
                </Title>
              </FlexItem>
              <FlexItem grow={false}>
                <FilterButtonGroups
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  search={search}
                  status={status}
                  query={query}
                  createdAtFrom={createdAtFrom}
                  createdAtTo={createdAtTo}
                  source={source}
                  campaign={campaign}
                  caredBy={caredBy}
                  leaderTab={leaderTab}
                  ctvTab={ctvTab}
                  onSelect={onSelect}
                  handleGetFilterButton={value =>
                    setCurrentUserFilterBtn(value)
                  }
                  contacts={data}
                  isFetching={isFetching}
                />
              </FlexItem>
            </FlexGroup>
          }
        />
        <ReAssignModal
          isVisible={isVisibleReassign}
          closeModal={() => {
            closeReassign();
          }}
          handleReassignContact={updateContactMutation}
          handleBulkUpdate={bulkUpdateContact1Mutation}
          totalItemCount={data?.pagination?.totalItems ?? 0}
          contactIds={contacts
            ?.filter(contact => contact.checked)
            ?.map(contact => contact.id)}
          idSelected={idSelected}
        />
        <PageContent>
          <PageContentHeader>
            <Spacer />
            <PageContentHeaderSection className="flex-grow">
              <FlexGroup alignItems="center" gutterSize="xs">
                <AutoDevideModal
                  isOpenAutoDevide={isOpenAutoDevide}
                  handleBulkDevide={bulkUpdateContactMutation}
                  currentContacts={data?.pagination?.totalItems ?? 0}
                  leaderTab={leaderTab}
                />
                <FlexItem>
                  <FlexGroup justifyContent="flexEnd" gutterSize="xs">
                    <FilterBar
                      optionsData={CONTACT_STATUS}
                      onInputChange={onInputChange}
                      keySearch="search"
                      onSelect={onSelect}
                      keyOption="status"
                      optionValue={status}
                      keyFromDateTime="createdAtFrom"
                      keyToDateTime="createdAtTo"
                      query={query}
                    />
                    <UtmFilterModal
                      campaign={campaign}
                      source={source}
                      onSearch={onSearch}
                    />
                  </FlexGroup>
                </FlexItem>
              </FlexGroup>
              <Spacer />
            </PageContentHeaderSection>
          </PageContentHeader>
          <PageContentBody>
            <ContactTable
              isLoading={isLoading}
              isFetching={isFetching}
              error={error}
              contacts={contacts}
              updateLearningRequestNoteMutation={
                updateLearningRequestNoteMutation
              }
              onTableChangeHandler={onTableChangeHandler}
              pageIndex={pageIndex}
              pageSize={pageSize}
              data={data}
              isMultiSelected={isMultiSelected}
              updateContactAllChecked={updateContactAllChecked}
              isCheckedAll={isCheckedAll}
              updateContactChecked={updateContactChecked}
              onChangeSwitch={onChangeSwitch}
              showReassign={showReassign}
              onChangeSelectedContactId={id => setIdSelected(id)}
              updateContactMutation={updateContactMutation}
            />
          </PageContentBody>
        </PageContent>
      </PageBody>
    </Page>
  );
}

export default Contacts;
