import {
  Popover,
  Button,
  FormRow,
  ComboBox,
  FlexGroup,
  FlexItem,
  notification,
} from '@antoree/ant-ui';
import { useMemo, useState } from 'react';
import { FormattedMessage, useIntl, defineMessage } from 'react-intl';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toNonAccentVietnamese } from '@antoree/helpers';
import { GET_SALEMANS, getSalemans } from 'services/common';
import { updateSaleman, GET_STUDENT_BY_ID } from 'services/student';

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
function UpdateSalemanPopover({ studentId }) {
  const intl = useIntl();

  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const onBtnClick = () => {
    setIsOpen(prevState => !prevState);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  const { data, isLoading } = useQuery(GET_SALEMANS, () => getSalemans(), {
    retry: 1,
  });

  const updateSalemanMutation = useMutation(
    ({ salemanId }) => updateSaleman(studentId, salemanId),
    {
      onSuccess: () => {
        closeHandler();

        queryClient.invalidateQueries(GET_STUDENT_BY_ID(studentId));

        notification.success({
          title: 'Successfully',
          text: 'Update saleman successfully!',
        });
      },
      onError: () => {
        notification.error({
          title: 'Failure',
          text: 'Update saleman failure!',
        });
      },
    },
  );

  const { control, errors, getValues } = useForm({
    defaultValues: { saleman: [] },
  });

  const onSubmit = () => {
    const salemanValues = getValues('saleman');
    if (salemanValues.length === 0) {
      notification.error({
        title: <FormattedMessage defaultMessage="No SaleMan For Update" />,
      });
      return;
    }
    updateSalemanMutation.mutate({ salemanId: salemanValues?.[0]?.id });
  };

  const [searchValue, setSearchValue] = useState('');

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

  const onSearchChange = value => {
    setSearchValue(value);
  };

  return (
    <Popover
      button={
        <Button
          fill
          onClick={onBtnClick}
          color="primary"
          iconType="nested"
          size="s"
        >
          <FormattedMessage defaultMessage="Update saleman" />
        </Button>
      }
      isOpen={isOpen}
      anchorPosition="downLeft"
      closePopover={closeHandler}
      ownFocus={false}
    >
      <div style={{ width: 580 }}>
        <FlexGroup alignItems="flexEnd">
          <FlexItem>
            <FormRow
              label={intl.formatMessage(
                defineMessage({ defaultMessage: 'Saleman' }),
              )}
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
          <FlexItem grow={false}>
            <Button
              size="s"
              type="submit"
              onClick={onSubmit}
              isLoading={updateSalemanMutation.isLoading}
            >
              <FormattedMessage defaultMessage="Save" />
            </Button>
          </FlexItem>
        </FlexGroup>
      </div>
    </Popover>
  );
}

export default UpdateSalemanPopover;
