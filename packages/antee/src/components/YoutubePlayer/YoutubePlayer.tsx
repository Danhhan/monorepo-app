/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import styles from './YoutubePlayer.module.scss';

export type YoutubePlayerProps = { youtubeID: string };

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ youtubeID }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div
      className="youtube-video-place aspect-w-16 aspect-h-9 relative cursor-pointer"
      data-yt-url="https://www.youtube.com/embed/BjngNWP9C5s?rel=0&showinfo=0&autoplay=1"
      onClick={() => setShowVideo(true)}
      style={{
        paddingBottom: 'calc(9 / 16 * 100%)',
      }}
    >
      {showVideo ? (
        <iframe
          width="100%"
          height="100%"
          //   style={{ minHeight: '330px' }}
          className="play-youtube-video"
          src={`https://www.youtube.com/embed/${youtubeID}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute' }}
        />
      ) : (
        <>
          <img
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            src={`https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`}
            // async
            className="play-youtube-video"
            alt="youtube-thumbnail"
          />
          <div className={styles.playYoutube} />
        </>
      )}
    </div>
  );
};

export default YoutubePlayer;
