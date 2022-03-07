import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Link } from '../src';

export const Default = () => {
  return (
    <BrowserRouter>
      <Link to="/home">Go to home</Link>
    </BrowserRouter>
  );
};

const story = {
  title: 'Navigation/Link',
  component: Link,
};

export default story;
