import React from 'react';
import { FormRow, FieldText } from '../src';

export const Default = () => {
  return (
    <FormRow required>
      <FieldText />
    </FormRow>
  );
};

const story = {
  title: 'Layout/FormRow',
  component: FormRow,
};

export default story;
