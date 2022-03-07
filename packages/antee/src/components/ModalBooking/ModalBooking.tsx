/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable radix */
import { Modal, ModalBody, Spacer } from '@antoree/ant-ui';
import DetailTeacherBody from 'containers/DetailTeacher/components/DetailTeacherBody';

export type ModalBookingProps = {
  successHandle?: () => void;
  teacherId: number;
  isOpen: boolean;
  handleOpen?: any;
  ref: any;
  errors?: any;
  role: 2 | 3;
  teacherInfo: {
    name: string;
    country: string;
    rating: number;
    avatar: string;
    video?: null | string;
    description?: string;
  };
  startTimeRange: string;
  endTimeRange: string;
  isAcceptTrial?: boolean;
  dateRange?: any;
  children?: JSX.Element;
};

const ModalBooking: React.FC<ModalBookingProps> = ({
  successHandle,
  isAcceptTrial,
  teacherId,
  teacherInfo,
  dateRange,
  role,
  startTimeRange,
  endTimeRange,
  children,
  ref,
  handleOpen,
  isOpen,
}) => {
  // const ref = useRef<any>();
  return (
    <>
      <div
        role="button"
        style={{ width: 'fit-content' }}
        onClick={(e: { stopPropagation: () => void }) => {
          handleOpen();
          e.stopPropagation();
        }}
      >
        {children}
      </div>
      {isOpen ? (
        <div ref={ref}>
          <Modal
            onClose={handleOpen}
            maxWidth={false}
            style={{ minWidth: '20vw', maxWidth: '50vw' }}
          >
            <ModalBody>
              <Spacer size="xxl" />
              <DetailTeacherBody id={teacherId} floating={false} role={role} />
            </ModalBody>
          </Modal>
        </div>
      ) : null}
    </>
  );
};

export default ModalBooking;
