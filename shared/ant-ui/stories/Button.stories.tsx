import React from 'react';
import { Button, ButtonEmpty } from '../src';

export const Default = () => {
  return (
    <>
      <ButtonEmpty customIcon="ViewGridIcon">Test</ButtonEmpty>
      <ButtonEmpty iconType="alert">Test</ButtonEmpty>
      <Button fill color="primary">
        test
      </Button>
    </>
  );
};

const story = {
  title: 'Layout/Button',
  component: Button,
};

export default story;
