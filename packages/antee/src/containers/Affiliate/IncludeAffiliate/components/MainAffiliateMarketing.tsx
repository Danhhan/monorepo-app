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
  Card,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useToggle } from 'hooks';
import OBJECTS from 'assets/images/OBJECTS.png';
import manage from 'assets/images/manage.svg';
import graph from 'assets/images/graph.svg';
import payment from 'assets/images/payment.svg';

import HeaderLoginModal from 'components/HeaderLoginModal/HeaderLoginModal';

const affiliateMarketingArray = [
  {
    logo: manage,
    title: <FormattedMessage defaultMessage="Tạo và quản lí link" />,
    text: (
      <FormattedMessage defaultMessage="Quản lí toàn bộ link chia sẻ theo từng chiến dịch đang chạy" />
    ),
  },
  {
    logo: graph,
    title: <FormattedMessage defaultMessage="Theo dõi số liệu" />,
    text: (
      <FormattedMessage defaultMessage="Dữ liệu được cập nhật liên tục để đánh giá mức độ hiệu quả chia sẻ" />
    ),
  },
  {
    logo: payment,
    title: <FormattedMessage defaultMessage="Nhận thanh toán" />,
    text: (
      <FormattedMessage defaultMessage="Chính sách thanh toán rõ ràng theo các chỉ số đạt được trong tháng" />
    ),
  },
];
const MainAffiliateMarketing: React.FC<{}> = () => {
  const {
    isVisiable: isShowSignUpModal,
    toggle: toggleModalSignUpModal,
    close: closeModalSignUpModal,
  } = useToggle();
  return (
    <div className=" md:py-20 text-center md:text-left md:px-20">
      <FlexGroup gutterSize="none" className="md:flex-row-reverse">
        <FlexItem>
          <img
            className="block w-full md:w-10/12"
            src={OBJECTS}
            alt="background-second-step"
          />
        </FlexItem>
        <FlexItem>
          <div className="w-full md:w-10/12 px-4 md:px-0">
            <Title className="font-semibold">
              <h4>
                <FormattedMessage defaultMessage="Chương trình tiếp thị liên kết" />
              </h4>
            </Title>
            <Spacer />
            <Text>
              <p>
                <FormattedMessage defaultMessage="Chia sẻ trải nghiệm học Tiếng Anh trực tuyến 1 kèm 1 tại Antoree tới khách hàng tiềm năng và tăng thu nhập cá nhân." />
              </p>
            </Text>
            <Spacer />
            <Spacer />
            <div>
              <Button
                onClick={toggleModalSignUpModal}
                minWidth={120}
                style={{ width: 'fit-content', background: '#14B24C' }}
                fill
                iconSize="m"
              >
                <FormattedMessage defaultMessage="Đăng ký thành viên" />
              </Button>
            </div>
          </div>
        </FlexItem>
      </FlexGroup>
      <div className="md:pb-3 pb-3 md:mt-16 mt-3 text-center md:text-left md:px-20">
        <div className="px-4 md:px-0 w-full">
          <FlexGrid columns={3} gutterSize="xl">
            {affiliateMarketingArray?.map((featureItem: any) => (
              <FlexItem>
                <Card
                  icon={<Icon className="w-10 h-10" type={featureItem.logo} />}
                  title={featureItem.title}
                  description={
                    <Text>
                      <p className="text-gray-500 text-sm">
                        {featureItem.text}
                      </p>
                    </Text>
                  }
                  onClick={() => {}}
                />
              </FlexItem>
            ))}
          </FlexGrid>
        </div>
      </div>
      <HeaderLoginModal
        isVisiable={isShowSignUpModal}
        onConfirm={() => {
          closeModalSignUpModal();
        }}
        onClose={closeModalSignUpModal}
      />
    </div>
  );
};

export default MainAffiliateMarketing;
