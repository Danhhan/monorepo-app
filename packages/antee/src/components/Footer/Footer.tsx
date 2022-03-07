/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-target-blank */
import {
  Title,
  FlexGroup,
  FlexItem,
  Button,
  Icon,
  Spacer,
  Link,
  Text,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import logoAntoree from 'assets/images/new-ant-logo.svg';
import Download1 from 'assets/images/download-1.png';
import Download2 from 'assets/images/download-2.png';
import FBLogo from 'assets/images/facebook.svg';
import YoutubeLogo from 'assets/images/youtube.svg';
import SkypeLogo from 'assets/images/skype.svg';
import styles from './Footer.module.scss';

const Footer: React.FC<{}> = () => {
  return (
    <div className={styles.footer}>
      <FlexGroup>
        <FlexItem>
          <Title size="xs" className="font-medium">
            <h5>
              <FormattedMessage defaultMessage="HỖ TRỢ KHÁCH HÀNG" />
            </h5>
          </Title>
          <Spacer size="s" />
          <ul>
            {[
              <>
                <Icon color="#fff" type="mobile" className="mr-2 mt-1" />
                <Text size="s">
                  <p>
                    <FormattedMessage defaultMessage="Hotline: 1800 6806 / 090 963 6002" />
                  </p>
                </Text>
              </>,
              <>
                <Icon color="#fff" type="email" className="mr-2 mt-1" />
                <Text size="s">
                  <p>
                    <FormattedMessage defaultMessage="Email hello@antoree.com" />
                  </p>
                </Text>
              </>,
            ]?.map((item, index) => (
              <li key={index} className="flex items-start mb-3">
                {item}
              </li>
            ))}
          </ul>
          <Title size="xs" className="font-medium">
            <h5>
              <FormattedMessage defaultMessage="Phản hồi về dịch vụ:" />
            </h5>
          </Title>
          <ul>
            {[
              <>
                <Icon color="#fff" type="email" className="mr-2 mt-1" />
                <Text size="s">
                  <p>
                    <FormattedMessage defaultMessage="ceo@antoree.com" />
                  </p>
                </Text>
              </>,
            ]?.map((item, index) => (
              <li key={index} className="flex items-start mb-3">
                {item}
              </li>
            ))}
          </ul>
        </FlexItem>
        <FlexItem>
          <Title size="xs" className="font-medium">
            <h5>
              <FormattedMessage defaultMessage="THÔNG TIN DỊCH VỤ" />
            </h5>
          </Title>
          <Spacer size="s" />
          <ul>
            {[
              {
                label: <FormattedMessage defaultMessage="Điều khoản sử dụng" />,
                link: '/term',
              },
              {
                label: <FormattedMessage defaultMessage="Chính sách bảo mật" />,
                link: '/privacy',
              },
              {
                label: (
                  <FormattedMessage defaultMessage="Chính sách hoàn tiền" />
                ),
                link: '/policy',
              },
              {
                label: <FormattedMessage defaultMessage="FAQs" />,
                link: '/about-us',
              },
            ]?.map((item, index) => (
              <li key={index} className="flex items-start mb-3">
                {/* <Icon type="check" className="mr-2 mt-1" /> */}
                <Link to={item?.link}>
                  <Text size="s">
                    <p>{item?.label}</p>
                  </Text>
                </Link>
              </li>
            ))}
          </ul>
        </FlexItem>
        <FlexItem>
          <Title size="xs" className="font-medium">
            <h5>
              <FormattedMessage defaultMessage="KẾT NỐI VỚI ANTOREE" />
            </h5>
          </Title>
          <Spacer size="s" />
          <Text size="s">
            <p>
              <FormattedMessage defaultMessage=" Cộng đồng" />
            </p>
          </Text>
          <Spacer />
          <a
            href="https://members.antoree.com/teacher-register?utm_source=commercial_footer"
            target="_blank"
          >
            <Button
              minWidth={120}
              style={{ width: 'fit-content', background: '#14B24C' }}
              fill
            >
              Trở thành giáo viên
            </Button>
          </a>
          <Spacer />
          <FlexGroup responsive={false} gutterSize="none">
            {/* <FlexItem grow={false}>
              <a
                href="https://www.facebook.com/antoree.co"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  style={{ width: '40px', height: '40px' }}
                  className="mr-2"
                  src={ZaloLogo}
                  alt="social-logo"
                />
              </a>
            </FlexItem> */}
            <FlexItem grow={false}>
              <a
                href="https://www.facebook.com/antoree.co"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  style={{ width: '40px', height: '40px' }}
                  src={FBLogo}
                  className="mr-2"
                  alt="social-logo"
                />
              </a>
            </FlexItem>
            <FlexItem grow={false}>
              <a
                href="https://www.youtube.com/channel/UCFFoOzIv-jDYUNfrgx4KRkA"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  style={{ width: '40px', height: '40px' }}
                  src={YoutubeLogo}
                  className="mr-2"
                  alt="social-logo"
                />
              </a>
            </FlexItem>
            <FlexItem grow={false}>
              <a
                href="skype:admin@antoree.com"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  style={{ width: '40px', height: '40px' }}
                  src={SkypeLogo}
                  className="mr-2"
                  alt="social-logo"
                />
              </a>
            </FlexItem>
          </FlexGroup>
        </FlexItem>
        <FlexItem>
          <Title size="xs" className="font-medium">
            <h5>
              <FormattedMessage defaultMessage="TẢI ỨNG DỤNG TRÊN ĐIỆN THOẠI" />
            </h5>
          </Title>
          <Spacer size="s" />
          <a
            style={{ textDecoration: 'none', color: 'white' }}
            target="_blank"
            href="https://bit.ly/2WV0SgN"
          >
            <img width="200px" src={Download1} alt="android" />
          </a>
          <Spacer />
          <a
            style={{ textDecoration: 'none', color: 'white' }}
            target="_blank"
            href="https://bit.ly/2WV0SgN"
          >
            <img width="200px" src={Download2} alt="ios" />
          </a>
        </FlexItem>
      </FlexGroup>
      <Spacer />
      <div className="px-0 md:px-4">
        <Link to="/tkhomepage">
          <img width="160px" src={logoAntoree} alt="footer-logo" />
        </Link>
        <Spacer />
        <div>
          <Title size="xxs">
            <h5>
              Công ty Giáo dục và Đào tạo ANTOREE INTERNATIONAL PTE. LTD. (MST:
              201436698Z)
            </h5>
          </Title>
          <Text size="s">
            <p>
              Trụ sở chính: 10 Anson Road, #27-15, International Plaza,
              Singapore 079903
            </p>
          </Text>
        </div>
        <Spacer size="s" />
        <div>
          <Title size="xxs">
            <h5>
              Đối tác đại diện tại Việt Nam: CÔNG TY TNHH PHÁT TRIỂN GIÁO DỤC
              ANTOREE (MST: 0313769851)
            </h5>
          </Title>
          <Text size="s">
            <p>
              Trụ sở chính: 187/7 Điện Biên Phủ, P. Đa Kao, Q 1, TP Hồ Chí Minh,
              Việt Nam
            </p>
          </Text>
        </div>
        <Spacer size="s" />
        <div className={styles.Address}>
          <Title size="xxs">
            <h5>Văn phòng đại diện, tiếp khách và nhận thư:</h5>
          </Title>
          <Text size="s">
            <p>
              Tại TP.HCM: Lô 7F-03, Tầng 7, Tòa nhà Flemington, 182 Lê Đại Hành,
              Phường 15, Quận 11, Hồ Chí Minh
            </p>
          </Text>
          <Text size="s">
            <p>
              Tại Hà Nội: Tầng 17, toà nhà Đa Năng, 169 Nguyễn Ngọc Vũ, Phường
              Trung Hoà, Quận Cầu Giấy, Hà Nội
            </p>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Footer;
