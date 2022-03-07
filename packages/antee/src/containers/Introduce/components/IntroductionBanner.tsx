import React, { FunctionComponent } from 'react';
import {
  Button,
  FlexGroup,
  FlexItem,
  Icon,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styles from '../Introduce.module.scss';
import { YoutubePlayer } from '../../../components';
import introUnderbanner from '../data/introUnderbanner';

interface OwnProps {}

type Props = OwnProps;

const IntroductionBanner: FunctionComponent<Props> = props => {
  return (
    <div className={styles.pageBanner}>
      <FlexGroup
        // justifyContent="center"
        alignItems="center"
        gutterSize="xl"
        style={{ minHeight: '60vh' }}
      >
        <FlexItem>
          <Title size="l" className="text-white font-semibold">
            <h3>
              <FormattedMessage defaultMessage="Chuyện học Tiếng Anh" />
            </h3>
          </Title>
          <Spacer size="l" />
          <Text className="lg:w-5/6" color="#fff">
            <p>
              <FormattedMessage defaultMessage="Chúng ta thường dành rất nhiều thời gian để tìm kiếm một người có khả năng và thời gian phù hợp để đáp ứng nhu cầu học của mình. Trong khi đó tại Việt Nam và các nước khác luôn có hàng nghìn giáo viên có thể giúp ta với chi phí hoàn toàn hợp lí." />
            </p>
          </Text>
          <Spacer size="s" />
          <Text className="lg:w-5/6" color="#fff">
            <p>
              <FormattedMessage defaultMessage="Antoree ra đời giúp việc tìm kiếm giáo viên trở nên dễ dàng, và quan trọng hơn bạn có thể bắt đầu học nhanh chóng ở mọi lúc, mọi nơi." />
            </p>
          </Text>
          <Spacer size="xl" />
          <Link to="/tkhomepage">
            <Button
              minWidth={120}
              style={{ width: 'fit-content', background: '#14B24C' }}
              fill
              iconType="arrowRight"
              iconSide="right"
              iconSize="m"
            >
              <FormattedMessage defaultMessage="Trải nghiệm học ngay" />
            </Button>
          </Link>
        </FlexItem>
        <FlexItem>
          <div className="rounded-xl overflow-hidden">
            <YoutubePlayer youtubeID="qtDUS1aGPQc" />
          </div>
        </FlexItem>
      </FlexGroup>
      <div className={styles.underBanner}>
        <FlexGroup
          // responsive={false}
          gutterSize="m"
          justifyContent="spaceEvenly"
          className={styles.underBannerInner}
        >
          {introUnderbanner?.map(underBannerItem => (
            <FlexItem className="flex justify-center items-center">
              <FlexGroup gutterSize="none" responsive={false}>
                <FlexItem
                  grow={false}
                  className="flex justify-center items-center mr-4"
                >
                  <Icon
                    style={{ height: '50px', width: '50px' }}
                    type={underBannerItem?.icon}
                  />
                </FlexItem>
                <FlexItem grow={false}>
                  <Title className="whitespace-nowrap font-semibold " size="m">
                    <h2>{underBannerItem?.title}</h2>
                  </Title>
                  <Text
                    style={{ fontSize: '20px' }}
                    className="whitespace-nowrap font-normal"
                  >
                    <p>{underBannerItem?.text}</p>
                  </Text>
                </FlexItem>
              </FlexGroup>
            </FlexItem>
          ))}
        </FlexGroup>
      </div>
    </div>
  );
};

export default IntroductionBanner;
