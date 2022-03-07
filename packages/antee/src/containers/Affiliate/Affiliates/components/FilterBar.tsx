import {
  DatePicker,
  DatePickerRange,
  FieldSearch,
  FlexGroup,
  FlexItem,
  Form,
  FormControlLayout,
  PageContentHeaderSection,
  Switch,
  FormRow,
  Button,
  ConfirmModal,
  FieldText,
} from '@antoree/ant-ui';

import moment from 'moment';

import { useIntl } from 'react-intl';
import { useState } from 'react';

export type FilterBarProps = {
  status: number;
  onSelect: Function;
  onInputChange: Function;
};

const FilterBar: React.FC<FilterBarProps> = ({
  status,
  onSelect = () => {},
  onInputChange = () => {},
}) => {
  const intl = useIntl();
  const [checked, setChecked] = useState(false);
  const onChange = (e: any) => {
    setChecked(e.target.checked);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const minDate = moment().subtract(2, 'y');
  const maxDate = moment();
  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);

  const isInvalid =
    startDate > endDate || startDate < minDate || endDate > maxDate;
  const handleStartDate = (valueStartDate: any) => {
    setStartDate(valueStartDate);
  };
  const handleEndDate = (valueEndDate: any) => {
    setEndDate(valueEndDate);
  };
  let modal;
  if (isModalVisible) {
    modal = (
      <ConfirmModal
        className="mt-10"
        style={{ width: 500 }}
        title="Tạo link tuỳ chọn"
        onCancel={closeModal}
        onConfirm={closeModal}
        cancelButtonText="Đóng"
        confirmButtonText="Hoàn tất"
        defaultFocusedButton="confirm"
      >
        <Form component="form">
          <FormRow label="Nhập link hoặc ID của giáo viên" fullWidth>
            <FieldText
              style={{
                borderRadius: '3px',
                border: '1.25px solid #999999',
                height: '35px',
              }}
              fullWidth
              placeholder="Nhập link hoặc ID của giáo viên"
            />
          </FormRow>
          <FormRow label="Đặt tên chiến dịch" fullWidth>
            <FieldText
              style={{
                borderRadius: '3px',
                border: '1.25px solid #999999',
                height: '35px',
              }}
              fullWidth
              placeholder="Nhập tên"
            />
          </FormRow>
        </Form>
        <section>
          <p className="text-sm	font-semibold mt-2">Thông tin chiến dịch</p>
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
  return (
    <PageContentHeaderSection className="md:w-screen md:ml-2 md:pr-32">
      <FlexGroup className="flex block items-center justify-between">
        <FlexGroup className="flex  items-center lg:justify-start justify-center">
          <FlexItem grow={false}>
            <FieldSearch
              className="w-42 lg:w-72 rounded-lg"
              fullWidth
              incremental
              placeholder={intl.formatMessage({
                defaultMessage: 'Tìm tên chiến dịch',
              })}
              //   onChange={withDebounce(onInputChange('term'))}
            />
          </FlexItem>
          <FlexItem grow={false}>
            <FormControlLayout>
              <DatePickerRange
                className="lg:w-auto w-full md:w-40
                lg:max-w-md rounded-lg"
                startDateControl={
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDate}
                    startDate={startDate}
                    endDate={endDate}
                    isInvalid={startDate > endDate}
                    aria-label="Start date"
                    dateFormat="DD-MM-YYYY"
                  />
                }
                endDateControl={
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDate}
                    startDate={startDate}
                    endDate={endDate}
                    isInvalid={startDate > endDate}
                    aria-label="End date"
                    dateFormat="DD-MM-YYYY"
                  />
                }
              />
            </FormControlLayout>
          </FlexItem>
          <FlexItem grow={false}>
            <Switch
              label="Hiển thị link đã ẩn"
              checked={checked}
              onChange={e => onChange(e)}
            />
          </FlexItem>
        </FlexGroup>
        <FlexItem grow={false} className="flex float-right">
          <Button
            iconType="plusInCircle"
            className="bg-green-500 text-white hover:bg-green-500"
            fill
            onClick={showModal}
          >
            Tạo link
          </Button>
        </FlexItem>
      </FlexGroup>

      {modal}
    </PageContentHeaderSection>
  );
};

export default FilterBar;
