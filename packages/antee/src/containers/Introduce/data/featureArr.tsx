import { FormattedMessage } from 'react-intl';
import logoFeature1 from '../../../assets/images/feature-1.svg';
import logoFeature2 from '../../../assets/images/feature-2.svg';
import logoFeature3 from '../../../assets/images/feature-3.svg';
import logoFeature4 from '../../../assets/images/feature-4.svg';

const featureArr = [
  {
    logo: logoFeature1,
    title: <FormattedMessage defaultMessage="Linh hoạt" />,
    text: (
      <FormattedMessage defaultMessage="Chọn giáo viên theo mọi trình độ, nhu cầu học" />
    ),
  },
  {
    logo: logoFeature2,
    title: <FormattedMessage defaultMessage="Phát triển tối đa" />,
    text: (
      <FormattedMessage defaultMessage="Chương trình học thiết kế riêng cho mỗi học viên" />
    ),
  },
  {
    logo: logoFeature3,
    title: <FormattedMessage defaultMessage="Chủ động" />,
    text: (
      <FormattedMessage defaultMessage="Học mọi lúc mọi nơi trên điện thoại và máy tính" />
    ),
  },
  {
    logo: logoFeature4,
    title: <FormattedMessage defaultMessage="Cam kết" />,
    text: (
      <FormattedMessage defaultMessage="Chính sách hoàn tiền chỉ có tại Antoree" />
    ),
  },
];
export default featureArr;
