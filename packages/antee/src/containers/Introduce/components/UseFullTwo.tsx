import React, { FunctionComponent } from 'react';
import {
  Button,
  FlexGrid,
  FlexGroup,
  FlexItem,
  Icon,
  Page,
  PageBody,
  Slider,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import BgSecondStep from '../../../assets/images/second-bg-step.png';

interface UseFullTwoProps {}

const UseFullTwo: FunctionComponent<UseFullTwoProps> = ({}) => {
  return (
    <div>
      <div className=" md:pb-20 md:px-4 text-center md:text-left md:px-14">
        <FlexGroup gutterSize="none" className="md:flex-row-reverse">
          <FlexItem>
            <div className="w-full md:w-9/12 px-4 md:px-0">
              <Title className="font-semibold">
                <h4>
                  <FormattedMessage defaultMessage="2 - Trải nghiệm học thử" />
                </h4>
              </Title>
              <Spacer />
              <Text>
                <p>
                  <FormattedMessage defaultMessage="Tự chọn học với các giáo viên chất lượng đang giảng dạy tại Antoree." />
                </p>
              </Text>
              <Spacer />
              <Text>
                <p>
                  <FormattedMessage defaultMessage="Chỉ với 20 phút bạn có thể biết được trình độ của mình và lựa chọn giáo viên phù hợp." />
                </p>
              </Text>
              <Spacer />
              <Link to="/tkhomepage">
                <Button
                  minWidth={120}
                  style={{ width: 'fit-content', background: '#14B24C' }}
                  fill
                  iconType="arrowRight"
                  iconSide="right"
                  iconSize="m"
                >
                  <FormattedMessage defaultMessage="Chọn giáo viên" />
                </Button>
              </Link>
            </div>
          </FlexItem>
          <FlexItem>
            <img
              className="block w-full md:w-10/12"
              src={BgSecondStep}
              alt="background-second-step"
            />
          </FlexItem>
        </FlexGroup>
      </div>
    </div>
  );
};

export default UseFullTwo;
