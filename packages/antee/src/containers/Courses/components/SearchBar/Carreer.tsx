import React, { FunctionComponent, useState } from 'react';

import {
  Avatar,
  Button,
  ButtonEmpty,
  ContextMenuPanel,
  FlexItem,
  Popover,
  Text,
  Title,
} from '@antoree/ant-ui';

interface CarreerProps {
  cource: any;
  idSelected: number;
}

const Carreer: FunctionComponent<CarreerProps> = ({ cource, idSelected }) => {
  const [isPopoverOpen, setPopover] = useState(false);
  const [isShowIssue, setShowIssue] = useState(false);
  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };
  const carreeBy = cource.filter((item: any) => item.id === idSelected);

  const button = (
    <Button
      size="s"
      color="text"
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}
    >
      {idSelected
        ? carreeBy[0]?.carer?.shown_name
        : cource[0]?.carer?.shown_name}
    </Button>
  );
  const items = [
    <div className="infoTeacher">
      {carreeBy ? (
        carreeBy?.map((carer: any) => (
          <>
            <div
              className="flex items-center justify-items-center"
              style={{ paddingLeft: '20px' }}
            >
              <FlexItem grow={false} className="m-0">
                <Avatar
                  imageUrl={carer?.carer?.avatarUrl}
                  name="Phong"
                  size="l"
                  type="space"
                  style={{ margin: '16px 8px 16px 0px' }}
                />
              </FlexItem>
              <FlexItem style={{ width: '130px' }}>
                {/* style={{ width: '156px' }} */}
                <Title size="xxs">
                  <h1
                    className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                    style={{
                      // height: '4rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitLineClamp: 2,
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {carer.carer ? carer?.carer?.name : 'Name Career'}
                  </h1>
                </Title>
                <Text color="subdued" size="xs">
                  <p>VIET NAM</p>
                </Text>
              </FlexItem>
            </div>
            <div
              className="flex items-center justify-items-center"
              style={{ paddingLeft: '20px' }}
            >
              <FlexItem>
                <ButtonEmpty color="text" iconType="email">
                  {carer?.carer ? carer?.carer?.email : 'admin@antoree.com'}
                </ButtonEmpty>

                <ButtonEmpty color="text" iconType="mobile">
                  {carer?.carer?.phone
                    ? carer?.carer?.phone
                    : 'không có số điện thoại'}
                </ButtonEmpty>
              </FlexItem>
            </div>
          </>
        ))
      ) : (
        <div>No carree</div>
      )}
    </div>,
  ];
  return (
    <>
      <Popover
        id=""
        button={
          cource[0]?.carer ? (
            button
          ) : (
            <Button
              size="s"
              onClick={onButtonClick}
              color="text"
              iconType="arrowDown"
              iconSide="right"
            >
              Carreer
            </Button>
          )
        }
        isOpen={isPopoverOpen}
        closePopover={onButtonClick}
        panelPaddingSize="none"
        hasArrow
        anchorPosition="downCenter"
      >
        {cource[0]?.carer ? (
          <ContextMenuPanel size="s" items={items} />
        ) : (
          <div style={{ width: '250px', height: '200px' }}>
            <p
              style={{
                textAlign: 'center',
                paddingTop: '30%',
                fontSize: '14px',
              }}
            >
              Nhân viên CSKH sẽ được xuất hiện tại đây
            </p>
          </div>
        )}
      </Popover>
    </>
  );
};

export default Carreer;
