import {
  FormRow,
  HorizontalRule,
  TextArea,
  Title,
  Spacer,
  FieldText,
} from '@antoree/ant-ui';
import { Controller } from 'react-hook-form';

export type Collections = {
  label?: string;
  isHidding?: boolean;
  properties: {
    name: string;
    isTextArea?: boolean;
    placeholder?: any;
  }[];
};

export type TestResultPartProps = {
  collections: Collections[];
  control: any;
  title: string;
  errors: any;
};

const TestResultPart: React.FC<TestResultPartProps> = ({
  collections,
  title,
  control,
  errors,
}) => {
  return (
    <div>
      <Spacer size="m" />
      <Title size="s">
        <h2>{title}</h2>
      </Title>
      <HorizontalRule margin="s" />

      {collections.map(
        itemCollection =>
          !itemCollection.isHidding && (
            <FormRow
              style={{ marginTop: '0px' }}
              fullWidth
              label={itemCollection.label}
            >
              <>
                <Spacer size="s" />
                {itemCollection.properties.map(property => (
                  <>
                    <FormRow
                      style={{ margin: '0px' }}
                      fullWidth
                      isInvalid={!!errors?.[property.name]}
                      error={errors?.[property.name]?.message}
                    >
                      <Controller
                        name={property.name}
                        control={control}
                        render={({ field: { ref, ...fieldRest } }) =>
                          property.isTextArea ? (
                            <TextArea
                              compressed
                              inputRef={ref}
                              {...fieldRest}
                              fullWidth
                              placeholder={property.placeholder || 'Note'}
                            />
                          ) : (
                            <FieldText
                              compressed
                              inputRef={ref}
                              {...fieldRest}
                              fullWidth
                              placeholder={property.placeholder}
                            />
                          )
                        }
                      />
                    </FormRow>
                    <Spacer size="m" />
                  </>
                ))}
              </>
            </FormRow>
          ),
      )}
    </div>
  );
};

export default TestResultPart;
