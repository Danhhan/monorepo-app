import {
  Button,
  FlexGroup,
  FlexItem,
  Link,
  PageContent,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import AgentLogo from 'assets/images/agent.svg';
import BenefitStudentLogo from 'assets/images/benefit-student.svg';
import CertificateLogo from 'assets/images/certificate.png';
import ComunicatingLogo from 'assets/images/comunicating.svg';
import FlexibleLogo from 'assets/images/flexible.svg';
import GlobalStandardLogo from 'assets/images/global-standard.png';
import JoinTestLogo from 'assets/images/join-test.png';
import SuggestLogo from 'assets/images/suggest.png';
import testBackground from 'assets/images/test-background.svg';
import TestLevelLogo from 'assets/images/test-level.png';
import WelcomeLogo from 'assets/images/welcome.png';
import {
  CompleteTestCode,
  OfficialCode,
  useRetrieveStatusUser,
} from 'services/user';
import { isMobile, isIPad13, isDesktop } from 'react-device-detect';
import styles from './Overview.module.scss';

export type OverviewProps = {
  selectHandle?: Function;
};

const Overview: React.FC<OverviewProps> = ({ selectHandle }) => {
  const { data, isLoading } = useRetrieveStatusUser({
    cacheTime: 0,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const tabCollections = [
    {
      title: 'Chuẩn quốc tế',
      text: 'Dựa trên thang điểm chuẩn Cambridge/Oxford',
      image: GlobalStandardLogo,
    },
    {
      title: 'Kiểm tra trình độ',
      text: 'Học viên biết được năng lực hiện tại của mình',
      image: TestLevelLogo,
    },
    {
      title: 'Nhận lộ trình kép',
      text: 'Thi chứng chỉ Cambridge, IELTS, TOEFL',

      image: CertificateLogo,
    },
    {
      title: 'Đề xuất giáo viên phù hợp',
      text: 'Từ Anh, Úc, Mỹ, Canada, Philippines và Việt Nam',
      image: SuggestLogo,
    },
  ];

  const tabCollectionsTrial = [
    {
      title: 'Tăng khả năng giao tiếp',
      text: '100% thời gian tương tác 1 -1 với giáo viên bằng Tiếng Anh',
      image: ComunicatingLogo,
    },
    {
      title: 'Chủ động',
      text: 'Học mọi lúc mọi nơi trên điện thoại và máy tính',
      image: AgentLogo,
    },
    {
      title: 'Linh hoạt',
      text: 'Lựa chọn giáo viên phù hợp với mỗi học viên',
      image: FlexibleLogo,
    },
    {
      title: 'Hỗ trợ',
      text: 'Quyền lợi học viên luôn được đảm bảo',
      image: BenefitStudentLogo,
    },
  ];

  const joinTestComponent = () =>
    data?.data?.status === OfficialCode ? (
      <>
        <Title className="font-semibold">
          <h2>Chào mừng bạn</h2>
        </Title>
        <Text>
          <p>Đến với khoá học của Antoree</p>
        </Text>
        <img
          src={WelcomeLogo}
          className="w-80 h-48 block mx-auto object-contain"
          alt="overview-big"
        />
      </>
    ) : (
      <FlexGroup
        alignItems="center"
        id={styles.Media}
        direction={isDesktop ? 'column' : 'row'}
      >
        <Title className="font-semibold">
          <h2>
            {inTrialStatus ? 'Tham gia học thử' : 'Tham gia test miễn phí'}
          </h2>
        </Title>
        <Text textAlign="center">
          <p className={styles.Introtext}>
            {inTrialStatus
              ? 'Experience online class 1 - 1 with teacher of Antoree'
              : 'Chỉ với 20 phút bạn có thể biết được trình độ của mình và lựa chọn giáo viên phù hợp'}
          </p>
        </Text>
        <img
          src={JoinTestLogo}
          className="w-48 h-48 block mx-auto object-contain"
          alt="overview-big"
          id={styles.imgIntro}
        />
        <Link to={inTrialStatus ? '/testing/booking' : '/testing/booking'}>
          <Button
            fill
            style={{ width: '240px', background: '#14B24C' }}
            className="m-auto"
            fullWidth
          >
            Bắt đầu
          </Button>
        </Link>
      </FlexGroup>
    );

  const inTrialStatus = data?.data?.status === CompleteTestCode;

  return (
    <PageContent hasBorder={false} style={{ border: 0, width: '100%' }}>
      <FlexGroup id={styles.media} direction={isDesktop ? 'column' : 'row'}>
        <FlexGroup className="flex-wrap" alignItems="center">
          <FlexItem component="span" className="rounded-xl text-center py-14">
            {joinTestComponent()}
          </FlexItem>
          <FlexItem>
            <img src={testBackground} id={styles.Media} alt="test background" />
          </FlexItem>
        </FlexGroup>
        <Spacer size="xxl" />

        <FlexGroup responsive id={styles.media}>
          {inTrialStatus
            ? tabCollectionsTrial.map(item => (
                <FlexItem key={item.title} className="text-center">
                  <img
                    style={{ objectFit: 'contain', display: 'block' }}
                    src={item.image}
                    alt="overview-item"
                    className="w-24 h-24 mx-auto"
                  />
                  <Title size="s" className="mb-2">
                    <h4>{item.title}</h4>
                  </Title>
                  <Text size="xs">
                    <p>{item.text}</p>
                  </Text>
                </FlexItem>
              ))
            : tabCollections.map(item => (
                <FlexItem key={item.title} className="text-center">
                  <img
                    style={{ objectFit: 'contain', display: 'block' }}
                    src={item.image}
                    alt="overview-item"
                    className="w-24 h-24 mx-auto"
                  />
                  <Title size="s" className="mb-2">
                    <h4>{item.title}</h4>
                  </Title>
                  <Text size="xs">
                    <p>{item.text}</p>
                  </Text>
                </FlexItem>
              ))}
        </FlexGroup>
      </FlexGroup>
    </PageContent>
  );
};

export default Overview;
