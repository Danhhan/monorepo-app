/* eslint-disable react/prop-types */
import {
  Button,
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  Form,
  FormRow,
  Icon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeaderTitle,
  Spacer,
  Text,
  TextArea,
  Title,
} from '@antoree/ant-ui';
import noColorRating1 from 'assets/icons/rating/noColor/rating1.svg';
import noColorRating2 from 'assets/icons/rating/noColor/rating2.svg';
import noColorRating3 from 'assets/icons/rating/noColor/rating3.svg';
import noColorRating4 from 'assets/icons/rating/noColor/rating4.svg';
import noColorRating5 from 'assets/icons/rating/noColor/rating5.svg';
// icon color
import colorRating1 from 'assets/icons/rating/color/rating1.svg';
import colorRating2 from 'assets/icons/rating/color/rating2.svg';
import colorRating3 from 'assets/icons/rating/color/rating3.svg';
import colorRating4 from 'assets/icons/rating/color/rating4.svg';
import colorRating5 from 'assets/icons/rating/color/rating5.svg';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

const RatingModal = ({ isVisible, closeModal }) => {
  const [currentNumberRate, setCurrentNumberRate] = useState(undefined);
  const [rateList, setRateList] = useState([
    {
      rate: 1,
      selected: false,
      iconDefault: noColorRating1,
      seletedIcon: colorRating1,
    },
    {
      rate: 2,
      selected: false,
      iconDefault: noColorRating2,
      seletedIcon: colorRating2,
    },
    {
      rate: 3,
      selected: false,
      iconDefault: noColorRating3,
      seletedIcon: colorRating3,
    },
    {
      rate: 4,
      selected: false,
      iconDefault: noColorRating4,
      seletedIcon: colorRating4,
    },
    {
      rate: 5,
      selected: false,
      iconDefault: noColorRating5,
      seletedIcon: colorRating5,
    },
  ]);

  const { control, handleSubmit, setValue, errors } = useForm({
    mode: 'onChange',
    defaultValues: {
      type: '',
      reason: '',
      id: '',
      note: '',
    },
    // resolver: yupResolver(
    //   yup.object().shape({
    //     type: yup.string().required('Required'),
    //     reason: yup.string().required('Required'),
    //     // id: yup.array().required('Required').nullable(),
    //     note: yup.string().required('Required'),
    //   }),
    // ),
  });
  const handleOnMouse = index => {
    unSelectedIcon();
    const localRateList = [...rateList];
    localRateList[index].selected = true;
    setCurrentNumberRate(localRateList[index].rate);
    setRateList(localRateList);
  };
  const unSelectedIcon = () => {
    const localRateList = [...rateList];
    for (let i = 0; i < localRateList.length; i += 1) {
      const element = localRateList[i];
      element.selected = false;
    }
    setCurrentNumberRate(undefined);
  };
  const resetState = () => {
    unSelectedIcon();
    setCurrentNumberRate(undefined);
  };
  return (
    <>
      {isVisible && (
        <Modal
          style={{ width: 561 }}
          className="p-4"
          onClose={() => {
            resetState();
            closeModal();
          }}
        >
          <ModalHeaderTitle style={{ textAlign: 'center' }}>
            <Title>
              <FormattedMessage defaultMessage="Đánh giá giáo viên" />
            </Title>
            <Spacer size="s" />
          </ModalHeaderTitle>
          <ModalBody>
            <Text>Mức độ hài lòng của học viên:</Text>
            <Spacer size="m" />
            <FlexGroup style={{ width: 325 }}>
              {rateList.map((item, index) => (
                <FlexItem
                  grow={false}
                  key={item.rate}
                  onMouseEnter={() => handleOnMouse(index)}
                  // onMouseLeave={() => handleOnLeave()}
                >
                  <Icon
                    size="original"
                    style={{
                      cursor: 'pointer',
                    }}
                    // onClick={() => updateContactChecked(id)}
                    type={item.selected ? item.seletedIcon : item.iconDefault}
                  />
                </FlexItem>
              ))}
            </FlexGroup>
            <Spacer />
            <Form
              component="form"
              // id={UPDATE_LEARNING_REQUEST_NOTE_FORM_ID}
              // onSubmit={handleSubmit(handleUpdate)}
            >
              <FlexItem>
                <FormRow
                  fullWidth
                  label={<FormattedMessage defaultMessage="Ghi chú" />}
                  // isInvalid={!!errors?.note}
                  // error={errors?.note?.message}
                >
                  <Controller
                    render={({ onChange, value }) => (
                      <TextArea
                        style={{ height: '150px' }}
                        className="rounded-lg"
                        placeholder="Chi tiết đánh giá"
                        value={value || ''}
                        onChange={onChange}
                        fullWidth
                        compressed
                        // isInvalid={!!errors?.note}
                      />
                    )}
                    name="note"
                    control={control}
                  />
                </FormRow>
              </FlexItem>
            </Form>
            <Spacer />
            <Text>
              Điểm đánh giá: &nbsp;
              <span style={{ color: '#FFC700' }}>
                {currentNumberRate || '-'}
                <Icon
                  style={{ marginBottom: '4px' }}
                  size="original"
                  type="starFilled"
                />
              </span>
            </Text>
          </ModalBody>
          <ModalFooter>
            <ButtonEmpty
              onClick={() => {
                resetState();
                closeModal();
              }}
            >
              <FormattedMessage defaultMessage="Đóng" />
            </ButtonEmpty>

            <Button onClick={handleSubmit} fill>
              <FormattedMessage defaultMessage="Gữi đánh giá" />
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default RatingModal;
