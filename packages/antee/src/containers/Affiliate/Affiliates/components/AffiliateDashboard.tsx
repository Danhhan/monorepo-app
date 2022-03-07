import {
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  PageHeader,
  Title,
  IconTip,
  PageContent,
  BasicTable,
  Badge,
  ContextMenuItem,
  Popover,
  ContextMenuPanel,
  Pagination,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImgSortUnActive from 'assets/icons/affiliate/sort_unactive.svg';
import { HeaderAffiliateMarketing } from 'containers/Affiliate/IncludeAffiliate/components';

const AffiliateDashboard: React.FC<{}> = () => {
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
      <HeaderAffiliateMarketing />
      <PageHeader
        responsive
        paddingSize="s"
        rightSideItems={[]}
        className="md:px-8"
      >
        <FlexGroup justifyContent="spaceAround">
          <FlexItem
            grow={5}
            className="flex"
            style={{ display: 'flex', flexDirection: 'inherit' }}
          >
            <Link to="/affiliates">
              <div style={{ color: '#000000', marginRight: '2px' }}>
                <IconTip type="arrowLeft" size="l" />
              </div>
            </Link>{' '}
            <Title size="xs" className="text-black">
              <h1>
                <FormattedMessage defaultMessage="LDPKID - Post trên group Học tiếng anh online 1 - 1" />
              </h1>
            </Title>
          </FlexItem>
        </FlexGroup>
        <PageContent
          borderRadius="none"
          hasShadow={false}
          style={{ border: 'none' }}
        >
          {/* <PageContentBody>Table</PageContentBody> */}
          <BasicTable
            responsive
            tableLayout="auto"
            hasActions
            items={[
              {
                id: '587166',
                name: 'Thiên Phúc Nguyễn',
                date: '05/02/2022 15:30',
                status: 'Mới',
                detail: 'Đang xử lý',
              },
              {
                id: '587167',
                name: 'Đinh Thúy',
                date: '05/02/2022 15:30',
                status: 'Kiểm tra',
                detail: 'Đang xử lý',
              },
              {
                id: '587168',
                name: 'Anh Vũ',
                date: '05/02/2022 15:30',
                status: 'Học thử',
                detail: 'Đã trả kết quả kiểm tra',
              },
              {
                id: '587169',
                name: 'Pham Luan',
                date: '05/02/2022 15:30',
                status: 'Đóng tiền',
                detail: 'Đã học thử',
              },
              {
                id: '587170',
                name: 'Tây Trần',
                date: '05/02/2022 15:30',
                status: 'Từ chối',
                detail: 'Khách hàng từ chối',
              },
              {
                id: '587171',
                name: 'Đình Vũ',
                date: '05/02/2022 15:30',
                status: 'Từ chối',
                detail: 'Đang xử lý',
              },
              {
                id: '587172',
                name: 'Thiên Phúc Nguyễn',
                date: '05/02/2022 15:30',
                status: 'Đóng tiền',
                detail: 'Khách hàng từ chối',
              },
              {
                id: '587173',
                name: 'Landing page Kid',
                date: '05/02/2022 15:30',
                status: 'Đóng tiền',
                detail: 'Khách hàng từ chối',
              },
              {
                id: '587174',
                name: 'Landing page Kid',
                date: '05/02/2022 15:30',
                status: 'Mới',
                detail: 'Khách hàng từ chối',
              },
            ]}
            columns={[
              {
                field: 'id',
                name: (
                  <span style={{ fontWeight: 'bold', color: '#69707D' }}>
                    ID
                  </span>
                ),
                truncateText: true,

                width: '220',
              },
              {
                field: 'name',
                name: (
                  <div
                    style={{ fontWeight: 'bold', color: '#69707D' }}
                    className="flex items-center justify-start"
                  >
                    <span>Tên khách hàng</span>
                  </div>
                ),
                sortable: true,
                truncateText: true,
              },
              {
                field: 'date',
                name: (
                  <div
                    style={{ fontWeight: 'bold', color: '#69707D' }}
                    className="flex items-center justify-start"
                  >
                    <span>Ngày tạo</span>
                    <div className="ml-1 mt-1">
                      <img alt="" src={ImgSortUnActive} />
                    </div>
                  </div>
                ),
                truncateText: true,
              },
              {
                field: 'status',
                name: (
                  <div
                    style={{ fontWeight: 'bold', color: '#69707D' }}
                    className="flex items-center justify-start"
                  >
                    <span>Trạng thái</span>
                    <div className="ml-1 mt-1">
                      <img alt="" src={ImgSortUnActive} />
                    </div>
                  </div>
                ),
                render: (status: any) => (
                  <FlexItem style={{ width: '100px' }} grow={false}>
                    {status === 'Mới' && (
                      <Badge
                        className="rounded"
                        style={{
                          width: 'fit-content',
                          background: 'rgba(52, 55, 65, 0.15)',
                        }}
                      >
                        <p
                          style={{ color: '#343741', fontSize: '13px' }}
                          className="p-1"
                        >
                          Mới
                        </p>
                      </Badge>
                    )}
                    {status === 'Kiểm tra' && (
                      <Badge
                        className="rounded"
                        style={{
                          width: 'fit-content',
                          background: 'rgba(255, 199, 0, 0.15)',
                        }}
                      >
                        <p
                          style={{ color: '#E2B100', fontSize: '13px' }}
                          className="p-1"
                        >
                          Kiểm tra
                        </p>
                      </Badge>
                    )}
                    {status === 'Học thử' && (
                      <Badge
                        className="rounded"
                        style={{
                          width: 'fit-content',
                          background: 'rgba(244, 96, 54, 0.2)',
                        }}
                      >
                        <p
                          style={{ color: '#FF6700', fontSize: '13px' }}
                          className="p-1"
                        >
                          Học thử
                        </p>
                      </Badge>
                    )}
                    {status === 'Đóng tiền' && (
                      <Badge
                        className="rounded"
                        style={{
                          width: 'fit-content',
                          background: 'rgba(20, 178, 76, 0.15)',
                        }}
                      >
                        <p
                          style={{ color: '#14B24C', fontSize: '13px' }}
                          className="p-1"
                        >
                          Đóng tiền
                        </p>
                      </Badge>
                    )}
                    {status === 'Từ chối' && (
                      <Badge
                        className="rounded"
                        style={{
                          width: 'fit-content',
                          background: 'rgba(189, 39, 30, 0.2)',
                        }}
                      >
                        <p
                          style={{ color: '#ED0000', fontSize: '13px' }}
                          className="p-1"
                        >
                          Từ chối
                        </p>
                      </Badge>
                    )}
                  </FlexItem>
                ),
                truncateText: true,
              },
              {
                field: 'detail',
                name: (
                  <div
                    style={{ fontWeight: 'bold', color: '#69707D' }}
                    className="flex items-center justify-start"
                  >
                    <span>Chi tiết</span>
                  </div>
                ),
                truncateText: true,
                width: '100',
              },
            ]}
          />
        </PageContent>
        <FlexGroup>
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
      </PageHeader>
    </>
  );
};

export default AffiliateDashboard;
