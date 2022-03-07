import {
  DatePicker,
  FlexGroup,
  FlexItem,
  FormControlLayout,
  FormRow,
  Spacer,
  TextArea,
  Title,
} from '@antoree/ant-ui';
import { SelectCustomField } from 'components';
import { STUDY_PROGRAM } from 'containers/Contact/constant';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import InputDuration from './InputDuration';
import SelectContractField from './SelectContractField';

function CourseInfomationBox({ control, errors, view }) {
  return (
    <>
      <Spacer />
      <Title size="s">
        <h2>
          <FormattedMessage defaultMessage="1. Thông tin khoá học" />
        </h2>
      </Title>
      <Spacer />
      <FlexGroup className="w-1/2">
        <FlexItem className="mr-0">
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Hợp đồng" />}
            required
            isInvalid={!!errors?.contractID}
            error={errors?.contractID?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <SelectContractField
                  isInvalid={!!errors?.contractID}
                  valueOfSelected={value}
                  onSelect={selected => {
                    onChange(selected?.value);
                  }}
                  view={view}
                  // edit={edit}
                />
              )}
              name="contractID"
              control={control}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Ngày bắt đầu" />}
            required
            isInvalid={!!errors?.data?.started_at}
            error={errors?.data?.started_at?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <DatePicker
                  className="rounded-lg border border-gray-300 border-solid"
                  fullWidth
                  dateFormat="YYYY/MM/DD"
                  popoverPlacement="bottom-end"
                  placeholder="Chọn ngày"
                  selected={value ? moment(value) : null}
                  onChange={onChange}
                  disabled={view}
                />
              )}
              name="data.started_at"
              control={control}
            />
          </FormRow>
        </FlexItem>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Chương trình học" />}
            required
            isInvalid={!!errors?.data?.tags}
            error={errors?.data?.tags?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <SelectCustomField
                  style={{ border: '1px solid #CDCFD1' }}
                  valueOfSelected={Number(value) || undefined}
                  onSelect={selected => {
                    onChange(selected?.value);
                  }}
                  placeholder="Chọn"
                  options={STUDY_PROGRAM}
                  borderRadius={8}
                  isInvalid={!!errors?.data?.tags}
                  disabled={view}
                />
              )}
              name="data.tags"
              control={control}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Giờ việt mở lần này" />}
            required
            isInvalid={!!errors?.data?.hour_v}
            error={errors?.data?.hour_v?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <InputDuration
                  onChange={onChange}
                  value={value}
                  disabled={view}
                />
              )}
              name="data.hour_v"
              control={control}
            />
          </FormRow>
        </FlexItem>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Giờ Phi mở lần này" />}
            required
            isInvalid={!!errors?.data?.hour_p}
            error={errors?.data?.hour_p?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <InputDuration
                  onChange={onChange}
                  value={value}
                  disabled={view}
                />
              )}
              name="data.hour_p"
              control={control}
            />
          </FormRow>
        </FlexItem>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Giờ Pre mở lần này" />}
            required
            isInvalid={!!errors?.data?.hour_pre}
            error={errors?.data?.hour_pre?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <InputDuration
                  onChange={onChange}
                  value={value}
                  disabled={view}
                />
              )}
              name="data.hour_pre"
              control={control}
            />
          </FormRow>
        </FlexItem>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Giờ Native mở lần này" />}
            required
            isInvalid={!!errors?.data?.hour_n}
            error={errors?.data?.hour_n?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <InputDuration
                  onChange={onChange}
                  value={value}
                  disabled={view}
                />
              )}
              name="data.hour_n"
              control={control}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
      <FlexGroup>
        <FlexItem>
          <FormRow
            fullWidth
            label={<FormattedMessage defaultMessage="Lịch học" />}
            required
            isInvalid={!!errors?.data?.schedule}
            error={errors?.data?.schedule?.message}
          >
            <Controller
              render={({ onChange, value }) => (
                <TextArea
                  className="rounded-lg border border-gray-300 border-solid"
                  placeholder="Chi tiết"
                  value={value || ''}
                  onChange={onChange}
                  fullWidth
                  compressed
                  disabled={view}
                />
              )}
              name="data.schedule"
              control={control}
            />
          </FormRow>
        </FlexItem>
      </FlexGroup>
    </>
  );
}

CourseInfomationBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.any.isRequired,
  view: PropTypes.bool.isRequired,
};

export default CourseInfomationBox;
