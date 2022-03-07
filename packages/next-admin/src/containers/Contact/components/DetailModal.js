/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-indent */
import {
  Button,
  ButtonEmpty,
  FieldText,
  FlexGrid,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  LoadingSpinner,
  Modal,
  ModalBody,
  ModalFooter,
  Spacer,
  SuperSelect,
  Text,
  Title,
} from '@antoree/ant-ui';
import { useCurrentUser, useToggle } from 'hooks';
import PropTypes from 'prop-types';
import { useEffect, memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import {
  getContactDetail,
  getContactHistory,
  GET_CONTACT_DETAIL,
  GET_CONTACT_HISTORY,
} from 'services/contact';
import { GENDER, HISTORY_TYPES } from '../constant';
// eslint-disable-next-line react/prop-types
const DetailModal = ({ id, updateContactMutation }) => {
  const intl = useIntl();
  const UPDATE_CONTACT_FORM_ID = 'update-contact-form';
  const { isVisiable, open, close } = useToggle();

  const { data: history } = useQuery(
    [GET_CONTACT_HISTORY(id)],
    () => getContactHistory(id),
    {
      enabled: isVisiable,
    },
  );
  const [{ permissions }] = useCurrentUser();

  const { data, isFetching } = useQuery(
    [GET_CONTACT_DETAIL(id)],
    () => getContactDetail(id),
    {
      enabled: isVisiable,
      refetchOnWindowFocus: false,
    },
  );
  const { control, handleSubmit, reset } = useForm({
    // mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      age: '',
      email: '',
      gender: '',
      facebook: '',
    },
  });
  useEffect(() => {
    const defaults = {
      name: data?._data?.contact?.name,
      phone: data?._data?.contact?.phone,
      age: data?._data?.contact?.name,
      email: data?._data?.contact?.email,
      gender: data?._data?.contact?.gender,
      facebook: data?._data?.contact?.facebook,
    };
    reset(defaults);
  }, [data, reset]);
  const handleUpdate = formData => {
    updateContactMutation.mutate({
      contactId: id,
      params: { ...formData },
    });
    close();
  };
  const getTypeText = type => {
    const historyContactType = HISTORY_TYPES.find(
      historyType => historyType.value === type,
    );
    if (historyContactType) {
      return intl.formatMessage(historyContactType.label);
    }
    return '';
  };
  return (
    <>
      <Text
        style={{
          color: '#00C081',
          cursor: 'pointer',
        }}
        onClick={() => {
          open();
        }}
      >
        {id}
      </Text>
      {isVisiable && (
        <Modal maxWidth={false} style={{ width: '972px' }} onClose={close}>
          <ModalBody>
            {isFetching ? (
              <div className="flex justify-items-center items-center p-4 flex-col ">
                <LoadingSpinner size="xl" />
                <Spacer size="m" />
                <Text size="l">
                  <p>
                    <FormattedMessage defaultMessage="Loading" />
                  </p>
                </Text>
              </div>
            ) : (
              <div>
                <Spacer />
                <Title className="text-left">
                  <p>
                    <FormattedMessage defaultMessage="Thông tin học viên" />
                  </p>
                </Title>
                <Spacer />
                <Form
                  component="form"
                  id={UPDATE_CONTACT_FORM_ID}
                  onSubmit={handleSubmit(handleUpdate)}
                >
                  <FlexGrid columns={2} direction="column">
                    <FlexItem>
                      <FlexGroup>
                        <FlexItem grow={3}>
                          <Text size="s">
                            <p>Tên</p>
                          </Text>
                        </FlexItem>
                        <FlexItem grow={7}>
                          <FormRow fullWidth>
                            <Controller
                              render={({ onChange, value }) => (
                                <FieldText
                                  className="rounded-lg"
                                  value={value}
                                  fullWidth
                                  onChange={onChange}
                                />
                              )}
                              name="name"
                              control={control}
                            />
                          </FormRow>
                        </FlexItem>
                      </FlexGroup>
                    </FlexItem>
                    <FlexItem>
                      <FlexGroup>
                        <FlexItem grow={3}>
                          <Text size="s">
                            <p>Số điện thoaị</p>
                          </Text>
                        </FlexItem>
                        <FlexItem grow={7}>
                          <FormRow fullWidth>
                            <Controller
                              render={({ onChange, value }) => (
                                <FieldText
                                  className="rounded-lg"
                                  value={value}
                                  fullWidth
                                  onChange={onChange}
                                />
                              )}
                              name="phone"
                              control={control}
                            />
                          </FormRow>
                        </FlexItem>
                      </FlexGroup>
                    </FlexItem>
                    <FlexItem>
                      <FlexGroup>
                        <FlexItem grow={3}>
                          <Text size="s">
                            <p>Tuổi</p>
                          </Text>
                        </FlexItem>
                        <FlexItem grow={7}>
                          <FormRow fullWidth>
                            <Controller
                              render={({ onChange, value }) => (
                                <FieldText
                                  className="rounded-lg"
                                  value={value}
                                  fullWidth
                                  onChange={onChange}
                                />
                              )}
                              name="age"
                              control={control}
                            />
                          </FormRow>
                        </FlexItem>
                      </FlexGroup>
                    </FlexItem>
                    <FlexItem>
                      <FlexGroup>
                        <FlexItem grow={3}>
                          <Text size="s">
                            <p>Giới tính</p>
                          </Text>
                        </FlexItem>
                        <FlexItem grow={7}>
                          <Controller
                            render={({ onChange, value }) => (
                              <SuperSelect
                                className="rounded-lg"
                                fullWidth
                                options={GENDER.map(item => ({
                                  value: item.value,
                                  inputDisplay: intl.formatMessage(item.label),
                                }))}
                                valueOfSelected={value}
                                onChange={onChange}
                              />
                            )}
                            name="gender"
                            control={control}
                          />
                        </FlexItem>
                      </FlexGroup>
                    </FlexItem>
                    <FlexItem>
                      <FlexGroup>
                        <FlexItem grow={3}>
                          <Text size="s">
                            <p>Email</p>
                          </Text>
                        </FlexItem>
                        <FlexItem grow={7}>
                          <FormRow fullWidth>
                            <Controller
                              render={({ onChange, value }) => (
                                <FieldText
                                  className="rounded-lg"
                                  value={value}
                                  fullWidth
                                  onChange={onChange}
                                />
                              )}
                              name="email"
                              control={control}
                            />
                          </FormRow>
                        </FlexItem>
                      </FlexGroup>
                    </FlexItem>
                    <FlexItem>
                      <FlexGroup>
                        <FlexItem grow={3}>
                          <Text size="s">
                            <p>Facebook</p>
                          </Text>
                        </FlexItem>
                        <FlexItem grow={7}>
                          <FormRow fullWidth>
                            <Controller
                              render={({ onChange, value }) => (
                                <FieldText
                                  className="rounded-lg"
                                  value={value}
                                  fullWidth
                                  onChange={onChange}
                                />
                              )}
                              name="facebook"
                              control={control}
                            />
                          </FormRow>
                        </FlexItem>
                      </FlexGroup>
                    </FlexItem>
                  </FlexGrid>
                </Form>
                <Spacer />
              </div>
            )}
            {!isFetching &&
            (permissions.indexOf('sales_leader') !== -1 ||
              permissions.indexOf('contact-view-all') !== -1) ? (
              <div>
                <Title className="text-left">
                  <p>
                    <FormattedMessage defaultMessage="Lịch sử thay đổi" />
                  </p>
                </Title>
                <Spacer />
                {history?._data?.contact_histories?.map(contact => {
                  return (
                    <FlexGroup className="text-sm">
                      <FlexItem grow={8}>
                        <FlexGroup>
                          <FlexItem>
                            {contact?.type && (
                              <strong>
                                {getTypeText(contact?.type)} &#35; {contact.id}
                              </strong>
                            )}
                          </FlexItem>
                          <FlexItem>
                            {contact?.user && (
                              <p style={{ color: '#69707D' }}>
                                by {contact?.user?.shown_name} (
                                {contact?.user?.email})
                              </p>
                            )}
                          </FlexItem>
                        </FlexGroup>
                      </FlexItem>
                      <FlexItem grow={2} className="items-end">
                        <p>{contact.updated_at}</p>
                      </FlexItem>
                    </FlexGroup>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </ModalBody>
          <ModalFooter>
            <ButtonEmpty
              onClick={() => {
                close();
              }}
            >
              <Text size="s" color="#00C081">
                <FormattedMessage defaultMessage="Đóng" />
              </Text>
            </ButtonEmpty>
            <Button
              fill
              type="submit"
              form={UPDATE_CONTACT_FORM_ID}
              isLoading={updateContactMutation?.isLoading}
            >
              <Text size="s" color="white">
                <FormattedMessage defaultMessage="Chỉnh sửa" />
              </Text>
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

DetailModal.defaultProps = {
  id: null,
  updateContactMutation: undefined,
};

DetailModal.propTypes = {
  id: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  updateContactMutation: PropTypes.any,
};

export default memo(DetailModal);
