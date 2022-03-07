import React, { FunctionComponent } from 'react';
import {
  Page,
  PageBody,
  Title,
  FlexGroup,
  FlexItem,
  Button,
  Icon,
  Slider,
  Spacer,
  Text,
  FlexGrid,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import BgThirdStep from '../../../assets/images/welcome.png';

interface OwnProps {}

type Props = OwnProps;

const UsefulThree: FunctionComponent<Props> = props => {
  return (
    <div>
      <div className=" md:pb-20 md:px-4 text-center md:text-left md:px-14">
        <FlexGroup gutterSize="none">
          <FlexItem>
            <div className="w-full md:w-9/12 px-4 md:px-0">
              <Title className="font-semibold">
                <h4>
                  <FormattedMessage defaultMessage="3 - Đăng ký học chính thức" />
                </h4>
              </Title>
              <Spacer />
              <ul className="text-left">
                {[
                  <FormattedMessage defaultMessage="Cam kết đầu ra" />,
                  <FormattedMessage defaultMessage="Học viên được bảo lưu khóa học" />,
                  <FormattedMessage defaultMessage="Chuyển nhượng khóa học" />,
                  <div>
                    <FormattedMessage defaultMessage="Hỗ trợ 24/7" />
                    <br />
                    <FormattedMessage defaultMessage="Đối với trẻ em có giáo viên chủ nhiệm theo sát tình hình học tập và thông báo với phụ huynh." />
                  </div>,
                ].map(item => (
                  <li className="flex items-start mb-3">
                    <Icon type="check" className="mr-2 mt-1" />
                    <Text>
                      <p>{item}</p>
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          </FlexItem>
          <FlexItem>
            <img
              className="block w-full md:w-10/12"
              src={BgThirdStep}
              alt="background-second-step"
            />
          </FlexItem>
        </FlexGroup>
      </div>
    </div>
  );
};

export default UsefulThree;
