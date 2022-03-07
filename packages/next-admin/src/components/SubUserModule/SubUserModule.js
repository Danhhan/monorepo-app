import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  FlexGroup,
  FlexItem,
  Title,
  HorizontalRule,
  FormRow,
  FieldText,
  Spacer,
  Button,
  notification,
} from '@antoree/ant-ui';
import SubUserCreateForm from './SubUserCreateForm';
import { DeleteErrorStatus } from './constant';

const SubUserModule = ({
  handleDelete,
  subsData,
  data,
  control,
  errors,
  setValue,
  watch,
  isDisable,
  disableDeletePreviousData,
}) => {
  const [subUsers, setSubUsers] = useState(data || []);
  const handleAddSubUser = () => {
    const tempArr = [...subUsers];

    // if (tempArr.length >= 4) {
    //   notification.error({
    //     title: <FormattedMessage defaultMessage="Maximum 4 SubUsers" />,
    //   });
    //   return;
    // }

    if (tempArr.length === 0) {
      tempArr.push(0);
    } else if (tempArr.length === 1 && tempArr[0] === 0) {
      tempArr.push(1);
    } else {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i] !== i) {
          tempArr.push(i);
          setValue('subUserCount', tempArr);
          setSubUsers(tempArr.sort((a, b) => a - b));
          return;
        }
      }
      if (tempArr.length > subUsers.length) {
        return;
      }
      tempArr.push(tempArr.length);
    }
    setValue('subUserCount', tempArr);
    setSubUsers(tempArr);
  };

  const removeUserClientSide = index => {
    const tempArr = [...subUsers].filter(item => item !== index);

    setValue(`idSubUser${index + 1}`, undefined);
    setValue(`firstNameSubUser${index + 1}`, '');
    setValue(`lastNameSubUser${index + 1}`, '');
    setValue(`studentTypeSubUser${index + 1}`, undefined);
    setValue(`genderSubUser${index + 1}`, undefined);
    setValue(`learningRequestSubUser${index + 1}`, '');
    setValue('subUserCount', tempArr);

    setSubUsers(tempArr);
  };

  const handleReduceSubUser = (id, index) => {
    if (subsData && handleDelete && id) {
      handleDelete.mutate(id, {
        onSuccess: () => {
          removeUserClientSide(index);
        },
        onError: err => {
          const mesError = err?.response?.data?.errors[0]?.message;

          const errorFinded = DeleteErrorStatus.find(
            errItem => errItem.code === err?.response?.status,
          );

          notification.error({
            title: errorFinded?.message || (
              <FormattedMessage defaultMessage="Error Occured!" />
            ),
            text: `Code: ${err?.response?.status} - ${mesError}`,
          });
        },
      });
    } else {
      removeUserClientSide(index);
    }
  };

  useEffect(() => {
    const tempArr = data || [];

    setValue('subUserCount', tempArr);
    setSubUsers(tempArr);
  }, [isDisable]);
  return (
    <div>
      {Array.from({ length: 20 }, (x, i) => i).map(val => (
        <SubUserCreateForm
          isVisible={subUsers.includes(val)}
          isDisable={isDisable}
          isDisableDelete={
            disableDeletePreviousData ? data.includes(val) : false
          }
          key={val}
          watch={watch}
          index={val + 1}
          control={control}
          handleReduceSubUser={handleReduceSubUser}
          errors={errors}
          lrId={subsData ? subsData[val]?.id : null}
        />
      ))}
      <Controller name="subUserCount" control={control} />
      {!isDisable && (
        <Button fill onClick={handleAddSubUser} isDisabled={isDisable}>
          <FormattedMessage defaultMessage="Add Sub User" />
        </Button>
      )}
    </div>
  );
};

SubUserModule.defaultProps = {
  handleDelete: undefined,
  data: undefined,
  subsData: undefined,
  control: () => {},
  errors: {},
  setValue: () => {},
  watch: () => {},
  isDisable: false,
  disableDeletePreviousData: false,
};

SubUserModule.propTypes = {
  handleDelete: PropTypes.func,
  subsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      user: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    }),
  ),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      type: PropTypes.number,
      gender: PropTypes.number,
    }),
  ),
  isDisable: PropTypes.bool,
  disableDeletePreviousData: PropTypes.bool,
  control: PropTypes.func,
  setValue: PropTypes.func,
  watch: PropTypes.func,
  errors: PropTypes.number,
};

export default SubUserModule;
