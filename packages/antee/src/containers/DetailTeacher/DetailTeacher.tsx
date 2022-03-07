/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-no-target-blank */
import {
  FlexGroup,
  FlexItem,
  LoadingSpinner,
  Outline,
  Page,
  PageBody,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { AvailableTimeNew, Footer, Header } from 'components';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { useRetrieveTeacherDetail } from 'services/teacher-market';

import SimpleBottomNavigation from '../../components/BottomNav/SimpleBottomNavigation';
import useVideoHook from '../../hooks/useVideoHook';

import TeacherTopic from './components/TeacherTopic';
import Experience from './components/Experience';
import VideoDemo from './components/VideoDemo';
import Introduction from './components/Introduction';
import TeacherInfo from './components/TeacherInfo';
import AvailableTimeMobile from '../../components/AvailableTimeMobile/AvailableTimeMobile';
import { useToggle } from '../../hooks';
import styles from './DetailTeacher.module.scss';
import sty from './Videodetail.module.scss';

type Props = {
  dataCampain: {};
};
const DetailTeacher: React.FC<Props> = dataCampain => {
  const { ClockIcon, UserIcon: UserIconOutline } = Outline;
  const [mutedvideo1, setMuted1] = useState(false);
  const [mutedvideo2, setMuted2] = useState(false);
  const [isshowMuted1, setShowMuted1] = useState(false);
  const [isshowMuted2, setShowMuted2] = useState(false);
  const [timeSelected, setTimeSelected] = useState<
    { value: string; index: number }[]
  >([]);
  // eslint-disable-next-line react/destructuring-assignment
  const handleSelectime = (arr: any[]) => {
    const arrToSet = arr.sort((a, b) => b - a);
    setTimeSelected(arrToSet);
  };
  const {
    isVisiable: isVisiableModalMobile,
    toggle: toggleModal,
    close: closeModal,
  } = useToggle();

  const handleToggle = () => {
    toggleModal();
  };

  const path = window.location.pathname.split('/');
  const id = path[2] || 0;
  const { data, isLoading } = useRetrieveTeacherDetail(
    {
      teacherID: id || '',
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  function checkYoutubeUrl(urlyt: any) {
    const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (urlyt.match(p)) {
      return urlyt.match(p)[1];
    }
    return false;
  }

  const checkvideoYoutube = checkYoutubeUrl(
    data?.data?.data?.video ? data?.data?.data?.video : '',
  );
  const checkvideoYoutubeIntro = checkYoutubeUrl(
    data?.data.data.videoDemo
      ? data?.data.data.videoDemo.meta.files[0].url
      : '',
  );
  const vidRef1 = useRef(null);

  const vidRef2 = useRef(null);
  const { playerState } = useVideoHook(vidRef1 || vidRef2);

  useEffect(() => {
    const videoplay1 = document.getElementsByClassName(
      'videoplay1',
    )[0] as HTMLVideoElement;
    const videoplay2 = document.getElementsByClassName(
      'videoplay2',
    )[0] as HTMLVideoElement;
    if (videoplay1 ? videoplay1.muted === true : null) {
      setMuted1(true);
    }
    if (videoplay1 ? videoplay1.muted === false : null) {
      setMuted1(false);
    }
    if (videoplay2 ? videoplay2.muted === true : null) {
      setMuted2(true);
    }
    if (videoplay2 ? videoplay2.muted === false : null) {
      setMuted2(false);
    }
    // console.log(videoplay1 ? videoplay1.currentTime : null);
  }, []);

  const hanleToggleMuted1 = () => {
    setMuted1(!mutedvideo1);

    const videoplay1 = document.getElementsByClassName(
      'videoplay1',
    )[0] as HTMLVideoElement;

    if (mutedvideo1 === true) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      videoplay1.muted = true;
    }
    if (mutedvideo1 === false) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      videoplay1.muted = false;
    }
    setTimeout(() => {
      setShowMuted1(!isshowMuted1);
    }, 3000);
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />

        <title>
          {data
            ? `${data?.data?.data?.name} - Antoree - Học tiếng Anh online 1 kèm 1 `
            : ' Antoree - Học tiếng Anh online 1 kèm 1  | Trang chủ'}
        </title>
        <meta name="description" content={data?.data.data.description} />
        <link
          rel="canonical"
          href={`https://students.antoree.com/detail-teacher/${data?.data.data.id}`}
        />
      </Helmet>

      <PageBody className={styles.pageBody}>
        <Header isShowBarNav />
        <Spacer />
        {isLoading ? (
          <div
            style={{ minHeight: '80vh' }}
            className="flex justify-center items-center flex-col"
          >
            <LoadingSpinner size="xl" />
          </div>
        ) : (
          <div className={sty.teacherContainer}>
            <FlexGroup responsive>
              <FlexItem grow={3} className={sty.teacherItemleft}>
                <Title size="l" className="font-semibold">
                  <h2>{data?.data?.data?.name}</h2>
                </Title>
                <Spacer size="s" />
                <TeacherInfo data={data ? data?.data?.data : {}} />

                <Spacer />
                <VideoDemo
                  data={data}
                  setShowMuted1={setShowMuted1}
                  setShowMuted2={setShowMuted2}
                  checkvideoYoutubeIntro={checkvideoYoutubeIntro}
                  mutedvideo1={mutedvideo1}
                  mutedvideo2={mutedvideo2}
                  hanleToggleMuted1={hanleToggleMuted1}
                  isshowMuted1={isshowMuted1}
                />
                <Spacer />
                <Spacer />
                <Introduction
                  setShowMuted2={setShowMuted2}
                  data={data}
                  vidRef1={vidRef1}
                  checkvideoYoutube={checkvideoYoutube}
                />
                <Spacer />
                <Title size="s" className="font-medium">
                  <h3>
                    <FormattedMessage defaultMessage="Bằng cấp" />
                  </h3>
                </Title>
                <Spacer />
                <Text>
                  {data?.data?.data?.certifications?.map(item => (
                    // eslint-disable-next-line react/jsx-no-target-blank
                    <p>
                      {item?.name} - {item?.description} -{' '}
                      <a href={item?.files?.url} target="_blank">
                        <FormattedMessage defaultMessage="Chi tiết" />
                      </a>
                    </p>
                  ))}
                </Text>
                <Spacer />
                <Experience
                  workExperiences={
                    data?.data?.data ? data?.data?.data?.work_experiences : []
                  }
                />
                <Spacer />
                <TeacherTopic
                  topics={data?.data?.data ? data?.data?.data?.topics : []}
                />

                <div
                  className="p-4 sticky top-4 rounded-2xl mx-auto"
                  id={sty.availableTimeNewIpad}
                  style={{
                    width: '350px',
                  }}
                >
                  <AvailableTimeMobile
                    timeBottomselected={timeSelected}
                    handleSelectime={handleSelectime}
                    handleToggle={handleToggle}
                    isVisiableModalMobile={isVisiableModalMobile}
                    closeModal={closeModal}
                    dataCampain={dataCampain}
                    role={3}
                    // eslint-disable-next-line radix
                    teacherId={parseInt(id || '')}
                    date={moment().format('YYYY-MM-DD')}
                    teacherInfo={{
                      name: 'Jenny Wilson',
                      country: 'Australia',
                      rating: 4.8,
                      avatar:
                        'https://antoree-v1-prod-files.s3.ap-southeast-1.amazonaws.com/user_198907/profile_pictures/img_1623914640_60caf890c15fd3.79767614.jpg',
                    }}
                    minutesSpace={30}
                    startTimeRange={moment()
                      .hours(0)
                      .minutes(0)
                      .seconds(0)
                      .format('HH:mm:ss')}
                    endTimeRange={moment()
                      .hours(23)
                      .minutes(59)
                      .seconds(0)
                      .format('HH:mm:ss')}
                  />
                </div>
              </FlexItem>
              <FlexItem className={sty.teacherItemright}>
                <div
                  className="p-4 sticky top-4 rounded-2xl mx-auto"
                  id={sty.availableTimeNew}
                  style={{
                    top: '90px',
                    width: '350px',
                  }}
                >
                  <AvailableTimeNew
                    timeBottomselected=""
                    handleSelectime={handleSelectime}
                    handleToggle={handleToggle}
                    isVisiableModal={false}
                    closeModal={closeModal}
                    dataCampain={dataCampain}
                    role={3}
                    // eslint-disable-next-line radix
                    teacherId={parseInt(id || '')}
                    date={moment().format('YYYY-MM-DD')}
                    teacherInfo={{
                      name: 'Jenny Wilson',
                      country: 'Australia',
                      rating: 4.8,
                      avatar:
                        'https://antoree-v1-prod-files.s3.ap-southeast-1.amazonaws.com/user_198907/profile_pictures/img_1623914640_60caf890c15fd3.79767614.jpg',
                    }}
                    minutesSpace={30}
                    startTimeRange={moment()
                      .hours(0)
                      .minutes(0)
                      .seconds(0)
                      .format('HH:mm:ss')}
                    endTimeRange={moment()
                      .hours(23)
                      .minutes(59)
                      .seconds(0)
                      .format('HH:mm:ss')}
                  />
                </div>
              </FlexItem>
            </FlexGroup>
          </div>
        )}
        <Spacer />
        <SimpleBottomNavigation
          hanleOpen={handleToggle}
          timeSelected={timeSelected}
        />
      </PageBody>
      <Footer />
    </div>
  );
};

export default DetailTeacher;
