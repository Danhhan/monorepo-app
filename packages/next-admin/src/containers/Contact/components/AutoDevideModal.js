import {
  BasicTable,
  Button,
  ButtonEmpty,
  Checkbox,
  FieldNumber,
  FieldSearch,
  FilterButton,
  FilterGroup,
  FlexGroup,
  FlexItem,
  FormRow,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  notification,
  Spacer,
  Text,
  Title,
  Icon,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { getSaleMembers, GET_SALE_MEMBERS } from 'services/team';
import { useToggle } from 'hooks';
import {
  getItem,
  handleDataItem,
  removeAllItem,
  removeItem,
  storeItem,
} from './LocalStorage';

function AutoDevideModal({
  closeModal,
  handleBulkDevide,
  currentContacts,
  leaderTab,
  isOpenAutoDevide,
}) {
  const [checkedAll, setCheckedAll] = useState(false);
  const [carers, setCarers] = useState([]);
  const [totalContactDevide, setTotalContactDevide] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [role, setRole] = useState('');
  const [term, setTerm] = useState('');
  const [filterOnLeader, setFilterOnLeader] = useState(false);

  const { isVisiable, open, close } = useToggle();

  const { data, error, isFetching } = useQuery(
    [GET_SALE_MEMBERS, { pageIndex, pageSize, role, term }],
    () => getSaleMembers({ pageIndex, pageSize, role, term }),
    {
      enabled: isVisiable,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  );
  useEffect(() => {
    if (data?.sales.length > 0) {
      const newCarers = [...data?.sales];
      const carersChecked = getItem();
      const localCarers = newCarers.map(carer => {
        const localCarer = { ...carer };
        if (carersChecked?.length > 0) {
          const index = carersChecked?.findIndex(
            carerChecked => carerChecked.id === carer.id,
          );
          if (index !== -1) {
            if (carersChecked[index].checked) {
              localCarer.checked = carersChecked[index].checked;
              localCarer.numberContact = carersChecked[index].numberContact;
            }
          }
        }
        return localCarer;
      });
      setCarers(localCarers);
      setCheckedAll(localCarers?.every(newCarer => newCarer.checked));
      calculatorTotalNumberContact();
    }
  }, [data]);

  const onTableChange = ({ page = {} }) => {
    const { index, size } = page;
    setPageIndex(index);
    setPageSize(size);
  };
  const updateCare = id => {
    const index = carers.findIndex(carer => carer.id === id);
    const carersNew = [...carers];
    if (carersNew[index].checked) {
      delete carersNew[index].numberContact;
      delete carersNew[index].checked;
      removeItem([{ ...carersNew[index] }]);
    } else {
      carersNew[index].checked = true;
      carersNew[index].numberContact = 1;
      const items = handleDataItem([{ ...carersNew[index] }]);
      storeItem(items);
    }
    setCarers(carersNew);
    calculatorTotalNumberContact();
  };
  function updateCheckedAll(e) {
    setCheckedAll(e.target.checked);
    const carersNew = [...data?.sales];
    if (e.target.checked) {
      const carersChecked = getItem();
      const localCarers = carersNew.map(newCarer => {
        const localNewCarer = { ...newCarer };
        const filtered = carersChecked.filter(
          carer => carer?.id === localNewCarer?.id,
        );
        if (filtered[0]) {
          localNewCarer.numberContact = filtered[0]?.numberContact;
        } else {
          localNewCarer.numberContact = 1;
        }
        localNewCarer.checked = true;
        return localNewCarer;
      });
      setCarers(localCarers);
      const items = handleDataItem(localCarers);
      storeItem(items);
      calculatorTotalNumberContact();
    } else {
      setCarers(carersNew);
      removeItem(carersNew);
      calculatorTotalNumberContact();
    }
  }
  const onChangeNumberContact = (event, id) => {
    const index = carers.findIndex(carer => carer.id === id);
    const carersNew = [...carers];
    carersNew[index].numberContact = event.target.value;
    if (carersNew[index].numberContact > 0) {
      carersNew[index].checked = true;
      removeItem([{ ...carersNew[index] }]);
      const items = handleDataItem([{ ...carersNew[index] }]);
      storeItem(items);
    } else {
      carersNew[index].checked = false;
      removeItem([{ ...carersNew[index] }]);
    }
    calculatorTotalNumberContact(carersNew);
    setCarers(carersNew);
  };
  const calculatorTotalNumberContact = () => {
    const items = getItem();
    const totalContact = items.reduce((total, carer) => {
      return total + Number(carer.numberContact);
    }, 0);
    setTotalContactDevide(totalContact);
  };
  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount: data?.pagination?.totalItems ?? 0,
    pageSizeOptions: [5, 10, 25, 100],
    hidePerPageOptions: false,
  };

  const onSubmit = () => {
    const params = {};
    const localCarers = getItem();
    localCarers.map(care => {
      params[care.id] = Number(care.numberContact);
    });
    if (totalContactDevide === 0) {
      notification.error({
        title: (
          <FormattedMessage defaultMessage="Úi!, hãy chọn ít nhất một sale để chia nhé!" />
        ),
      });
      return;
    }
    if (totalContactDevide > currentContacts) {
      notification.error({
        title: (
          <FormattedMessage defaultMessage="Úi!, tổng contact chia phải nhỏ hơn hoặc bằng contact newly" />
        ),
      });
      return;
    }
    if (leaderTab) {
      handleBulkDevide.mutate({
        list_carer: params,
        auto_divide_by_leader: 1,
      });
    } else {
      handleBulkDevide.mutate({
        list_carer: params,
        auto_divide: 1,
      });
    }
  };
  useEffect(() => {
    if (handleBulkDevide.isSuccess) {
      resetModal();
      close();
    }
  }, [handleBulkDevide?.isSuccess]);
  const resetModal = () => {
    removeAllItem();
    setCheckedAll(false);
    setTotalContactDevide(0);
    setCarers(data?.sales);
    setPageSize(5);
    setPageIndex(0);
  };
  return (
    <>
      <FlexItem grow={false}>
        <Button
          // className="w-36 rounded-lg"
          isDisabled={!isOpenAutoDevide}
          fill
          color="warning"
          onClick={open}
        >
          <Text size="s" color="black">
            <p>
              <>
                <Icon type="indexMapping" className="mr-2" />
                <FormattedMessage defaultMessage="Chia tự động" />
              </>
            </p>
          </Text>
        </Button>
      </FlexItem>
      {isVisiable && (
        <Modal
          maxWidth={false}
          style={{ width: '793px' }}
          onClose={() => {
            close();
            resetModal();
          }}
        >
          <ModalHeader>
            <FlexGroup>
              <FlexItem>
                <Title className="text-left" size="xs">
                  <p>
                    <span>Contact đã chia: {totalContactDevide} |</span>&nbsp;
                    <span>Tổng contact newly hiện tại: {currentContacts}</span>
                  </p>
                </Title>
              </FlexItem>
            </FlexGroup>
          </ModalHeader>
          <ModalHeader>
            <FlexGroup>
              <FlexItem>
                <FilterGroup className="rounded-lg">
                  <FilterButton
                    size="s"
                    onClick={() => {
                      setRole('sales_leader');
                      setFilterOnLeader(true);
                    }}
                    hasActiveFilters={filterOnLeader}
                  >
                    Leaders
                  </FilterButton>
                  <FilterButton
                    size="s"
                    onClick={() => {
                      setRole('');
                      setFilterOnLeader(false);
                    }}
                    hasActiveFilters={!filterOnLeader}
                  >
                    Members
                  </FilterButton>
                </FilterGroup>
              </FlexItem>
              <FlexItem>
                <FormRow>
                  <FieldSearch
                    className="rounded-lg"
                    placeholder="Tìm kiếm"
                    compressed
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                    isClearable
                  />
                </FormRow>
              </FlexItem>
            </FlexGroup>
          </ModalHeader>
          <ModalBody>
            <div>
              <BasicTable
                tableLayout="fixed"
                loading={isFetching}
                error={error?.toString()}
                items={carers ?? []}
                columns={[
                  {
                    field: 'id',
                    name: (
                      <Checkbox
                        checked={checkedAll}
                        onChange={event => updateCheckedAll(event)}
                      />
                    ),
                    render: (id, { checked }) => (
                      <Checkbox
                        id={id}
                        checked={checked}
                        onChange={() => updateCare(id)}
                      />
                    ),
                    truncateText: true,
                    textOnly: true,
                    width: 50,
                  },
                  {
                    field: 'displayName',
                    name: <FormattedMessage defaultMessage="Tên" />,
                    truncateText: true,
                    textOnly: true,
                    render: (displayName, { email }) => (
                      <FlexGroup alignItems="center" gutterSize="xs">
                        <FlexItem>
                          <strong className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {displayName}
                          </strong>
                          <Spacer size="xs" />
                          <Text color="#828282">{email}</Text>
                        </FlexItem>
                      </FlexGroup>
                    ),
                  },
                  {
                    field: 'teamName',
                    name: <FormattedMessage defaultMessage="Team" />,
                    render: teamName => <span>{teamName}</span>,
                    truncateText: true,
                    textOnly: true,
                  },
                  {
                    field: 'numberContact',
                    name: (
                      <FormattedMessage defaultMessage="Số lượng contact" />
                    ),
                    render: (numberContact, { checked, id }) => (
                      <FieldNumber
                        compressed
                        fullWidth
                        placeholder="0"
                        value={numberContact || ''}
                        onChange={event => onChangeNumberContact(event, id)}
                      />
                    ),
                    truncateText: true,
                    textOnly: true,
                    width: 150,
                  },
                ]}
                onChange={onTableChange}
                pagination={pagination}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <ButtonEmpty
              onClick={() => {
                close();
                resetModal();
              }}
            >
              <Text size="s" color="black">
                <FormattedMessage defaultMessage="Cancle" />
              </Text>
            </ButtonEmpty>
            <Button
              fill
              color="warning"
              onClick={onSubmit}
              isLoading={handleBulkDevide.isLoading}
            >
              <Text size="s" color="black">
                <FormattedMessage defaultMessage="Apply" />
              </Text>
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}

AutoDevideModal.defaultProps = {
  closeModal: () => {},
  isOpenAutoDevide: false,
  handleBulkDevide: undefined,
  currentContacts: undefined,
  leaderTab: undefined,
};

AutoDevideModal.propTypes = {
  closeModal: PropTypes.func,
  isOpenAutoDevide: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  handleBulkDevide: PropTypes.any,
  currentContacts: PropTypes.number,
  leaderTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default AutoDevideModal;
