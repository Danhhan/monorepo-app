import { Form, ConfirmModal, FormRow, FieldText } from '@antoree/ant-ui';

export type FilterBarProps = {
  isModalVisibleEdit: boolean;
  closeModal: () => void;
};

const ModalEditAffiliate: React.FC<FilterBarProps> = ({
  isModalVisibleEdit = false,
  closeModal = () => {},
}) => {
  let modalEdit;
  if (isModalVisibleEdit) {
    modalEdit = (
      <ConfirmModal
        className="mt-10"
        style={{ width: 500 }}
        title="Tạo link chia sẻ"
        onCancel={closeModal}
        onConfirm={closeModal}
        cancelButtonText="Đóng"
        confirmButtonText="Hoàn tất"
        defaultFocusedButton="confirm"
      >
        <Form component="form">
          <FormRow label="Đặt tên chiến dịch" fullWidth>
            <FieldText
              style={{
                borderRadius: '3px',
                border: '1.25px solid #999999',
                height: '35px',
              }}
              fullWidth
              placeholder="Landing Page Kid"
            />
          </FormRow>
        </Form>
        <section>
          <p className="text-sm	font-semibold mt-2">
            Link nguồn:{' '}
            <span className="text-sm font-normal	">
              {' '}
              https://antoree.com/tieng-anh-cho-tre-em/
            </span>
          </p>
          <p className="text-sm	font-semibold -mt-4">Thông tin chiến dịch</p>
          <div className="flex justify-start items-center">
            <div>
              <p className="text-sm -mt-4">utm_campaign</p>
              <p className="text-sm -mt-4 mr-2">utm_source</p>
              <p className="text-sm -mt-4">utm_medium</p>
            </div>
            <div className="ml-12">
              <p className="text-sm -mt-4">: Chương trình CTV</p>
              <p className="text-sm -mt-4">: CTV</p>
              <p className="text-sm -mt-4">: seeding</p>
            </div>
          </div>
        </section>
        <section>
          <p className="text-sm	font-semibold">Thông tin người tạo</p>
          <div className="flex justify-start items-center">
            <div>
              <p className="text-sm -mt-4">Tên</p>
              <p className="text-sm -mt-4 mr-2">Email</p>
              <p className="text-sm -mt-4">Số điện thoại</p>
            </div>
            <div className="ml-14">
              <p className="text-sm -mt-4">: Nguyễn Đình Thi</p>
              <p className="text-sm -mt-4">: (chưa cập nhật)</p>
              <p className="text-sm -mt-4">: 0341231234</p>
            </div>
          </div>
        </section>
      </ConfirmModal>
    );
  }
  return <>{modalEdit}</>;
};

export default ModalEditAffiliate;
