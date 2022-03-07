import React, { FunctionComponent } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Avatar, FlexItem, Text, Title } from '@antoree/ant-ui';

interface OwnProps {}

type Props = OwnProps;

const ReviewItem: FunctionComponent<Props> = props => {
  return (
    <div>
      <InfiniteScroll dataLength={50} next={() => {}} hasMore={false} loader>
        <div key="1" className="flex items-center justify-items-center">
          <FlexItem grow={false} className="m-0">
            <Avatar
              imageUrl=""
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
                Nguyen Huy Đoan
              </h1>
            </Title>
            <Text color="subdued" size="xs">
              <p>Viet nam</p>
            </Text>
            <Text color="subdued" size="xs">
              <p>24-02-2021</p>
            </Text>
          </FlexItem>
        </div>
        <div>
          <FlexItem>
            <Text color="text" style={{ fontWeight: 600 }}>
              Điểm mạnh
            </Text>

            <p style={{ wordWrap: 'break-word', paddingTop: '8px' }}>
              Bé rất thông minh, nhanh nhẹn, chịu khó giao tiếp và trả lời câu
              hỏi. Có thái độ học tập tích cực, kiến thức tiếp thu có tiến bộ.
            </p>

            <Text color="text" style={{ fontWeight: 600, paddingTop: '8px' }}>
              Điểm yếu,
            </Text>

            <p style={{ wordWrap: 'break-word', paddingTop: '8px' }}>
              Bé rất thông minh, nhanh nhẹn, chịu khó giao tiếp và trả lời câu
              hỏi. Có thái độ học tập tích cực, kiến thức tiếp thu có tiến bộ.
            </p>
            <Text color="text" style={{ fontWeight: 600, paddingTop: '8px' }}>
              Lời khuyên của giáo viên
            </Text>

            <p style={{ wordWrap: 'break-word', paddingTop: '8px' }}>
              Bé rất thông minh, nhanh nhẹn, chịu khó giao tiếp và trả lời câu
              hỏi. Có thái độ học tập tích cực, kiến thức tiếp thu có tiến bộ.
            </p>
          </FlexItem>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ReviewItem;
