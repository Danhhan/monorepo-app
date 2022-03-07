/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { FunctionComponent } from 'react';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import sty from '../Videodetail.module.scss';

interface VideoDemoProps {
  data: any;
  setShowMuted1: (data: boolean) => void;
  setShowMuted2: (data: boolean) => void;
  hanleToggleMuted1: () => void;
  checkvideoYoutubeIntro: boolean;
  mutedvideo1: boolean;
  mutedvideo2: boolean;
  isshowMuted1: boolean;
}

const VideoDemo: FunctionComponent<VideoDemoProps> = ({
  data,
  setShowMuted1,
  setShowMuted2,
  checkvideoYoutubeIntro,
  mutedvideo1,
  mutedvideo2,
  hanleToggleMuted1,
  isshowMuted1,
}: VideoDemoProps) => {
  return (
    <>
      {data?.data?.data?.videoDemo?.meta?.files[0]?.url && (
        <div id="video1">
          {checkvideoYoutubeIntro ? (
            <iframe
              width="100%"
              height="100%"
              style={{ minHeight: '300px' }}
              src={data?.data?.data?.videoDemo?.meta?.files[0]?.url || ''}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg overflow-hidden"
            />
          ) : (
            <div
              onMouseOver={() => {
                setShowMuted1(true);
                setShowMuted2(false);
              }}
              onMouseLeave={() => {
                setShowMuted1(false);
                setShowMuted2(false);
              }}
            >
              <div id="video2">
                <>
                  {isshowMuted1 ? (
                    <span className={sty.soundVideo}>
                      <button
                        id="playpause"
                        type="button"
                        onClick={hanleToggleMuted1}
                      >
                        {mutedvideo1 || mutedvideo2 ? (
                          <VolumeUpIcon
                            fontSize="large"
                            style={{
                              fontSize: '40px',
                              marginLeft: '5px',
                            }}
                          />
                        ) : (
                          <VolumeOffIcon
                            fontSize="large"
                            style={{
                              fontSize: '40px',
                              marginLeft: '5px',
                            }}
                          />
                        )}
                      </button>
                    </span>
                  ) : null}
                </>
              </div>
              <video
                id={sty.videoPlay1}
                className="videoplay1"
                controls
                muted
                autoPlay
                width="950"
              >
                <source
                  type="video/mp4"
                  src={data?.data?.data?.videoDemo?.meta?.files[0]?.url || ''}
                />
              </video>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VideoDemo;
