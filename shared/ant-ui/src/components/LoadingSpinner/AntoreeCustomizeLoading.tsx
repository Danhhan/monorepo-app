import React from 'react';
import { EuiLoadingSpinner } from '@elastic/eui';

import { Title } from '../Title';

export type AntoreeCustomizeLoadingProps = {
  antoreeSize?: 's' | 'xxxs' | 'xxs' | 'xs' | 'm' | 'l';
  loadingSize?: 's' | 'xxxs' | 'xxs' | 'xs' | 'm' | 'l';
  loadingSpinnerSize?: 's' | 'm' | 'l' | 'xl';
};

const AntoreeCustomizeLoading: React.FC<AntoreeCustomizeLoadingProps> = ({
  antoreeSize,
  loadingSize,
  loadingSpinnerSize,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Title size={antoreeSize || 'm'}>
        <div
          className="loading loading01 euiTextColor--subdued"
          style={{ fontWeight: 400 }}
        >
          <span>A</span>
          <span>n</span>
          <span>t</span>
          <span>o</span>
          <span>r</span>
          <span>e</span>
          <span>e</span>
        </div>
      </Title>
      <EuiLoadingSpinner size={loadingSpinnerSize || 'xl'} />
      <Title size={loadingSize || 's'}>
        <h1 className="loading-antoree-custom">
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </h1>
      </Title>
    </div>
  );
};

export default AntoreeCustomizeLoading;
