/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-danger */
import { FlexGroup, FlexItem, Spacer, Text, Title } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';

import { FunctionComponent } from 'react';
import styles from '../DetailTeacher.module.scss';
import sty from '../Videodetail.module.scss';

interface IntroductionProps {
  data: any;
  vidRef1: any;
  setShowMuted2: (data: boolean) => void;
  checkvideoYoutube: boolean;
}

const Introduction: FunctionComponent<IntroductionProps> = ({
  setShowMuted2,
  data,
  vidRef1,
  checkvideoYoutube,
}: IntroductionProps) => {
  const vid = document.getElementsByClassName(
    'videoplay2',
  )[0] as HTMLVideoElement;

  console.log(vid?.videoWidth);

  return (
    <>
      <div className={styles.antoreeIntro}>
        <Title className="font-semibold">
          <h3>
            <FormattedMessage defaultMessage="Giới thiệu" />
          </h3>
        </Title>
        <Spacer />
        <Text>
          <p
            style={{
              maxWidth: '950px',
              width: '100%',
            }}
            className={sty.textDescription}
            dangerouslySetInnerHTML={{
              __html: data?.data?.data?.description || '',
            }}
          />
        </Text>
        <Spacer />
        <FlexGroup justifyContent="spaceBetween">
          {data?.data.data.video === null || data?.data.data.video === '' ? (
            <FlexItem grow={2}>
              <img
                className={
                  data?.data.data.video ? sty.imgVideo : sty.imgTeacher
                }
                width="550"
                src={data?.data?.data?.avatarUrl}
                alt="okela"
              />
            </FlexItem>
          ) : (
            <FlexItem grow={2}>
              {checkvideoYoutube ? (
                <iframe
                  id={sty.youtubePlay1}
                  style={{ borderRadius: '12px' }}
                  src={data?.data?.data?.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  onMouseOver={() => {
                    setShowMuted2(true);
                  }}
                  onMouseLeave={() => {
                    setShowMuted2(false);
                  }}
                >
                  <video
                    id={sty.videoPlay2}
                    className="videoplay2"
                    ref={vidRef1}
                    controls
                    muted
                    autoPlay
                    width="520"
                  >
                    <source type="video/mp4" src={data?.data?.data?.video} />
                  </video>
                </div>
              )}
            </FlexItem>
          )}
          <FlexItem
            grow={
              data?.data.data.video === null || data?.data.data.video === ''
                ? 3
                : 1
            }
          >
            <img
              className={data?.data.data.video ? sty.imgVideo : sty.imgnoVideo}
              width="300"
              src={data?.data?.data?.avatarUrl}
              alt="okela"
            />
          </FlexItem>
        </FlexGroup>
      </div>
    </>
  );
};

export default Introduction;
