import { ButtonEmpty } from '@antoree/ant-ui';
import React from 'react';

interface ActionProps {
  testresult: {
    url: string;
  };
}

const Review = ({ testresult }: ActionProps) => {
  return (
    <div>
      <div>
        {testresult ? (
          <ButtonEmpty
            onClick={() => {
              window.open(testresult.url ? testresult.url : '');
            }}
          >
            Xem
          </ButtonEmpty>
        ) : null}
      </div>
    </div>
  );
};

export default Review;
