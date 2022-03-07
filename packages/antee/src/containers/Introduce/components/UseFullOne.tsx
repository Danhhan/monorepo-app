import React, { FunctionComponent } from 'react';
import {
  Button,
  FlexGrid,
  FlexGroup,
  FlexItem,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import testArr from '../data/testArr';

interface UseFullOneProps {}

const UseFullOne: FunctionComponent<UseFullOneProps> = ({}) => {
  return (
    <div>
      <div className="pt-8 md:py-20 md:px-4 text-center md:text-left md:px-14">
        <FlexGroup gutterSize="none">
          <FlexItem>
            <div className="w-full md:w-9/12 px-4 md:px-0">
              <Title size="l" className="font-medium euiTextColor--subdued">
                <h3>
                  <FormattedMessage defaultMessage="Quyền lợi" />
                </h3>
              </Title>
              <Spacer />
              <Title className="font-semibold">
                <h4>
                  <FormattedMessage defaultMessage="1 - Test Tiếng Anh miễn phí" />
                </h4>
              </Title>
              <Spacer />
              <Text>
                <p>
                  <FormattedMessage defaultMessage="Chỉ với 20 phút bạn có thể biết được trình độ của mình và lựa chọn giáo viên phù hợp." />
                </p>
              </Text>
              <Spacer />
              <Link to="/testing">
                <Button
                  minWidth={120}
                  style={{ width: 'fit-content', background: '#14B24C' }}
                  fill
                  iconType="arrowRight"
                  iconSide="right"
                  iconSize="m"
                >
                  <FormattedMessage defaultMessage="Tham gia ngay" />
                </Button>
              </Link>
            </div>
          </FlexItem>
          <FlexItem>
            <FlexGrid
              columns={2}
              responsive={false}
              gutterSize="l"
              className="h-full m-0 md:-m-3 "
            >
              {testArr?.map(item => (
                <FlexItem
                  className="text-center p-4 rounded-md"
                  style={{ background: '#F5F7FA' }}
                >
                  <img
                    style={{ objectFit: 'contain', display: 'block' }}
                    src={item.logo}
                    alt="overview-item"
                    className="w-24 h-24 mx-auto"
                  />
                  <Title size="xs" className="mb-2 font-semibold">
                    <h4>{item.title}</h4>
                  </Title>
                  <Text size="s">
                    <p>{item.text}</p>
                  </Text>
                </FlexItem>
              ))}
            </FlexGrid>
          </FlexItem>
        </FlexGroup>
      </div>
    </div>
  );
};

export default UseFullOne;
