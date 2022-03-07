/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  BasicTable,
  ButtonEmpty,
  ContextMenuItem,
  ContextMenuPanel,
  FlexGroup,
  FlexItem,
  Pagination,
  Popover,
} from '@antoree/ant-ui';
import React, { useState } from 'react';
import {
  isAndroid,
  isIOS,
  isIOS13,
  isIPad13,
  isMobile,
} from 'react-device-detect';
import tableColum from './components/tableColum';
import TeacherReviewModal from './components/TeacherReviewModal';

export type CoursesTableProps = {
  data: any;
  totalPage: number;
  toggleChangeCourse: () => void;
  isLoading: boolean;
  setIdResource: (id: number) => void;
  showMobileModal: () => void;
  goToPage: (activePage: number) => void;
  activePage: number;
  onButtonClick: () => void;
  rowSize: number;
  closePopover: () => void;
  isPopoverOpen: boolean;
  hanleRowSize: (sizeRow: number) => void;
  handleSelectId: (idCource: number) => void;
  handlegetTeacherInfo: (datateacher: []) => void;
};
const CoursesTable = ({
  totalPage,
  isLoading,
  // eslint-disable-next-line no-shadow
  setIdResource,
  data,
  isPopoverOpen,
  handlegetTeacherInfo,
  onButtonClick,
  rowSize,
  closePopover,
  goToPage,
  activePage,
  handleSelectId,
  hanleRowSize,
  toggleChangeCourse,
  // eslint-disable-next-line no-shadow
  showMobileModal,
}: CoursesTableProps) => {
  const [isShowModal, setshowModal] = useState(false);
  const getRowProps = (item: any) => {
    const { id } = item;
    if (isMobile || isAndroid || isIOS13 || isIOS || isIPad13) {
      return {
        'data-test-subj': `row-${id}`,
        className: 'customRowClass',
        onClick: () => {
          setIdResource(id);
          handleSelectId(id);
          handlegetTeacherInfo(item);

          showMobileModal();
        },
      };
      // eslint-disable-next-line no-else-return
    } else {
      return {
        'data-test-subj': `row-${id}`,
        className: 'customRowClass',
        onClick: () => {
          setIdResource(id);
          handlegetTeacherInfo(item);
          handleSelectId(id);
        },
      };
    }
  };

  const button = (
    <ButtonEmpty
      size="s"
      color="text"
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}
    >
      Số dòng mỗi trang : {rowSize}
    </ButtonEmpty>
  );
  const getIconType = (size: any) => {
    return size === rowSize ? 'check' : 'empty';
  };
  const items = [
    <ContextMenuItem
      key="6 rows"
      icon={getIconType(6)}
      onClick={() => {
        closePopover();
        hanleRowSize(6);
      }}
    >
      6 dòng
    </ContextMenuItem>,

    <ContextMenuItem
      key="10 rows"
      icon={getIconType(10)}
      onClick={() => {
        closePopover();
        hanleRowSize(10);
      }}
    >
      10 dòng
    </ContextMenuItem>,

    <ContextMenuItem
      key="25 rows"
      icon={getIconType(25)}
      onClick={() => {
        closePopover();
        hanleRowSize(25);
      }}
    >
      25 dòng
    </ContextMenuItem>,
    <ContextMenuItem
      key="50 rows"
      icon={getIconType(50)}
      onClick={() => {
        closePopover();
        hanleRowSize(50);
      }}
    >
      50 dòng
    </ContextMenuItem>,
  ];

  const handleShowModal = () => {
    setshowModal(!isShowModal);
  };

  const column = tableColum({ handleShowModal, toggleChangeCourse });
  return (
    <div>
      <div>
        <BasicTable
          responsive
          tableLayout="auto"
          items={data || []}
          hasActions
          noItemsMessage={
            isLoading ? 'Đang tải dữ liệu, xin chờ ...' : 'Không có dữ liệu'
          }
          loading={isLoading}
          rowProps={getRowProps}
          columns={column}
          // eslint-disable-next-line no-shadow
          onChange={(activePage: any) => goToPage(activePage)}
        />

        <FlexGroup style={{ marginTop: '8px' }}>
          <FlexItem>
            <Popover
              button={button}
              isOpen={isPopoverOpen}
              closePopover={closePopover}
              panelPaddingSize="none"
            >
              <ContextMenuPanel items={items} />
            </Popover>
          </FlexItem>
          <FlexItem grow={false}>
            <Pagination
              pageCount={totalPage}
              activePage={activePage}
              // eslint-disable-next-line no-shadow
              onPageClick={activePage => goToPage(activePage)}
            />
          </FlexItem>
        </FlexGroup>
      </div>

      <TeacherReviewModal isShowModal={isShowModal} onClose={handleShowModal} />
    </div>
  );
};

export default CoursesTable;
