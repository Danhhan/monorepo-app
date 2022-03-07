import React from 'react';
import { Title, Spacer, Link, Text } from '@antoree/ant-ui';

import logoAntoree from 'assets/images/new-ant-logo.svg';
import styles from './FooterAffiliate.module.scss';

const FooterAffiliateMarketing: React.FC<{}> = () => {
  return (
    <div className={styles.footer}>
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

export default FooterAffiliateMarketing;
