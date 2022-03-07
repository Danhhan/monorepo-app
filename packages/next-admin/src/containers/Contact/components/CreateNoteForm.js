import {
  ComboBox,
  FlexItem,
  Form,
  FormRow,
  notification,
  RadioGroup,
  Spacer,
  SuperSelect,
  TextArea,
} from '@antoree/ant-ui';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import * as yup from 'yup';
import { CONTACT_TRASH, REASONRADIOS, REASON_NOTE_LR_LIST } from '../constant';

function CreateNoteForm({
  updateLearningRequestNoteMutation,
  isLoading,
  optionsLR,
}) {
  const UPDATE_LEARNING_REQUEST_NOTE_FORM_ID = 'update-learning-request-note';
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [reasonOptions, setReasonOptions] = useState([]);
  const [radioIdSelected, setRadioIdSelected] = useState(0);
  const [selectedReason, setSelectedReason] = useState(null);
  const [placeHolder, setPlaceHolder] = useState('Chi tiết');
  const [reasonRadios, setReasonRadios] = useState(REASONRADIOS);

  const { control, handleSubmit, setValue, errors } = useForm({
    mode: 'onChange',
    defaultValues: {
      type: '',
      reason: '',
      id: '',
      note: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        type: yup.string().required('Required'),
        reason: yup.string().required('Required'),
        // id: yup.array().required('Required').nullable(),
        note: yup.string().required('Required'),
      }),
    ),
  });
  const getReasonOptions = optionId => {
    const noteReasonLRList = REASON_NOTE_LR_LIST.filter(
      reasonNoteLr => reasonNoteLr.reasonId === optionId,
    ).map(reasonNoteLr => reasonNoteLr);
    setReasonOptions(noteReasonLRList);
  };

  const handleChangeReasonRadio = optionId => {
    setValue('type', optionId);
    getReasonOptions(optionId);
    setRadioIdSelected(optionId);
  };
  const handleShowPlaceHolder = reasonId => {
    let result;
    // reasonId in contanst
    switch (reasonId) {
      case 1:
        result =
          'Khả năng chi trả bao nhiêu 1 tháng? So sánh về học phí với đối thủ như thế nào?';
        break;
      case 2:
        result =
          'Rất muốn học nhưng không sắp xếp được thời gian, LÝ DO không sắp xếp được thời gian là gì?';
        break;
      case 3:
        result =
          'Chưa tin tưởng điều gì? Băn khoăn chất lượng điều gì? (Đường truyền mạng không ổn định, giáo viên dạy không tốt, ....)';
        break;
      case 4:
        result = 'Ai là người quyết định?';
        break;
      case 5:
        result =
          'Tại sao chưa quyết định ngay hiện tại? (Chưa học xong khoá học tại trung tâm, bé còn nhỏ chưa học được...)';
        break;
      case 6:
        result =
          'Không thích học online, không thích học 1 - 1, nhu cầu hời hợt, đã đăng ký trung tâm khác ...';
        break;
      default:
        result = 'Chi tiết';
        break;
    }
    setPlaceHolder(result);
  };
  const handleUpdate = formData => {
    if (!formData?.id) {
      notification.error({
        title: 'Chưa chọn learning request',
      });
      return;
    }
    updateLearningRequestNoteMutation.mutate({
      id: formData.id[0].id,
      params: { ...formData },
    });
  };
  const handleChangeLearningRequest = option => {
    const level = option[0]?.level;
    let localReasonRadios = [];
    if (level === 1) {
      // check level 1
      const index = reasonRadios?.findIndex(
        reasonRadio => reasonRadio.id === CONTACT_TRASH,
      );
      const tmpReasonRadios = [...reasonRadios];
      tmpReasonRadios[index].disabled = false;
      localReasonRadios = tmpReasonRadios;
    }
    localReasonRadios = [...reasonRadios];
    setReasonRadios(localReasonRadios);
  };
  useEffect(() => {
    setSelectedOptions(optionsLR);
    handleChangeLearningRequest(optionsLR);
    setValue('id', optionsLR);
  }, [optionsLR]);
  return (
    <Form
      component="form"
      id={UPDATE_LEARNING_REQUEST_NOTE_FORM_ID}
      onSubmit={handleSubmit(handleUpdate)}
    >
      <Spacer />
      <Controller name="id" control={control} />
      <FormRow
        labelFontWeight={400}
        fullWidth
        label={
          <strong>
            <FormattedMessage defaultMessage="Học viên" />
          </strong>
        }
        isInvalid={!!errors?.id}
        error={errors?.id?.message}
        required
      >
        <Controller
          render={({ onChange, value }) => (
            <ComboBox
              isLoading={isLoading}
              fullWidth
              placeholder="Chọn learning request"
              singleSelection={{ asPlainText: true }}
              options={optionsLR}
              // value={value}
              selectedOptions={selectedOptions}
              onChange={option => {
                setSelectedOptions(option);
                onChange(option);
                handleChangeLearningRequest(option);
              }}
              compressed
              borderRadius={8}
              isInvalid={!!errors?.id}
            />
          )}
          name="id"
          control={control}
        />
      </FormRow>

      <Spacer size="m" />
      <FormRow
        labelFontWeight={400}
        fullWidth
        label={
          <strong>
            <FormattedMessage defaultMessage="Trường hợp đang gặp" />
          </strong>
        }
        isInvalid={!!errors?.type}
        error={errors?.type?.message}
        required
      >
        <Controller
          render={({ onChange, value }) => (
            <RadioGroup
              options={reasonRadios}
              idSelected={radioIdSelected}
              onChange={id => {
                handleChangeReasonRadio(id);
                onChange(id);
                setValue('reason', '');
                setSelectedReason(null);
              }}
              name="radio group"
              isInvalid={!!errors?.type}
            />
          )}
          name="type"
          control={control}
        />
      </FormRow>
      <Spacer size="m" />
      <FlexItem>
        <FormRow
          fullWidth
          label={<FormattedMessage defaultMessage="Loại lý do" />}
          required
          isInvalid={!!errors?.reason}
          error={errors?.reason?.message}
        >
          <Controller
            render={({ onChange }) => (
              <SuperSelect
                className="rounded-lg"
                placeholder="Trạng thái"
                options={[...reasonOptions].map(
                  ({ label, value: valReason }) => ({
                    value: valReason,
                    inputDisplay: <p>{label}</p>,
                  }),
                )}
                valueOfSelected={selectedReason}
                onChange={e => {
                  setSelectedReason(e);
                  onChange(e);
                  handleShowPlaceHolder(e);
                }}
                fullWidth
                compressed
              />
            )}
            name="reason"
            control={control}
          />
        </FormRow>
      </FlexItem>
      <Spacer size="m" />
      <FlexItem>
        <FormRow
          fullWidth
          label={<FormattedMessage defaultMessage="Chi tiết" />}
          required
          isInvalid={!!errors?.note}
          error={errors?.note?.message}
        >
          <Controller
            render={({ onChange, value }) => (
              <TextArea
                className="rounded-lg"
                placeholder={placeHolder}
                value={value || ''}
                onChange={onChange}
                fullWidth
                compressed
                isInvalid={!!errors?.note}
              />
            )}
            name="note"
            control={control}
          />
        </FormRow>
      </FlexItem>
    </Form>
  );
}
CreateNoteForm.defaultProps = {
  isLoading: undefined,
  updateLearningRequestNoteMutation: undefined,
  optionsLR: [],
};

CreateNoteForm.propTypes = {
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  updateLearningRequestNoteMutation: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  optionsLR: PropTypes.array,
};
export default CreateNoteForm;
