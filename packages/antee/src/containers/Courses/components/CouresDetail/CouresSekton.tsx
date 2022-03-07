import {
  FlexItem,
  Text,
  LoadingSpinner,
  LoadingContent,
} from '@antoree/ant-ui';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import stys from './CourseDetail.module.scss';

export type CouceSektopProps = {
  isLoadingSession: boolean;
};
function CouresSekton({ isLoadingSession }: CouceSektopProps) {
  return (
    <div>
      <div style={{ marginTop: '8%' }}>
        <div id={stys.infoboxloading}>
          <div
            className="flex items-center justify-items-center"
            id={stys.infobox}
          >
            <FlexItem grow={false} className="m-0">
              <Skeleton
                style={{ marginRight: '5px', marginBottom: '10px' }}
                width={120}
                height={220}
              />
            </FlexItem>
            <FlexItem style={{ width: '200px' }}>
              <Text color="subdued" size="m">
                <Skeleton width={70} height={20} />
              </Text>
              <p
                style={{
                  // height: '4rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 2,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  marginTop: '10px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                {isLoadingSession ? 'Loading..' : 'Không có dữ liệu'}
              </p>

              <Text color="subdued" size="xs">
                <p style={{ marginTop: '10px', fontSize: '14px' }}>
                  {isLoadingSession ? 'Loading..' : 'Không có dữ liệu'}
                </p>
              </Text>
            </FlexItem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouresSekton;
