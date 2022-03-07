import { FunctionComponent } from 'react';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export type SoundOptionProps = {
  hanleToggleMuted1?: () => void;
  hanleToggleMuted2?: () => void;
  mutedvideo1?: boolean;
  mutedvideo2?: boolean;
  isshowMuted1?: boolean;
  isshowMuted2?: boolean;
};

const SoundOption: FunctionComponent<SoundOptionProps> = ({
  hanleToggleMuted1,
  hanleToggleMuted2,
  mutedvideo1,
  mutedvideo2,
  isshowMuted1,
  isshowMuted2,
}) => {
  return (
    <div>
      <span>
        <button id="playpause" type="button" onClick={hanleToggleMuted2}>
          {mutedvideo2 ? (
            <VolumeUpIcon fontSize="large" style={{ fontSize: '50px' }} />
          ) : (
            <VolumeOffIcon fontSize="large" style={{ fontSize: '50px' }} />
          )}
        </button>
      </span>
    </div>
  );
};

export default SoundOption;
