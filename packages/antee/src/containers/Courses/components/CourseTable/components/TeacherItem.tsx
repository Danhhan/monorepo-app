import React, { FunctionComponent } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  Avatar,
  Button,
  FlexGroup,
  FlexItem,
  Text,
  Title,
} from '@antoree/ant-ui';

interface TeacherItemProps {
  dataTeacherreview: any;
}

const TeacherItem: FunctionComponent<TeacherItemProps> = ({
  dataTeacherreview,
}) => {
  return (
    <div>
      <InfiniteScroll dataLength={50} next={() => {}} hasMore={false} loader>
        {dataTeacherreview.map((item: any) => (
          <div key={item.id} className="flex items-center justify-items-center">
            <FlexItem grow={false} className="m-0">
              <Avatar
                imageUrl={item.avatarurl}
                name="Phong"
                size="xl"
                type="space"
                style={{ margin: '16px 8px 16px 0px' }}
              />
            </FlexItem>
            <FlexItem style={{ width: '130px' }}>
              <Title size="xxs">
                <h1
                  className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                  style={{
                    // height: '4rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 2,
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.name}
                </h1>
              </Title>
              <Text color="subdued" size="xs">
                <p>{item.country}</p>
              </Text>
              <Text color="subdued" size="xs">
                <p>24-02-2021</p>
              </Text>
            </FlexItem>
            <FlexGroup style={{ paddingLeft: '125px' }}>
              <FlexItem>
                {item.videoUrl ? (
                  <Button
                    style={{
                      backgroundColor: 'rgba(24, 48, 89, 0.15)',
                      border: 'none',
                      color: 'black',
                    }}
                    iconType="videoPlayer"
                  >
                    Xem video
                  </Button>
                ) : null}
              </FlexItem>
              <FlexItem>
                <Button
                  style={{
                    backgroundColor: 'rgba(20, 178, 76, 0.15)',
                    border: 'none',
                    color: '#14B24C\n',
                  }}
                  iconType="document"
                >
                  Xem kết quả
                </Button>
              </FlexItem>
            </FlexGroup>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default TeacherItem;
