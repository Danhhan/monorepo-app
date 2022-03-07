import React, { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';

import {
  Modal,
  ModalBody,
  ModalHeader,
  Spacer,
  Text,
  TextArea,
  ModalFooter,
  FlexGroup,
  FlexItem,
  Button,
  ButtonEmpty,
  notification,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import {
  retrieveIssue,
  useRetrieveIssue,
} from '../../../../services/issue/retrieveIssue';

export type AbsenceReasonModalProps = {
  isShowModal?: boolean;
  hanldeOpenModal: (idsession: number, idSource: number) => void;
  idSource: number;
  idSession: number;
  refetch: () => void;
};

const AbsenceReasonModal: FunctionComponent<AbsenceReasonModalProps> = ({
  isShowModal,
  hanldeOpenModal,
  idSession,
  idSource,
  refetch,
}) => {
  const {
    register,
    formState: { isDirty, isValid, errors },
    handleSubmit,
  } = useForm({ mode: 'all' });
  const {
    mutate: cannelSession,
    isSuccess: successHanle,
    status,
    data: dataSeisson,
    isLoading: isLoadingSession,
    failureCount,
  } = useRetrieveIssue();
  const onSubmit = async (data: any) => {
    try {
      await retrieveIssue({
        idCource: idSource,
        idSession,
        content: data?.content,
        _absent: '1',
        refech: refetch,
      });
      hanldeOpenModal(1, 2);
      notification.success({
        title: 'Thông báo',
        text: 'Hủy buổi học thành công',
      });
      refetch();
    } catch (e) {
      hanldeOpenModal(1, 2);
      const myArrayError = e?.response?.data?.errors[0]?.message.toString();
      const msgErr = myArrayError.replace(myArrayError.slice(0, 20), '');
      //  console.log(msgErr);
      notification.error({
        title: 'Có lỗi sảy ra:',
        text: `Hủy buổi học không thành công, ${msgErr.toLowerCase()}`,
      });
    }
  };
  return (
    <>
      {isShowModal ? (
        <Modal
          onClose={() => {
            hanldeOpenModal(1, 2);
          }}
        >
          <ModalHeader>
            <Text textAlign="center">
              <h3
                style={{
                  color: '#1A1C21',
                  fontSize: '22px',
                  fontWeight: 'bold',
                }}
              >
                <FormattedMessage defaultMessage="Lý do nghỉ" />
              </h3>
            </Text>
          </ModalHeader>
          <ModalBody>
            <form method="post" id="myform" onSubmit={handleSubmit(onSubmit)}>
              <TextArea
                required
                placeholder="Nhập lý do "
                {...register('content', {
                  required: true,
                })}
              >
                {' '}
              </TextArea>
              <p style={{ color: 'red', fontSize: '13px' }}>
                {' '}
                {errors.content?.type === 'required' && 'Vui lòng nhập lý do'}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  paddingTop: '8px',
                  color: '#69707D',
                }}
              >
                Giúp giáo viên và bộ phận hỗ trợ nắm thông tin.
              </p>
              <div style={{ float: 'right', paddingTop: '30px' }}>
                <ButtonEmpty
                  color="text"
                  onClick={() => {
                    hanldeOpenModal(1, 2);
                  }}
                  type="button"
                >
                  Đóng
                </ButtonEmpty>
                <Button
                  form="myform"
                  type="submit"
                  style={{
                    backgroundColor: '#FFC700',
                    border: 'none',
                    color: '#000000',
                    marginLeft: '8px',
                  }}
                >
                  {isLoadingSession ? 'Loading' : 'Xác nhận'}
                </Button>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <FlexGroup>
              <FlexItem />
            </FlexGroup>
          </ModalFooter>
        </Modal>
      ) : null}
    </>
  );
};

export default AbsenceReasonModal;
