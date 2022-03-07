import {
  Page,
  PageBody,
  PageContent,
  PageSideBar,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Header, Footer } from 'components';

import AboutUsImge from 'assets/images/about-us.png';

import styles from './FAQ.module.scss';

export type AboutUsProps = {};

const AboutUs: React.FC<AboutUsProps> = () => {
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
                <FormattedMessage defaultMessage="Về chúng tôi" />
              </h2>
            </Title>
            <Spacer />
            <Title size="xs">
              <h4>
                <FormattedMessage defaultMessage="I. Câu chuyện khởi nghiệp" />
              </h4>
            </Title>
            <Spacer />
            <Text>
              <p>
                <FormattedMessage defaultMessage="Ý tưởng thành lập Antoree bắt đầu từ việc tôi (Vân Anh - CEO & Founder của Antoree) không thể tìm được một người phù hợp với thời gian và khả năng để dạy mình một khóa học lập trình theo nhu cầu bản thân. Những người tôi tìm kiếm trên mạng đưa ra mức giá quá cao cho mỗi giờ học và tôi lại quá bận rộn để có thể sắp xếp thời gian theo một khóa học tại bất kì trung tâm nào. Lúc đó, tôi biết rằng ở ngay tại Việt Nam, Ấn Độ hay Singapore có hàng nghìn người có thể giúp mình với chi phí hoàn toàn hợp lí. Nhưng vấn đề là tôi không thể nào tìm được một người như thế trên mạng!" />
              </p>
            </Text>
            <Spacer />
            <img width="100%" src={AboutUsImge} alt="about-us" />
            <Spacer />
            <Text>
              <p>
                <FormattedMessage defaultMessage="Đến Philippines, tôi đã thấy có rất nhiều người đến từ Nhật Bản và Hàn Quốc ở đây, họ đến Philippines chỉ để học Tiếng Anh! Tiếng Anh là ngôn ngữ giao tiếp chính của người Philippines, kĩ năng sử dụng ngôn ngữ này của người Philippines là quá tốt, không có gì để bàn cãi. Nhưng ở Việt Nam, để học giáo viên Philippines, người học vẫn phải đến các trung tâm mà không phải ai cũng có điều kiện làm việc đó." />
              </p>
            </Text>
            <Spacer />
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/PsrFuxUUR74"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <Spacer />
            <Text>
              <p>
                <FormattedMessage defaultMessage="Luôn mong muốn có thể tạo ra giá trị thực sự để cống hiến cho xã hội, tôi đã quyết định từ bỏ mức lương 3000 USD với vị trí COO ở công ty cũ và khởi nghiệp với Antoree - công ty giáo dục dựa trên nền tảng công nghệ. Tôi, với nhiệt huyết và đam mê của mình, muốn biến Antoree trở thành nền tảng kết nối học viên và giáo viên lớn nhất thế giới. Nhờ vào sức mạnh của công nghệ, cho dù bạn đến từ đâu, bạn muốn học gì bạn đều có thể tìm thấy người có thể dạy mình một cách nhanh chóng, dễ dàng trên Antoree." />
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                <FormattedMessage defaultMessage="Chúng tôi đang cố gắng từng giờ để cải thiện sản phẩm ngày một tốt hơn. Với mong muốn mọi người đều có thể được học tiếng Anh với gia sư và việc học sẽ được cá nhân hóa và tối đa hiệu quả." />
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                <FormattedMessage defaultMessage="Với Antoree: “Cause we love to help each other learn and grow together”." />
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h4>
                <FormattedMessage defaultMessage="II. Giá trị Antoree English đem lại" />
              </h4>
            </Title>
            <Spacer />
            <Title size="xs">
              <h4>
                <FormattedMessage defaultMessage="1. Chủ động và cá nhân hóa:" />
              </h4>
            </Title>
            <Spacer />
            <ul style={{ listStyle: 'disc', listStylePosition: 'inside' }}>
              <li>Lớp học 1 thầy kèm 1 trò xuyên suốt</li>
              <Spacer size="s" />
              <li>Giáo trình, lộ trình học dành riêng từng cá nhân.</li>
              <Spacer size="s" />
              <li>Thời gian, địa điểm học linh hoạt</li>
            </ul>
            <Spacer />
            <Title size="xs">
              <h4>
                <FormattedMessage defaultMessage="2. Chi phí hợp lí:" />
              </h4>
            </Title>
            <Spacer />
            <ul style={{ listStyle: 'disc', listStylePosition: 'inside' }}>
              <li>Tài liệu, kiểm tra trình độ miễn phí</li>
              <Spacer size="s" />
              <li>
                Học phí hợp lí với từng nhóm giáo viên và trình độ học viên
              </li>
            </ul>
            <Spacer />
            <Title size="xs">
              <h4>
                <FormattedMessage defaultMessage="3. Chăm sóc tận tình:" />
              </h4>
            </Title>
            <Spacer />
            <ul style={{ listStyle: 'disc', listStylePosition: 'inside' }}>
              <li>Quản lí lớp học hỗ trợ thường xuyên</li>
              <Spacer size="s" />
              <li>
                Được thay đổi lịch học và bảo lưu lớp học khi đủ điều kiện
              </li>
              <Spacer size="s" />
              <li>Được thay đổi giáo viên nếu không hiệu quả</li>
            </ul>
            <Spacer />
            <Title size="xs">
              <h4>
                <FormattedMessage defaultMessage="III. Dạy và học tại Antoree như thế nào?" />
              </h4>
            </Title>
            <Spacer />
            <Text>
              <p>
                Antoree là nền tảng kết nối những người học và người dạy tiếng
                Anh trên toàn thế giới thông qua các lớp học cá nhân, 1 thầy kèm
                1 trò.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h4>
                <FormattedMessage defaultMessage="1. Trở thành thành viên:" />
              </h4>
            </Title>
            <Spacer />
            <Text>
              <p>Đăng ký học thử, được test Tiếng Anh miễn phí Tại đây.</p>
            </Text>
            <Text>
              <p>Đăng ký làm giáo viên Tại đây.</p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h4>
                <FormattedMessage defaultMessage="1. Trở thành thành viên:" />
              </h4>
            </Title>
            <Spacer />
            <Text>
              <p>
                Antoree tin rằng việc học sẽ đạt hiệu quả cao nhất nếu giáo viên
                và học viên phù hợp với nhau. Do vậy chúng tôi cố gắng đưa học
                viên tới những giáo viên phù hợp nhất với họ, dựa trên: khóa
                học, mức giá, thời gian, ngôn ngữ sử dụng, phương pháp học tập,
                phong cách giảng dạy, tính cách và sở thích của mọi người. Học
                viên cũng có thể tự tìm giáo viên cho mình.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h4>
                <FormattedMessage defaultMessage="3. Học & Nhận kết quả" />
              </h4>
            </Title>
            <Spacer />
            <Text>
              <p>Antoree sẽ giúp bạn đánh giá sự tiến bộ của bản thân.</p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h4>
                <FormattedMessage defaultMessage="3. Học & Nhận kết quả" />
              </h4>
            </Title>
            <Spacer />
            <Text>
              <p>
                Sau mỗi buổi học, giáo viên và học viên sẽ đánh giá lẫn nhau một
                cách chân thực. Điều này không chỉ là phản hồi để đối chiếu tốt
                hơn, mà còn nhắc nhở cả hai bên phải thể hiện tốt hơn cho những
                buổi học sau đó.
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

export default AboutUs;
