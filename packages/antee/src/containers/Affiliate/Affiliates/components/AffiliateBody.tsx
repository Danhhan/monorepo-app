import ImgSortUnActive from 'assets/icons/affiliate/sort_unactive.svg';
import ImgSortUnAsc from 'assets/icons/affiliate/sort_asc.svg';
import {
  PageContent,
  BasicTable,
  FlexGroup,
  FlexItem,
  Pagination,
  Popover,
  ContextMenuPanel,
  ButtonEmpty,
  Button,
  ContextMenuItem,
} from '@antoree/ant-ui';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalDeleteAffiliate from './ModalDeleteAffiliate';
import ModalEditAffiliate from './ModalEditAffiliate';
import ModalCopyAffiliate from './ModalCopyAffiliate';

const AffiliateBody: React.FC<{}> = ({}) => {
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const closeModal = () => setIsModalVisibleEdit(false);
  const showModal = () => setIsModalVisibleEdit(true);

  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const closeModalDelete = () => setIsModalVisibleDelete(false);
  const showModalDelete = () => setIsModalVisibleDelete(true);

  const [isModalVisibleCopy, setIsModalVisibleCopy] = useState(false);
  const closeModalCopy = () => setIsModalVisibleCopy(false);
  const showModalCopy = () => setIsModalVisibleCopy(true);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [rowSize, setRowSize] = useState(6);
  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };
  const closePopover = () => setIsPopoverOpen(false);
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
        setRowSize(6);
      }}
    >
      6 dòng
    </ContextMenuItem>,

    <ContextMenuItem
      key="10 rows"
      icon={getIconType(10)}
      onClick={() => {
        closePopover();
        setRowSize(10);
      }}
    >
      10 dòng
    </ContextMenuItem>,

    <ContextMenuItem
      key="25 rows"
      icon={getIconType(25)}
      onClick={() => {
        closePopover();
        setRowSize(25);
      }}
    >
      25 dòng
    </ContextMenuItem>,
    <ContextMenuItem
      key="50 rows"
      icon={getIconType(50)}
      onClick={() => {
        closePopover();
        setRowSize(50);
      }}
    >
      50 dòng
    </ContextMenuItem>,
  ];
  return (
    <>
      <PageContent
        borderRadius="none"
        hasShadow={false}
        style={{ border: 'none' }}
      >
        <BasicTable
          responsive
          tableLayout="auto"
          hasActions
          className="w-full overflow-x-auto"
          items={[
            {
              link: 'http://antor.ee/32j122',
              value: 1,
              campaign: 'Landing page Kid1',
              clicks: 201,
              contacts: 200,
              tested: 200,
              trial: 200,
              customers: 200,
              gmv: 200,
            },
            {
              link: 'http://antor.ee/32j122',
              value: 1,
              campaign: 'Landing page Kid2',
              clicks: 200,
              contacts: 200,
              tested: 200,
              trial: 200,
              customers: 200,
              gmv: 200,
            },
            {
              link: 'http://antor.ee/32j122',
              value: 1,
              campaign: 'Landing page Kid',
              clicks: 202,
              contacts: 200,
              tested: 200,
              trial: 200,
              customers: 200,
              gmv: 200,
            },
            {
              link: 'http://antor.ee/32j122',
              value: 1,
              campaign: 'Landing page Kid',
              clicks: 200,
              contacts: 200,
              tested: 200,
              trial: 200,
              customers: 200,
              gmv: 200,
            },
            {
              link: 'http://antor.ee/32j122',
              value: 1,
              campaign: 'Landing page Kid',
              clicks: 200,
              contacts: 200,
              tested: 200,
              trial: 200,
              customers: 200,
              gmv: 200,
            },
            {
              link: 'http://antor.ee/32j122',
              value: 1,
              campaign: 'Landing page Kid',
              clicks: 200,
              contacts: 200,
              tested: 200,
              trial: 200,
              customers: 200,
              gmv: 200,
            },
          ]}
          columns={[
            {
              field: 'link',
              name: (
                <span style={{ fontWeight: 'bold', color: '#69707D' }}>
                  Link
                </span>
              ),
              truncateText: true,
              render: (link: any) => (
                <div>
                  {link}
                  <Button
                    size="s"
                    minWidth={60}
                    className="ml-3 w-10 text-sm border border-gray-300 text-black"
                    style={{
                      background: 'rgba(52, 55, 65, 0.15)',
                      color: '#343741',
                    }}
                    onClick={showModalCopy}
                  >
                    Copy
                  </Button>
                </div>
              ),
              width: '220',
            },
            {
              field: 'campaign',
              name: (
                <div
                  style={{ fontWeight: 'bold', color: '#69707D' }}
                  className="flex items-center justify-start"
                >
                  <span>Tên chiến dịch</span>
                  <div className="ml-1 pt-1">
                    <img alt="" src={ImgSortUnAsc} />
                  </div>
                </div>
              ),
              render: (campaign: any) => (
                <Link to="/affiliateDashboard">
                  <ButtonEmpty>{campaign}</ButtonEmpty>
                </Link>
              ),
              sortable: true,
              truncateText: true,
            },
            {
              field: 'clicks',
              name: (
                <div
                  style={{ fontWeight: 'bold', color: '#69707D' }}
                  className="flex items-center justify-start"
                >
                  <span>Clicks</span>
                  <div className="ml-1 pt-1">
                    <img alt="" src={ImgSortUnActive} />
                  </div>
                </div>
              ),
              truncateText: true,
              width: '100',
            },
            {
              field: 'contacts',
              name: (
                <div
                  style={{ fontWeight: 'bold', color: '#69707D' }}
                  className="flex items-center justify-start"
                >
                  <span>Contacts</span>
                  <div className="ml-1 pt-1">
                    <img alt="" src={ImgSortUnActive} />
                  </div>
                </div>
              ),
              truncateText: true,
              width: '100',
            },
            {
              field: 'value',
              name: (
                <div
                  style={{ fontWeight: 'bold', color: '#69707D' }}
                  className="flex items-center justify-start"
                >
                  <span> Đăng ký test</span>
                  <div className="ml-1 pt-1">
                    <img alt="" src={ImgSortUnActive} />
                  </div>
                </div>
              ),
              truncateText: true,
              width: '100',
            },
            {
              field: 'tested',
              name: (
                <div
                  style={{ fontWeight: 'bold', color: '#69707D' }}
                  className="flex items-center justify-start"
                >
                  <span>Học thử</span>
                  <div className="ml-1 pt-1">
                    <img alt="" src={ImgSortUnActive} />
                  </div>
                </div>
              ),
              truncateText: true,
              width: '100',
            },
            {
              field: 'customers',
              name: (
                <div
                  style={{ fontWeight: 'bold', color: '#69707D' }}
                  className="flex items-center justify-start"
                >
                  <span>Khách hàng</span>
                  <div className="ml-1 pt-1">
                    <img alt="" src={ImgSortUnActive} />
                  </div>
                </div>
              ),
              truncateText: true,
              width: '100',
            },
            {
              field: 'gmv',
              name: (
                <div
                  style={{ fontWeight: 'bold', color: '#69707D' }}
                  className="flex items-center justify-start"
                >
                  <span>GMV</span>
                  <div className="ml-1 pt-1">
                    <img alt="" src={ImgSortUnActive} />
                  </div>
                </div>
              ),
              truncateText: true,
              width: '100',
            },
            {
              field: 'id',
              name: (
                <div
                  style={{ fontWeight: 'bold', color: '#69707D' }}
                  className="flex items-center justify-start"
                >
                  <span> Thao tác</span>
                  <div className="ml-1 pt-1">
                    <img alt="" src={ImgSortUnActive} />
                  </div>
                </div>
              ),
              truncateText: true,
              actions: [
                {
                  name: 'Edit',
                  description: 'Edit this person',
                  type: 'icon',
                  icon: 'documentEdit',
                  onClick: () => {
                    showModal();
                  },
                },
                {
                  name: 'Delete',
                  description: 'Delete this person',
                  type: 'icon',
                  icon: 'trash',
                  onClick: () => {
                    showModalDelete();
                  },
                },
              ],
              width: '100',
            },
          ]}
        />
        <FlexGroup justifyContent="spaceBetween" className="mt-1">
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
          <FlexItem grow={false} className="float-right">
            <Pagination aria-label="Custom pagination example" />
          </FlexItem>
        </FlexGroup>
      </PageContent>
      <ModalCopyAffiliate
        isModalVisibleCopy={isModalVisibleCopy}
        closeModalCopy={closeModalCopy}
      />
      <ModalEditAffiliate
        closeModal={closeModal}
        isModalVisibleEdit={isModalVisibleEdit}
      />
      <ModalDeleteAffiliate
        closeModalDelete={closeModalDelete}
        isModalVisibleDelete={isModalVisibleDelete}
      />
    </>
  );
};

export default AffiliateBody;
