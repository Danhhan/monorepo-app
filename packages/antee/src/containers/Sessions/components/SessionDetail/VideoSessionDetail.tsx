import { Spacer } from '@antoree/ant-ui';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import moment from 'moment';
import React from 'react';
import { isDesktop } from 'react-device-detect';
import styles from './VideoSession.module.scss';

export type VideoSessionDetailProps = {
  setShowSession: () => void;
  // sessionData: any;
  sessionVideoData: any;
  sessionid: number;
};

const VideoSessionDetail = ({
  setShowSession,
  sessionid,
  // sessionData,
  sessionVideoData,
}: VideoSessionDetailProps) => {
  return (
    <div style={{ marginTop: '8%' }}>
      <h1 style={{ fontWeight: 'bold', marginLeft: '0px' }}>
        <button
          type="button"
          onClick={() => {
            setShowSession();
          }}
          style={{ cursor: 'pointer', marginLeft: '24px' }}
        >
          <ArrowBackIosIcon fontSize="small" />
        </button>{' '}
        <span style={{ fontSize: '22px' }}>Video buổi học: {sessionid}</span>{' '}
        <Spacer />
      </h1>
      <div
        style={{
          fontSize: '15px',
          fontWeight: 500,
          textTransform: 'capitalize',
          cursor: 'pointer',
          marginLeft: '25px',
        }}
      >
        <p>{`${moment(sessionVideoData?.shortDateOccurred_at).format(
          'dddd',
        )}, Ngày : ${moment(sessionVideoData?.shortDateOccurred_at).format(
          'DD/MM/YYYY',
        )} `}</p>
      </div>
      {sessionVideoData?.videoUrl?.map((item: any) => (
        <div
          className="flex items-center justify-items-center"
          style={{
            marginTop: '10px',
            padding: '10px, 12px, 10px, 12px',
            width: '400px',
          }}
        >
          <video
            className={styles.videoMedia}
            // width={isDesktop ? '354px' : '100%'}

            height="auto"
            controls
          >
            <source src={item} type="video/mp4" />
            <track
              src="captions_en.vtt"
              kind="captions"
              srcLang="vi"
              label="english_captions"
            />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
      {/* <h3>Bình luận: </h3>
      <textarea placeholder="Bình luận" style={{ width: '100%' }} /> */}
    </div>
  );
};

export default VideoSessionDetail;
