import React from 'react';
import { ButtonIcon } from '../src';

export const Default = () => {
  return (
    <ButtonIcon display="fill" iconType="arrowRight" size="m" color="primary">
      test
    </ButtonIcon>
  );
};

const story = {
  title: 'Layout/ButtonIcon',
  component: ButtonIcon,
};

export default story;
