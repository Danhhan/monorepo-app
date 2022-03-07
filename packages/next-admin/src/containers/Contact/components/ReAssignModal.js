import {
  Button,
  ButtonEmpty,
  ComboBox,
  FlexGroup,
  FlexItem,
  FormRow,
  Modal,
  ModalBody,
  ModalFooter,
  notification,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { toNonAccentVietnamese } from '@antoree/helpers';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { getSalemans, GET_SALEMANS } from 'services/common';

const renderOption = (option = {}) => {
  const { label, id } = option;
  return (
    <span>
      {label}
      &nbsp;-&nbsp;
      {id}
    </span>
  );
};
// eslint-disable-next-line react/prop-types
const ReAssignContactModal = ({
  isVisible,
  closeModal,
  idSelected,
  handleReassignContact,
  contactIds,
  handleBulkUpdate,
}) => {
  const intl = useIntl();
  const [searchValue, setSearchValue] = useState('');
  const { data, isLoading } = useQuery(GET_SALEMANS, () => getSalemans(), {
    enabled: isVisible,
  });
  const { control, errors, getValues } = useForm({
    defaultValues: { saleman: [] },
  });
  const options = useMemo(
    () =>
      data?.map?.((group = {}) => ({
        ...group,
        options: group.options.filter((option = {}) =>
          toNonAccentVietnamese(`${option.label} ${option.id}`).includes(
            toNonAccentVietnamese(searchValue),
          ),
        ),
      })) ?? [],
    [data, searchValue],
  );

  const onSubmit = () => {
    const salemanValues = getValues('saleman');
    if (salemanValues.length === 0) {
      notification.error({
        title: <FormattedMessage defaultMessage="No SaleMan For Update" />,
      });
      return;
    }
    if (contactIds?.length > 0) {
      handleBulkUpdate.mutate({
        cared_by: salemanValues?.[0]?.id,
        ids: contactIds,
        re_assign: 1,
      });
    } else {
      const params = { cared_by: salemanValues?.[0]?.id, re_assign: 1 };
      handleReassignContact.mutate({
        params,
        contactId: idSelected,
      });
    }
  };
  const onSearchChange = value => {
    setSearchValue(value);
  };
  return (
    <>
      {isVisible && (
        <Modal style={{ width: '500px' }} onClose={closeModal}>
          <ModalBody>
            <Title className="text-center">
              <p>
                <FormattedMessage defaultMessage="Assign For" />
              </p>
            </Title>
            <Spacer />
            <FlexGroup>
              <FlexItem>
                <FormRow
                  fullWidth
                  isInvalid={!!errors?.saleman}
                  error={errors?.saleman?.message}
                >
                  <Controller
                    render={({ onChange, value }) => (
                      <ComboBox
                        fullWidth
                        async
                        compressed
                        isClearable={false}
                        isInvalid={!!errors?.saleman}
                        isLoading={isLoading}
                        placeholder={intl.formatMessage({
                          defaultMessage: 'Search by name',
                        })}
                        singleSelection={{ asPlainText: true }}
                        onChange={selectedOptions => onChange(selectedOptions)}
                        selectedOptions={value}
                        options={options}
                        renderOption={renderOption}
                        onSearchChange={onSearchChange}
                      />
                    )}
                    name="saleman"
                    control={control}
                  />
                </FormRow>
              </FlexItem>
            </FlexGroup>
            <Spacer />
          </ModalBody>
          <ModalFooter>
            <ButtonEmpty onClick={closeModal}>
              <Text size="s" color="black">
                <FormattedMessage defaultMessage="Cancle" />
              </Text>
            </ButtonEmpty>
            {contactIds?.length > 0 ? (
              <Button
                fill
                color="warning"
                onClick={onSubmit}
                isLoading={handleBulkUpdate.isLoading}
              >
                <Text size="s" color="black">
                  <FormattedMessage defaultMessage="Apply" />
                </Text>
              </Button>
            ) : (
              <Button
                fill
                color="warning"
                onClick={onSubmit}
                isLoading={handleReassignContact.isLoading}
              >
                <Text size="s" color="black">
                  <FormattedMessage defaultMessage="Apply" />
                </Text>
              </Button>
            )}
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

ReAssignContactModal.defaultProps = {
  idSelected: null,
  handleReassignContact: () => {},
  handleBulkUpdate: () => {},
  closeModal: () => {},
  isVisible: false,
  contactIds: [],
};

ReAssignContactModal.propTypes = {
  idSelected: PropTypes.number,
  /* eslint-disable react/forbid-prop-types */
  handleReassignContact: PropTypes.any,
  handleBulkUpdate: PropTypes.any,
  closeModal: PropTypes.func,
  isVisible: PropTypes.bool,
  contactIds: PropTypes.array,
};

export default ReAssignContactModal;
