import {
  ButtonEmpty,
  Text,
  Popover,
  ContextMenu,
  ContextMenuItem,
  ContextMenuPanel,
} from '@antoree/ant-ui';
import { FunctionComponent, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ViewDetailActionProps {
  hanldeOpenmodal: () => void;
  handleGetTeacherAvailable: (id: number | undefined) => void;
  setIdteacher: any;
  idteacher: number;
}

const ViewDetailAction: FunctionComponent<ViewDetailActionProps> = ({
  setIdteacher,
  hanldeOpenmodal,
  handleGetTeacherAvailable,
  idteacher,
}) => {
  const [isOpenPopve, setOpenover] = useState(false);

  const closePopev = () => {
    setOpenover(!isOpenPopve);
  };

  return (
    <div>
      <ButtonEmpty
        style={{
          zIndex: 1000,
        }}
        onClick={() => {
          setIdteacher(idteacher);
          // hanldeOpenmodal();
          setOpenover(!isOpenPopve);
        }}
      >
        <Text size="s">
          <p>
            <MoreVertIcon />
          </p>
        </Text>
      </ButtonEmpty>
      <>
        <Popover
          anchorPosition="rightUp"
          isOpen={isOpenPopve}
          closePopover={closePopev}
        >
          <ContextMenuPanel>
            <ContextMenuItem
              onClick={() => {
                setIdteacher(idteacher);
                hanldeOpenmodal();
                setOpenover(!isOpenPopve);
              }}
            >
              Xem chi tiết
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                setIdteacher(idteacher);
                setOpenover(!isOpenPopve);

                handleGetTeacherAvailable(idteacher);
              }}
            >
              Đặt lịch
            </ContextMenuItem>
          </ContextMenuPanel>
        </Popover>
      </>
      <></>
    </div>
  );
};

export default ViewDetailAction;
