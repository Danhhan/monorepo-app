import {
  Page,
  PageBody,
  PageContent,
  BasicTable,
  PageSideBar,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Header, Footer } from 'components';

import styles from './FAQ.module.scss';

export type PolicyProps = {};

const Policy: React.FC<PolicyProps> = () => {
  const location = useLocation();

  return (
    <div>
      <Header />
      <Page paddingSize="none" className={styles.pageBody}>
        <PageSideBar paddingSize="l" sticky>
          <Link to="/about-us">
            <Text color={location.pathname !== '/about-us' ? 'black' : ''}>
              <p>Về chúng tôi</p>
            </Text>
          </Link>
          <Spacer size="s" />
          <Link to="/policy">
            <Text color={location.pathname !== '/policy' ? 'black' : ''}>
              <p>Chính sách khóa học</p>
            </Text>
          </Link>
          <Spacer size="s" />
          <Link to="/term">
            <Text color={location.pathname !== '/term' ? 'black' : ''}>
              <p>Điều khoản sử dụng</p>
            </Text>
          </Link>
          <Spacer size="s" />
          <Link to="/privacy">
            <Text color={location.pathname !== '/privacy' ? 'black' : ''}>
              <p>Chính sách bảo mật</p>
            </Text>
          </Link>
        </PageSideBar>
        <PageBody className="bg-white p-4">
          <PageContent
            verticalPosition="center"
            horizontalPosition="center"
            paddingSize="none"
            color="subdued"
            hasShadow={false}
            style={{ minHeight: '80vh' }}
          >
            <Title>
              <h2>
                <FormattedMessage defaultMessage="Chính sách khóa học" />
              </h2>
            </Title>
            <Spacer />
            <Title size="xs">
              <h2>
                <FormattedMessage defaultMessage="A. THỜI HẠN BẢO LƯU KHÓA HỌC" />
              </h2>
            </Title>
            <Spacer />
            <BasicTable
              items={[
                {
                  package: '30h',
                  days: '55 ngày',
                  times: '4',
                },
                {
                  package: '36h',
                  days: '30 ngày',
                  times: '4',
                },
                {
                  package: '60h',
                  days: '75 ngày',
                  times: '8',
                },
                {
                  package: '72h',
                  days: '55 ngày',
                  times: '8',
                },
                {
                  package: '108h',
                  days: '65 ngày',
                  times: '9',
                },
                {
                  package: '120h',
                  days: '150 ngày',
                  times: '9',
                },
                {
                  package: '144h',
                  days: '80 ngày',
                  times: '10',
                },
                {
                  package: '180h',
                  days: '220 ngày',
                  times: '10',
                },
              ]}
              style={{ maxWidth: '600px' }}
              columns={[
                {
                  field: 'package',
                  name: 'Gói học',
                  truncateText: true,
                  textOnly: true,
                },
                {
                  field: 'days',
                  name: 'Số ngày bảo lưu tối đa',
                  truncateText: true,
                  textOnly: true,
                },
                {
                  field: 'times',
                  name: 'Số lần bảo lưu tối đa /khóa học',
                  truncateText: true,
                  textOnly: true,
                },
              ]}
            />
            <Spacer />
            <Title size="xs">
              <h2>
                <FormattedMessage defaultMessage="B. CHUYỂN NHƯỢNG KHÓA HỌC" />
              </h2>
            </Title>
            <Spacer />
            <BasicTable
              items={[
                {
                  package: '30h',
                  money: '300.000₫',
                  difmoney: 'Chưa hỗ trợ',
                },
                {
                  package: '60/72h',
                  money: 'Miễn phí',
                  difmoney: '300.000₫',
                },
                {
                  package: '108/120h',
                  money: 'Miễn phí',
                  difmoney: '500.000₫',
                },
                {
                  package: '144/180h',
                  money: 'Miễn phí',
                  difmoney: '1.000.000₫',
                },
              ]}
              style={{ maxWidth: '600px' }}
              columns={[
                {
                  field: 'package',
                  name: 'Gói học',
                  truncateText: true,
                  textOnly: true,
                },
                {
                  field: 'money',
                  name: 'Cùng hộ khẩu',
                  truncateText: true,
                  textOnly: true,
                },
                {
                  field: 'difmoney',
                  name: 'Khác hộ khẩu',
                  truncateText: true,
                  textOnly: true,
                },
              ]}
            />
            <Spacer />
            <Title size="xs">
              <h2>
                <FormattedMessage defaultMessage="C. GIA HẠN KHÓA HỌC" />
              </h2>
            </Title>
            <Spacer />
            <Text color="text" size="s">
              <p>
                *Học viên chỉ gia hạn tối đa 1 lần trước khi khóa học kết thúc
                theo quy định. Nếu học viên không đăng ký gia hạn thì khóa học
                của học viên sẽ kết thúc. Và học viên không còn quyền lợi cho
                thời lượng học chưa được hoàn thành của khóa đó.
              </p>
            </Text>
            <Spacer />
            <BasicTable
              items={[
                {
                  package: '30 ngày',
                  money: '100.000₫',
                  // difmoney: 'Chưa hỗ trợ',
                },
                {
                  package: '60 ngày',
                  money: '200.000₫',
                  // difmoney: '300.000₫',
                },
                {
                  package: '90 ngày',
                  money: '300.000₫',
                  // difmoney: '500.000₫',
                },
                {
                  package: '120 ngày',
                  money: '450.000₫',
                  // difmoney: '1.000.000₫',
                },
              ]}
              style={{ maxWidth: '600px' }}
              columns={[
                {
                  field: 'package',
                  name: 'Thời lượng gia hạn',
                  truncateText: true,
                  textOnly: true,
                },
                {
                  field: 'money',
                  name: 'Mức phí',
                  truncateText: true,
                  textOnly: true,
                },
              ]}
            />
            <Spacer />
            <Title size="xs">
              <h2>
                <FormattedMessage defaultMessage="D. THAY ĐỔI KHÓA HỌC" />
              </h2>
            </Title>
            <Spacer />
            <Title size="xs">
              <h2>
                <FormattedMessage defaultMessage="1. Đổi cùng nhóm giáo viên:" />
              </h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                Không thay đổi về số giờ còn lại cũng như giá trị số tiền còn
                lại của Học viên
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>
                <FormattedMessage defaultMessage="2. Đổi khác nhóm giáo viên:" />
              </h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                Học phí đã học = Số giờ đã học x Đơn giá học phí tại thời điểm
                đăng ký
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                Số giờ còn lại = P / Đơn giá học phí của khóa học tương đương
                tại thời điểm hiện tại Trong đó: P = Học phí đóng ban đầu - học
                phí đã học
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>
                <FormattedMessage defaultMessage="E. HOÀN HỌC PHÍ" />
              </h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                Nếu có bất cứ sự không hài lòng nào về hiệu quả khóa học hoặc vì
                các lý do bất khả kháng, học viên đều có thể được hoàn học phí:
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                - Học phí được hoàn trả 50% giá trị còn lại sau khi trừ đi giá
                trị số giờ đã được học được tính theo bước giá điều kiện của
                khóa học.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>- Áp dụng với các khóa học từ 60 giờ trở lên.</p>
            </Text>
            <Spacer />
            <Text>
              <p>
                - Đối với khóa đóng nhiều lần, chỉ áp dụng chính sách hoàn phí
                khi đã hoàn thiện tất cả các lần đóng.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                - Áp dụng với các khóa học đang diễn ra hoặc các khóa học bảo
                lưu nhưng chưa qua thời gian tối đa sử dụng dịch vụ (Tính từ
                ngày bắt đầu học cộng thêm thời hạn bảo lưu tương ứng theo thời
                lượng khóa học).
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                - Chính sách hoàn tiền chỉ được áp dụng một lần duy nhất đối với
                một khách hàng. Học phí hoàn lại được hoàn về đúng tài khoản của
                người đã thanh toán khóa học, không hoàn về tài khoản khác.
              </p>
            </Text>
            <Spacer />
          </PageContent>
        </PageBody>
      </Page>
      <Footer />
    </div>
  );
};

export default Policy;
