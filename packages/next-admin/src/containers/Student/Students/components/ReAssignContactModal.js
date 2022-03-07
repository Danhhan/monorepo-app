import {
  Button,
  ButtonEmpty,
  ComboBox,
  FormRow,
  Icon,
  Modal,
  ModalBody,
  ModalFooter,
  notification,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { toNonAccentVietnamese } from '@antoree/helpers';
import { useCurrentUser, useToggle } from 'hooks';
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
const ReAssignContactModal = ({ contactId, handleReassignContact }) => {
  const intl = useIntl();
  const { isVisiable, toggle, close } = useToggle();
  const [searchValue, setSearchValue] = useState('');
  const { data, isLoading } = useQuery(GET_SALEMANS, () => getSalemans(), {
    enabled: isVisiable,
    retry: 1,
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
    const params = { cared_by: salemanValues?.[0]?.id, re_assign: 1 };
    handleReassignContact.mutate({ params, contactId });
  };
  const onSearchChange = value => {
    setSearchValue(value);
  };

  // check perms
  const [{ permissions }] = useCurrentUser();
  const isLeader =
    permissions?.length > 0
      ? permissions.indexOf('contact-reassign') !== -1
      : false;
  return (
    <>
      <Button
        color="warning"
        size="s"
        minWidth={20}
        fill
        onClick={toggle}
        isDisabled={!isLeader}
      >
        <Text size="s" color="black">
          <p>
            <>
              <Icon type="aggregate" />
            </>
          </p>
        </Text>
      </Button>
      {isVisiable && (
        <Modal style={{ width: '448px' }} onClose={close}>
          <ModalBody>
            <Title className="text-center">
              <p>
                <FormattedMessage defaultMessage="Assign For" />
              </p>
            </Title>
            <Spacer />
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
            <Spacer />
          </ModalBody>
          <ModalFooter>
            <ButtonEmpty onClick={close}>
              <Text size="s" color="black">
                <FormattedMessage defaultMessage="Cancle" />
              </Text>
            </ButtonEmpty>
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
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

ReAssignContactModal.defaultProps = {
  contactId: null,
  handleReassignContact: () => {},
};

ReAssignContactModal.propTypes = {
  contactId: PropTypes.number,
  handleReassignContact: PropTypes.func,
};

export default ReAssignContactModal;
