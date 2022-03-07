import { FormattedMessage } from 'react-intl';
import GlobalStandardLogo from '../../../assets/images/global-standard.png';
import TestLevelLogo from '../../../assets/images/test-level.png';
import CertificateLogo from '../../../assets/images/certificate.png';
import SuggestLogo from '../../../assets/images/suggest.png';

const testArr = [
  {
    logo: GlobalStandardLogo,
    title: <FormattedMessage defaultMessage="Chuẩn quốc tế" />,
    text: (
      <FormattedMessage defaultMessage="Dựa trên thang điểm chuẩn Cambridge/Oxford" />
    ),
  },
  {
    logo: TestLevelLogo,
    title: <FormattedMessage defaultMessage="Kiểm tra trình độ" />,
    text: (
      <FormattedMessage defaultMessage="Học viên biết được năng lực hiện tại của mình" />
    ),
  },
  {
    logo: CertificateLogo,
    title: <FormattedMessage defaultMessage="Nhận lộ trình kép" />,
    text: (
      <FormattedMessage defaultMessage="Thi chứng chỉ Cambridge, IELTS, TOEFL" />
    ),
  },
  {
    logo: SuggestLogo,
    title: <FormattedMessage defaultMessage="Đề xuất giáo viên phù hợp" />,
    text: (
      <FormattedMessage defaultMessage="Từ Anh, Úc, Mỹ, Canada, Philippines và Việt Nam" />
    ),
  },
];
export default testArr;
