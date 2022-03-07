import { Icon, ButtonEmpty } from '@antoree/ant-ui';
import result from 'assets/icons/result.svg';

import { FormattedMessage } from 'react-intl';

import { useToggle } from 'hooks';

import FeedbackModal from './FeedbackModal';

export type FeedbackProps = {
  id: number;
  courseId: string | number;
  disabled?: boolean;
};

const Feedback: React.FC<FeedbackProps> = ({
  id,
  courseId,
  disabled = false,
}) => {
  const { isVisiable, close, open } = useToggle();

  return (
    <>
      {/* <Button
        size="m"
        className="w-full "
        disabled={disabled}
        onClick={open}
        fill
        color="warning"
        iconType="document"
        style={{ color: '#fff' }}
      >
        <FormattedMessage defaultMessage="Review lession" />
      </Button> */}
      <ButtonEmpty
        className="rounded-xl w-full"
        style={{ padding: '0px', textDecoration: 'none' }}
        disabled={disabled}
        onClick={open}
      >
        <div
          style={{
            width: '105px',
            height: '40px',
            textAlign: 'start',
            position: 'relative',
          }}
        >
          <span
            style={{
              backgroundColor: '#00C081',
              fontSize: '15px',
              position: 'relative',
              left: '0px',
              top: '10px',
              paddingTop: '20px',
              borderRadius: '5px',
            }}
            className="pl-3 pr-3"
          >
            <Icon type={result} className="mb-6" />
          </span>
          &nbsp;
          <span
            style={{
              position: 'absolute',
              top: '9px',
              fontSize: '12px',
            }}
          >
            <FormattedMessage defaultMessage="View result" />
          </span>
        </div>
      </ButtonEmpty>
      {isVisiable ? (
        <FeedbackModal id={id} courseId={courseId} closeModal={close} />
      ) : null}
    </>
  );
};

export default Feedback;
