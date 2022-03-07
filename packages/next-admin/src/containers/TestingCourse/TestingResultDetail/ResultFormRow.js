/* eslint-disable react/prop-types */
import {
  FieldNumber,
  FlexGroup,
  FlexItem,
  FormRow,
  TextArea,
} from '@antoree/ant-ui';
import { Controller } from 'react-hook-form';

function ResultFormRow({
  control,
  fieldName,
  isEditMode,
  label,
  isAdult,
  error,
}) {
  return (
    <FormRow error={error} isInvalid={!!error} fullWidth label={label}>
      <FlexGroup gutterSize="m">
        <FlexItem className="w-24" grow={false}>
          <Controller
            as={
              <FieldNumber
                readOnly={!isEditMode}
                min={0}
                fullWidth
                max={isAdult ? 9 : 3}
                name="first"
                placeholder="Score"
              />
            }
            name={`${fieldName}Score`}
            control={control}
          />
        </FlexItem>
        <FlexItem>
          <Controller
            as={
              <TextArea
                readOnly={!isEditMode}
                fullWidth
                name="first"
                placeholder="Detail"
                rows={2}
              />
            }
            name={fieldName}
            control={control}
          />
        </FlexItem>
      </FlexGroup>
    </FormRow>
  );
}

export default ResultFormRow;
